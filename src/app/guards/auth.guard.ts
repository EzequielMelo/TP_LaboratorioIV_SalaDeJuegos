import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  let auth = false;

  const authService = inject(AuthService);
  const router = inject(Router);

  authService.authUser$.subscribe((respuesta) => {
    if (respuesta != null) {
      auth = true;
    } else {
      auth = false;
      router.navigateByUrl('');
    }
  });
  return auth;
};