// ========================================
// SISTEMA DE CONQUISTAS
// Compartilhado entre estudo.js e conquistas.html
// ========================================

const CONQUISTAS = [
    { id: 'primeiro_estudo', nome: 'Primeiro Passo', descricao: 'Concluiu seu primeiro estudo!', icone: '🚀', categoria: 'Estudos', condicao: (d) => d.totalConcluidos >= 1 },
    { id: '5_estudos', nome: 'Estudante Dedicado', descricao: 'Concluiu 5 estudos!', icone: '📚', categoria: 'Estudos', condicao: (d) => d.totalConcluidos >= 5 },
    { id: '10_estudos', nome: 'Foco Total', descricao: 'Concluiu 10 estudos!', icone: '🎯', categoria: 'Estudos', condicao: (d) => d.totalConcluidos >= 10 },
    { id: '25_estudos', nome: 'Mestre dos Estudos', descricao: 'Concluiu 25 estudos!', icone: '🏅', categoria: 'Estudos', condicao: (d) => d.totalConcluidos >= 25 },
    { id: '50_estudos', nome: 'Lenda do Conhecimento', descricao: 'Concluiu 50 estudos!', icone: '👑', categoria: 'Estudos', condicao: (d) => d.totalConcluidos >= 50 },
    { id: '100_estudos', nome: 'Gênio dos Estudos', descricao: 'Concluiu 100 estudos!', icone: '🧠', categoria: 'Estudos', condicao: (d) => d.totalConcluidos >= 100 },
    { id: 'sequencia_3', nome: 'Em Chamas', descricao: 'Estudou 3 dias seguidos!', icone: '🔥', categoria: 'Sequência', condicao: (d) => d.sequencia >= 3 },
    { id: 'sequencia_7', nome: 'Semana de Ouro', descricao: 'Estudou 7 dias seguidos!', icone: '⭐', categoria: 'Sequência', condicao: (d) => d.sequencia >= 7 },
    { id: 'sequencia_30', nome: 'Mês de Estudos', descricao: 'Estudou 30 dias seguidos!', icone: '🌙', categoria: 'Sequência', condicao: (d) => d.sequencia >= 30 },
    { id: 'progresso_25', nome: '25% Completo', descricao: 'Atingiu 25% de uma trilha!', icone: '🌱', categoria: 'Progresso', condicao: (d) => d.maiorProgresso >= 25 },
    { id: 'progresso_50', nome: '50% Completo', descricao: 'Atingiu 50% de uma trilha!', icone: '🌿', categoria: 'Progresso', condicao: (d) => d.maiorProgresso >= 50 },
    { id: 'progresso_75', nome: '75% Completo', descricao: 'Atingiu 75% de uma trilha!', icone: '🌳', categoria: 'Progresso', condicao: (d) => d.maiorProgresso >= 75 },
    { id: 'progresso_100', nome: '100% Completo', descricao: 'Concluiu uma trilha completa!', icone: '🌟', categoria: 'Progresso', condicao: (d) => d.trilhasCompletas >= 1 },
    { id: 'trilhas_3', nome: 'Mestre das Trilhas', descricao: 'Concluiu 3 trilhas!', icone: '🏆', categoria: 'Progresso', condicao: (d) => d.trilhasCompletas >= 3 },
    { id: 'meta_5', nome: 'Meta Diária', descricao: 'Cumpriu meta 5 vezes!', icone: '✅', categoria: 'Metas', condicao: (d) => d.metasCumpridas >= 5 },
    { id: 'meta_10', nome: 'Meta Semanal', descricao: 'Cumpriu meta 10 vezes!', icone: '📈', categoria: 'Metas', condicao: (d) => d.metasCumpridas >= 10 },
    { id: 'meta_30', nome: 'Meta Mestre', descricao: 'Cumpriu meta 30 vezes!', icone: '🎖️', categoria: 'Metas', condicao: (d) => d.metasCumpridas >= 30 },
    { id: 'compartilhar_1', nome: 'Compartilhador', descricao: 'Compartilhou seu progresso!', icone: '📤', categoria: 'Comunidade', condicao: (d) => d.compartilhamentos >= 1 },
    { id: 'compartilhar_5', nome: 'Influenciador', descricao: 'Compartilhou 5 vezes!', icone: '🌟', categoria: 'Comunidade', condicao: (d) => d.compartilhamentos >= 5 }
];

// ========================================
// FUNÇÃO: Calcular Sequência (dias seguidos estudando)
// ========================================
function calcularSequenciaConquistas(email) {
    const historico = JSON.parse(localStorage.getItem(`historico_${email}`)) || [];
    if (historico.length === 0) return 0;

    const hoje = new Date().toISOString().split('T')[0];
    const ultimo = historico[historico.length - 1];
    if (ultimo !== hoje) return 0;

    let dias = 1;
    for (let i = historico.length - 2; i >= 0; i--) {
        const dataAtual = new Date(historico[i + 1]);
        const dataAnterior = new Date(historico[i]);
        const diff = (dataAtual - dataAnterior) / (1000 * 60 * 60 * 24);
        if (diff === 1) dias++; else break;
    }
    return dias;
}

