import { Routes } from '@angular/router';

export const INDICADOR_ROUTES: Routes = [
  {
    path: 'feed',
    loadComponent: () => import('./feed-pedidos/feed-pedidos.component').then(m => m.FeedPedidosComponent)
  },
  {
    path: 'indicar',
    loadComponent: () => import('./indicar-contato/indicar-contato.component').then(m => m.IndicarContatoComponent)
  },
  {
    path: 'carteira',
    loadComponent: () => import('./carteira/carteira.component').then(m => m.CarteiraComponent)
  },
  {
    path: '',
    redirectTo: 'feed',
    pathMatch: 'full'
  }
];
