// ========================================
// CADERNO DE ANOTAÇÕES FLUTUANTE
// ========================================
// Mesmo padrão da calculadora (js/calculadora.js): widget independente que
// injeta seu próprio HTML/CSS, então basta incluir
// <script src="js/caderno.js"></script> em qualquer página pra ativar.
// O texto é salvo sozinho (com um pequeno atraso) no localStorage por
// usuário, e continua lá na próxima vez que ele voltar, em qualquer página.

(function () {
    const usuario = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const CHAVE_STORAGE = `caderno_${usuario?.email || 'anonimo'}`;

    const CSS = `
        .cad-fab {
            position: fixed;
            left: 24px;
            bottom: 86px;
            width: 52px;
            height: 52px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            background: #8338ec;
            border: 3px solid #05050a;
            box-shadow: 4px 4px 0 #05050a;
            cursor: pointer;
            z-index: 400;
            transition: transform 0.1s ease, box-shadow 0.1s ease;
            user-select: none;
        }

        .cad-fab:hover {
            background: #9b5cf0;
            transform: translate(-2px, -2px);
            box-shadow: 6px 6px 0 #05050a;
        }

        .cad-fab:active {
            transform: translate(2px, 2px);
            box-shadow: 2px 2px 0 #05050a;
        }

        .cad-painel {
            position: fixed;
            left: 86px;
            bottom: 86px;
            width: 260px;
            height: 300px;
            display: flex;
            flex-direction: column;
            background: #101018;
            border: 3px solid #23233a;
            box-shadow: 5px 5px 0 #05050a;
            z-index: 400;
            font-family: 'Inter', sans-serif;
        }

        .cad-header {
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

        .cad-header:active {
            cursor: grabbing;
        }

        .cad-fechar {
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.4);
            cursor: pointer;
            font-size: 14px;
            line-height: 1;
            padding: 2px 4px;
        }

        .cad-fechar:hover {
            color: #ff6b6b;
        }

        .cad-textarea {
            flex: 1;
            resize: none;
            border: none;
            outline: none;
            padding: 12px;
            background: #05050a;
            color: rgba(255, 255, 255, 0.85);
            font-family: 'Inter', sans-serif;
            font-size: 13px;
            line-height: 1.6;
        }

        .cad-textarea::placeholder {
            color: rgba(255, 255, 255, 0.25);
        }

        .cad-rodape {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 10px;
            border-top: 2px solid #23233a;
            background: #14141f;
        }

        .cad-status {
            font-size: 11px;
            color: rgba(0, 245, 212, 0.7);
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .cad-status.cad-visivel {
            opacity: 1;
        }

        .cad-limpar {
            padding: 4px 12px;
            background: rgba(255, 107, 107, 0.12);
            color: #ff6b6b;
            border: 2px solid #ff6b6b;
            cursor: pointer;
            font-size: 11px;
            font-weight: 600;
            font-family: 'Inter', sans-serif;
            transition: transform 0.08s ease;
        }

        .cad-limpar:hover {
            background: rgba(255, 107, 107, 0.2);
        }

        .cad-limpar:active {
            transform: translate(1px, 1px);
        }

        body.light-theme .cad-fab {
            border-color: #1a1a2e;
            box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
        }

        body.light-theme .cad-painel {
            background: #fff;
            border-color: #1a1a2e;
            box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.2);
        }

        body.light-theme .cad-header,
        body.light-theme .cad-rodape {
            background: #f0f2f5;
            border-color: #d5d8e0;
            color: rgba(0, 0, 0, 0.5);
        }

        body.light-theme .cad-textarea {
            background: #fff;
            color: #1a1a2e;
        }

        body.light-theme .cad-textarea::placeholder {
            color: rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 480px) {
            .cad-painel {
                left: 12px;
                right: 12px;
                width: auto;
            }
        }
    `;

    const HTML = `
        <button type="button" id="cadFab" class="cad-fab" title="Caderno de anotações">📓</button>
        <div id="cadPainel" class="cad-painel" style="display: none;">
            <div class="cad-header" id="cadHeader">
                <span>📓 CADERNO</span>
                <button type="button" class="cad-fechar" id="cadFechar">✕</button>
            </div>
            <textarea id="cadTextarea" class="cad-textarea" placeholder="Digite aqui suas anotações... elas são salvas sozinhas."></textarea>
            <div class="cad-rodape">
                <span class="cad-status" id="cadStatus">✅ Salvo</span>
                <button type="button" class="cad-limpar" id="cadLimpar">🗑️ Limpar</button>
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

        const fab = document.getElementById('cadFab');
        const painel = document.getElementById('cadPainel');
        const fechar = document.getElementById('cadFechar');
        const header = document.getElementById('cadHeader');
        const textarea = document.getElementById('cadTextarea');
        const status = document.getElementById('cadStatus');
        const btnLimpar = document.getElementById('cadLimpar');

        // Carrega o que já tinha sido salvo
        textarea.value = localStorage.getItem(CHAVE_STORAGE) || '';

        let timeoutSalvar = null;
        function salvar() {
            localStorage.setItem(CHAVE_STORAGE, textarea.value);
            status.classList.add('cad-visivel');
            clearTimeout(timeoutSalvar);
            timeoutSalvar = setTimeout(() => status.classList.remove('cad-visivel'), 1500);
        }

        let timeoutDebounce = null;
        textarea.addEventListener('input', () => {
            clearTimeout(timeoutDebounce);
            timeoutDebounce = setTimeout(salvar, 400);
        });

        // Salva imediatamente se o usuário sair da página com algo pendente
        window.addEventListener('beforeunload', () => {
            localStorage.setItem(CHAVE_STORAGE, textarea.value);
        });

        btnLimpar.addEventListener('click', () => {
            if (!textarea.value.trim()) return;
            if (confirm('Tem certeza que deseja apagar todas as anotações do caderno?')) {
                textarea.value = '';
                salvar();
            }
        });

        // Abrir/fechar
        fab.addEventListener('click', () => {
            const aberto = painel.style.display !== 'none';
            painel.style.display = aberto ? 'none' : 'flex';
            if (!aberto) textarea.focus();
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
