import { Routes } from '@angular/router';

export const full: Routes = [
  {
    path: 'error-page',
    loadChildren: () => import('../../pages/error/error.module').then(m => m.ErrorModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('../../auth/auth.module').then(m => m.AuthModule),
  },

];
