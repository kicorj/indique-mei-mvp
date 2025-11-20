import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ServiceRequest, ServiceStatus, ServiceUrgency } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {
  private mockServices: ServiceRequest[] = [
    {
      id: '1',
      contratanteId: '1',
      titulo: 'Fotografo para casamento',
      descricao: 'Preciso de um fotógrafo para cobrir meu casamento no dia 15/12. Evento será na Vila Mariana, das 17h às 23h.',
      categoria: 'Fotografia',
      cidade: 'São Paulo',
      bairro: 'Vila Mariana',
      orcamentoEstimado: 2500,
      urgencia: ServiceUrgency.ALTA,
      fotos: [],
      status: ServiceStatus.AGUARDANDO_INDICACOES,
      createdAt: new Date('2024-11-15'),
      updatedAt: new Date('2024-11-15')
    },
    {
      id: '2',
      contratanteId: '2',
      titulo: 'Buffet para festa de aniversário',
      descricao: 'Festa para 50 pessoas, preciso de buffet completo com comida e bebidas.',
      categoria: 'Buffet e Catering',
      cidade: 'São Paulo',
      bairro: 'Pinheiros',
      orcamentoEstimado: 3000,
      urgencia: ServiceUrgency.MEDIA,
      fotos: [],
      status: ServiceStatus.PUBLICADO,
      createdAt: new Date('2024-11-18'),
      updatedAt: new Date('2024-11-18')
    },
    {
      id: '3',
      contratanteId: '3',
      titulo: 'Pintura de apartamento',
      descricao: 'Apartamento de 80m² precisa de pintura completa. Preferência para profissionais com experiência.',
      categoria: 'Pintura',
      cidade: 'São Paulo',
      bairro: 'Mooca',
      orcamentoEstimado: 1800,
      urgencia: ServiceUrgency.BAIXA,
      fotos: [],
      status: ServiceStatus.AGUARDANDO_INDICACOES,
      createdAt: new Date('2024-11-19'),
      updatedAt: new Date('2024-11-19')
    }
  ];

  getServiceRequests(): Observable<ServiceRequest[]> {
    return of(this.mockServices).pipe(delay(500));
  }

  getServiceRequestById(id: string): Observable<ServiceRequest | undefined> {
    return of(this.mockServices.find(s => s.id === id)).pipe(delay(300));
  }

  getServiceRequestsByUser(userId: string): Observable<ServiceRequest[]> {
    return of(this.mockServices.filter(s => s.contratanteId === userId)).pipe(delay(400));
  }

  getServiceRequestsByLocation(cidade: string, bairro?: string): Observable<ServiceRequest[]> {
    let filtered = this.mockServices.filter(s => s.cidade === cidade);
    if (bairro) {
      filtered = filtered.filter(s => s.bairro === bairro);
    }
    return of(filtered).pipe(delay(400));
  }

  createServiceRequest(request: Omit<ServiceRequest, 'id' | 'createdAt' | 'updatedAt'>): Observable<ServiceRequest> {
    const newRequest: ServiceRequest = {
      ...request,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockServices.push(newRequest);
    return of(newRequest).pipe(delay(600));
  }

  updateServiceRequest(id: string, updates: Partial<ServiceRequest>): Observable<ServiceRequest> {
    const index = this.mockServices.findIndex(s => s.id === id);
    if (index !== -1) {
      this.mockServices[index] = {
        ...this.mockServices[index],
        ...updates,
        updatedAt: new Date()
      };
      return of(this.mockServices[index]).pipe(delay(400));
    }
    throw new Error('Service request not found');
  }
}
