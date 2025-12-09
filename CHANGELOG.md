# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Planejado
- Sistema de autenticação completo
- API de profissionais e pacientes
- Sistema de busca por geolocalização
- Sistema de agendamentos
- Sistema de avaliações
- Frontend com Inertia.js
- Sistema de pagamentos

## [0.1.0] - 2024-12-09

### Adicionado
- Setup inicial do projeto AdonisJS 6
- Configuração do TypeScript
- Estrutura de diretórios do projeto
- Modelos de dados:
  - User (usuário base)
  - Professional (profissional de saúde)
  - Patient (paciente)
  - Booking (agendamento)
  - Review (avaliação)
- Migrações do banco de dados PostgreSQL
- Configuração de autenticação com session guard
- Arquivos de configuração:
  - Database (Lucid ORM)
  - Auth (Session-based)
  - CORS
  - App
- Documentação completa:
  - README.md com visão geral
  - SETUP.md com guia de instalação
  - SPRINTS.md com plano de implementação
  - ARCHITECTURE.md com arquitetura do sistema
  - API.md com documentação da API
  - CONTRIBUTING.md com guia de contribuição
- Configuração Docker:
  - Dockerfile para build da aplicação
  - docker-compose.yml para ambiente completo
  - nginx.conf para proxy reverso
- Seeders de exemplo
- Configurações de código:
  - ESLint
  - Prettier
  - EditorConfig
- Arquivos Git:
  - .gitignore
  - .dockerignore
- LICENSE (MIT)

### Estrutura
- `/app` - Código da aplicação
  - `/controllers` - Controladores HTTP
  - `/models` - Modelos Lucid
  - `/middleware` - Middlewares customizados
  - `/validators` - Validadores VineJS
  - `/services` - Serviços de negócio
- `/database` - Migrações e seeders
- `/config` - Configurações
- `/start` - Inicialização (routes, kernel, env)
- `/bin` - Scripts executáveis
- `/public` - Assets públicos
- `/resources` - Views e recursos

### Tecnologias
- AdonisJS 6.x
- TypeScript
- PostgreSQL
- Lucid ORM
- VineJS Validator
- Edge.js Template Engine
- Docker & Docker Compose

## [0.0.0] - 2024-12-09

### Adicionado
- Inicialização do repositório
- README básico com descrição do projeto

---

## Tipos de Mudanças

- `Added` para novas funcionalidades
- `Changed` para mudanças em funcionalidades existentes
- `Deprecated` para funcionalidades que serão removidas
- `Removed` para funcionalidades removidas
- `Fixed` para correções de bugs
- `Security` para vulnerabilidades corrigidas
