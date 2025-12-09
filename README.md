# Cuida 🏥

> Plataforma de cuidados a domicílio - Conectando profissionais de saúde com pessoas que precisam de cuidado

Cuida é uma plataforma fullstack desenvolvida com AdonisJS que facilita a conexão entre profissionais de saúde (cuidadores, fisioterapeutas, enfermeiros, terapeutas) e pessoas que necessitam de cuidados domiciliares (idosos, acamados, pacientes em recuperação).

## 🚀 Características Principais

- **Busca por Geolocalização**: Encontre profissionais próximos à sua localização
- **Sistema de Avaliações**: Veja avaliações e recomendações de outros usuários
- **Agendamento Online**: Agende consultas e serviços de forma fácil
- **Perfis Detalhados**: Informações completas sobre especialidades, preços e experiência
- **Seguro e Confiável**: Sistema de autenticação robusto e validação de profissionais

## 📋 Pré-requisitos

- Node.js v20.x ou superior
- PostgreSQL v14 ou superior
- npm ou yarn
- Git

## 🛠️ Tecnologias

### Backend
- **AdonisJS 6.x** - Framework Node.js robusto e elegante
- **TypeScript** - Tipagem estática para JavaScript
- **PostgreSQL** - Banco de dados relacional
- **Lucid ORM** - ORM incluído no AdonisJS
- **VineJS** - Validação de dados

### Frontend
- **Edge.js** - Template engine
- **Tailwind CSS** - Framework CSS utility-first
- **Inertia.js** - (Futuro) Para SPA com React/Vue

## 📦 Instalação Rápida

```bash
# Clone o repositório
git clone https://github.com/Rafaelraas/Cuida.git
cd Cuida

# Instale as dependências
npm install

# Configure o ambiente
cp .env.example .env
# Edite o .env com suas configurações

# Crie o banco de dados
createdb cuida

# Execute as migrações
node ace migration:run

# Inicie o servidor
npm run dev
```

Acesse: http://localhost:3333

## 🐳 Docker

```bash
# Configure as variáveis de ambiente
cp .env.example .env

# Inicie os containers
docker-compose up -d

# Execute as migrações
docker-compose exec app node ace migration:run
```

## 📚 Documentação

- **[Guia de Setup](SETUP.md)** - Instruções detalhadas de instalação e configuração
- **[Plano de Sprints](SPRINTS.md)** - Roadmap de desenvolvimento dividido em sprints
- **[Arquitetura](ARCHITECTURE.md)** - Documentação da arquitetura do sistema
- **[API](API.md)** - Documentação completa da API REST

## 🏗️ Estrutura do Projeto

```
cuida/
├── app/
│   ├── controllers/      # Controladores HTTP
│   ├── models/          # Modelos de dados
│   ├── middleware/      # Middlewares personalizados
│   ├── validators/      # Validadores de dados
│   └── services/        # Lógica de negócio
├── database/
│   ├── migrations/      # Migrações do banco
│   └── seeders/         # Dados de exemplo
├── config/              # Arquivos de configuração
├── start/               # Arquivos de inicialização
├── resources/           # Views e assets
└── public/              # Arquivos públicos
```

## 🎯 Funcionalidades Implementadas

### Sprint 1: Fundação e Autenticação ✅
- [x] Setup do projeto AdonisJS
- [x] Configuração do banco de dados PostgreSQL
- [x] Modelos de dados (User, Professional, Patient, Booking, Review)
- [x] Migrações de banco de dados
- [x] Sistema de autenticação completo
  - [x] Registro de usuários (POST /api/auth/register)
  - [x] Login com sessão (POST /api/auth/login)
  - [x] Logout (POST /api/auth/logout)
  - [x] Obter usuário autenticado (GET /api/auth/me)
  - [x] Middleware de autenticação
- [x] Ambiente de testes configurado (Japa)
- [x] Testes de autenticação
- [x] CI/CD básico (GitHub Actions)
- [x] Documentação completa
- [x] Configuração Docker

## 📋 Próximos Passos

Consulte o arquivo [SPRINTS.md](SPRINTS.md) para ver o plano detalhado de implementação dividido em sprints de 2 semanas.

### Sprint 2 (Próximo)
- Implementar perfis de profissionais e pacientes
- CRUD de perfis
- Validações personalizadas
- Upload de documentos

## 🧪 Testes

```bash
# Executar testes
npm test

# Executar com cobertura
npm run test:coverage
```

## 🚀 Deploy

### Produção

```bash
# Build
npm run build

# Iniciar servidor
npm start
```

### Docker em Produção

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Rafael Raas** - [GitHub](https://github.com/Rafaelraas)

## 📞 Suporte

Para dúvidas ou problemas, abra uma [issue](https://github.com/Rafaelraas/Cuida/issues) no GitHub.

## 🙏 Agradecimentos

- Comunidade AdonisJS
- Todos os contribuidores
- Profissionais de saúde que inspiraram este projeto

---

**Feito com ❤️ para melhorar o acesso a cuidados de saúde domiciliares no Brasil**
