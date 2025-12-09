# API Documentation - Plataforma Cuida

## Base URL

```
Development: http://localhost:3333/api
Production: https://api.cuida.com.br/api
```

## Autenticação

A API utiliza autenticação baseada em **sessão com cookies**. Após o login, um cookie chamado `cuida_session` é criado automaticamente e deve ser enviado em todas as requisições autenticadas.

### Fluxo de Autenticação

1. **Registro**: `POST /api/auth/register` - Criar uma nova conta
2. **Login**: `POST /api/auth/login` - Autenticar e criar sessão
3. **Requisições autenticadas**: Incluir cookie de sessão automaticamente
4. **Logout**: `POST /api/auth/logout` - Destruir sessão

### Headers Necessários

```
Content-Type: application/json
Accept: application/json
Cookie: cuida_session=<session_cookie> (para rotas autenticadas)
```

### Códigos de Erro Comuns

| Código HTTP | Código de Erro | Descrição |
|-------------|----------------|-----------|
| 401 | `NOT_AUTHENTICATED` | Usuário não autenticado |
| 401 | `INVALID_CREDENTIALS` | Email ou senha incorretos |
| 403 | `USER_INACTIVE` | Conta de usuário está inativa |
| 409 | `EMAIL_ALREADY_EXISTS` | Email já está cadastrado |
| 422 | `VALIDATION_ERROR` | Dados inválidos no request |
| 500 | `INTERNAL_ERROR` | Erro interno do servidor |

---

## Endpoints

### Autenticação

#### Registrar Usuário

```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "fullName": "João Silva",
  "email": "joao@example.com",
  "password": "senha123",
  "userType": "professional", // ou "patient"
  "phoneNumber": "+5511999999999" // opcional
}
```

**Validação:**
- `fullName`: mínimo 3 caracteres, máximo 255
- `email`: formato válido de email
- `password`: mínimo 8 caracteres
- `userType`: deve ser "professional" ou "patient"

**Response (201 - Sucesso):**
```json
{
  "message": "Usuário registrado com sucesso",
  "user": {
    "id": 1,
    "fullName": "João Silva",
    "email": "joao@example.com",
    "userType": "professional",
    "phoneNumber": "+5511999999999",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Response (409 - Email já existe):**
```json
{
  "error": {
    "message": "Email já cadastrado",
    "code": "EMAIL_ALREADY_EXISTS"
  }
}
```

**Response (422 - Erro de validação):**
```json
{
  "error": {
    "message": "Erro de validação",
    "code": "VALIDATION_ERROR",
    "details": [
      {
        "field": "email",
        "message": "The email field must be a valid email address",
        "rule": "email"
      }
    ]
  }
}
```

#### Login

```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Response (200 - Sucesso):**
```json
{
  "message": "Login realizado com sucesso",
  "user": {
    "id": 1,
    "fullName": "João Silva",
    "email": "joao@example.com",
    "userType": "professional"
  }
}
```

**Response (401 - Credenciais inválidas):**
```json
{
  "error": {
    "message": "Credenciais inválidas",
    "code": "INVALID_CREDENTIALS"
  }
}
```

**Response (403 - Usuário inativo):**
```json
{
  "error": {
    "message": "Usuário inativo",
    "code": "USER_INACTIVE"
  }
}
```

#### Logout

```http
POST /api/auth/logout
```

**Requer autenticação** (cookie de sessão)

**Response (200):**
```json
{
  "message": "Logout realizado com sucesso"
}
```

#### Verificar Sessão (Obter Usuário Autenticado)

```http
GET /api/auth/me
```

**Requer autenticação** (cookie de sessão)

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "fullName": "João Silva",
    "email": "joao@example.com",
    "userType": "professional",
    "phoneNumber": "+5511999999999",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Profissionais

#### Listar Profissionais

```http
GET /api/professionals
```