// ========================================
// FUNÇÃO: Calcular Dados de Conquistas (progresso real do usuário)
// ========================================
function calcularDadosConquistas(email, trilhas) {
    let totalConcluidos = 0;
    let maiorProgresso = 0;
    let trilhasCompletas = 0;

    (trilhas || []).forEach((trilha, index) => {
        const progressKey = `progress_${index}_${email}`;
        const prog = JSON.parse(localStorage.getItem(progressKey));
        if (!prog || !prog.concluidos) return;
        totalConcluidos += prog.concluidos.length;

        let total = 0, concluidos = 0;
        if (trilha.materias) {
            trilha.materias.forEach(m => {
                if (m.estudos) {
                    m.estudos.forEach(e => { total++; if (prog.concluidos.includes(e.id)) concluidos++; });
                }
            });
        }
        const pct = total > 0 ? Math.round((concluidos / total) * 100) : 0;
        if (pct > maiorProgresso) maiorProgresso = pct;
        if (total > 0 && concluidos === total) trilhasCompletas++;
    });

    return {
        totalConcluidos,
        sequencia: calcularSequenciaConquistas(email),
        trilhasCompletas,
        maiorProgresso,
        metasCumpridas: parseInt(localStorage.getItem(`metasCumpridas_${email}`)) || 0,
        compartilhamentos: parseInt(localStorage.getItem(`compartilhamentos_${email}`)) || 0
    };
}

// ========================================
// FUNÇÃO: Registrar Histórico (chamar ao concluir um estudo no dia)
// ========================================
function registrarHistorico(email) {
    const key = `historico_${email}`;
    const historico = JSON.parse(localStorage.getItem(key)) || [];
    const hoje = new Date().toISOString().split('T')[0];
    if (historico[historico.length - 1] !== hoje) {
        historico.push(hoje);
        localStorage.setItem(key, JSON.stringify(historico));
    }
}

// ========================================
// META DIÁRIA (usada para desbloquear as conquistas de categoria "Metas")
// ========================================
const META_DIARIA_PADRAO = 3;

function getMetaDiariaAlvo(email) {
    return parseInt(localStorage.getItem(`metaDiariaAlvo_${email}`)) || META_DIARIA_PADRAO;
}

function setMetaDiariaAlvo(email, alvo) {
    localStorage.setItem(`metaDiariaAlvo_${email}`, String(alvo));
}

function getConcluidosHoje(email) {
    const hoje = new Date().toISOString().split('T')[0];
    const mapa = JSON.parse(localStorage.getItem(`concluidosPorDia_${email}`)) || {};
    return mapa[hoje] || 0;
}

// Chamar sempre que um estudo for marcado como concluído.
// Retorna quantos estudos foram concluídos hoje, a meta atual e se ela acabou de ser batida.
function registrarConclusaoDiaria(email) {
    const hoje = new Date().toISOString().split('T')[0];
    const mapaKey = `concluidosPorDia_${email}`;
    const mapa = JSON.parse(localStorage.getItem(mapaKey)) || {};
    mapa[hoje] = (mapa[hoje] || 0) + 1;
    localStorage.setItem(mapaKey, JSON.stringify(mapa));

    const alvo = getMetaDiariaAlvo(email);
    const diasCumpridosKey = `metaDiasCumpridos_${email}`;
    const diasCumpridos = JSON.parse(localStorage.getItem(diasCumpridosKey)) || [];

    let metaBatidaAgora = false;
    if (mapa[hoje] >= alvo && !diasCumpridos.includes(hoje)) {
        diasCumpridos.push(hoje);
        localStorage.setItem(diasCumpridosKey, JSON.stringify(diasCumpridos));
        const totalMetas = (parseInt(localStorage.getItem(`metasCumpridas_${email}`)) || 0) + 1;
        localStorage.setItem(`metasCumpridas_${email}`, String(totalMetas));
        metaBatidaAgora = true;
    }

    return { concluidosHoje: mapa[hoje], alvo, metaBatidaAgora };
}

// ========================================
// COMPARTILHAR PROGRESSO (usada para desbloquear as conquistas de categoria "Comunidade")
// ========================================
function compartilharProgresso(email, trilhas) {
    const dados = calcularDadosConquistas(email, trilhas);
    const texto = `🚀 Estou estudando na Nexus Study!\n📚 ${dados.totalConcluidos} estudo(s) concluído(s)\n🔥 ${dados.sequencia} dia(s) seguidos estudando\n🏆 Maior progresso em uma trilha: ${dados.maiorProgresso}%\n\nBora estudar também?`;

    function registrarCompartilhamento() {
        const total = (parseInt(localStorage.getItem(`compartilhamentos_${email}`)) || 0) + 1;
        localStorage.setItem(`compartilhamentos_${email}`, String(total));
    }

    if (navigator.share) {
        return navigator.share({ title: 'Meu progresso na Nexus Study', text: texto })
            .then(() => { registrarCompartilhamento(); return true; })
            .catch(() => false); // usuário cancelou o compartilhamento nativo - não conta
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(texto)
            .then(() => { registrarCompartilhamento(); return true; })
            .catch(() => false);
    }

    // Sem Web Share API nem Clipboard API: mostra o texto para copiar manualmente
    window.prompt('Copie o texto abaixo para compartilhar seu progresso:', texto);
    registrarCompartilhamento();
    return Promise.resolve(true);
}

// ========================================
// FUNÇÃO: Verificar e Desbloquear Novas Conquistas
// Retorna a lista das conquistas recém-desbloqueadas (para exibir notificação).
// ========================================
function verificarNovasConquistas(email, trilhas) {
    const dados = calcularDadosConquistas(email, trilhas);
    const desbloqueadasKey = `conquistas_${email}`;
    const desbloqueadas = JSON.parse(localStorage.getItem(desbloqueadasKey)) || [];
    const novas = [];

    CONQUISTAS.forEach(c => {
        if (!desbloqueadas.includes(c.id) && c.condicao(dados)) {
            desbloqueadas.push(c.id);
            novas.push(c);
        }
    });

    if (novas.length > 0) {
        localStorage.setItem(desbloqueadasKey, JSON.stringify(desbloqueadas));
    }

    return novas;
}
