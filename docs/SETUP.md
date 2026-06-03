# 🚀 Guia de Inicialização — AQUA

> Passo a passo completo: do zero ao projeto rodando e publicado no GitHub.

---

## 📋 Índice

1. [Pré-requisitos](#1-pré-requisitos)
2. [Configurar o VS Code](#2-configurar-o-vs-code)
3. [Estrutura de Pastas](#3-estrutura-de-pastas)
4. [Criar os Arquivos do Projeto](#4-criar-os-arquivos-do-projeto)
5. [Executar Localmente](#5-executar-localmente)
6. [Instalar e Configurar o Git](#6-instalar-e-configurar-o-git)
7. [Criar o Repositório no GitHub](#7-criar-o-repositório-no-github)
8. [Conectar o Projeto ao GitHub](#8-conectar-o-projeto-ao-github)
9. [Fluxo de Commits](#9-fluxo-de-commits)
10. [Boas Práticas de Git](#10-boas-práticas-de-git)
11. [Publicar com GitHub Pages](#11-publicar-com-github-pages)
12. [Linguagens Utilizadas](#12-linguagens-utilizadas)
13. [Perguntas Frequentes](#13-perguntas-frequentes)

---

## 1. Pré-requisitos

Antes de começar, você precisará instalar as seguintes ferramentas:

### 1.1 Node.js (necessário para extensões do VS Code)

1. Acesse [https://nodejs.org](https://nodejs.org)
2. Baixe a versão **LTS** (Long Term Support — mais estável)
3. Execute o instalador e siga as instruções
4. Verifique a instalação abrindo o terminal:

```bash
node --version
# Deve exibir algo como: v20.11.0

npm --version
# Deve exibir algo como: 10.2.4
```

### 1.2 Git

1. Acesse [https://git-scm.com/downloads](https://git-scm.com/downloads)
2. Baixe o instalador para seu sistema operacional
3. Execute e aceite as configurações padrão
4. Verifique:

```bash
git --version
# Deve exibir: git version 2.xx.x
```

### 1.3 Visual Studio Code

1. Acesse [https://code.visualstudio.com](https://code.visualstudio.com)
2. Baixe e instale para seu sistema operacional
3. Abra o VS Code após a instalação

---

## 2. Configurar o VS Code

### 2.1 Extensões Recomendadas

Instale as extensões clicando no ícone de blocos (Extensions) na barra lateral, ou usando `Ctrl+Shift+X`:

| Extensão | Finalidade |
|---------|-----------|
| **Live Server** (Ritwick Dey) | Servidor local com reload automático |
| **Prettier** | Formatação automática de código |
| **ESLint** | Verificação de erros no JavaScript |
| **Auto Rename Tag** | Renomeia tags HTML automaticamente |
| **GitLens** | Visualização avançada do histórico Git |
| **IntelliCode** | Sugestões inteligentes de código |

### 2.2 Instalar Live Server

1. Pressione `Ctrl+Shift+X`
2. Pesquise "Live Server"
3. Clique em **Install** na extensão de Ritwick Dey
4. Aguarde a instalação

### 2.3 Configurar o Prettier (opcional)

1. Abra as configurações: `Ctrl+,`
2. Pesquise "format on save"
3. Marque **Editor: Format On Save**

---

## 3. Estrutura de Pastas

Crie a seguinte estrutura de diretórios no seu computador:

```
📁 aqua-hidratacao/          ← Pasta raiz do projeto
│
├── 📄 index.html            ← Estrutura da página
├── 📄 style.css             ← Estilos visuais
├── 📄 script.js             ← Lógica da aplicação
├── 📄 README.md             ← Documentação principal
│
└── 📁 docs/                 ← Documentação adicional
    ├── 📄 SETUP.md          ← Este arquivo
    └── 📄 UI-UX.md          ← Design e UX
```

### Como criar a pasta

**Windows:**
```
1. Abra o Explorador de Arquivos
2. Navegue até Documentos (ou onde preferir)
3. Clique com botão direito → Nova Pasta
4. Nomeie como "aqua-hidratacao"
```

**Mac / Linux:**
```bash
mkdir -p ~/Documents/aqua-hidratacao/docs
cd ~/Documents/aqua-hidratacao
```

---

## 4. Criar os Arquivos do Projeto

### 4.1 Abrir a pasta no VS Code

```
1. Abra o VS Code
2. Vá em File → Open Folder (Ctrl+K, Ctrl+O)
3. Selecione a pasta "aqua-hidratacao"
4. Clique em "Select Folder"
```

### 4.2 Criar os arquivos

No VS Code, use o ícone de **New File** no painel Explorer:

```
1. Clique no ícone de novo arquivo (ou pressione Ctrl+N e Ctrl+S)
2. Crie: index.html
3. Crie: style.css
4. Crie: script.js
5. Crie: README.md
6. Dentro de docs/, crie: SETUP.md e UI-UX.md
```

> 💡 **Dica:** Você pode abrir um terminal integrado no VS Code com `Ctrl+`` (backtick) e criar os arquivos via linha de comando.

```bash
# No terminal integrado do VS Code:
touch index.html style.css script.js README.md
mkdir docs && touch docs/SETUP.md docs/UI-UX.md
```

---

## 5. Executar Localmente

### 5.1 Com Live Server (recomendado)

1. Abra o arquivo `index.html` no VS Code
2. Clique com o botão direito no editor
3. Selecione **"Open with Live Server"**
4. O navegador abrirá automaticamente em `http://127.0.0.1:5500`

> ✅ **Live Server** recarrega a página automaticamente ao salvar qualquer arquivo!

### 5.2 Abrindo diretamente no navegador

1. No Explorador de Arquivos, encontre `index.html`
2. Clique duas vezes no arquivo
3. Ele abrirá no seu navegador padrão

> ⚠️ Esta forma funciona para este projeto, mas projetos que usam `fetch()` ou módulos ES6 precisam de um servidor local.

---

## 6. Instalar e Configurar o Git

### 6.1 Configurar identidade no Git

Abra o terminal e configure seu nome e e-mail (estes dados aparecerão nos commits):

```bash
git config --global user.name "Seu Nome Aqui"
git config --global user.email "seu@email.com"
```

### 6.2 Configurar editor padrão (opcional)

```bash
# Usar VS Code como editor padrão do Git
git config --global core.editor "code --wait"
```

### 6.3 Verificar configurações

```bash
git config --list
# Exibe todas as configurações salvas
```

---

## 7. Criar o Repositório no GitHub

### 7.1 Criar conta no GitHub

1. Acesse [https://github.com](https://github.com)
2. Clique em **Sign Up**
3. Preencha usuário, e-mail e senha
4. Verifique seu e-mail

### 7.2 Criar novo repositório

1. Clique no botão **+** (canto superior direito)
2. Selecione **New repository**
3. Preencha:
   - **Repository name:** `aqua-hidratacao`
   - **Description:** `💧 Aplicação web de lembrete de hidratação diária - Trabalho Acadêmico`
   - **Visibility:** Public (ou Private)
   - ❌ **NÃO** marque "Add a README file" (já temos o nosso)
   - ❌ **NÃO** marque "Add .gitignore"
4. Clique em **Create repository**

> Após criar, o GitHub exibirá instruções. Guarde a URL do repositório, que será algo como:
> `https://github.com/seu-usuario/aqua-hidratacao.git`

---

## 8. Conectar o Projeto ao GitHub

Abra o terminal na pasta do projeto (use o terminal integrado do VS Code):

### 8.1 Inicializar repositório Git local

```bash
# Certifique-se de estar dentro da pasta do projeto
cd ~/Documents/aqua-hidratacao

# Inicializa o repositório Git
git init
```

### 8.2 Criar arquivo .gitignore

```bash
# Cria o arquivo .gitignore
echo ".DS_Store" > .gitignore
echo "node_modules/" >> .gitignore
echo "*.log" >> .gitignore
```

### 8.3 Fazer o primeiro commit

```bash
# Adiciona todos os arquivos ao "staging area"
git add .

# Cria o primeiro commit
git commit -m "feat: inicializa projeto AQUA - lembrete de hidratação"
```

### 8.4 Renomear branch principal

```bash
# GitHub usa "main" como branch padrão (não mais "master")
git branch -M main
```

### 8.5 Conectar ao GitHub e enviar

```bash
# Substitua pela URL do seu repositório!
git remote add origin https://github.com/seu-usuario/aqua-hidratacao.git

# Envia o código para o GitHub
git push -u origin main
```

> 💡 O terminal pode solicitar seu usuário e senha do GitHub. Se tiver autenticação de dois fatores ativada, use um **Personal Access Token** no lugar da senha.

---

## 9. Fluxo de Commits

### 9.1 Ciclo básico de trabalho

```bash
# 1. Verifica o estado dos arquivos modificados
git status

# 2. Adiciona arquivos específicos ao staging
git add index.html style.css
# ou adiciona tudo:
git add .

# 3. Cria o commit com mensagem descritiva
git commit -m "tipo: descrição breve da mudança"

# 4. Envia para o GitHub
git push
```

### 9.2 Convenção de mensagens de commit (Conventional Commits)

Use prefixos para indicar o tipo de mudança:

| Prefixo | Quando usar | Exemplo |
|---------|------------|---------|
| `feat:` | Nova funcionalidade | `feat: adiciona gráfico semanal` |
| `fix:` | Correção de bug | `fix: corrige contagem negativa ao desfazer` |
| `style:` | Mudança visual (CSS) | `style: ajusta cores do tema escuro` |
| `refactor:` | Refatoração de código | `refactor: organiza funções do módulo de UI` |
| `docs:` | Documentação | `docs: atualiza README com instruções de uso` |
| `chore:` | Tarefas de configuração | `chore: cria arquivo .gitignore` |
| `a11y:` | Acessibilidade | `a11y: adiciona aria-labels nos botões` |

### 9.3 Exemplo de histórico de commits do projeto

```bash
git log --oneline
# Saída esperada:
# a3f7d91 feat: adiciona lembretes com Web Notifications API
# 2c18e44 feat: implementa streak de dias consecutivos
# 9b4e12f feat: adiciona gráfico semanal na seção histórico
# 6d72a8f style: aprimora hero card com gradiente e glow
# 4f93b1c feat: implementa persistência com localStorage
# 8e51d07 feat: adiciona botão desfazer último registro
# 3a29c62 feat: cria anel de progresso SVG animado
# 1b87f30 feat: estrutura inicial HTML semântico e CSS base
# 0c41e1e chore: inicializa projeto e cria .gitignore
```

### 9.4 Comandos Git úteis

```bash
# Ver histórico de commits detalhado
git log

# Ver histórico compacto (uma linha por commit)
git log --oneline

# Ver diferenças dos arquivos modificados
git diff

# Desfazer modificações em um arquivo (cuidado!)
git checkout -- nome-do-arquivo.css

# Ver branches disponíveis
git branch

# Criar e mudar para uma nova branch
git checkout -b feature/nova-funcionalidade

# Voltar para a branch main
git checkout main

# Buscar atualizações do GitHub
git pull

# Ver o histórico de forma gráfica
git log --oneline --graph
```

---

## 10. Boas Práticas de Git

### ✅ Faça commits pequenos e frequentes

```bash
# Bom: commit focado em UMA mudança
git commit -m "feat: adiciona toast de notificação"

# Evite: commit com muitas mudanças misturadas
git commit -m "várias coisas"
```

### ✅ Escreva mensagens claras

```bash
# Bom: explica O QUE e POR QUÊ
git commit -m "fix: corrige progresso negativo ao usar desfazer repetidamente"

# Evite: vago e sem contexto
git commit -m "fix bug"
```

### ✅ Nunca commit credenciais ou senhas

```bash
# Adicione ao .gitignore:
echo ".env" >> .gitignore
echo "config/secrets.js" >> .gitignore
```

### ✅ Use `.gitignore` corretamente

```gitignore
# .gitignore — arquivos que o Git deve ignorar

# Sistema operacional
.DS_Store
Thumbs.db

# Dependências
node_modules/

# Logs
*.log
npm-debug.log*

# Variáveis de ambiente
.env
.env.local

# Editor
.vscode/settings.json
.idea/
```

---

## 11. Publicar com GitHub Pages

O **GitHub Pages** permite publicar seu site gratuitamente em uma URL pública.

### 11.1 Ativar GitHub Pages

1. Acesse seu repositório no GitHub
2. Clique em **Settings** (ícone de engrenagem)
3. No menu lateral, clique em **Pages**
4. Em **Source**, selecione **Deploy from a branch**
5. Em **Branch**, selecione **main** e pasta **/ (root)**
6. Clique em **Save**

### 11.2 Acessar o site publicado

Após alguns minutos, seu site estará disponível em:

```
https://seu-usuario.github.io/aqua-hidratacao/
```

> 🌐 **Atenção:** A URL leva alguns minutos para ficar ativa após a ativação.

---

## 12. Linguagens Utilizadas

### HTML5 — Estrutura

O **HTML** (HyperText Markup Language) define a estrutura e o conteúdo da página.

```html
<!-- Exemplo de elemento HTML semântico -->
<main role="main">
  <section aria-label="Dashboard">
    <h1>Bom dia!</h1>
    <button aria-label="Adicionar 250ml">+250ml</button>
  </section>
</main>
```

**Principais conceitos usados:**
- Tags semânticas: `<header>`, `<main>`, `<aside>`, `<section>`, `<nav>`
- Atributos ARIA para acessibilidade
- SVG inline para o anel de progresso
- Links para CSS externo e script JS

### CSS3 — Estilo

O **CSS** (Cascading Style Sheets) controla a apresentação visual.

```css
/* Variáveis CSS */
:root {
  --color-primary: #0ea5e9;
}

/* Grid Layout */
#app {
  display: grid;
  grid-template-columns: 240px 1fr;
}

/* Animação */
@keyframes slideInUp {
  from { transform: translateY(10px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}
```

**Principais conceitos usados:**
- Custom Properties (variáveis CSS)
- CSS Grid e Flexbox para layout
- Media Queries para responsividade
- Animações com `@keyframes` e `transition`
- Pseudo-elementos `::before` e `::after`

### JavaScript (ES2020) — Comportamento

O **JavaScript** adiciona interatividade e lógica à página.

```javascript
// Módulo padrão com estado, persistência e renderização
const state = { glassesToday: 0 };

function addWater(ml) {
  state.glassesToday += ml / 250;
  localStorage.setItem('aqua_data', JSON.stringify(state));
  renderAll();
}

document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  renderAll();
});
```

**Principais conceitos usados:**
- Estado global (state management)
- `localStorage` para persistência
- `addEventListener` para eventos
- Manipulação do DOM
- Template literals e Arrow functions
- Módulos funcionais organizados

---

## 13. Perguntas Frequentes

### ❓ "Meus dados somem ao fechar o navegador?"

Não! O AQUA salva os dados no `localStorage` do navegador. Eles persistem mesmo após fechar. Somente ao clicar em "Resetar tudo" ou limpar os dados do navegador os dados serão perdidos.

### ❓ "Posso usar em celular?"

Sim! O AQUA é totalmente responsivo. Basta acessar via navegador do celular.

### ❓ "Precisa de internet para funcionar?"

Apenas para carregar as fontes e ícones da internet (Google Fonts e Remixicon). A lógica da aplicação roda completamente offline.

### ❓ "Como fazer o push se o GitHub pede senha?"

Use um **Personal Access Token**:
1. GitHub → Settings → Developer settings → Personal access tokens
2. Gere um token com permissão `repo`
3. Use o token no lugar da senha

### ❓ "Dá erro de CORS ao abrir o index.html?"

Isso ocorre quando o navegador bloqueia recursos locais. Use o **Live Server** do VS Code para resolver.

---

> 💡 **Dúvidas?** Consulte a [documentação oficial do Git](https://git-scm.com/doc) ou o [GitHub Docs](https://docs.github.com).
