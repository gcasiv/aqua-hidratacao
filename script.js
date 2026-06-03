/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║           AQUA — Script Principal da Aplicação           ║
 * ║  Arquivo: script.js                                      ║
 * ║  Disciplina: Ferramentas de Desenvolvimento Web          ║
 * ║  Professor: Miguel Carvalho                              ║
 * ╚══════════════════════════════════════════════════════════╝
 *
 * Índice de Módulos:
 *  1. ESTADO GLOBAL (State Management)
 *  2. CONSTANTES & MENSAGENS
 *  3. PERSISTÊNCIA (localStorage)
 *  4. UTILITÁRIOS (datas, formatação)
 *  5. MÓDULO DE UI (renderização)
 *  6. MÓDULO DE PROGRESSO (anel SVG)
 *  7. MÓDULO DE TIMELINE (histórico)
 *  8. MÓDULO DE ESTATÍSTICAS (métricas)
 *  9. MÓDULO DE TOAST (notificações)
 * 10. MÓDULO DE MODAL (confirmações)
 * 11. MÓDULO DE LEMBRETES (notificações periódicas)
 * 12. MÓDULO DE NAVEGAÇÃO (sidebar)
 * 13. MANIPULADORES DE EVENTOS (Event Handlers)
 * 14. INICIALIZAÇÃO (DOMContentLoaded)
 */


/* ============================================================
   1. ESTADO GLOBAL — Fonte única de verdade da aplicação
   Todos os dados são mantidos aqui e persistidos no localStorage
   ============================================================ */

/** @type {AppState} — Objeto central de estado da aplicação */
const state = {
  /** Número de copos (250ml) bebidos hoje */
  glassesToday: 0,

  /** Volume total ingerido hoje em ml */
  mlToday: 0,

  /** Meta diária em número de copos */
  dailyGoal: 8,

  /** Histórico de registros do dia atual (array de objetos) */
  todayLog: [],

  /** Histórico dos últimos 7 dias { "YYYY-MM-DD": { glasses, ml } } */
  weekHistory: {},

  /** Sequência de dias com meta atingida */
  streak: 0,

  /** Data atual no formato YYYY-MM-DD */
  today: '',

  /** Nome do usuário para personalização */
  userName: '',

  /** Último registro para funcionalidade de desfazer */
  lastEntry: null,

  /** Referência ao intervalo de lembrete (setInterval) */
  reminderInterval: null,

  /** Configurações de lembrete */
  reminderActive: false,
  reminderMinutes: 60,
};


/* ============================================================
   2. CONSTANTES & MENSAGENS
   ============================================================ */

/** Chave de armazenamento no localStorage */
const STORAGE_KEY = 'aqua_app_data';

/** Circunferência do anel SVG (2π × raio = 2π × 80 ≈ 502) */
const RING_CIRCUMFERENCE = 502;

/** Volume por copo em mililitros */
const ML_PER_GLASS = 250;

/** Mensagens motivacionais dinâmicas por nível de progresso */
const MESSAGES = {
  /** 0% de progresso */
  start: [
    'Vamos começar sua hidratação! 💧',
    'O primeiro copo é sempre o mais difícil. Vai lá!',
    'Seu corpo precisa de água. Comece agora! 💪',
  ],
  /** 1–24% */
  low: [
    'Bom começo! Continue assim 😊',
    'Cada gota conta! Beba mais um pouquinho.',
    'Ótimo início! Mantenha o ritmo.',
  ],
  /** 25–49% */
  quarter: [
    'Você está no caminho certo! 🌊',
    '25% concluído! Continue hidratando.',
    'Seu corpo agradece cada gole! 💦',
  ],
  /** 50–74% */
  half: [
    'Metade do caminho! Você está indo muito bem 🎯',
    'Impressionante! Já passou da metade.',
    'Parabéns! Continue nesse ritmo incrível!',
  ],
  /** 75–99% */
  almost: [
    'Quase lá! Falta pouco para a meta! 🔥',
    'Você está arrasando! Um pouquinho mais!',
    'Incrível! A linha de chegada está próxima! ⚡',
  ],
  /** 100%+ */
  done: [
    '🎉 Meta atingida! Você foi incrível hoje!',
    '🏆 Parabéns! Seu corpo está super hidratado!',
    '⭐ Missão cumprida! Você é um exemplo de saúde!',
  ],
};

