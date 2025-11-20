import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, delay } from 'rxjs';
import { User, UserRole } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  public isAuthenticated = signal(false);

  constructor(private router: Router) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.currentUserSubject.next(user);
      this.isAuthenticated.set(true);
    }
  }

  login(email: string, senha: string): Observable<User> {
    // Mock login - em produção, isso seria uma chamada HTTP
    const mockUser: User = {
      id: '1',
      nome: 'João Silva',
      email: email,
      telefone: '(11) 99999-9999',
      cidade: 'São Paulo',
      bairro: 'Vila Mariana',
      role: UserRole.CONTRATANTE,
      createdAt: new Date()
    };

    return of(mockUser).pipe(
      delay(800), // Simula latência de rede
    );
  }

  register(userData: Partial<User>): Observable<User> {
    // Mock register
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      nome: userData.nome || '',
      email: userData.email || '',
      telefone: userData.telefone || '',
      cidade: userData.cidade || '',
      bairro: userData.bairro || '',
      role: userData.role || UserRole.CONTRATANTE,
      createdAt: new Date()
    };

    return of(newUser).pipe(delay(800));
  }

  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    this.isAuthenticated.set(true);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.isAuthenticated.set(false);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/onboarding']);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  updateUserRole(role: UserRole): void {
    const user = this.getCurrentUser();
    if (user) {
      user.role = role;
      this.setCurrentUser(user);
    }
  }
}
