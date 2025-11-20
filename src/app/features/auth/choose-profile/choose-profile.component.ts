import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services';
import { UserRole } from '../../../core/models';

interface ProfileOption {
  role: UserRole;
  title: string;
  description: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-choose-profile',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './choose-profile.component.html',
  styleUrls: ['./choose-profile.component.scss']
})
export class ChooseProfileComponent {
  selectedRole = signal<UserRole>(UserRole.CONTRATANTE);

  profileOptions: ProfileOption[] = [
    {
      role: UserRole.CONTRATANTE,
      title: 'Contratante',
      description: 'Preciso contratar profissionais para serviços',
      icon: 'person_search',
      color: '#2196f3'
    },
    {
      role: UserRole.INDICADOR,
      title: 'Indicador',
      description: 'Quero indicar profissionais e ganhar recompensas',
      icon: 'recommend',
      color: '#8bc34a'
    },
    {
      role: UserRole.PROFISSIONAL,
      title: 'Profissional',
      description: 'Sou MEI e quero oferecer meus serviços',
      icon: 'work',
      color: '#ff9800'
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  selectRole(role: UserRole): void {
    this.selectedRole.set(role);
  }

  continue(): void {
    this.authService.updateUserRole(this.selectedRole());
    this.router.navigate(['/home']);
  }
}
