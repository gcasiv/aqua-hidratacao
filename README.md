# 💧 AQUA — Lembrete de Hidratação Diária

> Disciplina: **Ferramentas de Desenvolvimento Web**  
> Professor: **Miguel Carvalho**  
> Trabalho: **Escrita e Reflexão — Proposta de Trabalho**

---

## 📋 Índice

- [Sobre o Projeto (Questão A)](#-sobre-o-projeto--questão-a-)
- [Classificação da Inovação (Questão B)](#-classificação-da-inovação--questão-b-)
- [Demonstração](#-demonstração)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Executar](#-como-executar)
- [Acessibilidade](#-acessibilidade)
- [Código (Questão C)](#-código--questão-c-)
- [Conexão com as Habilidades do Futuro](#-conexão-com-as-habilidades-do-futuro)
- [Autor](#-autor)

---

## 💡 Sobre o Projeto — Questão A

### Identificação do Problema

Muitas pessoas esquecem de se hidratar adequadamente durante o dia de trabalho ou estudo. A desidratação, mesmo leve, afeta diretamente:

- 🧠 **Desempenho cognitivo** — concentração, memória e raciocínio
- 💪 **Desempenho físico** — disposição e energia
- ❤️ **Saúde a longo prazo** — funcionamento dos órgãos
- 😴 **Humor e bem-estar** — ansiedade e irritabilidade

Segundo a Organização Mundial da Saúde, o consumo diário recomendado é de aproximadamente **2 litros** de água para adultos, o equivalente a **8 copos de 250ml**. No entanto, pesquisas mostram que mais de **60% dos brasileiros** não atingem essa meta diariamente.

### Proposta de Solução

Desenvolver o **AQUA** — uma aplicação web progressiva que funciona como um acompanhante de hidratação. O usuário registra sua ingestão de água, acompanha seu progresso visualmente e recebe lembretes inteligentes, tudo em uma interface elegante e acessível.

---

## 🏷️ Classificação da Inovação — Questão B

A solução **AQUA** se classifica como uma **Inovação Incremental de Processo**, pois:

| Critério | Análise |
|----------|---------|
| **Tipo** | Incremental — melhora um comportamento existente (beber água) |
| **Natureza** | De processo — automatiza e organiza um hábito cotidiano |
| **Impacto** | Gradual — promove mudanças de comportamento progressivas |
| **Mercado** | Já existem aplicativos similares; o AQUA agrega valor com UX superior |
| **Tecnologia** | Usa tecnologias conhecidas (HTML, CSS, JS) de forma inovadora |

> **Por que não é uma inovação radical?**  
> A ideia de lembrar de beber água não é nova. O que o AQUA faz é tornar este processo **mais eficiente, acessível e agradável**, usando design, animações e persistência de dados para criar um produto com experiência superior ao que existe atualmente.

Referência estudada: [Ideia, Criatividade, Invenção, Inovação e Difusão](https://www.youtube.com/watch?v=g0lEyvvAm6s)

---

## 🖥️ Demonstração

```
┌─────────────────────────────────────────────────────────┐
│  💧 AQUA          Dashboard                             │
├──────────┬──────────────────────────────────────────────┤
│          │  Bom dia! 🌅                                 │
│ Dashboard│  terça-feira, 10 de junho de 2025            │
│          │                                              │
│ Histórico│  ┌────────────────────────────────────────┐  │
│          │  │  Hoje você bebeu   [  Anel 65%  ]      │  │
│ Lembretes│  │       5            [   ████    ]       │  │
│          │  │     copos          [  65% da   ]       │  │
│ Configur.│  │  1.250ml/2.000ml   [   meta    ]       │  │
│          │  └────────────────────────────────────────┘  │
│ 👤 Perfil│                                              │
│ 🔥 3 dias│  [+250ml] [+500ml] [+750ml] [Desfazer]      │
│          │                                              │
│          │  🔥 3 dias  📊 5 média  💧 8.5L  ⭐ 8 melhor │
└──────────┴──────────────────────────────────────────────┘
```

---

## ✨ Funcionalidades

### Funcionalidades Principais
- **Registro rápido** de água em três medidas: 250ml (copo), 500ml e 750ml
- **Anel de progresso** SVG animado mostrando % da meta atingida
- **Contador visual** com animação ao registrar
- **Mensagens motivacionais** dinâmicas e contextuais

### Funcionalidades Avançadas
- 💾 **Persistência de dados** via localStorage — seus dados são salvos
- 🔄 **Desfazer** o último registro com um clique
- 📅 **Histórico diário** com horário de cada registro
- 📊 **Gráfico semanal** de barras com os últimos 7 dias
- 🔥 **Streak** — contador de dias consecutivos com meta atingida
- 📈 **Estatísticas**: média semanal, total em litros, melhor dia
- ⚙️ **Meta configurável** — de 4 a 20 copos por dia
- 👤 **Nome personalizado** para saudação contextual
- 🔔 **Lembretes** com intervalo configurável (30min a 2h)
- 🗑️ **Limpar dia** ou **resetar tudo** com confirmação de segurança

### Experiência de Usuário
- 🌙 **Tema escuro** elegante e moderno
- 📱 **Totalmente responsivo** — mobile, tablet e desktop
- ♿ **Acessível** — ARIA, foco visível, contraste AA, reduced motion
- 🎨 **Animações** suaves e micro-interações
- 🔔 **Toast notifications** não intrusivas

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|-----------|--------|-----------|
| **HTML5** | — | Estrutura semântica e acessível |
| **CSS3** | — | Estilização, animações e responsividade |
| **JavaScript** | ES2020 | Lógica, estado e persistência |
| **Remixicon** | 4.3.0 | Biblioteca de ícones via CDN |
| **Google Fonts** | — | Sora (display) + Plus Jakarta Sans (corpo) |

> **Sem dependências de framework!** O projeto usa apenas HTML, CSS e JavaScript puro (Vanilla JS), demonstrando que é possível criar aplicações profissionais sem bibliotecas externas.

---

## 📁 Estrutura do Projeto

```
aqua-hidratacao/
│
├── index.html          # Estrutura HTML semântica e acessível
├── style.css           # Estilos, variáveis CSS e responsividade
├── script.js           # Lógica da aplicação, estado e eventos
│
├── docs/
│   ├── SETUP.md        # Guia de inicialização e deploy
│   └── UI-UX.md        # Documentação de design UI/UX
│
└── README.md           # Este arquivo
```

### Organização do JavaScript (script.js)

```
script.js
├── 1. ESTADO GLOBAL        — Fonte única de verdade (state object)
├── 2. CONSTANTES           — Mensagens, chaves, valores fixos
├── 3. PERSISTÊNCIA         — saveState(), loadState(), resetAllData()
├── 4. UTILITÁRIOS          — Datas, formatação, cálculos
├── 5. MÓDULO UI            — renderAll(), renderHeader(), renderHeroCard()
├── 6. MÓDULO PROGRESSO     — renderProgressRing() com SVG animado
├── 7. MÓDULO TIMELINE      — renderTimeline() com histórico do dia
├── 8. MÓDULO ESTATÍSTICAS  — renderStats(), renderWeeklyChart()
├── 9. MÓDULO TOAST         — showToast() com fila e timeout
├── 10. MÓDULO MODAL        — openModal(), closeModal(), confirmModal()
├── 11. MÓDULO LEMBRETES    — startReminder(), stopReminder()
├── 12. MÓDULO NAVEGAÇÃO    — navigateTo(), toggleMobileSidebar()
├── 13. EVENT HANDLERS      — addWater(), undoLastEntry(), clearDay()...
└── 14. INICIALIZAÇÃO       — DOMContentLoaded bootstrap
```

---

## 🚀 Como Executar

### Método 1 — Abrir diretamente (mais simples)

1. Faça o download ou clone o repositório
2. Abra o arquivo `index.html` no seu navegador
3. Pronto! A aplicação funciona sem servidor

> ✅ Funciona em: Chrome, Firefox, Edge, Safari (versões modernas)

### Método 2 — Live Server (recomendado para desenvolvimento)

Veja o arquivo [`docs/SETUP.md`](docs/SETUP.md) para o guia completo com:
- Instalação do VS Code
- Extensão Live Server
- Criação do repositório no GitHub
- Comandos Git para commits

---

## ♿ Acessibilidade

O AQUA foi desenvolvido seguindo as diretrizes **WCAG 2.1 nível AA**:

| Critério | Implementação |
|---------|--------------|
| **Contraste** | Ratio mínimo 4.5:1 em todo o texto |
| **Foco visível** | Outline azul em todos os elementos interativos |
| **ARIA labels** | Todos os botões e seções com labels descritivos |
| **Roles** | `role="navigation"`, `role="main"`, `role="alert"`, `role="dialog"` |
| **Live regions** | `aria-live="polite"` para atualizações dinâmicas |
| **Reduced motion** | Animações desativadas para `prefers-reduced-motion` |
| **Teclado** | Navegação completa via Tab e atalhos |
| **Semântica** | HTML5 semântico: `<header>`, `<main>`, `<aside>`, `<section>` |

---

## 💻 Código — Questão C

Abaixo, um trecho representativo do núcleo da aplicação:

### Registro de água (`script.js`)

```javascript
function addWater(ml) {
  const glasses = ml / ML_PER_GLASS;

  state.glassesToday += glasses;
  state.mlToday      += ml;

  const entry = {
    ml,
    time:       getTimeNow(),
    totalAfter: state.mlToday,
  };

  state.todayLog.push(entry);

  // Verifica meta e incrementa streak
  const justReachedGoal = state.glassesToday >= state.dailyGoal
    && (state.glassesToday - glasses) < state.dailyGoal;

  if (justReachedGoal) {
    state.streak++;
    showToast(`🎉 Meta atingida! Streak: ${state.streak} dias!`);
  }

  saveState();
  renderAll();
}
```

### Anel de progresso (`script.js`)

```javascript
function renderProgressRing() {
  const ring = document.getElementById('progressRing');
  const pct  = Math.min(1, state.glassesToday / state.dailyGoal);
  const offset = RING_CIRCUMFERENCE - (pct * RING_CIRCUMFERENCE);

  ring.style.strokeDashoffset = offset; // Anima via CSS transition
}
```

### Variáveis CSS (`style.css`)

```css
:root {
  --color-primary:  #0ea5e9;
  --color-accent:   #38bdf8;
  --font-display:   'Sora', sans-serif;
  --transition-slow: 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 🎯 Conexão com as Habilidades do Futuro

Com base no **Texto 2** (Fórum Econômico Mundial), o AQUA exercita:

| # | Habilidade | Como o projeto a pratica |
|---|-----------|--------------------------|
| 2 | **Pensamento analítico e inovação** | Identificar um problema real e propor solução digital |
| 3 | **Criatividade, originalidade e iniciativa** | Design diferenciado; solução autoral |
| 6 | **Pensamento crítico** | Avaliar tecnologias e escolhas arquiteturais |
| 9 | **Programação** | HTML, CSS, JavaScript puro estruturado |
| 12 | **Experiência do usuário** | Foco em acessibilidade, responsividade e UX |
| 13 | **Uso e controle de tecnologias** | localStorage, Web Notifications API, CSS Grid |
| 14 | **Análise e avaliação de sistemas** | Organização modular do código; separação de responsabilidades |

---

## 👤 Autor

Trabalho acadêmico desenvolvido para a disciplina **Ferramentas de Desenvolvimento Web**.

> *"O analfabeto do século 21 não será aquele que não consegue ler e escrever, mas aquele que não consegue aprender, desaprender e reaprender."*  
> — **Alvin Toffler**

---

<p align="center">
  Feito com 💧 e muito carinho para a disciplina de Ferramentas de Desenvolvimento Web
</p>
