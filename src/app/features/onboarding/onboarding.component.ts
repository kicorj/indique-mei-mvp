import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface OnboardingSlide {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent {
  currentSlide = signal(0);

  slides: OnboardingSlide[] = [
    {
      title: 'Confiança das Redes',
      description: 'Encontre profissionais indicados por pessoas que você conhece e confia',
      icon: 'group'
    },
    {
      title: 'Segurança de Plataforma',
      description: 'Pagamentos seguros, profissionais verificados e avaliações transparentes',
      icon: 'verified_user'
    },
    {
      title: 'Recompensas',
      description: 'Indique profissionais e ganhe recompensas a cada serviço contratado',
      icon: 'monetization_on'
    }
  ];

  constructor(private router: Router) {}

  nextSlide(): void {
    if (this.currentSlide() < this.slides.length - 1) {
      this.currentSlide.update(val => val + 1);
    }
  }

  prevSlide(): void {
    if (this.currentSlide() > 0) {
      this.currentSlide.update(val => val - 1);
    }
  }

  goToSlide(index: number): void {
    this.currentSlide.set(index);
  }

  skip(): void {
    this.router.navigate(['/auth/login']);
  }

  createAccount(): void {
    this.router.navigate(['/auth/register']);
  }

  login(): void {
    this.router.navigate(['/auth/login']);
  }
}