/** Nomes dos dias da semana em português */
const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];


/* ============================================================
   3. PERSISTÊNCIA — Funções de leitura e escrita no localStorage
   ============================================================ */

/**
 * Salva o estado completo no localStorage.
 * Chamado após qualquer alteração de dados.
 */
function saveState() {
  try {
    const dataToSave = {
      dailyGoal:     state.dailyGoal,
      weekHistory:   state.weekHistory,
      streak:        state.streak,
      today:         state.today,
      todayLog:      state.todayLog,
      glassesToday:  state.glassesToday,
      mlToday:       state.mlToday,
      userName:      state.userName,
      reminderActive: state.reminderActive,
      reminderMinutes: state.reminderMinutes,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (error) {
    console.error('[AQUA] Erro ao salvar estado:', error);
  }
}

/**
 * Carrega o estado salvo do localStorage.
 * Se não houver dados, mantém os valores padrão do state.
 */
function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return; // Primeiro acesso — sem dados para carregar

    const data = JSON.parse(saved);

    // Restaura os dados persistidos no estado global
    state.dailyGoal      = data.dailyGoal     ?? 8;
    state.weekHistory    = data.weekHistory    ?? {};
    state.streak         = data.streak        ?? 0;
    state.userName       = data.userName      ?? '';
    state.reminderActive = data.reminderActive ?? false;
    state.reminderMinutes = data.reminderMinutes ?? 60;

    // Verifica se os dados do dia ainda são de hoje
    const todayKey = getTodayKey();

    if (data.today === todayKey) {
      // Mesmo dia — restaura o progresso do dia
      state.glassesToday = data.glassesToday ?? 0;
      state.mlToday      = data.mlToday      ?? 0;
      state.todayLog     = data.todayLog      ?? [];
    } else {
      // Novo dia — salva o histórico do dia anterior e reseta o progresso
      if (data.today && (data.glassesToday > 0)) {
        state.weekHistory[data.today] = {
          glasses: data.glassesToday,
          ml:      data.mlToday,
        };
      }
      state.glassesToday = 0;
      state.mlToday      = 0;
      state.todayLog     = [];

      // Verifica se o streak foi quebrado (dia ignorado)
      checkStreak(data.today);
    }
  } catch (error) {
    console.error('[AQUA] Erro ao carregar estado:', error);
  }
}

/**
 * Reseta TODOS os dados da aplicação.
 * Apaga localStorage e reinicia o estado.
 */
function resetAllData() {
  localStorage.removeItem(STORAGE_KEY);

  // Redefine o estado para valores padrão
  state.glassesToday   = 0;
  state.mlToday        = 0;
  state.dailyGoal      = 8;
  state.todayLog       = [];
  state.weekHistory    = {};
  state.streak         = 0;
  state.userName       = '';
  state.lastEntry      = null;
  state.reminderActive = false;
  state.reminderMinutes = 60;

  // Para o lembrete se estiver ativo
  stopReminder();

  // Re-renderiza a interface
  renderAll();
  showToast('Todos os dados foram apagados.', 'ri-delete-bin-line');
}


/* ============================================================
   4. UTILITÁRIOS — Funções auxiliares de data e formatação
   ============================================================ */

/**
 * Retorna a data de hoje no formato 'YYYY-MM-DD'.
 * Usado como chave no histórico e para comparações.
 * @returns {string}
 */
function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * Formata a data atual em texto amigável para o header.
 * Ex: "terça-feira, 10 de junho de 2025"
 * @returns {string}
 */
function getFormattedDate() {
  return new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year:    'numeric',
    month:   'long',
    day:     'numeric',
  });
}

/**
 * Retorna a hora atual no formato HH:MM:SS.
 * @returns {string}
 */
