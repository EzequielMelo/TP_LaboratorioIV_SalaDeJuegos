import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private router: Router) { }

  checkAuthState() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user?.email) {
          resolve(true);  // Usuario autenticado
        } else {
          resolve(false); // No autenticado
        }
      });
    });
  }

  redirectIfAuthenticated() {
    this.checkAuthState().then((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigateByUrl('');
      }
    });
  }
}
