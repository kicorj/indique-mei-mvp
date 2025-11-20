import { Component, OnInit, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { UserService, AuthService } from '../../../core/services';
import { Profissional } from '../../../core/models';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isMe: boolean;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  profissional = signal<Profissional | null>(null);
  messages = signal<Message[]>([]);
  newMessage = '';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const profId = this.route.snapshot.paramMap.get('id');
    if (profId) {
      this.loadProfissional(profId);
      this.loadMockMessages();
    }
  }

  loadProfissional(id: string): void {
    this.userService.getProfissionalById(id).subscribe({
      next: (prof) => {
        if (prof) {
          this.profissional.set(prof);
        }
      },
      error: (err) => console.error('Erro ao carregar profissional', err)
    });
  }

  loadMockMessages(): void {
    // Mock: mensagens iniciais
    const mockMessages: Message[] = [
      {
        id: '1',
        senderId: 'prof1',
        text: 'Olá! Vi que você precisa de um profissional para o serviço. Podemos conversar melhor sobre os detalhes?',
        timestamp: new Date(Date.now() - 3600000),
        isMe: false
      }
    ];
    this.messages.set(mockMessages);
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) return;

    const user = this.authService.getCurrentUser();
    if (!user) return;

    const message: Message = {
      id: Math.random().toString(36),
      senderId: user.id,
      text: this.newMessage,
      timestamp: new Date(),
      isMe: true
    };

    this.messages.update(msgs => [...msgs, message]);
    this.newMessage = '';

    // Mock: resposta automática
    setTimeout(() => {
      this.mockProfissionalResponse();
    }, 2000);

    setTimeout(() => this.scrollToBottom(), 100);
  }

  mockProfissionalResponse(): void {
    const responses = [
      'Perfeito! Posso fazer esse serviço para você.',
      'Que bom! Vamos agendar então?',
      'Sim, tenho disponibilidade. Quando você prefere?',
      'Entendo. Vou preparar uma proposta para você.'
    ];

    const response: Message = {
      id: Math.random().toString(36),
      senderId: 'prof1',
      text: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date(),
      isMe: false
    };

    this.messages.update(msgs => [...msgs, response]);
    setTimeout(() => this.scrollToBottom(), 100);
  }

  enviarProposta(): void {
    const prof = this.profissional();
    if (prof) {
      // Mock: profissional envia proposta
      const proposta: Message = {
        id: Math.random().toString(36),
        senderId: prof.id,
        text: `📋 *Proposta de Serviço*\n\nValor: R$ ${prof.precoBase?.toLocaleString('pt-BR')}\nPrazo: 1 semana\n\nO que acha? Podemos agendar!`,
        timestamp: new Date(),
        isMe: false
      };

      this.messages.update(msgs => [...msgs, proposta]);
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  aceitarProposta(): void {
    const prof = this.profissional();
    if (prof) {
      this.router.navigate(['/contratante/agendamento', prof.id]);
    }
  }

  formatTime(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  }

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      const element = this.messagesContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }
}
