# Arquitetura da Plataforma Cuida

## Visão Geral

A Plataforma Cuida é uma aplicação fullstack desenvolvida com AdonisJS que conecta profissionais de saúde com pessoas que precisam de cuidados domiciliares.

## Stack Tecnológico

### Backend
- **Framework**: AdonisJS 6.x
- **Linguagem**: TypeScript
- **ORM**: Lucid (incluído no AdonisJS)
- **Banco de Dados**: PostgreSQL
- **Autenticação**: @adonisjs/auth (Session-based)
- **Validação**: VineJS

### Frontend
- **Framework**: Edge.js (template engine) / Inertia.js (opcional)
- **Estilização**: Tailwind CSS
- **JavaScript**: TypeScript

### Infraestrutura
- **Servidor**: Node.js
- **Proxy Reverso**: Nginx (recomendado)
- **Cache**: Redis (futuro)
- **CDN**: CloudFlare / AWS CloudFront (para assets)
- **Email**: SMTP / SendGrid / Mailgun

## Arquitetura de Alto Nível

```
┌─────────────────────────────────────────────────────────┐
│                     Cliente (Browser)                    │
└─────────────────────┬───────────────────────────────────┘
                      │
                      │ HTTPS
                      │
┌─────────────────────▼───────────────────────────────────┐
│                    Nginx (Proxy)                         │
└─────────────────────┬───────────────────────────────────┘
                      │
                      │
┌─────────────────────▼───────────────────────────────────┐
│                 AdonisJS Application                     │
│  ┌────────────────────────────────────────────────────┐ │
│  │              Camada de Apresentação                │ │
│  │  ┌──────────────┐      ┌──────────────┐          │ │
│  │  │ Controllers  │◄─────┤   Routes     │          │ │
│  │  └──────┬───────┘      └──────────────┘          │ │
│  │         │                                          │ │
│  │  ┌──────▼───────┐      ┌──────────────┐          │ │
│  │  │ Validators   │      │  Middleware  │          │ │
│  │  └──────────────┘      └──────────────┘          │ │
│  └────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────┐ │
│  │              Camada de Negócio                     │ │
│  │  ┌──────────────┐      ┌──────────────┐          │ │
│  │  │   Services   │      │   Models     │          │ │
│  │  └──────────────┘      └──────┬───────┘          │ │
│  └────────────────────────────────┼────────────────────┘ │
└────────────────────────────────────┼──────────────────────┘
                                     │
                      ┌──────────────▼──────────────┐
                      │   PostgreSQL Database       │
                      └─────────────────────────────┘
```

## Estrutura de Diretórios

```
cuida/
├── app/
│   ├── controllers/           # Controladores HTTP
│   │   ├── auth_controller.ts
│   │   ├── professionals_controller.ts
│   │   ├── patients_controller.ts
│   │   ├── bookings_controller.ts
│   │   └── reviews_controller.ts
│   │
│   ├── models/               # Modelos de dados
│   │   ├── user.ts
│   │   ├── professional.ts
│   │   ├── patient.ts
│   │   ├── booking.ts
│   │   └── review.ts
│   │
│   ├── middleware/           # Middlewares personalizados
│   │   ├── auth.ts
│   │   ├── role_checker.ts
│   │   └── rate_limiter.ts
│   │
│   ├── validators/           # Validadores de dados
│   │   ├── auth_validator.ts
│   │   ├── professional_validator.ts
│   │   ├── patient_validator.ts
│   │   └── booking_validator.ts
│   │
│   └── services/            # Lógica de negócio
│       ├── geolocation_service.ts
│       ├── search_service.ts
│       ├── notification_service.ts
│       └── payment_service.ts
│
├── database/
│   ├── migrations/          # Migrações do banco
│   └── seeders/            # Dados de exemplo
│
├── config/                 # Configurações
│   ├── app.ts
│   ├── database.ts
│   ├── auth.ts
│   └── cors.ts
│
├── start/                  # Inicialização
│   ├── routes.ts          # Definição de rotas
│   ├── kernel.ts          # Middleware global
│   └── env.ts             # Validação de env
│
├── resources/
│   └── views/             # Templates Edge.js
│
├── public/                # Assets estáticos
│   ├── css/
│   ├── js/
│   └── images/
│
└── bin/                   # Scripts executáveis
    ├── server.ts
    └── console.ts
```

## Camadas da Aplicação

### 1. Camada de Rotas (start/routes.ts)

Define todos os endpoints da API e suas respectivas permissões.

```typescript
// Exemplo de estrutura de rotas
router.group(() => {
  router.post('/register', [AuthController, 'register'])
  router.post('/login', [AuthController, 'login'])
  router.post('/logout', [AuthController, 'logout']).middleware('auth')
}).prefix('/api/auth')

router.group(() => {
  router.get('/search', [ProfessionalsController, 'search'])
  router.get('/:id', [ProfessionalsController, 'show'])
  router.post('/', [ProfessionalsController, 'store']).middleware('auth')
  router.put('/:id', [ProfessionalsController, 'update']).middleware('auth')
}).prefix('/api/professionals')
```

### 2. Camada de Middleware

Responsável por interceptar requisições e executar lógica antes dos controladores.

**Tipos de Middleware:**
- **Autenticação**: Verificar se usuário está autenticado
- **Autorização**: Verificar permissões específicas
- **Validação**: Validar dados de entrada
- **Rate Limiting**: Controlar taxa de requisições
- **CORS**: Gerenciar políticas de cross-origin

### 3. Camada de Controllers

Gerencia as requisições HTTP e coordena a lógica de negócio.