**Query Parameters:**
- `page` (number): Página atual (default: 1)
- `perPage` (number): Itens por página (default: 20)
- `specialty` (string): Filtrar por especialidade
- `minRating` (number): Avaliação mínima

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "userId": 1,
      "specialty": "Fisioterapeuta",
      "averageRating": 4.5,
      "totalReviews": 10,
      "hourlyRate": 80.00,
      "city": "São Paulo",
      "user": {
        "fullName": "João Silva",
        "phoneNumber": "+5511999999999"
      }
    }
  ],
  "meta": {
    "total": 100,
    "perPage": 20,
    "currentPage": 1,
    "lastPage": 5
  }
}
```

#### Buscar Profissionais por Localização

```http
GET /api/professionals/search
```

**Query Parameters:**
- `latitude` (number, required): Latitude do ponto de busca
- `longitude` (number, required): Longitude do ponto de busca
- `radius` (number): Raio em km (default: 10)
- `specialty` (string): Filtrar por especialidade
- `minRating` (number): Avaliação mínima
- `maxPrice` (number): Preço máximo por hora
- `availableNow` (boolean): Disponível agora
- `page` (number): Página atual
- `perPage` (number): Itens por página

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "specialty": "Fisioterapeuta",
      "averageRating": 4.5,
      "totalReviews": 10,
      "hourlyRate": 80.00,
      "distance": 2.5,
      "user": {
        "fullName": "João Silva"
      },
      "address": "Rua Exemplo, 123",
      "city": "São Paulo"
    }
  ],
  "meta": {
    "total": 15,
    "currentPage": 1
  }
}
```

#### Obter Detalhes do Profissional

```http
GET /api/professionals/:id
```

**Response (200):**
```json
{
  "id": 1,
  "userId": 1,
  "specialty": "Fisioterapeuta",
  "registrationNumber": "CREFITO-12345",
  "bio": "Especialista em reabilitação...",
  "hourlyRate": 80.00,
  "experienceYears": 5,
  "availableForEmergency": true,
  "averageRating": 4.5,
  "totalReviews": 10,
  "address": "Rua Exemplo, 123",
  "city": "São Paulo",
  "state": "SP",
  "user": {
    "fullName": "João Silva",
    "email": "joao@example.com",
    "phoneNumber": "+5511999999999"
  },
  "recentReviews": [
    {
      "id": 1,
      "rating": 5,
      "comment": "Excelente profissional!",
      "patient": {
        "fullName": "Maria Santos"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Criar Perfil de Profissional

```http
POST /api/professionals
```

**Headers:**
```
Authorization: Bearer <session_token>
```

**Request Body:**
```json
{
  "specialty": "Fisioterapeuta",
  "registrationNumber": "CREFITO-12345",
  "bio": "Especialista em reabilitação motora...",
  "hourlyRate": 80.00,
  "experienceYears": 5,
  "availableForEmergency": true,
  "address": "Rua Exemplo, 123",
  "city": "São Paulo",
  "state": "SP",
  "zipCode": "01234-567"
}
```

**Response (201):**
```json
{
  "message": "Perfil profissional criado com sucesso",
  "professional": {
    "id": 1,
    "userId": 1,
    "specialty": "Fisioterapeuta",
    "hourlyRate": 80.00
  }
}
```

#### Atualizar Perfil de Profissional

```http
PUT /api/professionals/:id
```

**Headers:**
```
Authorization: Bearer <session_token>
```

**Request Body:**
```json
{
  "bio": "Bio atualizada...",
  "hourlyRate": 90.00,
  "availableForEmergency": false
}
```

**Response (200):**
```json
{
  "message": "Perfil atualizado com sucesso",
  "professional": {
    "id": 1,
    "bio": "Bio atualizada...",
    "hourlyRate": 90.00
  }
}
```

---

### Pacientes

#### Criar Perfil de Paciente

```http
POST /api/patients
```

**Headers:**
```
Authorization: Bearer <session_token>
```

**Request Body:**
```json
{
  "dateOfBirth": "1990-01-01",
  "address": "Rua Exemplo, 456",
  "city": "São Paulo",
  "state": "SP",
  "zipCode": "01234-567",
  "emergencyContactName": "Maria Silva",
  "emergencyContactPhone": "+5511888888888",
  "medicalConditions": "Diabetes tipo 2"
}
```

**Response (201):**
```json
{
  "message": "Perfil de paciente criado com sucesso",
  "patient": {
    "id": 1,
    "userId": 2,
    "city": "São Paulo"
  }
}
```

#### Obter Perfil de Paciente

```http
GET /api/patients/:id
```

**Headers:**
```
Authorization: Bearer <session_token>
```

**Response (200):**
```json
{
  "id": 1,
  "userId": 2,
  "dateOfBirth": "1990-01-01",
  "address": "Rua Exemplo, 456",
  "city": "São Paulo",
  "state": "SP",
  "emergencyContactName": "Maria Silva",
  "emergencyContactPhone": "+5511888888888",
  "user": {
    "fullName": "Pedro Santos",
    "email": "pedro@example.com",
    "phoneNumber": "+5511777777777"
  }
}
```

---

### Agendamentos (Bookings)

#### Criar Agendamento

```http
POST /api/bookings
```

**Headers:**
```
Authorization: Bearer <session_token>
```

**Request Body:**
```json
{
  "professionalId": 1,
  "scheduledDate": "2024-02-01T10:00:00Z",
  "durationHours": 2,
  "serviceDescription": "Sessão de fisioterapia",
  "location": "Rua Exemplo, 456",
  "notes": "Paciente com mobilidade reduzida"
}
```

**Response (201):**
```json
{
  "message": "Agendamento criado com sucesso",
  "booking": {
    "id": 1,
    "professionalId": 1,
    "patientId": 1,
    "scheduledDate": "2024-02-01T10:00:00Z",
    "durationHours": 2,
    "status": "pending",
    "totalPrice": 160.00
  }
}
```

#### Listar Agendamentos

```http
GET /api/bookings
```

**Headers:**
```
Authorization: Bearer <session_token>
```

**Query Parameters:**
- `status` (string): Filtrar por status
- `fromDate` (date): Data início
- `toDate` (date): Data fim
- `page` (number): Página

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "scheduledDate": "2024-02-01T10:00:00Z",
      "durationHours": 2,
      "status": "confirmed",
      "totalPrice": 160.00,
      "professional": {
        "id": 1,
        "user": {
          "fullName": "João Silva"
        }
      },
      "patient": {
        "id": 1,
        "user": {
          "fullName": "Pedro Santos"
        }
      }
    }
  ],
  "meta": {
    "total": 5,
    "currentPage": 1
  }
}
```

