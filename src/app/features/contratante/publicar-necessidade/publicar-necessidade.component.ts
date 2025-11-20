import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CategoryService, ServiceRequestService, AuthService } from '../../../core/services';
import { ServiceCategory, ServiceUrgency } from '../../../core/models';

@Component({
  selector: 'app-publicar-necessidade',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './publicar-necessidade.component.html',
  styleUrls: ['./publicar-necessidade.component.scss']
})
export class PublicarNecessidadeComponent implements OnInit {
  serviceForm: FormGroup;
  categories = signal<ServiceCategory[]>([]);
  loading = signal(false);
  selectedPhotos = signal<string[]>([]);

  urgencyOptions = [
    { value: ServiceUrgency.BAIXA, label: 'Não tenho pressa', icon: 'schedule' },
    { value: ServiceUrgency.MEDIA, label: 'Nas próximas semanas', icon: 'event' },
    { value: ServiceUrgency.ALTA, label: 'Urgente', icon: 'priority_high' }
  ];

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private serviceRequestService: ServiceRequestService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const user = this.authService.getCurrentUser();

    this.serviceForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(10)]],
      descricao: ['', [Validators.required, Validators.minLength(50)]],
      categoria: ['', Validators.required],
      cidade: [user?.cidade || '', Validators.required],
      bairro: [user?.bairro || '', Validators.required],
      orcamentoEstimado: [''],
      urgencia: [ServiceUrgency.MEDIA, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => this.categories.set(categories),
      error: (err) => console.error('Erro ao carregar categorias', err)
    });
  }

  onPhotoSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      // Mock: apenas simula upload
      const newPhotos = Array.from(input.files).map(file => URL.createObjectURL(file));
      this.selectedPhotos.update(photos => [...photos, ...newPhotos].slice(0, 5)); // max 5 fotos
    }
  }

  removePhoto(index: number): void {
    this.selectedPhotos.update(photos => photos.filter((_, i) => i !== index));
  }

  saveDraft(): void {
    this.loading.set(true);

    // Mock: salvar rascunho no localStorage
    localStorage.setItem('service_draft', JSON.stringify(this.serviceForm.value));

    setTimeout(() => {
      this.loading.set(false);
      this.snackBar.open('Rascunho salvo com sucesso!', 'OK', { duration: 3000 });
    }, 500);
  }

  publish(): void {
    if (this.serviceForm.invalid) {
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios', 'OK', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.loading.set(true);

    const user = this.authService.getCurrentUser();
    if (!user) {
      this.snackBar.open('Erro: usuário não autenticado', 'OK', { duration: 3000 });
      return;
    }

    const serviceData = {
      ...this.serviceForm.value,
      contratanteId: user.id,
      fotos: this.selectedPhotos(),
      status: 'AGUARDANDO_INDICACOES' as any
    };

    this.serviceRequestService.createServiceRequest(serviceData).subscribe({
      next: (service) => {
        this.loading.set(false);
        localStorage.removeItem('service_draft');
        this.snackBar.open('Serviço publicado com sucesso!', 'OK', { duration: 3000 });
        // Redireciona para ver indicações
        setTimeout(() => {
          this.router.navigate(['/contratante/indicacoes']);
        }, 1000);
      },
      error: (err) => {
        this.loading.set(false);
        this.snackBar.open('Erro ao publicar serviço', 'OK', { duration: 3000 });
      }
    });
  }
}
