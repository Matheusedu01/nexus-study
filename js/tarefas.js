// ========================================
// LISTA DE TAREFAS FLUTUANTE
// ========================================
// Mesmo padrão da calculadora/caderno/pomodoro/dicionário: widget
// independente que injeta seu próprio HTML/CSS, então basta incluir
// <script src="js/tarefas.js"></script> em qualquer página pra ativar.
// A lista é salva sozinha no localStorage por usuário, igual ao caderno.

(function () {
    const usuario = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const CHAVE_STORAGE = `tarefas_${usuario?.email || 'anonimo'}`;

    const CSS = `
        .tar-fab {
            position: fixed;
            right: 24px;
            bottom: 214px;
            width: 52px;
            height: 52px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            background: #06d6a0;
            border: 3px solid #05050a;
            box-shadow: 4px 4px 0 #05050a;
            cursor: pointer;
            z-index: 400;
            transition: transform 0.1s ease, box-shadow 0.1s ease;
            user-select: none;
        }

        .tar-fab:hover {
            background: #2ee0b3;
            transform: translate(-2px, -2px);
            box-shadow: 6px 6px 0 #05050a;
        }

        .tar-fab:active {
            transform: translate(2px, 2px);
            box-shadow: 2px 2px 0 #05050a;
        }

        .tar-painel {
            position: fixed;
            right: 86px;
            bottom: 214px;
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

        .tar-header {
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

        .tar-header:active {
            cursor: grabbing;
        }

        .tar-fechar {
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.4);
            cursor: pointer;
            font-size: 14px;
            line-height: 1;
            padding: 2px 4px;
        }

        .tar-fechar:hover {
            color: #ff6b6b;
        }

        .tar-add-row {
            display: flex;
            gap: 6px;
            padding: 10px;
            border-bottom: 2px solid #23233a;
        }

        .tar-input {
            flex: 1;
            min-width: 0;
            padding: 8px 10px;
            background: #05050a;
            border: 2px solid #2a2a3d;
            color: #fff;
            font-size: 13px;
            font-family: 'Inter', sans-serif;
        }

        .tar-input:focus {
            outline: none;
            border-color: #06d6a0;
        }

        .tar-input::placeholder {
            color: rgba(255, 255, 255, 0.3);
        }

        .tar-btn-add {
            padding: 8px 12px;
            background: #06d6a0;
            color: #05050a;
            border: 2px solid #05050a;
            box-shadow: 2px 2px 0 #05050a;
            cursor: pointer;
            font-size: 14px;
            font-weight: 700;
            transition: transform 0.08s ease;
        }

        .tar-btn-add:hover {
            background: #2ee0b3;
        }

        .tar-btn-add:active {
            transform: translate(2px, 2px);
            box-shadow: 0 0 0 #05050a;
        }

        .tar-lista {
            flex: 1;
            overflow-y: auto;
            padding: 6px;
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .tar-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 8px;
            background: #1c1c2b;
            border: 1px solid #23233a;
        }

        .tar-item-check {
            flex-shrink: 0;
            width: 16px;
            height: 16px;
            cursor: pointer;
            accent-color: #06d6a0;
        }

        .tar-item-texto {
            flex: 1;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.85);
            word-break: break-word;
        }

        .tar-item.tar-feita .tar-item-texto {
            text-decoration: line-through;
            color: rgba(255, 255, 255, 0.35);
        }

        .tar-item-remover {
            flex-shrink: 0;
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.3);
            cursor: pointer;
            font-size: 13px;
            line-height: 1;
            padding: 2px 4px;
        }

        .tar-item-remover:hover {
            color: #ff6b6b;
        }

        .tar-vazio {
            text-align: center;
            padding: 20px 10px;
            color: rgba(255, 255, 255, 0.3);
            font-size: 12px;
        }

        .tar-rodape {
            padding: 8px 10px;
            border-top: 2px solid #23233a;
            background: #14141f;
            font-size: 11px;
            color: rgba(255, 255, 255, 0.5);
            text-align: center;
        }

        body.light-theme .tar-fab {
            border-color: #1a1a2e;
            box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
        }

        body.light-theme .tar-painel {
            background: #fff;
            border-color: #1a1a2e;
            box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.2);
        }

        body.light-theme .tar-header,
        body.light-theme .tar-rodape {
            background: #f0f2f5;
            border-color: #d5d8e0;
            color: rgba(0, 0, 0, 0.5);
        }

        body.light-theme .tar-add-row {
            border-color: #d5d8e0;
        }

        body.light-theme .tar-input {
            background: #f7f8fa;
            border-color: #1a1a2e;
            color: #1a1a2e;
        }

        body.light-theme .tar-input::placeholder {
            color: rgba(0, 0, 0, 0.3);
        }

        body.light-theme .tar-item {
            background: #f7f8fa;
            border-color: #d5d8e0;
        }

        body.light-theme .tar-item-texto {
            color: #1a1a2e;
        }

        body.light-theme .tar-item.tar-feita .tar-item-texto {
            color: rgba(0, 0, 0, 0.35);
        }

        body.light-theme .tar-vazio {
            color: rgba(0, 0, 0, 0.35);
        }

        @media (max-width: 480px) {
            .tar-painel {
                right: 12px;
                left: 12px;
                width: auto;
            }

            .tar-fab {
                right: 12px;
            }
        }
    `;

    const HTML = `
        <button type="button" id="tarFab" class="tar-fab" title="Lista de tarefas">✅</button>
        <div id="tarPainel" class="tar-painel" style="display: none;">
            <div class="tar-header" id="tarHeader">
                <span>✅ TAREFAS</span>
                <button type="button" class="tar-fechar" id="tarFechar">✕</button>
            </div>
            <div class="tar-add-row">
                <input type="text" id="tarInput" class="tar-input" placeholder="nova tarefa...">
                <button type="button" id="tarBtnAdd" class="tar-btn-add">+</button>
            </div>
            <div class="tar-lista" id="tarLista"></div>
            <div class="tar-rodape" id="tarRodape">0 de 0 concluídas</div>
        </div>
    `;

    function iniciar() {
        const style = document.createElement('style');
        style.textContent = CSS;
        document.head.appendChild(style);

        const container = document.createElement('div');
        container.innerHTML = HTML;
        document.body.appendChild(container);

        const fab = document.getElementById('tarFab');
        const painel = document.getElementById('tarPainel');
        const fechar = document.getElementById('tarFechar');
        const header = document.getElementById('tarHeader');
        const input = document.getElementById('tarInput');
        const btnAdd = document.getElementById('tarBtnAdd');
        const lista = document.getElementById('tarLista');
        const rodape = document.getElementById('tarRodape');

        let tarefas = JSON.parse(localStorage.getItem(CHAVE_STORAGE) || '[]');

        function salvar() {
            localStorage.setItem(CHAVE_STORAGE, JSON.stringify(tarefas));
        }

        function escaparHtml(texto) {
            const div = document.createElement('div');
            div.textContent = texto;
            return div.innerHTML;
        }

        function renderizar() {
            if (tarefas.length === 0) {
                lista.innerHTML = '<div class="tar-vazio">Nenhuma tarefa ainda.</div>';
            } else {
                lista.innerHTML = tarefas.map(t => `
                    <div class="tar-item ${t.feita ? 'tar-feita' : ''}" data-id="${t.id}">
                        <input type="checkbox" class="tar-item-check" ${t.feita ? 'checked' : ''}>
                        <span class="tar-item-texto">${escaparHtml(t.texto)}</span>
                        <button type="button" class="tar-item-remover">✕</button>
                    </div>
                `).join('');
            }
            const feitas = tarefas.filter(t => t.feita).length;
            rodape.textContent = `${feitas} de ${tarefas.length} concluídas`;
        }

        function adicionar() {
            const texto = input.value.trim();
            if (!texto) return;
            tarefas.push({ id: Date.now(), texto, feita: false });
            input.value = '';
            salvar();
            renderizar();
        }

        btnAdd.addEventListener('click', adicionar);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') adicionar();
        });

        lista.addEventListener('click', (e) => {
            const item = e.target.closest('.tar-item');
            if (!item) return;
            const id = Number(item.dataset.id);

            if (e.target.classList.contains('tar-item-check')) {
                const tarefa = tarefas.find(t => t.id === id);
                if (tarefa) tarefa.feita = !tarefa.feita;
                salvar();
                renderizar();
            } else if (e.target.classList.contains('tar-item-remover')) {
                tarefas = tarefas.filter(t => t.id !== id);
                salvar();
                renderizar();
            }
        });

        // Abrir/fechar
        fab.addEventListener('click', () => {
            const aberto = painel.style.display !== 'none';
            painel.style.display = aberto ? 'none' : 'flex';
            if (!aberto) input.focus();
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

        renderizar();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciar);
    } else {
        iniciar();
    }
})();
