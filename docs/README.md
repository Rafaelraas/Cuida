# Documentação GitHub Pages

Esta pasta contém os arquivos estáticos que são servidos pelo GitHub Pages.

## 🌐 Acesso

A documentação está disponível em: https://rafaelraas.github.io/Cuida/

## 📝 Conteúdo

- `index.html` - Página principal da documentação com links para todos os documentos do projeto

## 🚀 Deploy

O deploy é feito automaticamente via GitHub Actions sempre que há um push na branch `main`.

Veja o workflow em: `.github/workflows/deploy-gh-pages.yml`

## ✏️ Como Atualizar

Para atualizar a documentação:

1. Edite o arquivo `docs/index.html` ou adicione novos arquivos HTML/CSS/JS na pasta `docs/`
2. Faça commit e push das mudanças para a branch `main`
3. O GitHub Actions irá automaticamente fazer o deploy

## 🎨 Personalização

O arquivo `index.html` contém todo o CSS inline para facilitar a manutenção. Para personalizar:

- Edite as variáveis CSS em `:root` para alterar cores
- Modifique o HTML para adicionar/remover seções
- Adicione novos cards para novos documentos

## 📚 Documentos Linkados

A página principal faz links para os seguintes documentos do repositório:

- README.md
- QUICKSTART.md
- SETUP.md
- ARCHITECTURE.md
- API.md
- SPRINTS.md
- GETTING_STARTED.md
- CONTRIBUTING.md
- DEPLOYMENT_STATUS.md
- CHANGELOG.md
- LICENSE

Todos os links apontam diretamente para os arquivos no GitHub para garantir que sempre mostrem a versão mais atualizada.
