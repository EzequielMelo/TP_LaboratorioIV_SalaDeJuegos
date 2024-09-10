import { Routes } from '@angular/router';
import { GameComponent } from './pages/home/game/game.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then((c) => c.HomeComponent),
    children: [
      {
        path: '',
        component: GameComponent,
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'about-me',
    loadComponent: () => import('./pages/about-me/about-me.component').then((c) => c.AboutMeComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then((c) => c.NotFoundComponent),
  }
];
