import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserService, IndicationService } from '../../../core/services';
import { Profissional } from '../../../core/models';

interface ProfissionalComIndicacao extends Profissional {
  indicadoPor?: string;
  distanciaKm?: number;
}

@Component({
  selector: 'app-indicacoes',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatBadgeModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './indicacoes.component.html',
  styleUrls: ['./indicacoes.component.scss']
})
export class IndicacoesComponent implements OnInit {
  profissionais = signal<ProfissionalComIndicacao[]>([]);
  loading = signal(true);
  filtroAvaliacao = signal<number>(0);
  filtroDistancia = signal<string>('todos');
  filtroPreco = signal<string>('todos');

  avaliacaoOptions = [
    { value: 0, label: 'Todas as avaliações' },
    { value: 4, label: '4+ estrelas' },
    { value: 4.5, label: '4.5+ estrelas' }
  ];

  distanciaOptions = [
    { value: 'todos', label: 'Todas as distâncias' },
    { value: '5', label: 'Até 5 km' },
    { value: '10', label: 'Até 10 km' },
    { value: '20', label: 'Até 20 km' }
  ];

  precoOptions = [
    { value: 'todos', label: 'Todos os preços' },
    { value: 'baixo', label: 'Até R$ 1.000' },
    { value: 'medio', label: 'R$ 1.000 - R$ 3.000' },
    { value: 'alto', label: 'Acima de R$ 3.000' }
  ];

  constructor(
    private userService: UserService,
    private indicationService: IndicationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadIndicacoes();
  }

  loadIndicacoes(): void {
    this.loading.set(true);

    // Mock: carrega todos os profissionais como se fossem indicações
    this.userService.searchProfissionais({}).subscribe({
      next: (profissionais) => {
        // Adiciona dados mock de indicação
        const profissionaisComIndicacao: ProfissionalComIndicacao[] = profissionais.map(prof => ({
          ...prof,
          indicadoPor: this.getRandomIndicador(),
          distanciaKm: this.getRandomDistance()
        }));

        this.profissionais.set(profissionaisComIndicacao);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar indicações', err);
        this.loading.set(false);
      }
    });
  }

  get profissionaisFiltrados(): ProfissionalComIndicacao[] {
    let filtered = this.profissionais();

    // Filtro de avaliação
    if (this.filtroAvaliacao() > 0) {
      filtered = filtered.filter(p => p.avaliacaoMedia >= this.filtroAvaliacao());
    }

    // Filtro de distância
    if (this.filtroDistancia() !== 'todos') {
      const maxDist = parseInt(this.filtroDistancia());
      filtered = filtered.filter(p => (p.distanciaKm || 0) <= maxDist);
    }

    // Filtro de preço
    if (this.filtroPreco() !== 'todos') {
      filtered = filtered.filter(p => {
        const preco = p.precoBase || 0;
        switch (this.filtroPreco()) {
          case 'baixo': return preco <= 1000;
          case 'medio': return preco > 1000 && preco <= 3000;
          case 'alto': return preco > 3000;
          default: return true;
        }
      });
    }

    return filtered;
  }

  getStarArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < Math.round(rating) ? 1 : 0);
  }

  verPerfil(profissionalId: string): void {
    this.router.navigate(['/contratante/perfil', profissionalId]);
  }

  iniciarChat(profissionalId: string): void {
    this.router.navigate(['/contratante/chat', profissionalId]);
  }

  favoritar(profissionalId: string): void {
    // Mock: adiciona aos favoritos
    console.log('Profissional favoritado:', profissionalId);
  }

  private getRandomIndicador(): string {
    const indicadores = ['Maria Santos', 'João Silva', 'Ana Costa', 'Pedro Oliveira'];
    return indicadores[Math.floor(Math.random() * indicadores.length)];
  }

  private getRandomDistance(): number {
    return Math.floor(Math.random() * 15) + 1; // 1-15 km
  }
}
