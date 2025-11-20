export enum UserRole {
  CONTRATANTE = 'CONTRATANTE',
  INDICADOR = 'INDICADOR',
  PROFISSIONAL = 'PROFISSIONAL'
}

export interface User {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  bairro: string;
  role: UserRole;
  foto?: string;
  createdAt: Date;
}

export interface Contratante extends User {
  role: UserRole.CONTRATANTE;
  historicoPedidos: string[]; // IDs dos pedidos
}

export interface Indicador extends User {
  role: UserRole.INDICADOR;
  totalIndicacoes: number;
  indicacoesAceitas: number;
  indicacoesConcluidas: number;
  saldoDisponivel: number;
  saldoAntecipar: number;
}

export interface Profissional extends User {
  role: UserRole.PROFISSIONAL;
  categoria: string;
  bio?: string;
  precoBase?: number;
  servicosRealizados: number;
  avaliacaoMedia: number;
  portfolio: PortfolioItem[];
  verificadoMEI: boolean;
  cidadesAtendidas: string[];
}

export interface PortfolioItem {
  id: string;
  imageUrl: string;
  descricao?: string;
}
