import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { authRedirectGuardGuard } from './guards/auth-redirect-guard.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/auth.component').then((c) => c.AuthComponent),
    canActivate: [authRedirectGuardGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/auth.component').then((c) => c.AuthComponent),
    canActivate: [authRedirectGuardGuard],
  },
  {
    path: 'about-me',
    loadComponent: () =>
      import('./pages/about-me/about-me.component').then(
        (c) => c.AboutMeComponent
      ),
  },
  {
    path: 'ahorcado',
    loadComponent: () =>
      import('./pages/ahorcado/ahorcado.component').then(
        (c) => c.AhorcadoComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'mayor-o-menor',
    loadComponent: () =>
      import('./pages/mayor-o-menor/mayor-o-menor.component').then(
        (c) => c.MayorOMenorComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'preguntados',
    loadComponent: () =>
      import('./pages/preguntados/preguntados.component').then(
        (c) => c.PreguntadosComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'arma-las-palabras',
    loadComponent: () =>
      import('./pages/arma-las-palabras/arma-las-palabras.component').then(
        (c) => c.ArmaLasPalabrasComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
