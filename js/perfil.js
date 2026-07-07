// ========================================
// PERFIL DO USUÁRIO
// ========================================
// Extraído do <script> inline que existia em perfil.html, pra poder ser
// injetado só depois que a sincronização com o Firestore (progresso,
// conquistas, avatar, frase) terminar -- ver o bootstrap no final de
// perfil.html. Assim o resto da lógica aqui embaixo continua exatamente
// como já era, só que agora lendo dados já sincronizados.

const user = JSON.parse(localStorage.getItem('currentUser'));
if (!user) {
    window.location.href = 'index.html';
}

loadTheme();

// Sobe pro Firestore o que estiver em localStorage pra esse usuário
// (progresso, conquistas, avatar, frase etc) -- chamado depois de qualquer
// mudança relevante nesta página.
function sincronizarComFirestore() {
    if (typeof window.salvarUsuarioFirestore === 'function') {
        window.salvarUsuarioFirestore(user.email).catch(erro => {
            console.warn('Não foi possível sincronizar com o Firestore:', erro);
        });
    }
}

// ========================================
// AVATAR (personagens prontos)
// ========================================
let personagemAtual = obterPersonagemUsuario(user.email);

function renderizarPreview() {
    document.getElementById('avatarPreview').innerHTML = gerarPersonagemSVG(personagemAtual.id, 140);
}

function renderizarGridPersonagens() {
    document.getElementById('personagemGrid').innerHTML = PERSONAGENS.map(p => `
        <button type="button" class="personagem-item ${p.id === personagemAtual.id ? 'selecionado' : ''}" data-id="${p.id}" title="${p.nome}">
            ${gerarPersonagemSVG(p.id, 48)}
            <span class="personagem-nome">${p.nome}</span>
        </button>
    `).join('');

    document.querySelectorAll('#personagemGrid [data-id]').forEach(btn => {
        btn.addEventListener('click', () => {
            personagemAtual = PERSONAGENS.find(p => p.id === btn.dataset.id);
            salvarPersonagemUsuario(user.email, personagemAtual.id);
            renderizarPreview();
            renderizarGridPersonagens();
            if (typeof atualizarAvatarCabecalho === 'function') atualizarAvatarCabecalho();
            fecharGaleria();
            sincronizarComFirestore();
        });
    });
}

renderizarPreview();
renderizarGridPersonagens();

// ========================================
// MODAL DA GALERIA DE PERSONAGENS
// ========================================
const modalOverlay = document.getElementById('personagemModalOverlay');

function abrirGaleria() {
    modalOverlay.classList.add('aberto');
}

function fecharGaleria() {
    modalOverlay.classList.remove('aberto');
}

document.getElementById('btnAbrirGaleria').addEventListener('click', abrirGaleria);
document.getElementById('btnFecharGaleria').addEventListener('click', fecharGaleria);
modalOverlay.addEventListener('click', (evento) => {
    if (evento.target === modalOverlay) fecharGaleria();
});
document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') fecharGaleria();
});

// ========================================
// FRASE / STATUS
// ========================================
const CHAVE_FRASE = `bio_${user.email}`;
const fraseInput = document.getElementById('perfilFrase');
const fraseContador = document.getElementById('fraseContador');
const fraseStatus = document.getElementById('fraseStatus');

fraseInput.value = localStorage.getItem(CHAVE_FRASE) || '';
fraseContador.textContent = fraseInput.value.length;

let timeoutFrase = null;
fraseInput.addEventListener('input', () => {
    fraseContador.textContent = fraseInput.value.length;
    clearTimeout(timeoutFrase);
    timeoutFrase = setTimeout(() => {
        localStorage.setItem(CHAVE_FRASE, fraseInput.value);
        fraseStatus.classList.add('visivel');
        setTimeout(() => fraseStatus.classList.remove('visivel'), 1500);
        sincronizarComFirestore();
    }, 500);
});

// ========================================
// ESTUDANDO AGORA
// ========================================
function escaparHtml(texto) {
    const div = document.createElement('div');
    div.textContent = texto == null ? '' : String(texto);
    return div.innerHTML;
}

function renderizarEstudandoAgora() {
    const trilhas = carregarTrilhasDoStorage();
    const emAndamento = [];

    trilhas.forEach((trilha, index) => {
        const progressKey = `progress_${index}_${user.email}`;
        const prog = JSON.parse(localStorage.getItem(progressKey) || 'null');
        if (!prog) return;

        const todosEstudos = (trilha.materias || []).flatMap(m => m.estudos || []);
        const total = todosEstudos.length;
        const concluidos = (prog.concluidos || []).filter(id => todosEstudos.some(e => e.id === id)).length;
        if (total === 0) return;

        const pct = Math.round((concluidos / total) * 100);
        if (pct <= 0 || pct >= 100) return;

        const estudoAtual = todosEstudos.find(e => e.id === prog.atual);

        emAndamento.push({
            titulo: trilha.titulo,
            icone: trilha.icone || '📘',
            pct,
            estudoTitulo: estudoAtual ? estudoAtual.titulo : null,
        });
    });

    const container = document.getElementById('estudandoAgora');
    if (emAndamento.length === 0) {
        container.innerHTML = `<div class="perfil-vazio">Nenhum estudo em andamento ainda.<br><a href="dashboard.html">Escolher uma trilha →</a></div>`;
        return;
    }

    container.innerHTML = emAndamento.map(e => `
        <div class="estudo-atual-item">
            <div class="estudo-atual-topo">
                <span class="estudo-atual-nome">${e.icone} ${escaparHtml(e.titulo)}</span>
                <span class="estudo-atual-pct">${e.pct}%</span>
            </div>
            <div class="estudo-atual-barra"><div class="estudo-atual-barra-fill" style="width:${e.pct}%;"></div></div>
            ${e.estudoTitulo ? `<div class="estudo-atual-titulo">📍 ${escaparHtml(e.estudoTitulo)}</div>` : ''}
        </div>
    `).join('');
}

renderizarEstudandoAgora();

// ========================================
// CONQUISTAS (resumo)
// ========================================
function renderizarConquistasResumo() {
    verificarNovasConquistas(user.email, carregarTrilhasDoStorage());
    const desbloqueadas = JSON.parse(localStorage.getItem(`conquistas_${user.email}`) || '[]');
    document.getElementById('conquistasContador').textContent = `${desbloqueadas.length}/${CONQUISTAS.length}`;

    document.getElementById('conquistasMiniGrid').innerHTML = CONQUISTAS.map(c => {
        const desbloqueada = desbloqueadas.includes(c.id);
        return `<div class="conquista-mini ${desbloqueada ? 'desbloqueada' : 'bloqueada'}" title="${escaparHtml(c.nome)}${desbloqueada ? '' : ' (bloqueada)'}">${c.icone}</div>`;
    }).join('');
}

renderizarConquistasResumo();
