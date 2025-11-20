import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../core/services';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = signal(false);
  error = signal('');
  hidePassword = signal(true);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      acceptTerms: [false, [Validators.requiredTrue]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading.set(true);
      this.error.set('');

      const userData = this.registerForm.value;
      delete userData.acceptTerms;

      this.authService.register(userData).subscribe({
        next: (user) => {
          this.authService.setCurrentUser(user);
          this.loading.set(false);
          this.router.navigate(['/auth/choose-profile']);
        },
        error: (err) => {
          this.error.set('Erro ao criar conta. Tente novamente.');
          this.loading.set(false);
        }
      });
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword.update(val => !val);
  }
}
