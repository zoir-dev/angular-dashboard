import { Routes } from '@angular/router';
import { canActiveGuard } from './shared/guards/canActive/can-active.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/main/main.component').then(l => l.MainComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./modules/home/home.component').then(l => l.HomeComponent)
      },
      {
        path: ':user',
        loadComponent: () => import('./modules/user/user.component').then(l => l.UserComponent)
      },
    ]
  },
  {
    path: 'auth',
    loadComponent: () => import('./layouts/auth/auth.component').then(l => l.AuthComponent),
    canActivate: [canActiveGuard],
    children: [
      {
        path: 'sign',
        loadComponent: () => import('./modules/sign/sign.component').then(l => l.SignComponent)
      },
      {
        path: 'login',
        loadComponent: () => import('./modules/login/login.component').then(l => l.LoginComponent)
      },
    ]
  },
];
