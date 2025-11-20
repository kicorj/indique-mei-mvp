import { Routes } from '@angular/router';

export const PROFISSIONAL_ROUTES: Routes = [
  {
    path: 'perfil',
    loadComponent: () => import('./perfil/perfil.component').then(m => m.PerfilComponent)
  },
  {
    path: 'pedidos',
    loadComponent: () => import('./pedidos/pedidos.component').then(m => m.PedidosComponent)
  },
  {
    path: '',
    redirectTo: 'pedidos',
    pathMatch: 'full'
  }
];
