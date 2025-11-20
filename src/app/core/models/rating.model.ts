export interface Rating {
  id: string;
  servicoId: string;
  profissionalId: string;
  contratanteId: string;
  nota: number; // 1-5
  comentario: string;
  gorjeta?: number;
  createdAt: Date;
}