function getTimeNow() {
  return new Date().toLocaleTimeString('pt-BR', {
    hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/**
 * Retorna a saudação adequada de acordo com o horário.
 * @returns {string} "Bom dia", "Boa tarde" ou "Boa noite"
 */
function getGreeting() {
  const hour  = new Date().getHours();
  const name  = state.userName ? `, ${state.userName}` : '';
  const emoji = hour < 12 ? '🌅' : hour < 18 ? '☀️' : '🌙';

  if (hour >= 5  && hour < 12) return `Bom dia${name}! ${emoji}`;
  if (hour >= 12 && hour < 18) return `Boa tarde${name}! ${emoji}`;
  return `Boa noite${name}! ${emoji}`;
}

/**
 * Escolhe uma mensagem motivacional baseada no progresso atual.
 * @returns {string}
 */
function getMotivationalMessage() {
  const pct = state.glassesToday / state.dailyGoal;
  let pool;

  if (pct === 0)       pool = MESSAGES.start;
  else if (pct < 0.25) pool = MESSAGES.low;
  else if (pct < 0.5)  pool = MESSAGES.quarter;
  else if (pct < 0.75) pool = MESSAGES.half;
  else if (pct < 1.0)  pool = MESSAGES.almost;
  else                 pool = MESSAGES.done;

  // Escolhe aleatoriamente entre as mensagens do grupo
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Verifica e atualiza o streak ao detectar um novo dia.
 * @param {string} lastDate — data do último acesso (YYYY-MM-DD)
 */
function checkStreak(lastDate) {
  if (!lastDate) {
    state.streak = 0;
    return;
  }

  const last      = new Date(lastDate + 'T00:00:00');
  const now       = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  // Formata yesterday para comparação
  const yKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

  // Se o último acesso foi ontem, mantém o streak
  if (lastDate === yKey) {
    // Streak mantido — não altera
    return;
  }

  // Se houve um dia sem registro, reseta o streak
  if (last < yesterday) {
    state.streak = 0;
  }
}

/**
 * Calcula a média de copos por dia nos últimos 7 dias.
 * @returns {number}
 */
function getWeeklyAverage() {
  const keys  = Object.keys(state.weekHistory).slice(-7);
  if (keys.length === 0) return state.glassesToday;

  const total = keys.reduce((sum, k) => sum + (state.weekHistory[k].glasses || 0), 0);
  // Inclui o dia de hoje na média
  return Math.round((total + state.glassesToday) / (keys.length + 1));
}

/**
 * Calcula o total de litros bebidos na última semana.
 * @returns {string} Ex: "8.5L"
 */
function getWeeklyTotal() {
  const keys  = Object.keys(state.weekHistory).slice(-7);
  const total = keys.reduce((sum, k) => sum + (state.weekHistory[k].ml || 0), 0) + state.mlToday;
  return `${(total / 1000).toFixed(1)}L`;
}

/**
 * Retorna o melhor dia (maior número de copos) da semana.
 * @returns {number}
 */
function getBestDay() {
  const allValues = [
    ...Object.values(state.weekHistory).map(d => d.glasses || 0),
    state.glassesToday,
  ];
  return Math.max(0, ...allValues);
}

/**
 * Retorna os dados dos últimos 7 dias para o gráfico semanal.
 * @returns {Array<{label, glasses, isToday}>}
 */
function getLast7DaysData() {
  const result  = [];
  const todayKey = getTodayKey();

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const isToday  = key === todayKey;
    const glasses  = isToday
      ? state.glassesToday
      : (state.weekHistory[key]?.glasses || 0);

    result.push({
      label:   WEEKDAYS[d.getDay()],
      glasses,
      isToday,
      metAtGoal: glasses >= state.dailyGoal,
    });
  }
  return result;
}


/* ============================================================
   5. MÓDULO DE UI — Funções de renderização da interface
   ============================================================ */

/**
 * Atualiza TODOS os elementos visuais da interface.
 * Chamado após qualquer alteração de estado.
 */
function renderAll() {
  renderHeader();
  renderHeroCard();
  renderProgressRing();
  renderTimeline();
  renderStats();
  renderWeeklyChart();
  renderConfigs();
}

/**
 * Atualiza o cabeçalho (saudação, data, meta).
 */
function renderHeader() {
  const greetingEl  = document.getElementById('greetingText');
  const dateEl      = document.getElementById('currentDate');
  const goalDisplay = document.getElementById('headerGoalDisplay');
  const userNameEl  = document.getElementById('userName');
  const streakEl    = document.getElementById('sidebarStreak');

  if (greetingEl)  greetingEl.textContent  = getGreeting();
  if (dateEl)      dateEl.textContent      = getFormattedDate();
  if (goalDisplay) goalDisplay.textContent = `Meta: ${state.dailyGoal} copos`;
  if (userNameEl)  userNameEl.textContent  = state.userName || 'Meu Perfil';
  if (streakEl)    streakEl.textContent    = `🔥 ${state.streak} dias`;
}

/**
 * Atualiza o hero card (contador de copos, volume, mensagem).
 */
function renderHeroCard() {
  const countEl   = document.getElementById('glassCount');
  const volumeEl  = document.getElementById('totalVolume');
  const messageEl = document.getElementById('motivationalMessage');
  const pctEl     = document.getElementById('ringPercentage');

  const totalMlGoal = state.dailyGoal * ML_PER_GLASS;
  const pct         = Math.min(100, Math.round((state.glassesToday / state.dailyGoal) * 100));

  if (countEl)   countEl.textContent   = state.glassesToday;
  if (volumeEl)  volumeEl.textContent  = `${state.mlToday} ml de ${totalMlGoal.toLocaleString('pt-BR')} ml`;
  if (messageEl) messageEl.textContent = getMotivationalMessage();
  if (pctEl)     pctEl.textContent     = `${pct}%`;
}

/**
 * Habilita/desabilita o botão de desfazer conforme há histórico.
 */
function renderUndoButton() {
  const btn = document.getElementById('btnUndo');
  if (btn) {
    btn.disabled = state.todayLog.length === 0;
    btn.setAttribute('aria-disabled', String(state.todayLog.length === 0));
  }
}

/**
 * Atualiza a seção de configurações com os valores atuais do estado.
 */
function renderConfigs() {
  const goalInput  = document.getElementById('dailyGoal');
  const nameInput  = document.getElementById('userNameInput');
  const remToggle  = document.getElementById('reminderToggle');
  const remInterval= document.getElementById('reminderInterval');

  if (goalInput)   goalInput.value   = state.dailyGoal;
  if (nameInput)   nameInput.value   = state.userName;
  if (remToggle) {
    remToggle.checked = state.reminderActive;
    remToggle.setAttribute('aria-checked', String(state.reminderActive));
  }
  if (remInterval) remInterval.value = state.reminderMinutes;
}


/* ============================================================
   6. MÓDULO DE PROGRESSO — Anel SVG animado
   ============================================================ */

/**
 * Atualiza o anel de progresso SVG com a porcentagem atual.
 */
function renderProgressRing() {
  const ring = document.getElementById('progressRing');
  if (!ring) return;

  const pct    = Math.min(1, state.glassesToday / state.dailyGoal);
  const offset = RING_CIRCUMFERENCE - (pct * RING_CIRCUMFERENCE);

  ring.style.strokeDashoffset = offset;

  // Muda a cor do anel quando a meta é atingida
  if (pct >= 1) {
    ring.style.stroke = 'var(--color-success)';
    ring.style.filter = 'drop-shadow(0 0 12px rgba(34,211,238,0.6))';
  } else if (pct >= 0.75) {
    ring.style.stroke = 'var(--color-accent)';
    ring.style.filter = 'drop-shadow(0 0 10px rgba(56,189,248,0.5))';
  } else {
    ring.style.stroke = 'var(--color-primary)';
    ring.style.filter = 'drop-shadow(0 0 8px rgba(14,165,233,0.4))';
  }
}


/* ============================================================
   7. MÓDULO DE TIMELINE — Histórico de registros do dia
   ============================================================ */

/**
 * Renderiza a lista de registros do dia na timeline.
 * Exibe o estado vazio caso não haja registros.
 */
function renderTimeline() {
  const list  = document.getElementById('timelineList');
  const empty = document.getElementById('timelineEmpty');
  if (!list) return;

  // Limpa a lista preservando o elemento de estado vazio
  const items = list.querySelectorAll('.timeline-item');
  items.forEach(item => item.remove());

  if (state.todayLog.length === 0) {
    if (empty) empty.style.display = 'block';
    return;
  }

  if (empty) empty.style.display = 'none';

  // Renderiza do mais recente para o mais antigo
  const reversed = [...state.todayLog].reverse();

  reversed.forEach((entry) => {
    const li = document.createElement('li');
    li.className    = 'timeline-item';
    li.setAttribute('role', 'listitem');
    li.setAttribute('aria-label', `${entry.ml}ml às ${entry.time}`);

    li.innerHTML = `
      <div class="timeline-item__icon" aria-hidden="true">
        <i class="ri-drop-fill"></i>
      </div>
      <div class="timeline-item__info">
        <span class="timeline-item__amount">+${entry.ml} ml</span>
        <span class="timeline-item__time">${entry.time}</span>
      </div>
      <span class="timeline-item__total">${entry.totalAfter} ml total</span>
    `;

    list.insertBefore(li, empty ? empty.nextSibling : null);
    list.appendChild(li);
  });

  renderUndoButton();
}


/* ============================================================
   8. MÓDULO DE ESTATÍSTICAS — Cards de métricas
   ============================================================ */

/**
 * Atualiza os quatro cards de estatísticas.
 */
function renderStats() {
  const streakEl  = document.getElementById('streakValue');
  const avgEl     = document.getElementById('weeklyAvg');
  const totalEl   = document.getElementById('weeklyTotal');
  const bestEl    = document.getElementById('bestDay');

  if (streakEl) streakEl.textContent = state.streak;
  if (avgEl)    avgEl.textContent    = getWeeklyAverage();
  if (totalEl)  totalEl.textContent  = getWeeklyTotal();
  if (bestEl)   bestEl.textContent   = getBestDay();
}

/**
 * Atualiza o gráfico de barras semanais na seção Histórico.
 */
function renderWeeklyChart() {
  const barsEl   = document.getElementById('weeklyBars');
  const labelsEl = document.getElementById('weeklyLabels');
  if (!barsEl || !labelsEl) return;

  const data    = getLast7DaysData();
  const maxVal  = Math.max(...data.map(d => d.glasses), state.dailyGoal, 1);

  // Limpa as barras anteriores
  barsEl.innerHTML   = '';
  labelsEl.innerHTML = '';

  data.forEach(({ label, glasses, isToday, metAtGoal }) => {
    const heightPct = Math.max(2, (glasses / maxVal) * 100);

    // Barra
    const bar = document.createElement('div');
    bar.className = [
      'week-bar',
      isToday   ? 'week-bar--today' : '',
      metAtGoal ? 'week-bar--goal'  : '',
    ].filter(Boolean).join(' ');
    bar.style.height = `${heightPct}%`;
    bar.setAttribute('title', `${label}: ${glasses} copos`);
    barsEl.appendChild(bar);

    // Label
    const lbl = document.createElement('div');
    lbl.className   = `week-label ${isToday ? 'week-label--today' : ''}`;
    lbl.textContent = isToday ? 'Hoje' : label;
    labelsEl.appendChild(lbl);
  });
}


/* ============================================================
   9. MÓDULO DE TOAST — Notificações não intrusivas
   ============================================================ */

/** Timeout ativo do toast (para cancelar se necessário) */
let toastTimeout = null;

/**
 * Exibe uma notificação toast temporária.
 * @param {string} message  — Texto da mensagem
 * @param {string} icon     — Classe do ícone Remixicon (ex: 'ri-check-line')
 * @param {number} duration — Duração em ms (padrão: 2500)
 */
function showToast(message, icon = 'ri-check-line', duration = 2500) {
  const toast   = document.getElementById('toastNotification');
  const msgEl   = document.getElementById('toastMessage');
  const iconEl  = toast?.querySelector('.toast__icon');

  if (!toast || !msgEl) return;

  // Cancela toast anterior se ainda estiver visível
  if (toastTimeout) {
    clearTimeout(toastTimeout);
    toast.classList.remove('toast--visible');
  }

  // Define conteúdo
  msgEl.textContent = message;
  if (iconEl) {
    iconEl.className = `${icon} toast__icon`;
    iconEl.setAttribute('aria-hidden', 'true');
  }

  toast.setAttribute('aria-hidden', 'false');

  // Força reflow para reiniciar a animação
  void toast.offsetHeight;

  // Exibe o toast
  toast.classList.add('toast--visible');

  // Oculta após o tempo determinado
  toastTimeout = setTimeout(() => {
    toast.classList.remove('toast--visible');
    toast.setAttribute('aria-hidden', 'true');
    toastTimeout = null;
  }, duration);
}


/* ============================================================
   10. MÓDULO DE MODAL — Diálogos de confirmação
   ============================================================ */

/** Callback a executar quando o modal for confirmado */
let modalCallback = null;

/**
 * Abre o modal de confirmação com mensagem customizada.
 * @param {string}   title    — Título do modal
 * @param {string}   text     — Texto descritivo
 * @param {Function} callback — Função a chamar na confirmação
 */
function openModal(title, text, callback) {
  const modal    = document.getElementById('confirmModal');
  const titleEl  = document.getElementById('modalTitle');
  const textEl   = document.getElementById('modalText');

  if (!modal) return;

  if (titleEl) titleEl.textContent = title;
  if (textEl)  textEl.textContent  = text;

  modalCallback = callback;

  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('modal-overlay--visible');

  // Foca no botão de cancelar para acessibilidade
  document.getElementById('btnModalCancel')?.focus();
}

/**
 * Fecha o modal sem executar a ação.
 */
function closeModal() {
  const modal = document.getElementById('confirmModal');
  if (!modal) return;

  modal.classList.remove('modal-overlay--visible');
  modal.setAttribute('aria-hidden', 'true');
  modalCallback = null;
}

/**
 * Confirma a ação e fecha o modal.
 */
function confirmModal() {
  if (typeof modalCallback === 'function') {
    modalCallback();
  }
  closeModal();
}


/* ============================================================
   11. MÓDULO DE LEMBRETES — Notificações periódicas
   ============================================================ */

/**
 * Inicia o intervalo de lembretes de hidratação.
 * Usa a Web Notifications API quando disponível.
 */
function startReminder() {
  stopReminder(); // Garante que não há intervalo duplicado

  const intervalMs = state.reminderMinutes * 60 * 1000;

  state.reminderInterval = setInterval(() => {
    // Tenta usar notificação nativa do navegador
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('💧 AQUA — Hora de beber água!', {
        body: `Você bebeu ${state.glassesToday} de ${state.dailyGoal} copos hoje. Continue assim!`,
        icon: 'data:image/svg+xml,...', // Placeholder para ícone
      });
    } else {
      // Fallback: toast na tela
      showToast('⏰ Hora de beber água! 💧', 'ri-notification-3-line', 4000);
    }
  }, intervalMs);

  // Solicita permissão de notificação nativa
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }

  // Atualiza o status na UI
  const statusEl = document.getElementById('reminderStatus');
  if (statusEl) {
    statusEl.textContent = `✅ Lembrete ativo: a cada ${state.reminderMinutes} minuto(s).`;
  }
}

/**
 * Para o intervalo de lembretes.
 */
function stopReminder() {
  if (state.reminderInterval) {
    clearInterval(state.reminderInterval);
    state.reminderInterval = null;
  }

  const statusEl = document.getElementById('reminderStatus');
  if (statusEl) {
    statusEl.textContent = 'Os lembretes aparecerão como notificações nesta página enquanto ela estiver aberta.';
  }
}


/* ============================================================
   12. MÓDULO DE NAVEGAÇÃO — Sidebar e seções
   ============================================================ */

/**
 * Ativa a seção indicada e atualiza o item de menu correspondente.
 * @param {string} sectionName — Nome da seção (ex: 'dashboard', 'historico')
 */
function navigateTo(sectionName) {
  // Mapeia o nome da seção para o ID do elemento HTML
  const sectionMap = {
    dashboard:     'sectionDashboard',
    historico:     'sectionHistorico',
    lembretes:     'sectionLembretes',
    configuracoes: 'sectionConfiguracoes',
  };

  // Oculta todas as seções
  Object.values(sectionMap).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('section--hidden');
  });

  // Exibe a seção solicitada
  const targetId = sectionMap[sectionName];
  const target   = document.getElementById(targetId);
  if (target) target.classList.remove('section--hidden');

  // Atualiza o estado ativo do menu
  document.querySelectorAll('.nav-item').forEach(btn => {
    const isActive = btn.dataset.section === sectionName;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-current', isActive ? 'page' : 'false');
  });

  // Atualiza o gráfico ao navegar para histórico
  if (sectionName === 'historico') {
    renderWeeklyChart();
  }
}

