# Guia de Contribuição - Plataforma Cuida

Obrigado por considerar contribuir com a Plataforma Cuida! Este documento fornece diretrizes para contribuir com o projeto.

## 🌟 Como Contribuir

### Reportando Bugs

1. Verifique se o bug já não foi reportado nas [Issues](https://github.com/Rafaelraas/Cuida/issues)
2. Se não encontrar, crie uma nova issue com:
   - Título claro e descritivo
   - Passos para reproduzir o problema
   - Comportamento esperado vs. comportamento atual
   - Screenshots, se aplicável
   - Informações do ambiente (SO, versão do Node, etc.)

### Sugerindo Melhorias

1. Abra uma issue com a tag `enhancement`
2. Descreva claramente a melhoria proposta
3. Explique por que esta melhoria seria útil
4. Forneça exemplos de uso, se possível

### Pull Requests

1. **Fork** o repositório
2. **Clone** seu fork localmente
3. **Crie uma branch** para sua feature/correção:
   ```bash
   git checkout -b feature/minha-feature
   ```
4. **Faça suas alterações** seguindo os padrões do projeto
5. **Commit** suas mudanças:
   ```bash
   git commit -m "feat: adiciona nova funcionalidade X"
   ```
6. **Push** para sua branch:
   ```bash
   git push origin feature/minha-feature
   ```
7. **Abra um Pull Request** no GitHub

## 📝 Padrões de Código

### Estilo de Código

- Use **TypeScript** para todo código novo
- Siga as convenções do **ESLint** configurado no projeto
- Use **Prettier** para formatação automática
- Escreva código **limpo e legível**
- Adicione **comentários** quando necessário

### Convenções de Nomenclatura

- **Variáveis e funções**: camelCase (`getUserData`, `isActive`)
- **Classes e Interfaces**: PascalCase (`UserController`, `IUser`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_RETRIES`, `API_URL`)
- **Arquivos**: snake_case para arquivos TypeScript (`user_controller.ts`)

### Commits

Seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Mudanças na documentação
- `style`: Formatação, missing semi-colons, etc
- `refactor`: Refatoração de código
- `test`: Adição ou modificação de testes
- `chore`: Tarefas de manutenção

Exemplos:
```
feat: adiciona endpoint de busca por geolocalização
fix: corrige erro no cálculo de distância
docs: atualiza documentação da API
refactor: melhora lógica do serviço de notificações
test: adiciona testes para AuthController
```

### Estrutura de Branches

- `main`: Branch principal, sempre estável
- `develop`: Branch de desenvolvimento
- `feature/*`: Novas funcionalidades
- `fix/*`: Correções de bugs
- `hotfix/*`: Correções urgentes para produção

## 🧪 Testes

### Escrevendo Testes

- **Todo código novo deve ter testes**
- Testes unitários para serviços e utilidades
- Testes de integração para controladores e rotas
- Testes E2E para fluxos críticos

### Executando Testes

```bash
# Todos os testes
npm test

# Testes específicos
npm test -- --files tests/unit/services/auth_service.spec.ts

# Com cobertura
npm run test:coverage
```

### Cobertura de Testes

Mantenha a cobertura de testes acima de **80%**:
- Statements: > 80%
- Branches: > 80%
- Functions: > 80%
- Lines: > 80%

## 📚 Documentação

### Atualizando Documentação

- **API**: Documente novos endpoints em `API.md`
- **Arquitetura**: Atualize `ARCHITECTURE.md` para mudanças estruturais
- **README**: Mantenha o README atualizado com instruções claras
- **Código**: Use JSDoc para funções e classes complexas

### JSDoc

```typescript
/**
 * Calcula a distância entre duas coordenadas geográficas
 * 
 * @param lat1 - Latitude do ponto 1
 * @param lon1 - Longitude do ponto 1
 * @param lat2 - Latitude do ponto 2
 * @param lon2 - Longitude do ponto 2
 * @returns Distância em quilômetros
 */
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  // implementação
}
```

## 🔍 Code Review

### Checklist para Revisores

- [ ] Código segue os padrões do projeto
- [ ] Testes foram adicionados/atualizados
- [ ] Documentação foi atualizada
- [ ] Não há vulnerabilidades de segurança
- [ ] Performance é adequada
- [ ] Código é legível e bem estruturado

### Checklist para Contribuidores

Antes de abrir um PR, certifique-se de:

- [ ] Código compila sem erros
- [ ] Testes passam localmente
- [ ] Linter não reporta erros
- [ ] TypeScript não tem erros de tipo
- [ ] Documentação foi atualizada
- [ ] Commits seguem o padrão convencional
- [ ] Branch está atualizada com a main/develop

## 🚀 Processo de Review

1. **Automático**: CI/CD roda testes e linters
2. **Manual**: Revisor analisa o código
3. **Feedback**: Discussão e ajustes se necessário
4. **Aprovação**: Merge após aprovação
5. **Deploy**: Automático para staging

## 🛠️ Setup do Ambiente

### Primeira Vez

```bash
# Clone o repositório
git clone https://github.com/Rafaelraas/Cuida.git
cd Cuida

# Instale as dependências
npm install

# Configure o ambiente
cp .env.example .env

# Crie o banco de dados
createdb cuida_dev

# Execute as migrações
node ace migration:run

# Inicie o servidor
npm run dev
```

### Ferramentas Recomendadas

- **VS Code** com extensões:
  - ESLint
  - Prettier
  - AdonisJS
  - PostgreSQL
- **Postman** ou **Insomnia** para testar API
- **TablePlus** ou **pgAdmin** para banco de dados

## 🐛 Debug

### VS Code Launch Configuration

Adicione em `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug AdonisJS",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/bin/server.ts",
      "preLaunchTask": "tsc: build - tsconfig.json",
      "outFiles": ["${workspaceFolder}/build/**/*.js"]
    }
  ]
}
```

## 🔐 Segurança

### Reportando Vulnerabilidades

**NÃO** abra uma issue pública para vulnerabilidades de segurança.

Em vez disso:
1. Envie um email para: security@cuida.com.br (ou crie um email apropriado)
2. Inclua detalhes da vulnerabilidade
3. Aguarde resposta antes de divulgar publicamente

### Boas Práticas

- Nunca commit credenciais ou secrets
- Use variáveis de ambiente para dados sensíveis
- Valide toda entrada de usuário
- Use prepared statements (ORM faz isso)
- Mantenha dependências atualizadas

## 📋 Áreas para Contribuição

### Fácil (Good First Issue)

- Melhorar documentação
- Adicionar testes
- Corrigir typos
- Melhorar mensagens de erro

### Médio

- Adicionar validações
- Implementar endpoints da API
- Criar páginas do frontend
- Otimizar queries

### Difícil

- Implementar autenticação avançada
- Sistema de notificações em tempo real
- Integração com gateway de pagamento
- Sistema de chat

## 🎯 Roadmap

Consulte [SPRINTS.md](SPRINTS.md) para ver o roadmap completo do projeto.

## 💬 Comunicação

- **Issues**: Para bugs e features
- **Discussions**: Para perguntas e discussões gerais
- **Pull Requests**: Para contribuições de código

## 📜 Código de Conduta

### Nosso Compromisso

Estamos comprometidos em fornecer uma comunidade acolhedora e inclusiva.

### Comportamento Esperado

- Use linguagem acolhedora e inclusiva
- Respeite pontos de vista diferentes
- Aceite críticas construtivas graciosamente
- Foque no que é melhor para a comunidade

### Comportamento Inaceitável

- Linguagem ou imagens sexualizadas
- Trolling, insultos ou comentários depreciativos
- Assédio público ou privado
- Publicação de informações privadas de outros

## 🙏 Agradecimentos

Obrigado por contribuir com a Plataforma Cuida! Juntos, podemos melhorar o acesso a cuidados de saúde domiciliares.

## 📞 Contato

- **Issues**: https://github.com/Rafaelraas/Cuida/issues
- **Email**: contato@cuida.com.br (criar email apropriado)

---

**Lembre-se**: Contribuições de qualquer tamanho são valiosas!
