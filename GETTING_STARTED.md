# Começando com a Plataforma Cuida 🚀

Bem-vindo! Este guia irá te ajudar a entender e começar a trabalhar na Plataforma Cuida.

## 🎯 O Que é a Plataforma Cuida?

A Cuida é uma plataforma que conecta **profissionais de saúde** com **pessoas que precisam de cuidados domiciliares**.

### Profissionais Suportados
- 👨‍⚕️ Cuidadores
- 🏥 Enfermeiros
- 💆 Fisioterapeutas
- 🧘 Terapeutas
- 💊 E outros profissionais de saúde

### Público-Alvo
- 👴 Idosos
- 🛏️ Pacientes acamados
- 🤕 Pessoas em recuperação
- 🏠 Qualquer pessoa que precise de cuidados em casa

## 🔑 Funcionalidades Principais

1. **🔍 Busca por Localização**: Encontre profissionais próximos a você
2. **⭐ Sistema de Avaliações**: Veja o que outros dizem sobre os profissionais
3. **📅 Agendamento Online**: Reserve serviços facilmente
4. **💬 Comunicação Direta**: Chat entre pacientes e profissionais
5. **💳 Pagamento Integrado**: Sistema de pagamento seguro

## 🏗️ Arquitetura em 3 Camadas

```
┌─────────────────────────────────────┐
│         FRONTEND (Futuro)           │
│   • Interface Web (Edge.js/Inertia) │
│   • Busca de Profissionais          │
│   • Sistema de Agendamento          │
│   • Perfis e Avaliações             │
└─────────────┬───────────────────────┘
              │ HTTP/REST API
┌─────────────▼───────────────────────┐
│         BACKEND (AdonisJS)          │
│   • Autenticação e Autorização      │
│   • Lógica de Negócio               │
│   • Geolocalização e Busca          │
│   • Sistema de Agendamentos         │
│   • Processamento de Pagamentos     │
└─────────────┬───────────────────────┘
              │ Lucid ORM
┌─────────────▼───────────────────────┐
│      BANCO DE DADOS (PostgreSQL)    │
│   • Users, Professionals, Patients  │
│   • Bookings, Reviews               │
│   • Dados Geográficos               │
└─────────────────────────────────────┘
```

## 📊 Fluxo de Uso da Plataforma

### Para Pacientes:

```
1. Cadastro
   ↓
2. Busca de Profissionais
   (por localização, especialidade, preço)
   ↓
3. Visualiza Perfis e Avaliações
   ↓
4. Agenda Serviço
   ↓
5. Realiza Pagamento
   ↓
6. Recebe Atendimento
   ↓
7. Avalia o Profissional
```

### Para Profissionais:

```
1. Cadastro + Verificação
   ↓
2. Completa Perfil
   (especialidade, preços, disponibilidade)
   ↓
3. Define Localização de Atendimento
   ↓
4. Recebe Solicitações de Agendamento
   ↓
5. Confirma/Recusa Agendamentos
   ↓
6. Realiza Atendimento
   ↓
7. Recebe Pagamento
```

## 🗂️ Modelos de Dados

### 1. User (Usuário Base)
```typescript
{
  id: number
  fullName: string
  email: string
  password: string (hashed)
  userType: 'professional' | 'patient'
  phoneNumber: string
  isActive: boolean
}
```

### 2. Professional (Profissional)
```typescript
{
  id: number
  userId: number
  specialty: string          // Ex: "Fisioterapeuta"
  registrationNumber: string // Ex: "CREFITO-12345"
  bio: string
  hourlyRate: number         // Preço por hora
  experienceYears: number
  latitude/longitude: number // Localização
  averageRating: number      // Média das avaliações
  totalReviews: number
}
```

### 3. Patient (Paciente)
```typescript
{
  id: number
  userId: number
  dateOfBirth: date
  address: string
  latitude/longitude: number
  emergencyContactName: string
  emergencyContactPhone: string
  medicalConditions: string
}
```

### 4. Booking (Agendamento)
```typescript
{
  id: number
  professionalId: number
  patientId: number
  scheduledDate: datetime
  durationHours: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  totalPrice: number
}
```

### 5. Review (Avaliação)
```typescript
{
  id: number
  professionalId: number
  patientId: number
  bookingId: number
  rating: number            // 1 a 5
  comment: string
  wouldRecommend: boolean
}
```

## 🛠️ Setup Rápido (3 Métodos)

### Método 1: Setup Local (Recomendado para Desenvolvimento)

```bash
# 1. Clone o repositório
git clone https://github.com/Rafaelraas/Cuida.git
cd Cuida

# 2. Instale as dependências
npm install

# 3. Configure o ambiente
cp .env.example .env
# Edite o .env com suas configurações

# 4. Crie o banco de dados
createdb cuida

# 5. Execute as migrações
node ace migration:run

# 6. (Opcional) Popule com dados de exemplo
node ace db:seed

# 7. Inicie o servidor
npm run dev
```

✅ Acesse: http://localhost:3333

### Método 2: Docker (Mais Rápido)