#### Obter Detalhes do Agendamento

```http
GET /api/bookings/:id
```

**Headers:**
```
Authorization: Bearer <session_token>
```

**Response (200):**
```json
{
  "id": 1,
  "scheduledDate": "2024-02-01T10:00:00Z",
  "durationHours": 2,
  "status": "confirmed",
  "totalPrice": 160.00,
  "serviceDescription": "Sessão de fisioterapia",
  "location": "Rua Exemplo, 456",
  "notes": "Paciente com mobilidade reduzida",
  "professional": {
    "id": 1,
    "specialty": "Fisioterapeuta",
    "user": {
      "fullName": "João Silva",
      "phoneNumber": "+5511999999999"
    }
  },
  "patient": {
    "id": 1,
    "user": {
      "fullName": "Pedro Santos",
      "phoneNumber": "+5511777777777"
    }
  }
}
```

#### Atualizar Status do Agendamento

```http
PATCH /api/bookings/:id/status
```

**Headers:**
```
Authorization: Bearer <session_token>
```

**Request Body:**
```json
{
  "status": "confirmed"
}
```

**Valores válidos:** `pending`, `confirmed`, `in_progress`, `completed`, `cancelled`

**Response (200):**
```json
{
  "message": "Status atualizado com sucesso",
  "booking": {
    "id": 1,
    "status": "confirmed"
  }
}
```

#### Cancelar Agendamento

```http
DELETE /api/bookings/:id
```

**Headers:**
```
Authorization: Bearer <session_token>
```

**Response (200):**
```json
{
  "message": "Agendamento cancelado com sucesso"
}
```

---

### Avaliações (Reviews)

#### Criar Avaliação

```http
POST /api/reviews
```

**Headers:**
```
Authorization: Bearer <session_token>
```

**Request Body:**
```json
{
  "professionalId": 1,
  "bookingId": 1,
  "rating": 5,
  "comment": "Excelente profissional! Muito atencioso.",
  "wouldRecommend": true
}
```

