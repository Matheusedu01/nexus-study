// ========================================
// DICIONÁRIO RÁPIDO FLUTUANTE
// ========================================
// Mesmo padrão da calculadora/caderno/pomodoro: widget independente que
// injeta seu próprio HTML/CSS, então basta incluir
// <script src="js/dicionario-flutuante.js"></script> em qualquer página pra
// ativar. Usa a mesma API pública e gratuita (MyMemory, sem chave) que já
// serve de último recurso no tradutor de palavras de estudo.html — aqui é
// a única fonte, pra manter o widget funcionando sozinho em qualquer página,
// sem depender de js/config.js.

(function () {
    const CSS = `
        .dic-fab {
            position: fixed;
            right: 24px;
            bottom: 152px;
            width: 52px;
            height: 52px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            background: #00b4d8;
            border: 3px solid #05050a;
            box-shadow: 4px 4px 0 #05050a;
            cursor: pointer;
            z-index: 400;
            transition: transform 0.1s ease, box-shadow 0.1s ease;
            user-select: none;
        }

        .dic-fab:hover {
            background: #33c3e0;
            transform: translate(-2px, -2px);
            box-shadow: 6px 6px 0 #05050a;
        }

        .dic-fab:active {
            transform: translate(2px, 2px);
            box-shadow: 2px 2px 0 #05050a;
        }

        .dic-painel {
            position: fixed;
            right: 86px;
            bottom: 152px;
            width: 260px;
            background: #101018;
            border: 3px solid #23233a;
            box-shadow: 5px 5px 0 #05050a;
            z-index: 400;
            font-family: 'Inter', sans-serif;
        }

        .dic-header {
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

        .dic-header:active {
            cursor: grabbing;
        }

        .dic-fechar {
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.4);
            cursor: pointer;
            font-size: 14px;
            line-height: 1;
            padding: 2px 4px;
        }

        .dic-fechar:hover {
            color: #ff6b6b;
        }

        .dic-corpo {
            padding: 12px;
        }

        .dic-busca-row {
            display: flex;
            gap: 6px;
        }

        .dic-input {
            flex: 1;
            min-width: 0;
            padding: 8px 10px;
            background: #05050a;
            border: 2px solid #2a2a3d;
            color: #fff;
            font-size: 13px;
            font-family: 'Inter', sans-serif;
        }

        .dic-input:focus {
            outline: none;
            border-color: #00b4d8;
        }

        .dic-input::placeholder {
            color: rgba(255, 255, 255, 0.3);
        }

        .dic-btn-buscar {
            padding: 8px 12px;
            background: #00b4d8;
            color: #05050a;
            border: 2px solid #05050a;
            box-shadow: 2px 2px 0 #05050a;
            cursor: pointer;
            font-size: 13px;
            font-weight: 700;
            transition: transform 0.08s ease;
        }

        .dic-btn-buscar:hover {
            background: #33c3e0;
        }

        .dic-btn-buscar:active {
            transform: translate(2px, 2px);
            box-shadow: 0 0 0 #05050a;
        }

        .dic-resultado {
            margin-top: 12px;
            display: none;
        }

        .dic-resultado.dic-visivel {
            display: block;
        }

        .dic-palavra-en {
            color: #00b4d8;
            font-size: 18px;
            font-weight: 700;
        }

        .dic-palavra-pt {
            color: #00f5d4;
            font-size: 18px;
            font-weight: 700;
            margin-top: 2px;
        }

        .dic-status {
            margin-top: 10px;
            color: rgba(255, 255, 255, 0.5);
            font-size: 12px;
        }

        .dic-recentes {
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .dic-recente-item {
            display: flex;
            justify-content: space-between;
            gap: 8px;
            padding: 4px 8px;
            background: #1c1c2b;
            border: 1px solid #23233a;
            cursor: pointer;
            font-size: 12px;
        }

        .dic-recente-item:hover {
            background: #262638;
        }

        .dic-recente-item .dic-recente-en {
            color: #00b4d8;
        }

        .dic-recente-item .dic-recente-pt {
            color: rgba(255, 255, 255, 0.5);
        }

        body.light-theme .dic-fab {
            border-color: #1a1a2e;
            box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
        }

        body.light-theme .dic-painel {
            background: #fff;
            border-color: #1a1a2e;
            box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.2);
        }

        body.light-theme .dic-header {
            background: #f0f2f5;
            border-bottom-color: #d5d8e0;
            color: rgba(0, 0, 0, 0.5);
        }

        body.light-theme .dic-input {
            background: #f7f8fa;
            border-color: #1a1a2e;
            color: #1a1a2e;
        }

        body.light-theme .dic-input::placeholder {
            color: rgba(0, 0, 0, 0.3);
        }

        body.light-theme .dic-status {
            color: rgba(0, 0, 0, 0.55);
        }

        body.light-theme .dic-recente-item {
            background: #f7f8fa;
            border-color: #d5d8e0;
        }

        body.light-theme .dic-recente-item:hover {
            background: #e2e5ec;
        }

        body.light-theme .dic-recente-item .dic-recente-pt {
            color: rgba(0, 0, 0, 0.55);
        }

        @media (max-width: 480px) {
            .dic-painel {
                right: 12px;
                left: 12px;
                width: auto;
            }

            .dic-fab {
                right: 12px;
            }
        }
    `;

    const HTML = `
        <button type="button" id="dicFab" class="dic-fab" title="Dicionário rápido">📖</button>
        <div id="dicPainel" class="dic-painel" style="display: none;">
            <div class="dic-header" id="dicHeader">
                <span>📖 DICIONÁRIO</span>
                <button type="button" class="dic-fechar" id="dicFechar">✕</button>
            </div>
            <div class="dic-corpo">
                <div class="dic-busca-row">
                    <input type="text" id="dicInput" class="dic-input" placeholder="palavra em inglês...">
                    <button type="button" id="dicBtnBuscar" class="dic-btn-buscar">🔍</button>
                </div>
                <div class="dic-status" id="dicStatus"></div>
                <div class="dic-resultado" id="dicResultado">
                    <div class="dic-palavra-en" id="dicPalavraEn"></div>
                    <div class="dic-palavra-pt" id="dicPalavraPt"></div>
                </div>
                <div class="dic-recentes" id="dicRecentes"></div>
            </div>
        </div>
    `;

    async function traduzirViaMyMemory(palavra) {
        const resposta = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(palavra)}&langpair=en|pt-br`);
        if (!resposta.ok) return null;

        const dados = await resposta.json();
        const texto = dados?.responseData?.translatedText;

        if (!texto || dados.responseStatus !== 200 || texto.trim().toLowerCase() === palavra.trim().toLowerCase()) {
            return null;
        }

        return texto;
    }

    function iniciar() {
        const style = document.createElement('style');
        style.textContent = CSS;
        document.head.appendChild(style);

        const container = document.createElement('div');
        container.innerHTML = HTML;
        document.body.appendChild(container);

        const fab = document.getElementById('dicFab');
        const painel = document.getElementById('dicPainel');
        const fechar = document.getElementById('dicFechar');
        const header = document.getElementById('dicHeader');
        const input = document.getElementById('dicInput');
        const btnBuscar = document.getElementById('dicBtnBuscar');
        const status = document.getElementById('dicStatus');
        const resultado = document.getElementById('dicResultado');
        const palavraEn = document.getElementById('dicPalavraEn');
        const palavraPt = document.getElementById('dicPalavraPt');
        const recentesEl = document.getElementById('dicRecentes');

        let recentes = [];

        function escaparHtml(texto) {
            const div = document.createElement('div');
            div.textContent = texto;
            return div.innerHTML;
        }

        function renderizarRecentes() {
            recentesEl.innerHTML = recentes.slice(0, 5).map(r => `
                <div class="dic-recente-item" data-en="${escaparHtml(r.en)}" data-pt="${escaparHtml(r.pt)}">
                    <span class="dic-recente-en">${escaparHtml(r.en)}</span>
                    <span class="dic-recente-pt">${escaparHtml(r.pt)}</span>
                </div>
            `).join('');
        }

        async function buscar(palavra) {
            const limpa = palavra.trim();
            if (!limpa) return;

            status.textContent = '⏳ Buscando...';
            resultado.classList.remove('dic-visivel');

            let traducao = null;
            try {
                traducao = await traduzirViaMyMemory(limpa);
            } catch (erro) {
                console.error('Erro ao buscar tradução:', erro);
            }

            if (!traducao) {
                status.textContent = '❌ Não encontrada. Tente outra palavra.';
                return;
            }

            status.textContent = '';
            palavraEn.textContent = limpa;
            palavraPt.textContent = traducao;
            resultado.classList.add('dic-visivel');

            recentes = recentes.filter(r => r.en.toLowerCase() !== limpa.toLowerCase());
            recentes.unshift({ en: limpa, pt: traducao });
            renderizarRecentes();
        }

        btnBuscar.addEventListener('click', () => buscar(input.value));
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') buscar(input.value);
        });

        recentesEl.addEventListener('click', (e) => {
            const item = e.target.closest('.dic-recente-item');
            if (!item) return;
            input.value = item.dataset.en;
            status.textContent = '';
            palavraEn.textContent = item.dataset.en;
            palavraPt.textContent = item.dataset.pt;
            resultado.classList.add('dic-visivel');
        });

        // Abrir/fechar
        fab.addEventListener('click', () => {
            const aberto = painel.style.display !== 'none';
            painel.style.display = aberto ? 'none' : 'block';
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
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciar);
    } else {
        iniciar();
    }
})();