```bash
# 1. Clone e configure
git clone https://github.com/Rafaelraas/Cuida.git
cd Cuida
cp .env.example .env

# 2. Inicie os containers
docker-compose up -d

# 3. Execute as migrações
docker-compose exec app node ace migration:run

# 4. (Opcional) Dados de exemplo
docker-compose exec app node ace db:seed
```

✅ Acesse: http://localhost

### Método 3: Apenas Visualizar

```bash
# Clone e explore o código
git clone https://github.com/Rafaelraas/Cuida.git
cd Cuida

# Leia a documentação
ls *.md
```

## 📖 Documentação Completa

Temos 9 arquivos de documentação cobrindo todos os aspectos:

| Arquivo | Descrição | Quando Usar |
|---------|-----------|-------------|
| **README.md** | Visão geral do projeto | Primeiro arquivo a ler |
| **QUICKSTART.md** | Guia de 5 minutos | Quando quiser começar rápido |
| **SETUP.md** | Instalação detalhada | Problemas no setup |
| **PROJECT_SUMMARY.md** | Resumo completo | Entender o estado atual |
| **SPRINTS.md** | Roadmap de 10 sprints | Planejar desenvolvimento |
| **ARCHITECTURE.md** | Arquitetura técnica | Entender a estrutura |
| **API.md** | Documentação da API | Implementar endpoints |
| **CONTRIBUTING.md** | Como contribuir | Antes de contribuir |
| **CHANGELOG.md** | Histórico de versões | Ver o que mudou |

## 🎯 Roadmap de Desenvolvimento

### ✅ Sprint 0: Setup (COMPLETO)
- Configuração do projeto
- Modelos e migrações
- Documentação

### 🔄 Sprint 1: Autenticação (PRÓXIMO)
- Sistema de login/registro
- Middleware de autenticação
- Testes

### 📅 Sprint 2: Perfis
- CRUD de profissionais
- CRUD de pacientes
- Validações

### 📅 Sprint 3: Busca e Geolocalização
- Busca por proximidade
- Filtros avançados
- Integração com mapas

### 📅 Sprint 4: Agendamentos
- Sistema de booking
- Gerenciamento de disponibilidade
- Notificações

### 📅 Sprint 5: Avaliações
- Sistema de reviews
- Cálculo de médias
- Moderação

### 📅 Sprint 6-10: Frontend, Mapas, Mensagens, Pagamentos, Deploy

Veja [SPRINTS.md](SPRINTS.md) para detalhes completos.

## 🤝 Como Contribuir

1. **Fork** o repositório
2. **Crie uma branch**: `git checkout -b feature/minha-feature`
3. **Commit**: `git commit -m 'feat: adiciona nova feature'`
4. **Push**: `git push origin feature/minha-feature`
5. **Abra um Pull Request**

Veja [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes.

## 🧪 Testando o Projeto

### Health Check
```bash
curl http://localhost:3333/health
```

### Endpoint Principal
```bash
curl http://localhost:3333/
```

### Com Postman/Insomnia
Importe a collection da API (a ser criada no Sprint 1)

## 💡 Próximos Passos

### Se você é um Desenvolvedor:
1. ✅ Leia este guia
2. 📖 Leia o [ARCHITECTURE.md](ARCHITECTURE.md)
3. 🛠️ Configure o ambiente local
4. 📋 Escolha uma issue para trabalhar
5. 💻 Comece a codificar!

### Se você é um Product Owner:
1. 📖 Leia o [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
2. 📋 Revise o [SPRINTS.md](SPRINTS.md)
3. 🎯 Priorize as features
4. 📊 Acompanhe o progresso

### Se você é um Designer:
1. 📖 Leia o [README.md](README.md)
2. 🎨 Entenda os user flows acima
3. 🖼️ Crie wireframes/mockups
4. 🎨 Defina o design system

## ❓ Perguntas Frequentes

### P: Preciso instalar PostgreSQL?
**R:** Sim, para desenvolvimento local. Ou use Docker que já inclui PostgreSQL.

### P: Posso usar outro banco de dados?
**R:** O projeto está configurado para PostgreSQL, mas AdonisJS suporta MySQL, SQLite, etc.

### P: Já posso usar em produção?
**R:** Não. O projeto está na fase de setup. Sprint 1-10 precisam ser completados.

### P: Como posso ajudar?
**R:** Veja as [Issues](https://github.com/Rafaelraas/Cuida/issues) no GitHub e escolha uma para trabalhar.

## 📞 Suporte

- **Issues**: https://github.com/Rafaelraas/Cuida/issues
- **Discussões**: https://github.com/Rafaelraas/Cuida/discussions
- **Email**: (configurar email apropriado)

## 🎉 Pronto para Começar!

Agora você tem tudo que precisa para começar a trabalhar na Plataforma Cuida!

```bash
# Comando mágico para começar:
git clone https://github.com/Rafaelraas/Cuida.git && \
cd Cuida && \
npm install && \
echo "🎉 Pronto! Leia o SETUP.md para os próximos passos"
```

**Boa sorte e bom desenvolvimento! 🚀**

---

**Feito com ❤️ para melhorar o acesso a cuidados de saúde domiciliares no Brasil**