**Response (201):**
```json
{
  "message": "Avaliação criada com sucesso",
  "review": {
    "id": 1,
    "professionalId": 1,
    "patientId": 1,
    "rating": 5,
    "comment": "Excelente profissional! Muito atencioso.",
    "wouldRecommend": true
  }
}
```

#### Listar Avaliações de um Profissional

```http
GET /api/professionals/:id/reviews
```

**Query Parameters:**
- `page` (number): Página
- `perPage` (number): Itens por página
- `minRating` (number): Avaliação mínima

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "rating": 5,
      "comment": "Excelente profissional!",
      "wouldRecommend": true,
      "createdAt": "2024-01-15T00:00:00Z",
      "patient": {
        "user": {
          "fullName": "Pedro Santos"
        }
      }
    }
  ],
  "meta": {
    "total": 10,
    "averageRating": 4.5,
    "recommendationRate": 0.95
  }
}
```

#### Atualizar Avaliação

```http
PUT /api/reviews/:id
```

**Headers:**
```
Authorization: Bearer <session_token>
```

**Request Body:**
```json
{
  "rating": 4,
  "comment": "Bom profissional."
}
```

**Response (200):**
```json
{
  "message": "Avaliação atualizada com sucesso",
  "review": {
    "id": 1,
    "rating": 4,
    "comment": "Bom profissional."
  }
}
```

#### Deletar Avaliação

```http
DELETE /api/reviews/:id
```

**Headers:**
```
Authorization: Bearer <session_token>
```

**Response (200):**
```json
{
  "message": "Avaliação removida com sucesso"
}
```

---

## Códigos de Status HTTP

- `200 OK`: Requisição bem-sucedida
- `201 Created`: Recurso criado com sucesso
- `400 Bad Request`: Dados de entrada inválidos
- `401 Unauthorized`: Não autenticado
- `403 Forbidden`: Sem permissão
- `404 Not Found`: Recurso não encontrado
- `422 Unprocessable Entity`: Erro de validação
- `500 Internal Server Error`: Erro no servidor

## Tratamento de Erros

Todas as respostas de erro seguem o formato:

```json
{
  "error": {
    "message": "Mensagem de erro legível",
    "code": "ERROR_CODE",
    "details": {
      // Detalhes adicionais quando aplicável
    }
  }
}
```

### Exemplos de Erros

**Erro de Validação (422):**
```json
{
  "error": {
    "message": "Erro de validação",
    "code": "VALIDATION_ERROR",
    "details": {
      "email": ["O email é obrigatório"],
      "password": ["A senha deve ter no mínimo 8 caracteres"]
    }
  }
}
```

**Não Autenticado (401):**
```json
{
  "error": {
    "message": "Não autenticado",
    "code": "UNAUTHORIZED"
  }
}
```

**Recurso Não Encontrado (404):**
```json
{
  "error": {
    "message": "Profissional não encontrado",
    "code": "NOT_FOUND"
  }
}
```

## Rate Limiting

A API implementa rate limiting para proteger contra abuse:

- **Geral**: 100 requisições por minuto por IP
- **Autenticação**: 5 tentativas de login por minuto por IP
- **Busca**: 30 requisições por minuto

Headers de resposta incluem informações sobre o rate limit:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```

## Paginação

Endpoints que retornam listas suportam paginação via query parameters:

- `page`: Número da página (default: 1)
- `perPage`: Itens por página (default: 20, max: 100)

Resposta inclui metadados:

```json
{
  "data": [...],
  "meta": {
    "total": 100,
    "perPage": 20,
    "currentPage": 1,
    "lastPage": 5,
    "firstPage": 1,
    "firstPageUrl": "/?page=1",
    "lastPageUrl": "/?page=5",
    "nextPageUrl": "/?page=2",
    "previousPageUrl": null
  }
}
```

## Versionamento

A API utiliza versionamento via URL:

- v1: `/api/v1/...` (futuro)
- Versão atual não requer prefixo: `/api/...`

## Ambientes

- **Development**: `http://localhost:3333/api`
- **Staging**: `https://staging-api.cuida.com.br/api`
- **Production**: `https://api.cuida.com.br/api`
