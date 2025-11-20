import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ServiceCategory } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private mockCategories: ServiceCategory[] = [
    {
      id: '1',
      nome: 'Fotografia',
      icone: 'camera_alt',
      descricao: 'Fotógrafos profissionais para eventos e ensaios'
    },
    {
      id: '2',
      nome: 'Motorista',
      icone: 'directions_car',
      descricao: 'Motoristas particulares e transporte'
    },
    {
      id: '3',
      nome: 'Buffet e Catering',
      icone: 'restaurant',
      descricao: 'Serviços de alimentação para eventos'
    },
    {
      id: '4',
      nome: 'Pintura',
      icone: 'format_paint',
      descricao: 'Pintores residenciais e comerciais'
    },
    {
      id: '5',
      nome: 'Eletricista',
      icone: 'electrical_services',
      descricao: 'Serviços elétricos e instalações'
    },
    {
      id: '6',
      nome: 'Encanador',
      icone: 'plumbing',
      descricao: 'Serviços hidráulicos'
    },
    {
      id: '7',
      nome: 'Jardinagem',
      icone: 'yard',
      descricao: 'Cuidados com jardins e áreas verdes'
    },
    {
      id: '8',
      nome: 'Limpeza',
      icone: 'cleaning_services',
      descricao: 'Serviços de limpeza residencial e comercial'
    },
    {
      id: '9',
      nome: 'Marcenaria',
      icone: 'handyman',
      descricao: 'Móveis planejados e serviços de marcenaria'
    },
    {
      id: '10',
      nome: 'Informática',
      icone: 'computer',
      descricao: 'Manutenção e suporte técnico'
    }
  ];

  getCategories(): Observable<ServiceCategory[]> {
    return of(this.mockCategories);
  }

  getCategoryById(id: string): Observable<ServiceCategory | undefined> {
    return of(this.mockCategories.find(cat => cat.id === id));
  }
}
