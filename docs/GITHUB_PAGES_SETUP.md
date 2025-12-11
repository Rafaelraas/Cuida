# Instruções para Ativar GitHub Pages

Este guia explica como ativar o GitHub Pages para o repositório Cuida.

## 📋 Pré-requisitos

- Acesso de administrador ao repositório
- Branch `main` com a pasta `docs/` e o workflow `.github/workflows/deploy-gh-pages.yml`

## 🚀 Passos para Ativar

### 1. Acessar Configurações do Repositório

1. Acesse https://github.com/Rafaelraas/Cuida
2. Clique na aba **Settings** (Configurações)
3. No menu lateral esquerdo, clique em **Pages** (na seção "Code and automation")

### 2. Configurar GitHub Pages

Na página de configurações do Pages:

1. **Source (Origem)**:
   - Selecione: **GitHub Actions**
   
   > ⚠️ **Importante**: NÃO selecione "Deploy from a branch". O deploy será feito via GitHub Actions.

2. Clique em **Save** (se necessário)

### 3. Fazer Merge da Branch

1. Faça merge da branch que contém estas alterações para `main`
2. Ou faça push diretamente para `main` se estiver trabalhando nela

### 4. Verificar Deploy

Após o merge/push para `main`:

1. Vá até a aba **Actions** do repositório
2. Você verá o workflow "Deploy to GitHub Pages" em execução
3. Aguarde a conclusão (leva cerca de 1-2 minutos)
4. Quando concluído, clique no workflow para ver os detalhes
5. Na seção "deploy", você verá a URL do site publicado

### 5. Acessar o Site

Seu site estará disponível em:

**https://rafaelraas.github.io/Cuida/**

## 🎨 Personalização

### Domínio Personalizado (Opcional)

Se você quiser usar um domínio personalizado:

1. Renomeie `docs/CNAME.example` para `docs/CNAME`
2. Adicione seu domínio no arquivo (ex: `docs.cuida.com.br`)
3. Configure os registros DNS do seu domínio:
   - Tipo: CNAME
   - Nome: docs (ou subdomain desejado)
   - Valor: rafaelraas.github.io
4. Nas configurações do GitHub Pages, adicione o custom domain

### Atualizar o Conteúdo

Para atualizar a documentação:

1. Edite `docs/index.html` ou adicione novos arquivos em `docs/`
2. Commit e push para `main`
3. O deploy acontecerá automaticamente via GitHub Actions

## 🔧 Troubleshooting

### Workflow não está executando

- Verifique se você tem permissões de "Read and write" para GitHub Actions:
  - Settings → Actions → General → Workflow permissions
  - Selecione "Read and write permissions"
  - Marque "Allow GitHub Actions to create and approve pull requests"

### Erro 404 após deploy

- Certifique-se de que a pasta `docs/` existe e contém o arquivo `index.html`
- Verifique se o workflow foi executado com sucesso na aba Actions
- Aguarde alguns minutos - pode levar tempo para propagar

### Deploy falha com erro de permissões

- Vá em Settings → Actions → General
- Em "Workflow permissions", selecione "Read and write permissions"
- Salve as alterações e re-execute o workflow

## 📝 Estrutura dos Arquivos

```
Cuida/
├── docs/
│   ├── .nojekyll              # Desabilita processamento Jekyll
│   ├── CNAME.example          # Exemplo de arquivo de domínio customizado
│   ├── README.md              # Documentação da pasta docs
│   └── index.html             # Página principal da documentação
├── .github/
│   └── workflows/
│       ├── ci.yml             # Workflow de CI existente
│       └── deploy-gh-pages.yml # Workflow de deploy do GitHub Pages
└── README.md                  # README atualizado com link para docs
```

## ✅ Checklist de Ativação

- [ ] Fazer merge da branch para `main`
- [ ] Acessar Settings → Pages
- [ ] Configurar Source como "GitHub Actions"
- [ ] Verificar permissões do GitHub Actions (Read and write)
- [ ] Aguardar conclusão do workflow
- [ ] Acessar https://rafaelraas.github.io/Cuida/ para confirmar
- [ ] (Opcional) Configurar domínio personalizado

## 🎉 Pronto!

Após seguir estes passos, sua documentação estará disponível publicamente no GitHub Pages e será atualizada automaticamente a cada push na branch `main`.

## 📚 Recursos Adicionais

- [Documentação oficial do GitHub Pages](https://docs.github.com/pages)
- [GitHub Actions para Pages](https://github.com/actions/deploy-pages)
- [Configurar domínio personalizado](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)
