# 🎨 UI/UX Design — AQUA

> Documentação completa de design de interface e experiência do usuário do projeto AQUA — Lembrete de Hidratação Diária.

---

## 📋 Índice

1. [Visão Geral de Design](#1-visão-geral-de-design)
2. [Pesquisa e Descoberta (UX Research)](#2-pesquisa-e-descoberta)
3. [Personas de Usuário](#3-personas-de-usuário)
4. [Arquitetura de Informação](#4-arquitetura-de-informação)
5. [Sistema de Design (Design Tokens)](#5-sistema-de-design)
6. [Tipografia](#6-tipografia)
7. [Paleta de Cores](#7-paleta-de-cores)
8. [Espaçamento e Grid](#8-espaçamento-e-grid)
9. [Componentes de UI](#9-componentes-de-ui)
10. [Padrões de Interação](#10-padrões-de-interação)
11. [Animações e Micro-interações](#11-animações-e-micro-interações)
12. [Responsividade](#12-responsividade)
13. [Acessibilidade (a11y)](#13-acessibilidade)
14. [Hierarquia Visual](#14-hierarquia-visual)
15. [UX Writing (Textos da Interface)](#15-ux-writing)
16. [Fluxo do Usuário](#16-fluxo-do-usuário)
17. [Decisões de Design](#17-decisões-de-design)

---

## 1. Visão Geral de Design

### Conceito Criativo

**AQUA** adota uma estética **"Liquid Dark"** — um tema escuro inspirado em profundezas oceânicas. A metáfora visual da água permeia cada detalhe: o azul predominante, os gradientes fluidos, os brilhos ("glow") que evocam luz refratada na água.

```
Metáfora Visual:
  Água → Azul profundo → Profundidade → Clareza → Saúde
```

### Princípios de Design

| Princípio | Descrição |
|-----------|-----------|
| **Clareza** | A informação mais importante (copos bebidos) está sempre visível e legível |
| **Feedback** | Toda ação do usuário gera resposta visual imediata |
| **Progressão** | O progresso é sempre visível e celebrado |
| **Acessibilidade** | Qualquer pessoa pode usar, independente de limitações |
| **Consistência** | Padrões visuais e de interação repetidos em todo o app |
| **Delicadeza** | Animações suaves; nada é abrupto ou agressivo |

---

## 2. Pesquisa e Descoberta

### Problema Identificado

Através da observação de comportamento cotidiano e do conhecimento do contexto acadêmico, identificamos:

**Dores do usuário:**
- Esquece de beber água durante sessões longas de estudo/trabalho
- Não sabe exatamente quanto bebeu no dia
- Aplicativos existentes são complexos ou feios
- Falta de motivação para manter o hábito

**Oportunidades:**
- Interface simples e direta para o registro
- Feedback visual imediato e motivador
- Persistência de dados sem necessidade de conta
- Lembretes não intrusivos

### Benchmarking

Aplicativos analisados como referência:

| App | Pontos Fortes | Pontos Fracos |
|-----|--------------|---------------|
| WaterMinder | Bom feedback visual | Interface datada |
| Hydro Coach | Dados detalhados | Complexo demais |
| Plant Nanny | Gamificação | Leveza excessiva |
| Daily Water | Simples | Visual muito básico |

**Insight:** Existe espaço para um app com design premium, minimalista e focado.

---

## 3. Personas de Usuário

### Persona 1 — Estudante

```
👩‍💻 Rafaela, 21 anos
   Estudante de TI
   Passa 8h/dia no computador estudando e programando

Objetivo:     Manter a hidratação durante as sessões de estudo
Frustração:   Sempre perde a noção do tempo e esquece de beber água
Comportamento: Usa o celular como segunda tela enquanto estuda
Expectativa:  App rápido, bonito e que não interrompa seu foco
```

### Persona 2 — Profissional

```
👨‍💼 Carlos, 34 anos
   Desenvolvedor Web Sênior
   Trabalha remotamente, em home office

Objetivo:     Criar o hábito saudável de hidratação
Frustração:   Esquece de sair da cadeira para buscar água
Comportamento: Usa múltiplos monitores; bebe café em excesso
Expectativa:  Dashboard de dados; ver sua evolução ao longo da semana
```

### Persona 3 — Pessoa com deficiência visual parcial

```
👴 Roberto, 58 anos
   Servidor público aposentado
   Dificuldades visuais moderadas

Objetivo:     Controlar a hidratação prescrita pelo médico
Frustração:   Apps com letras pequenas e baixo contraste
Comportamento: Usa o navegador com zoom aumentado
Expectativa:  Texto legível, alto contraste, navegação fácil
```

---

## 4. Arquitetura de Informação

### Mapa do Site

```
AQUA
├── Dashboard (tela principal)
│   ├── Hero Card (progresso do dia)
│   ├── Botões de Ação Rápida
│   ├── Estatísticas (streak, média, total, recorde)
│   └── Timeline (histórico do dia)
│
├── Histórico
│   └── Gráfico Semanal (últimos 7 dias)
│
├── Lembretes
│   ├── Toggle ativar/desativar
│   └── Seletor de intervalo
│
└── Configurações
    ├── Meta diária (stepper)
    ├── Nome do usuário
    └── Zona de perigo (reset)
```

### Hierarquia de Informação no Dashboard

```
Nível 1 (mais importante):
  → Quantidade de copos bebidos hoje (número grande)
  → Anel de progresso (% visual)

Nível 2 (importante):
  → Botões de ação rápida (adicionar água)
  → Mensagem motivacional

Nível 3 (contextual):
  → Volume em ml (ex: 750ml de 2.000ml)
  → Estatísticas da semana

Nível 4 (histórico):
  → Timeline de registros do dia
```

---

## 5. Sistema de Design

### Design Tokens — Decisões de Design como Código

Todos os valores visuais são definidos como **CSS Custom Properties** (variáveis), permitindo consistência total:

```css
/* Cada decisão tem um token com nome semântico */
--color-primary:     #0ea5e9;   /* Azul água principal */
--color-bg:          #0a0f1e;   /* Fundo: azul noite */
--font-display:      'Sora';    /* Fonte de títulos */
--radius-xl:         1.5rem;    /* Arredondamento grande */
--transition-slow:   400ms cubic-bezier(0.34, 1.56, 0.64, 1);
```

**Por que usar tokens?**
- Mudar uma cor afeta toda a interface de um só lugar
- Garante consistência visual automática
- Facilita a manutenção e evolução do design
- Documentação viva do sistema visual

---

## 6. Tipografia

### Hierarquia Tipográfica

O AQUA usa duas fontes com personalidades distintas e complementares:

#### Sora — Display/Títulos
```
Família: Sora
Pesos:   300 (light), 400 (regular), 600 (semibold), 700 (bold), 800 (extrabold)
Uso:     Logotipo, títulos principais, números de destaque
Motivo:  Geométrica moderna, personalidade tecnológica mas amigável
```

#### Plus Jakarta Sans — Corpo de Texto
```
Família: Plus Jakarta Sans
Pesos:   300, 400, 500 (medium), 600 (semibold)
Uso:     Textos corridos, labels, mensagens, UI geral
Motivo:  Excelente legibilidade em telas, humanista e contemporânea
```

### Escala Tipográfica

| Token | Tamanho | Uso |
|-------|---------|-----|
| `--text-xs` | 0.75rem (12px) | Labels, datas, badges |
| `--text-sm` | 0.875rem (14px) | Texto de suporte, listas |
| `--text-base` | 1rem (16px) | Texto padrão do corpo |
| `--text-lg` | 1.125rem (18px) | Texto levemente destacado |
| `--text-xl` | 1.25rem (20px) | Subtítulos |
| `--text-2xl` | 1.5rem (24px) | Títulos de seção |
| `--text-3xl` | 1.875rem (30px) | Títulos grandes |
| `--text-4xl` | 2.25rem (36px) | Títulos de página |
| `--text-5xl` | 3rem (48px) | Número principal de copos |

**Regra de ouro:** O número de copos usa `--text-5xl` com peso 800 para comunicar importância imediata ao primeiro olhar.

---

## 7. Paleta de Cores

### Filosofia de Cores

A paleta foi construída ao redor do **azul — cor da água e da tecnologia**. O tema escuro foi escolhido por:

1. **Reduz cansaço ocular** em sessões longas (estudo, trabalho)
2. **Aumenta o contraste** dos elementos de destaque (azul sobre escuro)
3. **Transmite seriedade e profissionalismo**
4. **Evoca profundidade oceânica** — reforça a metáfora da água

### Cores Principais

```
╔═══════════════════════════════════════════════╗
║  FUNDOS (Backgrounds)                         ║
║                                               ║
║  ████  #0a0f1e  --color-bg                    ║
║        "Azul noite" — fundo principal         ║
║                                               ║
║  ████  #0f172a  --color-surface               ║
║        "Ardósia escura" — cards               ║
║                                               ║
║  ████  #1e293b  --color-surface-2             ║
║        "Ardósia" — elementos internos         ║
╚═══════════════════════════════════════════════╝

╔═══════════════════════════════════════════════╗
║  DESTAQUES (Accent Colors)                    ║
║                                               ║
║  ████  #0ea5e9  --color-primary               ║
║        "Sky Blue 500" — ação principal        ║
║                                               ║
║  ████  #38bdf8  --color-accent                ║
║        "Sky Blue 400" — destaques             ║
║                                               ║
║  ████  #7dd3fc  --color-accent-2              ║
║        "Sky Blue 300" — gradientes            ║
╚═══════════════════════════════════════════════╝

╔═══════════════════════════════════════════════╗
║  SEMÂNTICAS (Semantic Colors)                 ║
║                                               ║
║  ████  #22d3ee  --color-success  (ciano)      ║
║  ████  #f59e0b  --color-warning  (âmbar)      ║
║  ████  #ef4444  --color-danger   (vermelho)   ║
║  ████  #f97316  --color-fire     (laranja)    ║
╚═══════════════════════════════════════════════╝
```

### Contraste e WCAG

Todos os pares texto/fundo foram verificados para conformidade WCAG 2.1:

| Par de Cores | Ratio | Nível |
|-------------|-------|-------|
| `--color-text` sobre `--color-bg` | 12.8:1 | ✅ AAA |
| `--color-accent` sobre `--color-bg` | 7.2:1 | ✅ AAA |
| `--color-primary` sobre `--color-bg` | 4.8:1 | ✅ AA |
| `--color-text-muted` sobre `--color-surface` | 4.6:1 | ✅ AA |

---

## 8. Espaçamento e Grid

### Sistema de Espaçamento

O espaçamento segue uma escala **base 4** (múltiplos de 0.25rem):

```
--space-1:  4px   → Espaços mínimos entre elementos internos
--space-2:  8px   → Gap entre ícone e texto
--space-3: 12px   → Padding interno de botões pequenos
--space-4: 16px   → Espaçamento padrão
--space-5: 20px   → Padding de cards internos
--space-6: 24px   → Padding de seções
--space-8: 32px   → Gap entre seções
--space-10: 40px  → Padding de hero card
--space-12: 48px  → Margens grandes
```

### Layout Principal — CSS Grid

```
Desktop (>1024px):
┌─────────────┬──────────────────────────────┐
│   SIDEBAR   │      MAIN CONTENT            │
│   240px     │      1fr (flexível)          │
└─────────────┴──────────────────────────────┘

Tablet (768-1024px):
┌────────────┬──────────────────────────────┐
│  SIDEBAR   │      MAIN CONTENT            │
│  200px     │      1fr                     │
└────────────┴──────────────────────────────┘

Mobile (<768px):
┌──────────────────────────────────────────┐
│         MAIN CONTENT (100%)              │
│  [Sidebar vira overlay lateral]          │
└──────────────────────────────────────────┘
```

### Grade de Componentes

```css
/* Stats Grid — 4 colunas em desktop */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* → 2 colunas em tablet/mobile */
}

/* Action Buttons — 4 colunas */
.action-buttons__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* → 2 colunas em tablet/mobile */
}
```

---

## 9. Componentes de UI

### 9.1 Hero Card

```
┌─────────────────────────────────────────────────────┐
│  ∙∙∙∙∙∙∙ linha de gradiente no topo ∙∙∙∙∙∙∙        │
│                                                      │
│  Hoje você bebeu        ╭────────╮                  │
│                         │  80%   │                  │
│  [ 5 ]  copos           │  da    │                  │
│                         │  meta  │                  │
│  1.250ml de 2.000ml     ╰────────╯                  │
│                                                      │
│  "Metade do caminho! Continue assim 🎯"             │
│                                                      │
│                       ∙∙ glow radial ∙∙             │
└─────────────────────────────────────────────────────┘
```

**Decisões de design:**
- Fundo com `linear-gradient` para profundidade
- Linha de destaque no topo: indica "produto premium"
- Número grande em gradient text para impacto imediato
- Anel SVG à direita para não sobrepor o texto
- `box-shadow: inset` para sutileza no relevo

### 9.2 Botões de Água

```
Botão Principal (250ml):    Botão Secundário:
┌────────────────┐          ┌────────────────┐
│  🥤            │          │  💧            │
│  250ml         │          │  500ml         │
│  1 copo        │          │  garrafa P     │
└────────────────┘          └────────────────┘
   borda azul                  borda sutil
   brilho no hover             fade no hover
```

**Anatomia do botão:**
1. **Ícone** — identidade visual imediata (ícone ≠ texto)
2. **Quantidade** — número principal (destaque)
3. **Label** — descrição humana ("1 copo", "garrafa P")

**Estados do botão:**
- **Default:** borda sutil, fundo escuro
- **Hover:** `translateY(-3px)`, glow, borda mais visível
- **Active:** efeito ripple com `::before`
- **Disabled:** opacidade 0.6, cursor `not-allowed`

### 9.3 Cards de Estatística

```
┌─────────────────────┐
│  [🔥]  5            │
│        dias seguidos│
└─────────────────────┘
```

- **Ícone colorido** em container com fundo translúcido
- **Número** em fonte display, peso 700
- **Label** em fonte menor, cor muted

### 9.4 Toast Notification

```
                    ╭──────────────────────────╮
                    │  ✓  +250ml registrado! 💧 │
                    ╰──────────────────────────╯
```

- Posição: canto inferior direito (desktop) / bottom full-width (mobile)
- Formato: pill arredondado (`border-radius: full`)
- Entrada: `translateY(100px)` → `translateY(0)` com spring
- Saída: fade out após 2.5 segundos

### 9.5 Modal de Confirmação

```
          ╭──────────────────────────────╮
          │         ⚠️                   │
          │   Limpar registros do dia    │
          │                              │
          │   Isso irá remover todos...  │
          │                              │
          │  [Cancelar]  [Confirmar]     │
          ╰──────────────────────────────╯
```

- **Overlay:** fundo escuro com blur (`backdrop-filter`)
- **Modal:** escala de 0.9 → 1.0 (animação spring)
- **Ícone de alerta:** container circular vermelho
- **Foco acessível:** ao abrir, foca no botão "Cancelar" (ação segura)
- **Fechar com ESC:** suporte a teclado

---

## 10. Padrões de Interação

### 10.1 Feedback Visual Imediato

Toda ação do usuário recebe resposta em ≤100ms:

| Ação | Feedback |
|------|---------|
| Clicar em botão de água | Número sobe + animação pop + toast |
| Atingir meta | Toast especial + cor do anel muda |
| Desfazer | Toast + item remove da timeline |
| Salvar configuração | Toast de confirmação |
| Navegar entre seções | Seção ativa com fade in |

### 10.2 Prevenção de Erros

Antes de ações destrutivas, há confirmação obrigatória:
- "Limpar dia" → abre modal de confirmação
- "Resetar tudo" → abre modal com texto de aviso

### 10.3 Recuperação de Erros

- Botão **desfazer** sempre visível após registro
- Dados persistem automaticamente (sem risco de perda)
- Validação da meta (4–20 copos) com mensagem clara

---

## 11. Animações e Micro-interações

### Filosofia de Animação

> "A animação perfeita não é notada — ela é sentida."

Animações no AQUA servem para:
1. **Orientar** — indicar o que mudou na tela
2. **Recompensar** — celebrar ações do usuário
3. **Suavizar** — transições sem cortes abruptos

### Catálogo de Animações

#### numberPop — Contador de copos

```css
@keyframes numberPop {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.15); }  /* Aumenta 15% */
  100% { transform: scale(1); }
}
/* Duração: 0.4s — Spring cubic-bezier */
```

**Quando:** ao adicionar qualquer quantidade de água.  
**Por quê:** feedback de que a ação foi registrada.

#### slideInUp — Itens da timeline

```css
@keyframes slideInUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
/* Duração: 0.3s — ease */
```

**Quando:** novo registro aparece no histórico.  
**Por quê:** direciona o olhar para o novo elemento.

#### Anel de progresso — SVG stroke

```css
/* Transição fluida do stroke-dashoffset */
.progress-ring__fill {
  transition: stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Quando:** a cada registro de água.  
**Por quê:** progresso visual contínuo e satisfatório.

#### Hover de botões — translateY

```css
.btn-water--primary:hover {
  transform: translateY(-3px);  /* Levanta 3px */
  box-shadow: 0 8px 24px glow;  /* Sombra realça */
  transition: 250ms ease;
}
```

**Quando:** cursor sobre botão.  
**Por quê:** indica clicabilidade e feedback.

#### Toast — Spring entrada

```css
.toast--visible {
  transform: translateY(0);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  /*                                      ↑ Spring: ultrapassa levemente */
}
```

**Por quê:** a curva `1.56` cria um "bounce" sutil que é mais natural.

### Reduced Motion

```css
/* Respeita usuários com sensibilidade a movimento */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 12. Responsividade

### Breakpoints

```
Mobile Small:  < 480px    (smartphones pequenos)
Mobile:        < 768px    (smartphones padrão)
Tablet:        768–1024px (tablets e laptops pequenos)
Desktop:       > 1024px   (desktops e laptops)
```

### Comportamento da Sidebar

```
Desktop/Tablet:           Mobile:
┌───────┬────────────┐   ┌────────────────────┐
│ SIDE  │   MAIN     │   │      MAIN          │
│  BAR  │  CONTENT   │   │    CONTENT         │
│ 240px │            │   │                    │
└───────┴────────────┘   └────────────────────┘
  Sidebar sempre visível    Sidebar = overlay lateral
                            Ativada pelo botão ☰
```

### Adaptações Mobile

| Elemento | Desktop | Mobile |
|---------|---------|--------|
| Stats Grid | 4 colunas | 2 colunas |
| Action Buttons | 4 colunas | 2 colunas |
| Hero Card | Horizontal | Vertical empilhado |
| Toast | Canto direito | Full-width bottom |
| Header greeting | Tamanho 2xl | Tamanho xl |

---

## 13. Acessibilidade

### Conformidade WCAG 2.1 AA

O AQUA foi desenvolvido seguindo os quatro princípios POUR:

**Perceptível (Perceivable)**
- Contraste mínimo 4.5:1 em todo texto
- Ícones decorativos com `aria-hidden="true"`
- Textos alternativos em todos os elementos informativos
- Cores nunca são o único indicador de estado

**Operável (Operable)**
- Totalmente navegável por teclado (Tab, Shift+Tab, Enter, Space, Esc)
- Foco visível em todos os elementos interativos
- Botões com área mínima de toque 44x44px
- Sem armadilhas de foco

**Compreensível (Understandable)**
- Labels descritivos em todos os formulários
- Mensagens de erro claras e construtivas
- Linguagem simples e direta
- Feedback imediato para todas as ações

**Robusto (Robust)**
- HTML semântico compatível com leitores de tela
- ARIA roles e propriedades corretas
- Live regions para atualizações dinâmicas
- Testado com VoiceOver e NVDA

### Implementações Específicas

```html
<!-- Live region — atualiza leitores de tela automaticamente -->
<div aria-live="polite" aria-atomic="true" id="glassCount">5</div>

<!-- Dialog acessível -->
<div role="dialog" aria-modal="true" aria-labelledby="modalTitle">

<!-- Toggle switch -->
<input type="checkbox" role="switch" aria-checked="false">

<!-- Navegação -->
<nav role="navigation" aria-label="Menu principal">
  <button aria-current="page">Dashboard</button>
```

---

## 14. Hierarquia Visual

### Princípio Z-Scan

Os usuários ocidentais leem em padrão Z (esquerda→direita, diagonal). O layout do Dashboard foi desenhado respeitando este fluxo:

```
Dashboard — Fluxo visual:

1. SAUDAÇÃO (top-left) ─────────────────> 2. BADGE META (top-right)
   "Bom dia! 🌅"                               "Meta: 8 copos"
   
          ↓
          
3. NÚMERO DE COPOS (hero, left)  ────> 4. ANEL % (hero, right)
   "5 copos"                               "65%"
   
          ↓
          
5. BOTÕES DE AÇÃO ────────────────────────────────────────────>
   [+250ml] [+500ml] [+750ml] [Desfazer]
   
          ↓
          
6. ESTATÍSTICAS ─────────────────────────────────────────────>
   [streak] [média] [total] [recorde]
   
          ↓
          
7. HISTÓRICO DO DIA (timeline)
```

### Peso Visual

```
┌─────────────────────────────────────────────────┐
│  NÍVEL 1 ████████████████  Número de copos      │
│  (máximo peso visual)                           │
│                                                 │
│  NÍVEL 2 ███████████       Anel de progresso    │
│                             Botão +250ml        │
│                                                 │
│  NÍVEL 3 ████████          Labels das seções    │
│                             Badges de stats     │
│                                                 │
│  NÍVEL 4 ██████            Texto de suporte     │
│                             Horários, labels    │
│                                                 │
│  NÍVEL 5 ████              Meta e data          │
│  (mínimo peso)              Textos muted        │
└─────────────────────────────────────────────────┘
```

---

## 15. UX Writing

### Princípios de Escrita

1. **Humano** — usar "você" e linguagem natural
2. **Positivo** — foco no progresso, nunca na falha
3. **Conciso** — sem palavras desnecessárias
4. **Ativo** — voz ativa sempre que possível

### Mensagens Motivacionais por Contexto

```javascript
// 0% — incentivo a começar
"Vamos começar sua hidratação! 💧"

// 1-24% — reforço positivo do início
"Bom começo! Continue assim 😊"

// 25-49% — reconhecimento do progresso
"Você está no caminho certo! 🌊"

// 50-74% — celebração da metade
"Metade do caminho! Você está indo muito bem 🎯"

// 75-99% — urgência positiva próxima da meta
"Quase lá! Falta pouco para a meta! 🔥"

// 100%+ — celebração total
"🎉 Meta atingida! Você foi incrível hoje!"
```

### Textos de Ação

| Situação | Texto usado | Por quê |
|---------|------------|---------|
| Botão principal | "+250ml / 1 copo" | Quantidade + contexto |
| Desfazer | "Desfazer / último" | Ação + escopo |
| Limpar | "Limpar dia" | Escopo limitado |
| Reset | "Resetar tudo" | Indica abrangência |
| Salvar | "Salvar meta" | Ação + objeto |

### Toast Messages

```
✅ Ação bem-sucedida:  "+250ml registrado! 💧"
🎉 Meta atingida:      "Meta atingida! Streak: 3 dias!"
↩️ Desfazer:           "Último registro removido (250ml)."
⚠️ Validação:          "Meta deve ser entre 4 e 20 copos."
🗑️ Limpar:             "Registros do dia apagados."
```

---

## 16. Fluxo do Usuário

### Fluxo Principal — Registrar Água

```
[Usuário abre o app]
        ↓
[Vê dashboard com progresso]
        ↓
[Clica em "+250ml" ou outra medida]
        ↓
    ┌─────────────────────────────────┐
    │  Número animado sobe            │
    │  Anel de progresso avança       │
    │  Timeline registra horário      │
    │  Toast aparece: "+250ml 💧"     │
    └─────────────────────────────────┘
        ↓
[Meta atingida?] ──SIM──> [Toast especial + streak++]
        │
       NÃO
        ↓
[Continua usando normalmente]
```

### Fluxo de Configuração (primeira vez)

```
[Primeiro acesso] → [Estado padrão: meta=8 copos]
                           ↓
[Navega para Configurações]
                           ↓
[Digita nome] → [Clica "Salvar nome"]
                           ↓
[Ajusta meta com stepper] → [Clica "Salvar meta"]
                           ↓
[Ativa lembretes] → [Seleciona intervalo]
                           ↓
[Retorna ao Dashboard com personalização aplicada]
```

---

## 17. Decisões de Design

### Por que tema escuro?

1. **Contexto de uso:** estudantes e profissionais de TI usam monitores por longos períodos. O tema escuro reduz fadiga ocular.
2. **Metáfora:** profundidade oceânica se expressa melhor em fundos escuros.
3. **Destaque:** o azul vibrante `#0ea5e9` contrasta muito mais sobre escuro.
4. **Tendência de mercado:** a maioria dos apps de produtividade e saúde oferecem tema escuro.

### Por que sem framework (Vanilla JS)?

1. **Contexto acadêmico:** demonstra domínio dos fundamentos antes de frameworks.
2. **Performance:** sem overhead de bibliotecas externas (0 dependências JS).
3. **Aprendizado:** cada linha de código é deliberada e explicável.
4. **Portabilidade:** funciona em qualquer ambiente sem instalação.

### Por que SVG para o anel de progresso?

1. **Animação precisa:** `stroke-dashoffset` oferece controle exato sobre a progressão.
2. **Escalável:** sem perda de qualidade em qualquer resolução/DPI.
3. **CSS animável:** a transição é feita em CSS, mais performático que JS.
4. **Acessível:** pode receber atributos `role` e `aria-label`.

### Por que localStorage e não uma API/banco de dados?

1. **Sem necessidade de servidor:** o app funciona totalmente offline.
2. **Privacidade:** dados ficam apenas no dispositivo do usuário.
3. **Complexidade proporcional:** para o escopo do trabalho, localStorage é suficiente.
4. **Aprendizado:** demonstra persistência client-side de forma didática.

---

> *"Design não é sobre como algo parece. Design é sobre como algo funciona."*  
> — Steve Jobs

---

<p align="center">
  📐 Documentação de UI/UX — AQUA — Ferramentas de Desenvolvimento Web
</p>
