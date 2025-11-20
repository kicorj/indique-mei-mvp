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
    path: 'perfil/:id',
    loadComponent: () => import('./perfil-profissional/perfil-profissional.component').then(m => m.PerfilProfissionalComponent)
  },
  {
    path: 'chat/:id',
    loadComponent: () => import('./chat/chat.component').then(m => m.ChatComponent)
  },
  {
    path: 'agendamento/:id',
    loadComponent: () => import('./agendamento/agendamento.component').then(m => m.AgendamentoComponent)
  },
  {
    path: 'pagamento/:id',
    loadComponent: () => import('./pagamento/pagamento.component').then(m => m.PagamentoComponent)
  },
  {
    path: 'avaliacao/:id',
    loadComponent: () => import('./avaliacao/avaliacao.component').then(m => m.AvaliacaoComponent)
  },
  {
    path: '',
    redirectTo: 'publicar',
    pathMatch: 'full'
  }
];
