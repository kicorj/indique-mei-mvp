# Indique MEI - MVP

![Indique MEI Logo](docs/logo.png)

**Conectando Confiança** - Plataforma de indicação de profissionais MEI baseada em confiança da rede social.

## 📋 Sobre o Projeto

O **Indique MEI** é uma plataforma marketplace que conecta três personas:
- **Contratantes**: quem precisa de serviços
- **Profissionais MEI**: prestadores autônomos
- **Indicadores**: quem indica profissionais e recebe recompensas

### 🎯 Diferencial

Sistema baseado em **confiança através da rede social**, onde indicações geram credibilidade e indicadores são remunerados por cada serviço contratado.

## 🚀 Tecnologias

- **Framework**: Angular 17+ (Standalone Components)
- **UI Library**: Angular Material
- **Linguagem**: TypeScript
- **Estilo**: SCSS com tema customizado
- **Backend**: Dados mockados (preparado para Firebase)

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ e npm
- Angular CLI 17+

### Passos

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm start

# Compilar para produção
npm run build
```

A aplicação estará disponível em `http://localhost:4200`

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── core/
│   │   ├── models/          # Interfaces e tipos
│   │   └── services/        # Serviços (mock)
│   ├── features/
│   │   ├── onboarding/      # IM-01: Carrossel
│   │   ├── auth/            # IM-02, IM-03: Login, Registro, Escolha de Perfil
│   │   ├── home/            # IM-04: Home Contextual
│   │   ├── contratante/     # IM-05 a IM-11
│   │   ├── indicador/       # IM-12 a IM-15
│   │   └── profissional/    # IM-16 a IM-18
│   ├── shared/              # Componentes compartilhados
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── assets/                  # Imagens e recursos
├── styles.scss              # Estilos globais
└── index.html
```

## 📱 Funcionalidades Implementadas (MVP Base)

### ✅ Telas de Onboarding

- [x] IM-01: Carrossel de apresentação
- [x] IM-02: Login e Cadastro
- [x] IM-03: Escolha de Perfil
- [x] IM-04: Home Contextual

### 🚧 Em Desenvolvimento

- [ ] IM-05: Publicar Necessidade (Contratante)
- [ ] IM-06: Indicações Recebidas
- [ ] IM-07: Perfil do Profissional
- [ ] IM-08: Chat/Negociação
- [ ] IM-09: Agendamento
- [ ] IM-10: Pagamento
- [ ] IM-11: Avaliação
- [ ] IM-12: Feed de Pedidos (Indicador)
- [ ] IM-13: Indicar Contato
- [ ] IM-14: Acompanhar Status
- [ ] IM-15: Carteira/Recompensas
- [ ] IM-16: Perfil Profissional (Edição)
- [ ] IM-17: Caixa de Entrada
- [ ] IM-18: Proposta
- [ ] IM-19: Notificações
- [ ] IM-20: Convites
- [ ] IM-21: Configurações/KYC
- [ ] IM-22: Ajuda/FAQ

## 🎨 Design System

### Cores da Marca

- **Azul Principal**: `#2196f3`
- **Verde Principal**: `#8bc34a`
- **Gradiente**: `linear-gradient(135deg, #2196f3 0%, #8bc34a 100%)`

### Componentes Customizados

- Cards com elevação
- Botões com gradiente
- Tema responsivo mobile-first

## 📊 Dados Mock

Todos os dados estão mockados em serviços locais:

- `AuthService`: Autenticação
- `UserService`: Usuários e Profissionais
- `ServiceRequestService`: Pedidos de Serviço
- `IndicationService`: Indicações
- `CategoryService`: Categorias

## 🔐 Autenticação

Sistema de autenticação mockado com armazenamento local. Preparado para migração futura para Firebase Authentication.

## 📱 Responsividade

- **Mobile First**: Design otimizado para dispositivos móveis (375px+)
- **Tablet**: 768px - 1024px
- **Desktop**: 1280px+

## 🚀 Próximos Passos

1. Implementar fluxos completos (Contratante, Indicador, Profissional)
2. Integrar com Firebase (Firestore + Authentication + Storage)
3. Implementar sistema de pagamento (PIX/Cartão)
4. Adicionar sistema de chat em tempo real
5. Implementar notificações push
6. Testes unitários e E2E

## 📄 Licença

Este projeto é proprietário da **Indique MEI**.

## 👥 Time

Desenvolvido com ❤️ para conectar profissionais e clientes com confiança.

---

**Versão**: 1.0.0-alpha
**Última atualização**: Novembro 2024