**Responsabilidades:**
- Receber requisições HTTP
- Validar dados de entrada
- Chamar serviços apropriados
- Retornar respostas formatadas
- Tratar erros

### 4. Camada de Validators

Valida dados de entrada usando VineJS.

```typescript
// Exemplo de validator
export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(3),
    email: vine.string().email(),
    password: vine.string().minLength(8),
    userType: vine.enum(['professional', 'patient'])
  })
)
```

### 5. Camada de Services

Contém a lógica de negócio complexa e reutilizável.

**Exemplos de Services:**
- **GeolocationService**: Cálculo de distâncias, geocoding
- **SearchService**: Lógica de busca e filtros
- **NotificationService**: Envio de emails e notificações
- **PaymentService**: Integração com gateway de pagamento

### 6. Camada de Models

Representa as entidades do banco de dados usando Lucid ORM.

**Características:**
- Definição de schema
- Relacionamentos entre modelos
- Hooks (before/after save, etc.)
- Query builders
- Serialização de dados

### 7. Camada de Persistência

PostgreSQL com Lucid ORM para acesso aos dados.

## Fluxo de Requisição

```
1. Cliente faz requisição HTTP
   ↓
2. Nginx recebe e encaminha para AdonisJS
   ↓
3. Middlewares globais processam requisição
   ↓
4. Router identifica rota correspondente
   ↓
5. Middlewares específicos da rota são executados
   ↓
6. Validator valida dados de entrada
   ↓
7. Controller recebe requisição
   ↓
8. Controller chama Service (se necessário)
   ↓
9. Service interage com Models
   ↓
10. Models fazem queries no banco de dados
    ↓
11. Dados são retornados através das camadas
    ↓
12. Controller formata resposta
    ↓
13. Resposta é enviada ao cliente
```

## Modelos de Dados e Relacionamentos

### Diagrama de Entidades

```
┌──────────────┐
│     User     │
│──────────────│
│ id           │◄──┐
│ email        │   │
│ password     │   │
│ user_type    │   │
│ phone_number │   │
└──────────────┘   │
                   │
       ┌───────────┴───────────┐
       │                       │
┌──────▼─────────┐    ┌────────▼────────┐
│  Professional  │    │     Patient     │
│────────────────│    │─────────────────│
│ id             │    │ id              │
│ user_id        │    │ user_id         │
│ specialty      │    │ date_of_birth   │
│ latitude       │    │ latitude        │
│ longitude      │    │ longitude       │
│ average_rating │    │ address         │
└────────┬───────┘    └────────┬────────┘
         │                     │
         │    ┌────────────┐   │
         └────►  Booking   ◄───┘
              │────────────│
              │ id         │
              │ prof_id    │
              │ patient_id │
              │ status     │
              │ price      │
              └─────┬──────┘
                    │
              ┌─────▼──────┐
              │   Review   │
              │────────────│
              │ id         │
              │ prof_id    │
              │ patient_id │
              │ booking_id │
              │ rating     │
              └────────────┘
```

### Relacionamentos

1. **User → Professional/Patient**: One-to-One
2. **Professional → Bookings**: One-to-Many
3. **Patient → Bookings**: One-to-Many
4. **Professional → Reviews**: One-to-Many
5. **Booking → Review**: One-to-One

## Segurança

### Autenticação
- Session-based authentication
- CSRF protection
- Password hashing com Scrypt
- Secure cookie settings

### Autorização
- Role-based access control (RBAC)
- Middleware de verificação de permissões
- Validação de ownership (usuário só pode editar seus próprios dados)

### Proteção de Dados
- Validação de entrada em todas as rotas
- Sanitização de dados
- SQL injection protection (via ORM)
- XSS protection
- Rate limiting para prevenir abuse

### HTTPS
- Todas as comunicações devem ser via HTTPS em produção
- Strict-Transport-Security headers

## Performance

### Otimizações de Banco de Dados
- Índices em campos frequentemente consultados
- Query optimization
- Lazy loading de relacionamentos
- Paginação de resultados

### Cache (Futuro)
- Redis para cache de sessões
- Cache de queries frequentes
- Cache de resultados de busca

### CDN
- Assets estáticos servidos via CDN
- Otimização de imagens
- Minificação de CSS/JS

## Monitoramento

### Logs
- Logs estruturados
- Diferentes níveis (info, warn, error)
- Rotação de logs

### Métricas
- Tempo de resposta de endpoints
- Taxa de erro
- Uso de recursos

### Alertas
- Notificação em caso de erros críticos
- Monitoramento de uptime
- Alertas de performance

## Escalabilidade

### Horizontal Scaling
- Stateless application design
- Load balancing com Nginx
- Múltiplas instâncias da aplicação

### Vertical Scaling
- Otimização de queries
- Caching estratégico
- Connection pooling do banco

## Ambientes

### Development
- Banco local
- Hot reload habilitado
- Logs detalhados

### Staging
- Ambiente similar ao produção
- Dados de teste
- Integração com serviços externos (sandbox)

### Production
- Banco otimizado
- Cache habilitado
- Monitoramento ativo
- Backups automatizados

## Tecnologias Futuras

- **Redis**: Cache e sessions
- **ElasticSearch**: Busca avançada
- **WebSockets**: Chat em tempo real
- **React Native**: Aplicativo móvel
- **Docker**: Containerização
- **Kubernetes**: Orquestração
- **GraphQL**: API alternativa

## Referências

- [Documentação AdonisJS](https://docs.adonisjs.com/)
- [Lucid ORM](https://lucid.adonisjs.com/)
- [VineJS Validator](https://vinejs.dev/)
- [PostgreSQL](https://www.postgresql.org/docs/)
