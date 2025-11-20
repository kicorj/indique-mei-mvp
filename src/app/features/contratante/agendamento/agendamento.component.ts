import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { UserService } from '../../../core/services';
import { Profissional } from '../../../core/models';

@Component({
  selector: 'app-agendamento',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule
  ],
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss']
})
export class AgendamentoComponent implements OnInit {
  agendamentoForm: FormGroup;
  profissional = signal<Profissional | null>(null);
  minDate = new Date();

  horariosDisponiveis = [
    '08:00', '09:00', '10:00', '11:00',
    '14:00', '15:00', '16:00', '17:00'
  ];

  selectedTime = signal<string>('');

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private userService: UserService
  ) {
    this.agendamentoForm = this.fb.group({
      data: ['', Validators.required],
      endereco: ['', Validators.required],
      observacoes: ['']
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

  selectTime(time: string): void {
    this.selectedTime.set(time);
  }

  confirmarAgendamento(): void {
    if (this.agendamentoForm.valid && this.selectedTime()) {
      const prof = this.profissional();
      if (prof) {
        // Navega para pagamento
        this.router.navigate(['/contratante/pagamento', prof.id], {
          queryParams: {
            data: this.agendamentoForm.value.data.toISOString(),
            horario: this.selectedTime(),
            endereco: this.agendamentoForm.value.endereco
          }
        });
      }
    }
  }
}