/**
 * Abre ou fecha a sidebar em dispositivos mobile.
 */
function toggleMobileSidebar() {
  const app        = document.getElementById('app');
  const toggle     = document.getElementById('menuToggle');
  const isOpen     = app.classList.contains('sidebar-open');

  app.classList.toggle('sidebar-open', !isOpen);
  toggle?.setAttribute('aria-expanded', String(!isOpen));
}

/**
 * Fecha a sidebar mobile ao clicar fora dela.
 * @param {Event} e — Evento de clique
 */
function closeSidebarOnOutsideClick(e) {
  const app  = document.getElementById('app');
  if (!app.classList.contains('sidebar-open')) return;

  const sidebar = document.querySelector('.sidebar');
  const toggle  = document.getElementById('menuToggle');

  if (sidebar && !sidebar.contains(e.target) && e.target !== toggle) {
    app.classList.remove('sidebar-open');
    toggle?.setAttribute('aria-expanded', 'false');
  }
}


/* ============================================================
   13. MANIPULADORES DE EVENTOS — Event Handlers
   ============================================================ */

/**
 * Registra a ingestão de água com a quantidade em ml informada.
 * @param {number} ml — Volume em mililitros a adicionar
 */
function addWater(ml) {
  // Calcula quantos "copos" equivalem a esta quantidade
  const glasses = ml / ML_PER_GLASS;

  // Atualiza o estado
  state.glassesToday += glasses;
  state.mlToday      += ml;

  // Cria o registro para a timeline
  const entry = {
    ml,
    time:       getTimeNow(),
    totalAfter: state.mlToday,
  };

  state.todayLog.push(entry);
  state.lastEntry = entry;

  // Verifica se a meta foi atingida neste momento
  const justReachedGoal = state.glassesToday >= state.dailyGoal
    && (state.glassesToday - glasses) < state.dailyGoal;

  if (justReachedGoal) {
    // Incrementa o streak ao atingir a meta
    state.streak++;
    showToast(`🎉 Meta atingida! Streak: ${state.streak} dias!`, 'ri-trophy-line', 4000);
  } else {
    showToast(`+${ml}ml registrado! 💧`);
  }

  // Animação no número principal
  animateCounterPop();

  // Salva e re-renderiza
  saveState();
  renderAll();
}

