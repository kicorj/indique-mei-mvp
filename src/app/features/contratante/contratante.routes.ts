import { Routes } from '@angular/router';

export const CONTRATANTE_ROUTES: Routes = [
  {
    path: 'publicar',
    loadComponent: () => import('./publicar-necessidade/publicar-necessidade.component').then(m => m.PublicarNecessidadeComponent)
  },
  {
    path: 'indicacoes',
    loadComponent: () => import('./indicacoes/indicacoes.component').then(m => m.IndicacoesComponent)
  },
  {
    path: '',
    redirectTo: 'publicar',
    pathMatch: 'full'
  }
];
