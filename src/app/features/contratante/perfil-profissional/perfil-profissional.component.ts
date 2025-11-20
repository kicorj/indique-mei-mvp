import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserService } from '../../../core/services';
import { Profissional, Rating } from '../../../core/models';

@Component({
  selector: 'app-perfil-profissional',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatTabsModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './perfil-profissional.component.html',
  styleUrls: ['./perfil-profissional.component.scss']
})
export class PerfilProfissionalComponent implements OnInit {
  Math = Math;
  profissional = signal<Profissional | null>(null);
  loading = signal(true);
  isFavorito = signal(false);

  // Mock de avaliações
  avaliacoes = signal<Rating[]>([
    {
      id: '1',
      servicoId: 's1',
      profissionalId: 'prof1',
      contratanteId: 'c1',
      nota: 5,
      comentario: 'Excelente profissional! Muito atencioso e trabalho impecável. Super recomendo!',
      createdAt: new Date('2024-11-10')
    },
    {
      id: '2',
      servicoId: 's2',
      profissionalId: 'prof1',
      contratanteId: 'c2',
      nota: 5,
      comentario: 'Trabalho perfeito, pontual e profissional. Já contratei novamente!',
      createdAt: new Date('2024-11-05')
    },
    {
      id: '3',
      servicoId: 's3',
      profissionalId: 'prof1',
      contratanteId: 'c3',
      nota: 4,
      comentario: 'Muito bom! Pequenos detalhes a melhorar mas no geral ótimo serviço.',
      createdAt: new Date('2024-10-28')
    }
  ]);

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const profId = this.route.snapshot.paramMap.get('id');
    if (profId) {
      this.loadProfissional(profId);
    }
  }

  loadProfissional(id: string): void {
    this.loading.set(true);

    this.userService.getProfissionalById(id).subscribe({
      next: (prof) => {
        if (prof) {
          this.profissional.set(prof);
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar profissional', err);
        this.loading.set(false);
      }
    });
  }

  getStarArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < Math.round(rating) ? 1 : 0);
  }

  toggleFavorito(): void {
    this.isFavorito.update(val => !val);
  }

  iniciarChat(): void {
    const prof = this.profissional();
    if (prof) {
      this.router.navigate(['/contratante/chat', prof.id]);
    }
  }

  agendarDireto(): void {
    const prof = this.profissional();
    if (prof) {
      this.router.navigate(['/contratante/agendamento', prof.id]);
    }
  }

  compartilhar(): void {
    // Mock: compartilhar perfil
    const prof = this.profissional();
    if (prof && navigator.share) {
      navigator.share({
        title: `${prof.nome} - ${prof.categoria}`,
        text: `Confira o perfil de ${prof.nome} no Indique MEI`,
        url: window.location.href
      }).catch(() => {
        // Fallback: copiar URL
        navigator.clipboard.writeText(window.location.href);
      });
    }
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date(date));
  }
}
