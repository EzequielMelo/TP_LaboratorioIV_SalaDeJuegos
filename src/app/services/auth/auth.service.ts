import { Injectable, inject } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  Unsubscribe,
  UserCredential,
  User,
} from '@angular/fire/auth';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import {
  from,
  catchError,
  throwError,
  BehaviorSubject,
  Observable,
  switchMap,
} from 'rxjs';
import { DatabaseService } from '../database/database.service';
import { UserClass } from '../../classes/user-class';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUserSubject = new BehaviorSubject<User | null>(null);
  public authUser$ = this.authUserSubject.asObservable();
  private userSubject = new BehaviorSubject<UserClass | null>(null);
  public user$ = this.userSubject.asObservable();
  authSubscription?: Unsubscribe;

  private auth = inject(Auth);
  private errorHandler = inject(ErrorHandlerService);
  private db = inject(DatabaseService);

  constructor() {
    this.authSubscription = this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.authUserSubject.next(authUser);
        this.loadUserData(authUser.uid);
      } else {
        this.authUserSubject.next(null);
        this.userSubject.next(null);
      }
    });
  }

  login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      // No necesitas obtener los datos del usuario aquí
      catchError((error) => {
        return throwError(() => this.errorHandler.handleAuthError(error));
      })
    );
  }

  register(
    username: string,
    email: string,
    password: string
  ): Observable<void> {
    return this.db.checkUsernameExists(username).pipe(
      switchMap((exists) => {
        if (exists) {
          return throwError(() => ({
            message: 'El nombre de usuario ya está en uso.',
          }));
        }
        return from(
          createUserWithEmailAndPassword(this.auth, email, password).then(
            (userCredential) => {
              const uid = userCredential.user.uid;
              const user: Partial<UserClass> = {
                userName: username,
                userType: 0,
              };
              return this.db.addUsers(user, uid);
            }
          )
        );
      }),
      catchError((error) => {
        const errorMessage = this.errorHandler.handleAuthError(error);
        return throwError(() => ({ message: errorMessage }));
      })
    );
  }

  private loadUserData(uid: string): void {
    this.db.getUserData(uid).subscribe((userData) => {
      if (userData) {
        const fullUser = new UserClass(
          uid,
          userData.userName,
          this.authUserSubject.getValue()?.email ?? '', // Obtiene el email desde el observable
          userData.userType
        );
        this.userSubject.next(fullUser); // Actualiza los datos completos del usuario
      } else {
        this.userSubject.next(null);
      }
    });
  }

  logOut() {
    this.auth.signOut();
  }
}
