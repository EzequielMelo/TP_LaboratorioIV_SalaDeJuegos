import { Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/auth.component').then((c) => c.AuthComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/auth.component').then((c) => c.AuthComponent),
  },
  {
    path: 'about-me',
    loadComponent: () => import('./pages/about-me/about-me.component').then((c) => c.AboutMeComponent),
  },
  {
    path: 'ahorcado',
    loadComponent: () => import('./pages/ahorcado/ahorcado.component').then((c) => c.AhorcadoComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then((c) => c.NotFoundComponent),
  }
];
