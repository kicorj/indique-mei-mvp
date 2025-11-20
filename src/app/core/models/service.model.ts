export enum ServiceStatus {
  PUBLICADO = 'PUBLICADO',
  AGUARDANDO_INDICACOES = 'AGUARDANDO_INDICACOES',
  EM_NEGOCIACAO = 'EM_NEGOCIACAO',
  AGENDADO = 'AGENDADO',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDO = 'CONCLUIDO',
  CANCELADO = 'CANCELADO'
}

export enum ServiceUrgency {
  BAIXA = 'BAIXA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA'
}

export interface ServiceRequest {
  id: string;
  contratanteId: string;
  titulo: string;
  descricao: string;
  categoria: string;
  cidade: string;
  bairro: string;
  orcamentoEstimado?: number;
  urgencia: ServiceUrgency;
  fotos: string[];
  status: ServiceStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceCategory {
  id: string;
  nome: string;
  icone: string;
  descricao: string;
}
