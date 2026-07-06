// ========================================
// TIMER POMODORO FLUTUANTE
// ========================================
// Mesmo padrão da calculadora/caderno (js/calculadora.js, js/caderno.js):
// widget independente que injeta seu próprio HTML/CSS, então basta incluir
// <script src="js/pomodoro.js"></script> em qualquer página pra ativar.
// Fica no canto direito (a calculadora e o caderno já ocupam o esquerdo).

(function () {
    const CSS = `
        .pomo-fab {
            position: fixed;
            right: 24px;
            bottom: 90px;
            width: 52px;
            height: 52px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            background: #ff6b6b;
            border: 3px solid #05050a;
            box-shadow: 4px 4px 0 #05050a;
            cursor: pointer;
            z-index: 400;
            transition: transform 0.1s ease, box-shadow 0.1s ease;
            user-select: none;
        }

        .pomo-fab:hover {
            background: #ff8686;
            transform: translate(-2px, -2px);
            box-shadow: 6px 6px 0 #05050a;
        }

        .pomo-fab:active {
            transform: translate(2px, 2px);
            box-shadow: 2px 2px 0 #05050a;
        }

        .pomo-painel {
            position: fixed;
            right: 86px;
            bottom: 90px;
            width: 220px;
            background: #101018;
            border: 3px solid #23233a;
            box-shadow: 5px 5px 0 #05050a;
            z-index: 400;
            font-family: 'Inter', sans-serif;
        }

        .pomo-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 10px;
            background: #14141f;
            border-bottom: 2px solid #23233a;
            cursor: grab;
            color: rgba(255, 255, 255, 0.6);
            font-size: 11px;
            font-family: 'Press Start 2P', monospace;
            letter-spacing: 0.5px;
            user-select: none;
        }

        .pomo-header:active {
            cursor: grabbing;
        }

        .pomo-fechar {
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.4);
            cursor: pointer;
            font-size: 14px;
            line-height: 1;
            padding: 2px 4px;
        }

        .pomo-fechar:hover {
            color: #ff6b6b;
        }

        .pomo-modo {
            text-align: center;
            padding: 10px 0 0;
            color: rgba(255, 255, 255, 0.55);
            font-size: 10px;
            font-family: 'Press Start 2P', monospace;
            letter-spacing: 0.5px;
        }

        .pomo-display {
            padding: 8px 12px 14px;
            background: #101018;
            color: #fff;
            font-size: 36px;
            font-weight: 700;
            text-align: center;
            font-family: 'Press Start 2P', monospace;
        }

        .pomo-presets {
            display: flex;
            gap: 6px;
            padding: 0 10px 10px;
        }

        .pomo-preset {
            flex: 1;
            padding: 6px 0;
            background: #1c1c2b;
            color: rgba(255, 255, 255, 0.6);
            border: 2px solid #05050a;
            box-shadow: 2px 2px 0 #05050a;
            cursor: pointer;
            font-size: 12px;
            font-weight: 600;
            font-family: 'Inter', sans-serif;
            transition: transform 0.08s ease;
        }

        .pomo-preset:hover {
            background: #262638;
        }

        .pomo-preset:active {
            transform: translate(2px, 2px);
            box-shadow: 0 0 0 #05050a;
        }

        .pomo-preset.pomo-preset-ativo {
            background: rgba(255, 107, 107, 0.15);
            color: #ff6b6b;
            border-color: #ff6b6b;
        }

        .pomo-controles {
            display: flex;
            gap: 6px;
            padding: 0 10px 12px;
        }

        .pomo-btn {
            flex: 1;
            padding: 10px 0;
            border: 2px solid #05050a;
            box-shadow: 2px 2px 0 #05050a;
            cursor: pointer;
            font-size: 13px;
            font-weight: 600;
            font-family: 'Inter', sans-serif;
            transition: transform 0.08s ease, box-shadow 0.08s ease;
        }

        .pomo-btn:active {
            transform: translate(2px, 2px);
            box-shadow: 0 0 0 #05050a;
        }

        .pomo-iniciar {
            background: #ff6b6b;
            color: #05050a;
        }

        .pomo-iniciar:hover {
            background: #ff8686;
        }

        .pomo-iniciar.pomo-rodando {
            background: #1c1c2b;
            color: #fff;
        }

        .pomo-iniciar.pomo-rodando:hover {
            background: #262638;
        }

        .pomo-reset {
            background: #1c1c2b;
            color: rgba(255, 255, 255, 0.6);
        }

        .pomo-reset:hover {
            background: #262638;
        }

        body.light-theme .pomo-fab {
            border-color: #1a1a2e;
            box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
        }

        body.light-theme .pomo-painel {
            background: #fff;
            border-color: #1a1a2e;
            box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.2);
        }

        body.light-theme .pomo-header {
            background: #f0f2f5;
            border-bottom-color: #d5d8e0;
            color: rgba(0, 0, 0, 0.5);
        }

        body.light-theme .pomo-modo {
            color: rgba(0, 0, 0, 0.55);
        }

        body.light-theme .pomo-display {
            background: #fff;
            color: #1a1a2e;
        }

        body.light-theme .pomo-preset {
            background: #f7f8fa;
            color: #1a1a2e;
            border-color: #1a1a2e;
        }

        body.light-theme .pomo-preset:hover {
            background: #e2e5ec;
        }

        body.light-theme .pomo-preset.pomo-preset-ativo {
            background: rgba(255, 107, 107, 0.12);
            color: #e63946;
            border-color: #e63946;
        }

        body.light-theme .pomo-reset {
            background: #f7f8fa;
            color: #1a1a2e;
            border-color: #1a1a2e;
        }

        body.light-theme .pomo-reset:hover {
            background: #e2e5ec;
        }

        body.light-theme .pomo-iniciar.pomo-rodando {
            background: #f7f8fa;
            color: #1a1a2e;
            border-color: #1a1a2e;
        }

        @media (max-width: 480px) {
            .pomo-painel {
                right: 12px;
                width: auto;
                left: 12px;
            }

            .pomo-fab {
                right: 12px;
            }
        }
    `;

    const HTML = `
        <button type="button" id="pomoFab" class="pomo-fab" title="Timer Pomodoro">🍅</button>
        <div id="pomoPainel" class="pomo-painel" style="display: none;">
            <div class="pomo-header" id="pomoHeader">
                <span>🍅 POMODORO</span>
                <button type="button" class="pomo-fechar" id="pomoFechar">✕</button>
            </div>
            <div class="pomo-modo" id="pomoModo">🎯 FOCO</div>
            <div class="pomo-display" id="pomoDisplay">25:00</div>
            <div class="pomo-presets">
                <button type="button" class="pomo-preset pomo-preset-ativo" id="pomoPreset1" data-foco="25" data-pausa="5">25•5</button>
                <button type="button" class="pomo-preset" id="pomoPreset2" data-foco="50" data-pausa="10">50•10</button>
            </div>
            <div class="pomo-controles">
                <button type="button" class="pomo-btn pomo-iniciar" id="pomoIniciar">▶ Iniciar</button>
                <button type="button" class="pomo-btn pomo-reset" id="pomoReset">↺ Zerar</button>
            </div>
        </div>
    `;

    let _ctxAlarme = null;
    function tocarAlarmePomodoro() {
        try {
            const AudioContextClasse = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClasse) return;
            if (!_ctxAlarme) _ctxAlarme = new AudioContextClasse();
            if (_ctxAlarme.state === 'suspended') _ctxAlarme.resume();
            [0, 0.16, 0.32].forEach((t, i) => {
                const osc = _ctxAlarme.createOscillator();
                const gain = _ctxAlarme.createGain();
                osc.type = 'square';
                osc.frequency.setValueAtTime(i % 2 === 0 ? 880 : 659.25, _ctxAlarme.currentTime + t);
                gain.gain.setValueAtTime(0.07, _ctxAlarme.currentTime + t);
                gain.gain.exponentialRampToValueAtTime(0.001, _ctxAlarme.currentTime + t + 0.14);
                osc.connect(gain);
                gain.connect(_ctxAlarme.destination);
                osc.start(_ctxAlarme.currentTime + t);
                osc.stop(_ctxAlarme.currentTime + t + 0.14);
            });
        } catch (e) {
            console.error('Erro ao tocar alarme do pomodoro:', e);
        }
    }

    function iniciar() {
        const style = document.createElement('style');
        style.textContent = CSS;
        document.head.appendChild(style);

        const container = document.createElement('div');
        container.innerHTML = HTML;
        document.body.appendChild(container);

        const fab = document.getElementById('pomoFab');
        const painel = document.getElementById('pomoPainel');
        const fechar = document.getElementById('pomoFechar');
        const header = document.getElementById('pomoHeader');
        const display = document.getElementById('pomoDisplay');
        const modoLabel = document.getElementById('pomoModo');
        const btnIniciar = document.getElementById('pomoIniciar');
        const btnReset = document.getElementById('pomoReset');
        const presets = [document.getElementById('pomoPreset1'), document.getElementById('pomoPreset2')];

        let estado = { foco: 25 * 60, pausa: 5 * 60, restante: 25 * 60, modo: 'foco', rodando: false };
        let intervalId = null;

        function formatarTempo(segundos) {
            const m = Math.floor(segundos / 60).toString().padStart(2, '0');
            const s = Math.floor(segundos % 60).toString().padStart(2, '0');
            return `${m}:${s}`;
        }

        function atualizarDisplay() {
            display.textContent = formatarTempo(estado.restante);
            modoLabel.textContent = estado.modo === 'foco' ? '🎯 FOCO' : '☕ PAUSA';
        }

        function atualizarBotaoIniciar() {
            btnIniciar.textContent = estado.rodando ? '⏸ Pausar' : '▶ Iniciar';
            btnIniciar.classList.toggle('pomo-rodando', estado.rodando);
        }

        function alternarModo() {
            estado.modo = estado.modo === 'foco' ? 'pausa' : 'foco';
            estado.restante = estado.modo === 'foco' ? estado.foco : estado.pausa;
        }

        function tick() {
            estado.restante--;
            if (estado.restante <= 0) {
                tocarAlarmePomodoro();
                alternarModo();
            }
            atualizarDisplay();
        }

        function iniciarTimer() {
            if (estado.rodando) return;
            estado.rodando = true;
            intervalId = setInterval(tick, 1000);
            atualizarBotaoIniciar();
        }

        function pausarTimer() {
            estado.rodando = false;
            clearInterval(intervalId);
            atualizarBotaoIniciar();
        }

        function resetarTimer() {
            pausarTimer();
            estado.modo = 'foco';
            estado.restante = estado.foco;
            atualizarDisplay();
        }

        btnIniciar.addEventListener('click', () => {
            if (estado.rodando) pausarTimer();
            else iniciarTimer();
        });

        btnReset.addEventListener('click', resetarTimer);

        presets.forEach(botao => {
            botao.addEventListener('click', () => {
                presets.forEach(b => b.classList.remove('pomo-preset-ativo'));
                botao.classList.add('pomo-preset-ativo');
                estado.foco = parseInt(botao.dataset.foco, 10) * 60;
                estado.pausa = parseInt(botao.dataset.pausa, 10) * 60;
                resetarTimer();
            });
        });

        // Abrir/fechar
        fab.addEventListener('click', () => {
            const aberto = painel.style.display !== 'none';
            painel.style.display = aberto ? 'none' : 'block';
        });
        fechar.addEventListener('click', () => { painel.style.display = 'none'; });

        // Arrastar pelo cabeçalho (mouse e toque)
        let arrastando = false;
        let offsetX = 0;
        let offsetY = 0;

        function iniciarArrasto(x, y) {
            const rect = painel.getBoundingClientRect();
            arrastando = true;
            offsetX = x - rect.left;
            offsetY = y - rect.top;
            painel.style.left = rect.left + 'px';
            painel.style.top = rect.top + 'px';
            painel.style.right = 'auto';
            painel.style.bottom = 'auto';
        }

        function moverPara(x, y) {
            if (!arrastando) return;
            const largura = painel.offsetWidth;
            const altura = painel.offsetHeight;
            const novoX = Math.min(Math.max(0, x - offsetX), window.innerWidth - largura);
            const novoY = Math.min(Math.max(0, y - offsetY), window.innerHeight - altura);
            painel.style.left = novoX + 'px';
            painel.style.top = novoY + 'px';
        }

        header.addEventListener('mousedown', (e) => { iniciarArrasto(e.clientX, e.clientY); });
        document.addEventListener('mousemove', (e) => { moverPara(e.clientX, e.clientY); });
        document.addEventListener('mouseup', () => { arrastando = false; });

        header.addEventListener('touchstart', (e) => {
            const t = e.touches[0];
            iniciarArrasto(t.clientX, t.clientY);
        }, { passive: true });
        document.addEventListener('touchmove', (e) => {
            if (!arrastando) return;
            const t = e.touches[0];
            moverPara(t.clientX, t.clientY);
        }, { passive: true });
        document.addEventListener('touchend', () => { arrastando = false; });

        atualizarDisplay();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciar);
    } else {
        iniciar();
    }
})();
