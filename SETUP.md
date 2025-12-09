# Guia de Configuração do Ambiente - Plataforma Cuida

## Pré-requisitos

- Node.js (v20.x ou superior)
- PostgreSQL (v14 ou superior)
- npm ou yarn
- Git

## Instalação do Ambiente de Desenvolvimento

### 1. Clonar o Repositório

```bash
git clone https://github.com/Rafaelraas/Cuida.git
cd Cuida
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Gere uma chave de aplicação segura
APP_KEY=sua-chave-secreta-aqui

# Configurações do banco de dados
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua-senha
DB_DATABASE=cuida
```

### 4. Gerar APP_KEY

Execute o comando para gerar uma chave de aplicação segura:

```bash
node ace generate:key
```

### 5. Criar Banco de Dados

Crie o banco de dados PostgreSQL:

```bash
createdb cuida
```

Ou via SQL:

```sql
CREATE DATABASE cuida;
```

### 6. Executar Migrações

```bash
node ace migration:run
```

### 7. Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3333`

## Estrutura do Projeto

```
cuida/
├── app/
│   ├── controllers/       # Controladores da aplicação
│   ├── models/           # Modelos de dados (Lucid ORM)
│   ├── middleware/       # Middlewares personalizados
│   ├── validators/       # Validadores de dados
│   └── services/         # Serviços de lógica de negócio
├── database/
│   ├── migrations/       # Migrações do banco de dados
│   └── seeders/          # Seeders para popular o banco
├── config/               # Arquivos de configuração
├── start/                # Arquivos de inicialização
│   ├── routes.ts        # Definição de rotas
│   ├── kernel.ts        # Configuração de middleware
│   └── env.ts           # Validação de variáveis de ambiente
├── resources/
│   └── views/           # Templates Edge.js
├── public/              # Arquivos públicos estáticos
└── bin/                 # Scripts executáveis
```

## Comandos Úteis

### Desenvolvimento

```bash
# Iniciar servidor com hot reload
npm run dev

# Compilar TypeScript
npm run build

# Iniciar servidor de produção
npm start
```

### Banco de Dados

```bash
# Executar migrações
node ace migration:run

# Reverter última migração
node ace migration:rollback

# Criar nova migração
node ace make:migration nome_da_migracao

# Criar seeder
node ace make:seeder NomeDoSeeder

# Executar seeders
node ace db:seed
```

### Modelos e Controladores

```bash
# Criar modelo
node ace make:model NomeDoModelo

# Criar controlador
node ace make:controller NomeDoController

# Criar middleware
node ace make:middleware NomeDoMiddleware

# Criar validador
node ace make:validator NomeDoValidator
```

### Testes

```bash
# Executar testes
npm test

# Executar com cobertura
npm run test:coverage
```

### Code Quality

```bash
# Executar linter
npm run lint

# Formatar código
npm run format

# Verificar tipos TypeScript
npm run typecheck
```

## Próximos Passos

1. Consulte o arquivo `SPRINTS.md` para ver o plano de implementação detalhado
2. Consulte o arquivo `API.md` para documentação da API
3. Consulte o arquivo `ARCHITECTURE.md` para entender a arquitetura do sistema

## Problemas Comuns

### Erro de conexão com banco de dados

Verifique se:
- O PostgreSQL está rodando
- As credenciais no `.env` estão corretas
- O banco de dados foi criado

### Porta 3333 já em uso

Altere a variável `PORT` no arquivo `.env` para outra porta disponível.

### Erro ao executar migrações

Execute o rollback e tente novamente:

```bash
node ace migration:rollback
node ace migration:run
```

## Suporte

Para dúvidas ou problemas, abra uma issue no repositório do GitHub.
