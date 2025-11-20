import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { User, Profissional, Indicador, UserRole } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private mockProfissionais: Profissional[] = [
    {
      id: 'prof1',
      nome: 'Ana Costa',
      email: 'ana@example.com',
      telefone: '(11) 98765-4321',
      cidade: 'São Paulo',
      bairro: 'Vila Mariana',
      role: UserRole.PROFISSIONAL,
      categoria: 'Fotografia',
      bio: 'Fotógrafa profissional há 8 anos, especializada em eventos e casamentos.',
      precoBase: 2000,
      servicosRealizados: 152,
      avaliacaoMedia: 4.8,
      portfolio: [
        { id: '1', imageUrl: 'https://via.placeholder.com/400x300', descricao: 'Casamento - Vila Mariana' },
        { id: '2', imageUrl: 'https://via.placeholder.com/400x300', descricao: 'Ensaio Fotográfico' }
      ],
      verificadoMEI: true,
      cidadesAtendidas: ['São Paulo'],
      createdAt: new Date('2023-01-15')
    },
    {
      id: 'prof2',
      nome: 'Lucas Almeida',
      email: 'lucas@example.com',
      telefone: '(11) 97654-3210',
      cidade: 'São Paulo',
      bairro: 'Pinheiros',
      role: UserRole.PROFISSIONAL,
      categoria: 'Buffet e Catering',
      bio: 'Chef e proprietário de buffet especializado em eventos corporativos e sociais.',
      precoBase: 3500,
      servicosRealizados: 89,
      avaliacaoMedia: 4.9,
      portfolio: [
        { id: '3', imageUrl: 'https://via.placeholder.com/400x300', descricao: 'Buffet Casamento' }
      ],
      verificadoMEI: true,
      cidadesAtendidas: ['São Paulo'],
      createdAt: new Date('2023-03-20')
    },
    {
      id: 'prof3',
      nome: 'Marcos Silva',
      email: 'marcos@example.com',
      telefone: '(11) 96543-2109',
      cidade: 'São Paulo',
      bairro: 'Mooca',
      role: UserRole.PROFISSIONAL,
      categoria: 'Pintura',
      bio: 'Pintor profissional com mais de 10 anos de experiência em pintura residencial e comercial.',
      precoBase: 1500,
      servicosRealizados: 234,
      avaliacaoMedia: 4.7,
      portfolio: [
        { id: '4', imageUrl: 'https://via.placeholder.com/400x300', descricao: 'Pintura Residencial' }
      ],
      verificadoMEI: true,
      cidadesAtendidas: ['São Paulo'],
      createdAt: new Date('2022-11-10')
    }
  ];

  private mockIndicadores: Indicador[] = [
    {
      id: 'ind1',
      nome: 'Maria Santos',
      email: 'maria@example.com',
      telefone: '(11) 95432-1098',
      cidade: 'São Paulo',
      bairro: 'Butantã',
      role: UserRole.INDICADOR,
      totalIndicacoes: 45,
      indicacoesAceitas: 32,
      indicacoesConcluidas: 28,
      saldoDisponivel: 750.00,
      saldoAntecipar: 1200.00,
      createdAt: new Date('2023-06-01')
    }
  ];

  getProfissionaisByCategory(categoria: string): Observable<Profissional[]> {
    return of(this.mockProfissionais.filter(p => p.categoria === categoria)).pipe(delay(400));
  }

  getProfissionaisByLocation(cidade: string, bairro?: string): Observable<Profissional[]> {
    let filtered = this.mockProfissionais.filter(p => p.cidade === cidade);
    if (bairro) {
      filtered = filtered.filter(p => p.bairro === bairro);
    }
    return of(filtered).pipe(delay(400));
  }

  getProfissionalById(id: string): Observable<Profissional | undefined> {
    return of(this.mockProfissionais.find(p => p.id === id)).pipe(delay(300));
  }

  searchProfissionais(filters: {
    categoria?: string;
    cidade?: string;
    bairro?: string;
    avaliacaoMinima?: number;
  }): Observable<Profissional[]> {
    let filtered = this.mockProfissionais;

    if (filters.categoria) {
      filtered = filtered.filter(p => p.categoria === filters.categoria);
    }
    if (filters.cidade) {
      filtered = filtered.filter(p => p.cidade === filters.cidade);
    }
    if (filters.bairro) {
      filtered = filtered.filter(p => p.bairro === filters.bairro);
    }
    if (filters.avaliacaoMinima !== undefined) {
      const minRating = filters.avaliacaoMinima;
      filtered = filtered.filter(p => p.avaliacaoMedia >= minRating);
    }

    return of(filtered).pipe(delay(500));
  }

  getIndicadorById(id: string): Observable<Indicador | undefined> {
    return of(this.mockIndicadores.find(i => i.id === id)).pipe(delay(300));
  }
}