/**
 * Remove o último registro de água (desfazer).
 */
function undoLastEntry() {
  if (state.todayLog.length === 0) return;

  const last = state.todayLog.pop();

  // Reverte o estado
  state.glassesToday -= last.ml / ML_PER_GLASS;
  state.mlToday      -= last.ml;

  // Garante que não fique negativo
  state.glassesToday = Math.max(0, state.glassesToday);
  state.mlToday      = Math.max(0, state.mlToday);
  state.lastEntry    = state.todayLog[state.todayLog.length - 1] || null;

  showToast(`Último registro removido (${last.ml}ml).`, 'ri-arrow-go-back-line');
  saveState();
  renderAll();
}

/**
 * Limpa todos os registros do dia atual.
 */
function clearDay() {
  state.glassesToday = 0;
  state.mlToday      = 0;
  state.todayLog     = [];
  state.lastEntry    = null;

  showToast('Registros do dia apagados.', 'ri-delete-bin-line');
  saveState();
  renderAll();
}

/**
 * Aplica a micro-animação de "pop" no contador de copos.
 */
function animateCounterPop() {
  const el = document.getElementById('glassCount');
  if (!el) return;

  el.classList.remove('pop');
  void el.offsetHeight; // Força reflow para reiniciar a animação
  el.classList.add('pop');

  el.addEventListener('animationend', () => el.classList.remove('pop'), { once: true });
}

