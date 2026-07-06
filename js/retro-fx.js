// ========================================
// EFEITOS RETRÔ (SOM 8-BIT + CONFETE)
// Web Audio API pura, sem arquivos de áudio externos.
// ========================================

let _retroAudioCtx = null;

function _getRetroAudioCtx() {
    const AudioContextClasse = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClasse) return null;
    if (!_retroAudioCtx) {
        _retroAudioCtx = new AudioContextClasse();
    }
    if (_retroAudioCtx.state === 'suspended') {
        _retroAudioCtx.resume();
    }
    return _retroAudioCtx;
}

function _tocarNotaRetro(freq, inicio, duracao, volume) {
    const ctx = _getRetroAudioCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + inicio);
    gain.gain.setValueAtTime(volume, ctx.currentTime + inicio);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + inicio + duracao);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + inicio);
    osc.stop(ctx.currentTime + inicio + duracao);
}

function tocarBipClique() {
    try {
        _tocarNotaRetro(660, 0, 0.05, 0.04);
    } catch (e) {
        console.error('Erro ao tocar som de clique:', e);
    }
}

function tocarFanfarraConquista() {
    try {
        _tocarNotaRetro(523.25, 0, 0.12, 0.06);
        _tocarNotaRetro(659.25, 0.1, 0.12, 0.06);
        _tocarNotaRetro(783.99, 0.2, 0.12, 0.06);
        _tocarNotaRetro(1046.5, 0.32, 0.28, 0.07);
    } catch (e) {
        console.error('Erro ao tocar fanfarra de conquista:', e);
    }
}

// Blip de clique em qualquer botão/link do site (estilo "botão de arcade")
document.addEventListener('click', function (e) {
    const alvo = e.target.closest('button, a');
    if (!alvo || alvo.disabled) return;
    tocarBipClique();
}, true);

// ========================================
// CONFETE RETRÔ (blocos quadrados, sem arredondamento)
// ========================================
(function injetarEstiloConfeteRetro() {
    const estilo = document.createElement('style');
    estilo.textContent = `
        .confete-retro-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 99999;
            overflow: hidden;
        }
        .confete-retro {
            position: absolute;
            width: 8px;
            height: 8px;
            top: -12px;
            animation-name: confeteRetroCai;
            animation-timing-function: steps(8);
            animation-fill-mode: forwards;
        }
        @keyframes confeteRetroCai {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(estilo);
})();

function dispararConfeteRetro(qtd = 26) {
    const cores = ['#00f5d4', '#3a86ff', '#8338ec', '#ffd700', '#ff6b6b'];
    const container = document.createElement('div');
    container.className = 'confete-retro-container';
    document.body.appendChild(container);

    for (let i = 0; i < qtd; i++) {
        const pedaco = document.createElement('div');
        pedaco.className = 'confete-retro';
        pedaco.style.left = Math.random() * 100 + 'vw';
        pedaco.style.background = cores[Math.floor(Math.random() * cores.length)];
        pedaco.style.animationDelay = (Math.random() * 0.3) + 's';
        pedaco.style.animationDuration = (1 + Math.random() * 0.6) + 's';
        container.appendChild(pedaco);
    }

    setTimeout(() => container.remove(), 2200);
}

function celebrarConquistaRetro() {
    tocarFanfarraConquista();
    dispararConfeteRetro();
}
