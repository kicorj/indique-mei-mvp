import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthService } from '../../core/services';
import { User, UserRole } from '../../core/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatBadgeModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser = signal<User | null>(null);
  UserRole = UserRole;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser.set(this.authService.getCurrentUser());

    if (!this.currentUser()) {
      this.router.navigate(['/onboarding']);
    }
  }

  logout(): void {
    this.authService.logout();
  }

  getRoleName(role: UserRole): string {
    const roleNames = {
      [UserRole.CONTRATANTE]: 'Contratante',
      [UserRole.INDICADOR]: 'Indicador',
      [UserRole.PROFISSIONAL]: 'Profissional'
    };
    return roleNames[role];
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
