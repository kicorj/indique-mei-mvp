import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-indicacoes',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div class="placeholder-container">
      <mat-card class="placeholder-card">
        <mat-icon class="placeholder-icon">construction</mat-icon>
        <h2>Indicações Recebidas</h2>
        <p>Esta funcionalidade está em desenvolvimento.</p>
        <p class="feature-description">
          Aqui você verá todos os profissionais que foram indicados
          por sua rede de confiança para os serviços que você publicou.
        </p>
      </mat-card>
    </div>
  `,
  styles: [`
    .placeholder-container {
      padding: var(--spacing-lg);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh;
    }
    .placeholder-card {
      max-width: 500px;
      text-align: center;
      padding: var(--spacing-xl);
    }
    .placeholder-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: var(--primary-blue);
      margin-bottom: var(--spacing-md);
    }
    h2 {
      color: var(--text-primary);
      margin-bottom: var(--spacing-md);
    }
    p {
      color: var(--text-secondary);
      line-height: 1.6;
    }
    .feature-description {
      margin-top: var(--spacing-md);
      font-size: 0.9rem;
    }
  `]
})
export class IndicacoesComponent {}
