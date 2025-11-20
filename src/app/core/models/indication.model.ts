export enum IndicationStatus {
  ENVIADA = 'ENVIADA',
  VISUALIZADA = 'VISUALIZADA',
  SELECIONADA = 'SELECIONADA',
  CONTRATADA = 'CONTRATADA',
  PAGA = 'PAGA',
  REJEITADA = 'REJEITADA'
}

export interface Indication {
  id: string;
  servicoId: string;
  indicadorId: string;
  profissionalId: string;
  status: IndicationStatus;
  mensagem?: string;
  recompensaValor: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IndicationReward {
  id: string;
  indicacaoId: string;
  indicadorId: string;
  valor: number;
  status: 'PENDENTE' | 'DISPONIVEL' | 'SACADO';
  createdAt: Date;
}
