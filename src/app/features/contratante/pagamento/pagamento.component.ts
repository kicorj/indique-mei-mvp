import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../../core/services';
import { Profissional } from '../../../core/models';

@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit {
  profissional = signal<Profissional | null>(null);
  paymentForm: FormGroup;
  paymentMethod = signal<'pix' | 'cartao'>('pix');
  processing = signal(false);
  pixCode = signal('');

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.paymentForm = this.fb.group({
      cardNumber: [''],
      cardName: [''],
      cardExpiry: [''],
      cardCvv: ['']
    });
  }

  ngOnInit(): void {
    const profId = this.route.snapshot.paramMap.get('id');
    if (profId) {
      this.loadProfissional(profId);
    }
    this.generatePixCode();
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

  generatePixCode(): void {
    // Mock: gera código PIX falso
    this.pixCode.set('00020126580014br.gov.bcb.pix0136' + Math.random().toString(36).substring(2, 15));
  }

  copyPixCode(): void {
    navigator.clipboard.writeText(this.pixCode());
    this.snackBar.open('Código PIX copiado!', 'OK', { duration: 2000 });
  }

  processPayment(): void {
    this.processing.set(true);

    // Mock: simula processamento de pagamento
    setTimeout(() => {
      this.processing.set(false);
      const prof = this.profissional();
      if (prof) {
        this.snackBar.open('Pagamento realizado com sucesso!', 'OK', { duration: 3000 });
        this.router.navigate(['/contratante/avaliacao', prof.id]);
      }
    }, 2000);
  }
}
