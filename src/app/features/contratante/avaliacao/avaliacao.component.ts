import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../../core/services';
import { Profissional } from '../../../core/models';

@Component({
  selector: 'app-avaliacao',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ],
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.scss']
})
export class AvaliacaoComponent implements OnInit {
  profissional = signal<Profissional | null>(null);
  avaliacaoForm: FormGroup;
  rating = signal(0);
  gorjeta = signal<number | null>(null);

  gorjetaSuggestions = [5, 10, 15, 20];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.avaliacaoForm = this.fb.group({
      comentario: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  ngOnInit(): void {
    const profId = this.route.snapshot.paramMap.get('id');
    if (profId) {
      this.loadProfissional(profId);
    }
  }

  loadProfissional(id: string): void {
    this.userService.getProfissionalById(id).subscribe({
      next: (prof) => {
        if (prof) {
          this.profissional.set(prof);
        }
      }
    });
  }

  setRating(star: number): void {
    this.rating.set(star);
  }

  selectGorjeta(value: number): void {
    this.gorjeta.set(value);
  }

  enviarAvaliacao(): void {
    if (this.avaliacaoForm.valid && this.rating() > 0) {
      const prof = this.profissional();
      if (!prof) return;

      // Mock: salva avaliação
      this.snackBar.open('Avaliação enviada com sucesso!', 'OK', { duration: 3000 });

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1000);
    } else {
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios', 'OK', {
        duration: 3000
      });
    }
  }

  compartilharExperiencia(): void {
    const prof = this.profissional();
    if (prof && navigator.share) {
      navigator.share({
        title: `Avaliei ${prof.nome}`,
        text: `Acabei de contratar ${prof.nome} pelo Indique MEI e recomendo!`,
        url: window.location.origin
      });
    }
  }
}
