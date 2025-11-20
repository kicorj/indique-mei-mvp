import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/onboarding',
    pathMatch: 'full'
  },
  {
    path: 'onboarding',
    loadComponent: () => import('./features/onboarding/onboarding.component').then(m => m.OnboardingComponent)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'contratante',
    loadChildren: () => import('./features/contratante/contratante.routes').then(m => m.CONTRATANTE_ROUTES)
  },
  {
    path: 'indicador',
    loadChildren: () => import('./features/indicador/indicador.routes').then(m => m.INDICADOR_ROUTES)
  },
  {
    path: 'profissional',
    loadChildren: () => import('./features/profissional/profissional.routes').then(m => m.PROFISSIONAL_ROUTES)
  },
  {
    path: '**',
    redirectTo: '/onboarding'
  }
];
