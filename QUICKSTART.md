# Guia Rápido - Plataforma Cuida

Este guia irá te ajudar a começar rapidamente com a Plataforma Cuida.

## 🚀 Início Rápido (5 minutos)

### Pré-requisitos

Certifique-se de ter instalado:
- Node.js v20+ ([Download](https://nodejs.org/))
- PostgreSQL v14+ ([Download](https://www.postgresql.org/download/))
- Git ([Download](https://git-scm.com/))

### Passo 1: Clone e Instale

```bash
# Clone o repositório
git clone https://github.com/Rafaelraas/Cuida.git
cd Cuida

# Instale as dependências
npm install
```

### Passo 2: Configure o Ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o .env com suas configurações
# Principais variáveis:
# - APP_KEY: será gerado no próximo passo
# - DB_PASSWORD: sua senha do PostgreSQL
# - DB_DATABASE: cuida (ou outro nome)
```

### Passo 3: Prepare o Banco de Dados

```bash
# Crie o banco de dados
createdb cuida

# Ou via psql:
psql -U postgres
CREATE DATABASE cuida;
\q

# Execute as migrações
node ace migration:run

# (Opcional) Popule com dados de exemplo
node ace db:seed
```

### Passo 4: Inicie o Servidor

```bash
npm run dev
```

✅ Pronto! Acesse http://localhost:3333

## 🐳 Início Rápido com Docker (3 minutos)

### Passo 1: Configure e Inicie

```bash
# Clone o repositório
git clone https://github.com/Rafaelraas/Cuida.git
cd Cuida

# Copie e configure o .env
cp .env.example .env
# Edite APP_KEY e DB_PASSWORD

# Inicie os containers
docker-compose up -d
```

### Passo 2: Execute as Migrações

```bash
# Execute as migrações
docker-compose exec app node ace migration:run

# (Opcional) Dados de exemplo
docker-compose exec app node ace db:seed
```

✅ Acesse http://localhost

## 📱 Testando a API

### 1. Health Check

```bash
curl http://localhost:3333/health
```

Resposta esperada:
```json
{
  "status": "ok",
  "timestamp": "2024-12-09T00:00:00.000Z"
}
```

### 2. Endpoint Principal

```bash
curl http://localhost:3333/
```

Resposta esperada:
```json
{
  "message": "Bem-vindo à Plataforma Cuida",
  "description": "API para conectar profissionais de saúde com pessoas que precisam de cuidado",
  "version": "1.0.0"
}
```

## 🔧 Comandos Úteis

### Desenvolvimento

```bash
# Iniciar com hot reload
npm run dev

# Build do projeto
npm run build

# Iniciar em produção
npm start
```

### Banco de Dados

```bash
# Ver status das migrações
node ace migration:status

# Criar nova migração
node ace make:migration nome_da_migracao

# Reverter última migração
node ace migration:rollback

# Popular banco com dados
node ace db:seed
```

### Código

```bash
# Verificar linting
npm run lint

# Formatar código
npm run format

# Verificar tipos TypeScript
npm run typecheck
```

### Modelos e Controladores

```bash
# Criar modelo
node ace make:model NomeDoModelo

# Criar controlador
node ace make:controller NomeDoController

# Criar middleware
node ace make:middleware NomeDoMiddleware
```

## 🎯 Próximos Passos

### 1. Explore a Documentação

- [SETUP.md](SETUP.md) - Configuração detalhada
- [API.md](API.md) - Documentação da API
- [ARCHITECTURE.md](ARCHITECTURE.md) - Arquitetura do sistema
- [SPRINTS.md](SPRINTS.md) - Roadmap de desenvolvimento

### 2. Contribua

- Leia [CONTRIBUTING.md](CONTRIBUTING.md)
- Escolha uma issue para trabalhar
- Faça seu primeiro Pull Request

### 3. Desenvolva Features

Consulte [SPRINTS.md](SPRINTS.md) para ver as features planejadas:

**Sprint 1 (Atual):**
- Sistema de autenticação
- Registro e login de usuários
- Middleware de autenticação

**Sprint 2:**
- Perfis de profissionais e pacientes
- CRUD completo
- Validações

**Sprint 3:**
- Sistema de busca por localização
- Filtros avançados
- Geolocalização

## 🛠️ Troubleshooting

### Erro: "Cannot connect to database"

```bash
# Verifique se o PostgreSQL está rodando
sudo service postgresql status

# Ou no macOS:
brew services list

# Verifique as credenciais no .env
cat .env | grep DB_
```

### Erro: "Port 3333 already in use"

```bash
# Altere a porta no .env
PORT=3334

# Ou mate o processo na porta 3333
lsof -ti:3333 | xargs kill -9
```

### Erro: "APP_KEY is required"

```bash
# Gere uma nova chave
node ace generate:key

# Adicione ao .env
echo "APP_KEY=sua-chave-aqui" >> .env
```

### Migrações não executam

```bash
# Verifique a conexão com o banco
node ace db:check

# Recrie as migrações
node ace migration:rollback --batch=0
node ace migration:run
```

## 📚 Recursos Adicionais

### Ferramentas Recomendadas

- **Postman** ou **Insomnia** - Testar API
- **TablePlus** ou **pgAdmin** - Gerenciar PostgreSQL
- **VS Code** - Editor recomendado
  - Extensão: AdonisJS
  - Extensão: ESLint
  - Extensão: Prettier

### Links Úteis

- [Documentação AdonisJS](https://docs.adonisjs.com/)
- [Documentação Lucid ORM](https://lucid.adonisjs.com/)
- [Documentação PostgreSQL](https://www.postgresql.org/docs/)

### Comunidade

- [GitHub Issues](https://github.com/Rafaelraas/Cuida/issues)
- [Discussões](https://github.com/Rafaelraas/Cuida/discussions)

## ✅ Checklist de Setup

- [ ] Node.js instalado (v20+)
- [ ] PostgreSQL instalado e rodando
- [ ] Repositório clonado
- [ ] Dependências instaladas (`npm install`)
- [ ] Arquivo `.env` configurado
- [ ] Banco de dados criado
- [ ] Migrações executadas
- [ ] Servidor iniciado
- [ ] Teste de health check passou

## 🎉 Tudo Pronto!

Agora você está pronto para começar a desenvolver na Plataforma Cuida!

Se encontrar problemas, consulte:
1. Este guia de troubleshooting
2. [SETUP.md](SETUP.md) para instruções detalhadas
3. [Issues no GitHub](https://github.com/Rafaelraas/Cuida/issues)

**Bom desenvolvimento! 🚀**