/**
 * Salva a nova meta diária inserida pelo usuário.
 */
function saveGoal() {
  const input = document.getElementById('dailyGoal');
  if (!input) return;

  const value = parseInt(input.value, 10);

  if (isNaN(value) || value < 4 || value > 20) {
    showToast('Meta deve ser entre 4 e 20 copos.', 'ri-alert-line');
    return;
  }

  state.dailyGoal = value;
  saveState();
  renderAll();
  showToast(`Meta atualizada: ${value} copos por dia! 🎯`, 'ri-flag-line');
}

/**
 * Salva o nome do usuário.
 */
function saveName() {
  const input = document.getElementById('userNameInput');
  if (!input) return;

  const name = input.value.trim();
  state.userName = name;

  saveState();
  renderHeader();
  showToast(name ? `Olá, ${name}! 👋` : 'Nome removido.', 'ri-user-smile-line');
}


/* ============================================================
   14. INICIALIZAÇÃO — Configuração dos event listeners e boot
   ============================================================ */

/**
 * Registra todos os ouvintes de eventos da aplicação.
 * Centralizado aqui para facilitar manutenção.
 */
function setupEventListeners() {

  // ---- Botões de adicionar água ----
  document.querySelectorAll('.btn-water[data-amount]').forEach(btn => {
    btn.addEventListener('click', () => {
      const amount = parseInt(btn.dataset.amount, 10);
      if (!isNaN(amount)) addWater(amount);
    });
  });

  // ---- Botão desfazer ----
  document.getElementById('btnUndo')?.addEventListener('click', undoLastEntry);

  // ---- Botão limpar dia ----
  document.getElementById('btnClearDay')?.addEventListener('click', () => {
    if (state.todayLog.length === 0) return;
    openModal(
      'Limpar registros do dia',
      'Isso irá remover todos os registros de hoje. Esta ação não pode ser desfeita.',
      clearDay,
    );
  });

  // ---- Botão resetar tudo ----
  document.getElementById('btnResetAll')?.addEventListener('click', () => {
    openModal(
      'Resetar todos os dados',
      'Isso irá apagar permanentemente todo o histórico, configurações e progresso. Tem certeza?',
      resetAllData,
    );
  });

  // ---- Botão salvar meta ----
  document.getElementById('btnSaveGoal')?.addEventListener('click', saveGoal);

  // ---- Botão salvar nome ----
  document.getElementById('btnSaveName')?.addEventListener('click', saveName);

  // ---- Steppers da meta (+ e −) ----
  document.querySelectorAll('.input-stepper').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const action   = btn.dataset.action;
      const input    = document.getElementById(targetId);
      if (!input) return;

      let val = parseInt(input.value, 10) || 0;
      if (action === 'increase') val = Math.min(20, val + 1);
      if (action === 'decrease') val = Math.max(4,  val - 1);
      input.value = val;
    });
  });

  // ---- Navegação da sidebar ----
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.dataset.section;
      if (section) {
        navigateTo(section);
        // Fecha sidebar em mobile ao navegar
        if (window.innerWidth <= 768) {
          document.getElementById('app')?.classList.remove('sidebar-open');
        }
      }
    });
  });

  // ---- Toggle do menu mobile ----
  document.getElementById('menuToggle')?.addEventListener('click', toggleMobileSidebar);

  // ---- Fecha sidebar ao clicar fora (mobile) ----
  document.addEventListener('click', closeSidebarOnOutsideClick);

  // ---- Botões do modal ----
  document.getElementById('btnModalCancel')?.addEventListener('click',  closeModal);
  document.getElementById('btnModalConfirm')?.addEventListener('click', confirmModal);

  // ---- Fecha modal com tecla ESC ----
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // ---- Toggle de lembretes ----
  document.getElementById('reminderToggle')?.addEventListener('change', (e) => {
    state.reminderActive = e.target.checked;
    e.target.setAttribute('aria-checked', String(state.reminderActive));

    if (state.reminderActive) {
      startReminder();
      showToast('Lembretes ativados! 🔔', 'ri-notification-3-line');
    } else {
      stopReminder();
      showToast('Lembretes desativados.', 'ri-notification-off-line');
    }
    saveState();
  });

  // ---- Intervalo de lembrete ----
  document.getElementById('reminderInterval')?.addEventListener('change', (e) => {
    state.reminderMinutes = parseInt(e.target.value, 10);

    if (state.reminderActive) {
      startReminder(); // Reinicia com o novo intervalo
    }
    saveState();
  });

  // ---- Salvar meta ao pressionar Enter ----
  document.getElementById('dailyGoal')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') saveGoal();
  });

  // ---- Salvar nome ao pressionar Enter ----
  document.getElementById('userNameInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') saveName();
  });
}

/**
 * Ponto de entrada da aplicação.
 * Executado quando o DOM estiver completamente carregado.
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('[AQUA] Inicializando aplicação...');

  // 1. Define a data de hoje
  state.today = getTodayKey();

  // 2. Carrega dados persistidos do localStorage
  loadState();

  // 3. Registra todos os event listeners
  setupEventListeners();

  // 4. Renderiza a interface completa
  renderAll();

  // 5. Reinicia lembrete se estava ativo
  if (state.reminderActive) {
    startReminder();
  }

  console.log('[AQUA] Aplicação pronta! 💧');
});
