import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Indication, IndicationStatus, IndicationReward } from '../models';

@Injectable({
  providedIn: 'root'
})
export class IndicationService {
  private mockIndications: Indication[] = [
    {
      id: 'ind1',
      servicoId: '1',
      indicadorId: 'ind1',
      profissionalId: 'prof1',
      status: IndicationStatus.VISUALIZADA,
      mensagem: 'Conheço a Ana pessoalmente, ela é ótima fotógrafa!',
      recompensaValor: 50.00,
      createdAt: new Date('2024-11-15'),
      updatedAt: new Date('2024-11-16')
    },
    {
      id: 'ind2',
      servicoId: '2',
      indicadorId: 'ind1',
      profissionalId: 'prof2',
      status: IndicationStatus.SELECIONADA,
      mensagem: 'O Lucas fez o buffet do meu aniversário, recomendo muito!',
      recompensaValor: 75.00,
      createdAt: new Date('2024-11-18'),
      updatedAt: new Date('2024-11-19')
    }
  ];

  private mockRewards: IndicationReward[] = [
    {
      id: 'rew1',
      indicacaoId: 'ind1',
      indicadorId: 'ind1',
      valor: 50.00,
      status: 'DISPONIVEL',
      createdAt: new Date('2024-11-16')
    }
  ];

  getIndicationsByService(servicoId: string): Observable<Indication[]> {
    return of(this.mockIndications.filter(i => i.servicoId === servicoId)).pipe(delay(400));
  }

  getIndicationsByIndicador(indicadorId: string): Observable<Indication[]> {
    return of(this.mockIndications.filter(i => i.indicadorId === indicadorId)).pipe(delay(400));
  }

  getIndicationsByProfissional(profissionalId: string): Observable<Indication[]> {
    return of(this.mockIndications.filter(i => i.profissionalId === profissionalId)).pipe(delay(400));
  }

  createIndication(indication: Omit<Indication, 'id' | 'createdAt' | 'updatedAt'>): Observable<Indication> {
    const newIndication: Indication = {
      ...indication,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockIndications.push(newIndication);
    return of(newIndication).pipe(delay(500));
  }

  updateIndicationStatus(id: string, status: IndicationStatus): Observable<Indication> {
    const index = this.mockIndications.findIndex(i => i.id === id);
    if (index !== -1) {
      this.mockIndications[index] = {
        ...this.mockIndications[index],
        status,
        updatedAt: new Date()
      };
      return of(this.mockIndications[index]).pipe(delay(400));
    }
    throw new Error('Indication not found');
  }

  getRewardsByIndicador(indicadorId: string): Observable<IndicationReward[]> {
    return of(this.mockRewards.filter(r => r.indicadorId === indicadorId)).pipe(delay(400));
  }
}
