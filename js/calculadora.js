// ========================================
// CALCULADORA FLUTUANTE
// ========================================
// Widget independente: injeta seu próprio HTML/CSS na página, então basta
// incluir <script src="js/calculadora.js"></script> em qualquer página pra
// ativar. Fica pequena e arrastável, pra usar do lado do conteúdo enquanto
// o aluno estuda, sem sair da página.

(function () {
    const CSS = `
        .calc-fab {
            position: fixed;
            left: 24px;
            bottom: 24px;
            width: 52px;
            height: 52px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            background: #3a86ff;
            border: 3px solid #05050a;
            box-shadow: 4px 4px 0 #05050a;
            cursor: pointer;
            z-index: 400;
            transition: transform 0.1s ease, box-shadow 0.1s ease;
            user-select: none;
        }

        .calc-fab:hover {
            background: #518eff;
            transform: translate(-2px, -2px);
            box-shadow: 6px 6px 0 #05050a;
        }

        .calc-fab:active {
            transform: translate(2px, 2px);
            box-shadow: 2px 2px 0 #05050a;
        }

        .calc-painel {
            position: fixed;
            left: 24px;
            bottom: 88px;
            width: 230px;
            background: #101018;
            border: 3px solid #23233a;
            box-shadow: 5px 5px 0 #05050a;
            z-index: 400;
            font-family: 'Inter', sans-serif;
        }

        .calc-header {
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

        .calc-header:active {
            cursor: grabbing;
        }

        .calc-fechar {
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.4);
            cursor: pointer;
            font-size: 14px;
            line-height: 1;
            padding: 2px 4px;
        }

        .calc-fechar:hover {
            color: #ff6b6b;
        }

        .calc-display {
            padding: 16px 12px;
            background: #05050a;
            color: #fff;
            font-size: 26px;
            font-weight: 600;
            text-align: right;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            border-bottom: 2px solid #23233a;
        }

        .calc-teclado {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 6px;
            padding: 10px;
        }

        .calc-btn {
            padding: 12px 0;
            background: #1c1c2b;
            color: #fff;
            border: 2px solid #05050a;
            box-shadow: 2px 2px 0 #05050a;
            cursor: pointer;
            font-size: 15px;
            font-weight: 600;
            font-family: 'Inter', sans-serif;
            transition: transform 0.08s ease, box-shadow 0.08s ease;
        }

        .calc-btn:hover {
            background: #262638;
        }

        .calc-btn:active {
            transform: translate(2px, 2px);
            box-shadow: 0 0 0 #05050a;
        }

        .calc-btn.calc-op {
            background: rgba(58, 134, 255, 0.15);
            color: #3a86ff;
        }

        .calc-btn.calc-op:hover {
            background: rgba(58, 134, 255, 0.25);
        }

        .calc-btn.calc-fn {
            background: rgba(255, 107, 107, 0.12);
            color: #ff6b6b;
        }

        .calc-btn.calc-fn:hover {
            background: rgba(255, 107, 107, 0.2);
        }

        .calc-btn.calc-igual {
            background: #00f5d4;
            color: #0a0a0f;
        }

        .calc-btn.calc-igual:hover {
            background: #33f7dc;
        }

        .calc-btn.calc-zero {
            grid-column: span 2;
        }

        body.light-theme .calc-fab {
            border-color: #1a1a2e;
            box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
        }

        body.light-theme .calc-painel {
            background: #fff;
            border-color: #1a1a2e;
            box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.2);
        }

        body.light-theme .calc-header {
            background: #f0f2f5;
            border-bottom-color: #d5d8e0;
            color: rgba(0, 0, 0, 0.5);
        }

        body.light-theme .calc-display {
            background: #f0f2f5;
            color: #1a1a2e;
            border-bottom-color: #d5d8e0;
        }

        body.light-theme .calc-btn:not(.calc-op):not(.calc-fn):not(.calc-igual) {
            background: #f7f8fa;
            color: #1a1a2e;
            border-color: #1a1a2e;
        }

        body.light-theme .calc-btn:not(.calc-op):not(.calc-fn):not(.calc-igual):hover {
            background: #e2e5ec;
        }

        @media (max-width: 480px) {
            .calc-painel {
                left: 12px;
                right: 12px;
                width: auto;
            }

            .calc-fab {
                left: 12px;
            }
        }
    `;

    const HTML = `
        <button type="button" id="calcFab" class="calc-fab" title="Calculadora">🧮</button>
        <div id="calcPainel" class="calc-painel" style="display: none;">
            <div class="calc-header" id="calcHeader">
                <span>🧮 CALC</span>
                <button type="button" class="calc-fechar" id="calcFechar">✕</button>
            </div>
            <div class="calc-display" id="calcDisplay">0</div>
            <div class="calc-teclado">
                <button type="button" class="calc-btn calc-fn" data-acao="clear">C</button>
                <button type="button" class="calc-btn calc-fn" data-acao="backspace">⌫</button>
                <button type="button" class="calc-btn calc-fn" data-acao="percent">%</button>
                <button type="button" class="calc-btn calc-op" data-op="÷">÷</button>

                <button type="button" class="calc-btn" data-num="7">7</button>
                <button type="button" class="calc-btn" data-num="8">8</button>
                <button type="button" class="calc-btn" data-num="9">9</button>
                <button type="button" class="calc-btn calc-op" data-op="×">×</button>

                <button type="button" class="calc-btn" data-num="4">4</button>
                <button type="button" class="calc-btn" data-num="5">5</button>
                <button type="button" class="calc-btn" data-num="6">6</button>
                <button type="button" class="calc-btn calc-op" data-op="-">−</button>

                <button type="button" class="calc-btn" data-num="1">1</button>
                <button type="button" class="calc-btn" data-num="2">2</button>
                <button type="button" class="calc-btn" data-num="3">3</button>
                <button type="button" class="calc-btn calc-op" data-op="+">+</button>

                <button type="button" class="calc-btn calc-zero" data-num="0">0</button>
                <button type="button" class="calc-btn" data-acao="ponto">.</button>
                <button type="button" class="calc-btn calc-igual" data-acao="igual">=</button>
            </div>
        </div>
    `;

    function iniciar() {
        const style = document.createElement('style');
        style.textContent = CSS;
        document.head.appendChild(style);

        const container = document.createElement('div');
        container.innerHTML = HTML;
        document.body.appendChild(container);

        const fab = document.getElementById('calcFab');
        const painel = document.getElementById('calcPainel');
        const fechar = document.getElementById('calcFechar');
        const header = document.getElementById('calcHeader');
        const display = document.getElementById('calcDisplay');

        let estado = { atual: '0', anterior: null, operador: null, aguardaNovo: false };

        function formatarNumero(valor) {
            if (!isFinite(valor)) return 'Erro';
            const arredondado = Math.round(valor * 1e10) / 1e10;
            return String(arredondado);
        }

        function atualizarDisplay() {
            display.textContent = estado.atual.length > 12 ? parseFloat(estado.atual).toExponential(5) : estado.atual;
        }

        function digitarNumero(d) {
            if (estado.aguardaNovo) {
                estado.atual = d;
                estado.aguardaNovo = false;
            } else {
                estado.atual = estado.atual === '0' ? d : estado.atual + d;
            }
            atualizarDisplay();
        }

        function digitarPonto() {
            if (estado.aguardaNovo) {
                estado.atual = '0.';
                estado.aguardaNovo = false;
            } else if (!estado.atual.includes('.')) {
                estado.atual += '.';
            }
            atualizarDisplay();
        }

        function calcular() {
            if (estado.operador === null || estado.anterior === null) return;
            const anterior = estado.anterior;
            const atual = parseFloat(estado.atual);
            let resultado;
            switch (estado.operador) {
                case '+': resultado = anterior + atual; break;
                case '-': resultado = anterior - atual; break;
                case '×': resultado = anterior * atual; break;
                case '÷': resultado = atual === 0 ? Infinity : anterior / atual; break;
                default: return;
            }
            estado.atual = formatarNumero(resultado);
            estado.operador = null;
            estado.anterior = null;
            estado.aguardaNovo = true;
            atualizarDisplay();
        }

        function escolherOperador(op) {
            if (estado.operador !== null && !estado.aguardaNovo) {
                calcular();
            }
            estado.anterior = parseFloat(estado.atual);
            estado.operador = op;
            estado.aguardaNovo = true;
        }

        function limpar() {
            estado = { atual: '0', anterior: null, operador: null, aguardaNovo: false };
            atualizarDisplay();
        }

        function apagar() {
            if (estado.aguardaNovo) return;
            estado.atual = estado.atual.length > 1 ? estado.atual.slice(0, -1) : '0';
            atualizarDisplay();
        }

        function porcentagem() {
            estado.atual = formatarNumero(parseFloat(estado.atual) / 100);
            atualizarDisplay();
        }

        painel.querySelector('.calc-teclado').addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;

            if (btn.dataset.num !== undefined) {
                digitarNumero(btn.dataset.num);
            } else if (btn.dataset.op) {
                escolherOperador(btn.dataset.op);
            } else if (btn.dataset.acao === 'igual') {
                calcular();
            } else if (btn.dataset.acao === 'clear') {
                limpar();
            } else if (btn.dataset.acao === 'backspace') {
                apagar();
            } else if (btn.dataset.acao === 'percent') {
                porcentagem();
            } else if (btn.dataset.acao === 'ponto') {
                digitarPonto();
            }
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
            // Trava a posição em left/top absolutos (em vez de bottom/right) pra arrastar livremente
            painel.style.left = rect.left + 'px';
            painel.style.top = rect.top + 'px';
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
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciar);
    } else {
        iniciar();
    }
})();
