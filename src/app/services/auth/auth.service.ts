import { Injectable, inject } from '@angular/core';
import { Auth, User, signInWithEmailAndPassword, createUserWithEmailAndPassword, Unsubscribe } from '@angular/fire/auth';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { from, catchError, throwError, BehaviorSubject, Observable, switchMap } from 'rxjs';
import { DatabaseService } from '../database/database.service';
import { UserClass } from '../../classes/user-class';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUserSubject = new BehaviorSubject<User | null>(null);
  public authUser$ = this.authUserSubject.asObservable();

  private userClassSubject = new BehaviorSubject<UserClass | null>(null);
  public userClass$ = this.userClassSubject.asObservable();
  authSubscription?: Unsubscribe;

  private auth = inject(Auth)
  private errorHandler = inject(ErrorHandlerService);
  private db = inject(DatabaseService)

  constructor() {
    this.authSubscription = this.auth.onAuthStateChanged((authUser) => {
      if (authUser?.uid) {
        this.authUserSubject.next(authUser);

        this.db.getUserData(authUser.uid).subscribe((userData: UserClass | null) => {
          this.userClassSubject.next(userData);
        });
      } else {
        this.authUserSubject.next(null);
        this.userClassSubject.next(null);
      }
    });
  }

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError((error) => {
        return throwError(() => this.errorHandler.handleAuthError(error));
      })
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    // Primero, verifica si el nombre de usuario ya existe
    return this.db.checkUsernameExists(username).pipe(
      switchMap(exists => {
        if (exists) {
          return throwError(() => new Error('El nombre de usuario ya está en uso.'));
        }
        return from(createUserWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
          const uid = userCredential.user.uid;
          const user: UserClass = {
            userName: username,
            userType: 0,
          };
          return this.db.addUsers(user, uid);
        }));
      }),
      catchError((error) => {
        return throwError(() => this.errorHandler.handleAuthError(error));
      })
    );
  }

  logOut() {
    this.auth.signOut();
  }
}
