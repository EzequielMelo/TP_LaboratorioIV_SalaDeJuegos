import { Injectable, inject } from '@angular/core';
import { Auth, User, signInWithEmailAndPassword, createUserWithEmailAndPassword, Unsubscribe } from '@angular/fire/auth';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { from, catchError, throwError, tap, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();
  authSubscription?: Unsubscribe;

  private auth = inject(Auth)
  private errorHandler = inject(ErrorHandlerService);

  constructor() {
    this.authSubscription = this.auth.onAuthStateChanged((auth) => {
      if (auth?.email) {
        this.userSubject.next(auth);
      }
      else {
        this.userSubject.next(null);
      }
    })
  }

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError((error) => {
        // Si hay un error, lo manejamos
        return throwError(() => this.errorHandler.handleAuthError(error));
      })
    );
  }

  register(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError((error) => {
        // Si hay un error, lo manejamos
        return throwError(() => this.errorHandler.handleAuthError(error));
      })
    );
  }

  logOut() {
    this.auth.signOut();
  }
}
