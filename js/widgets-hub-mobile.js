// ========================================
// HUB DE FERRAMENTAS (SÓ CELULAR)
// ========================================
// No desktop, calculadora/caderno/pomodoro/dicionário/tarefas continuam como
// 5 botões flutuantes soltos, sem nenhuma mudança. Só em telas pequenas
// (<=480px) esse script esconde os 5 botões originais e junta todos atrás de
// um único botão "🛠️", que abre um menu com os mesmos atalhos. Cada item do
// menu apenas simula um clique no botão original (fab.click()), então toda a
// lógica de cada widget continua intacta — isso só reorganiza a aparência.
// Incluir depois de calculadora.js/caderno.js/pomodoro.js/
// dicionario-flutuante.js/tarefas.js.

(function () {
    const FABS = [
        { id: 'calcFab', label: 'Calculadora', icone: '🧮' },
        { id: 'cadFab', label: 'Caderno', icone: '📓' },
        { id: 'pomoFab', label: 'Pomodoro', icone: '🍅' },
        { id: 'dicFab', label: 'Dicionário', icone: '📖' },
        { id: 'tarFab', label: 'Tarefas', icone: '✅' },
    ];

    function iniciar() {
        const presentes = FABS.filter(f => document.getElementById(f.id));
        if (presentes.length < 2) return;

        const CSS = `
            @media (max-width: 480px) {
                ${presentes.map(f => `#${f.id}`).join(', ')} {
                    display: none !important;
                }

                .hub-fab {
                    display: flex;
                    position: fixed;
                    right: 12px;
                    bottom: 16px;
                    width: 56px;
                    height: 56px;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    background: #ffd60a;
                    border: 3px solid #05050a;
                    box-shadow: 4px 4px 0 #05050a;
                    cursor: pointer;
                    z-index: 401;
                    transition: transform 0.15s ease;
                    user-select: none;
                }

                .hub-fab.hub-aberto {
                    transform: rotate(45deg);
                }

                .hub-menu {
                    position: fixed;
                    right: 12px;
                    bottom: 82px;
                    display: none;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 8px;
                    z-index: 401;
                }

                .hub-menu.hub-visivel {
                    display: flex;
                }

                .hub-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: #101018;
                    border: 3px solid #05050a;
                    box-shadow: 3px 3px 0 #05050a;
                    padding: 8px 14px;
                    cursor: pointer;
                    color: #fff;
                    font-family: 'Inter', sans-serif;
                    font-size: 13px;
                    font-weight: 600;
                    white-space: nowrap;
                }

                .hub-item:active {
                    transform: translate(2px, 2px);
                    box-shadow: 1px 1px 0 #05050a;
                }

                .hub-item .hub-icone {
                    font-size: 20px;
                }

                body.light-theme .hub-fab {
                    border-color: #1a1a2e;
                    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
                }

                body.light-theme .hub-item {
                    background: #fff;
                    border-color: #1a1a2e;
                    color: #1a1a2e;
                    box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.2);
                }
            }

            @media (min-width: 481px) {
                .hub-fab, .hub-menu {
                    display: none !important;
                }
            }
        `;

        const style = document.createElement('style');
        style.textContent = CSS;
        document.head.appendChild(style);

        const hubFab = document.createElement('button');
        hubFab.type = 'button';
        hubFab.className = 'hub-fab';
        hubFab.title = 'Ferramentas';
        hubFab.textContent = '🛠️';

        const hubMenu = document.createElement('div');
        hubMenu.className = 'hub-menu';
        hubMenu.innerHTML = presentes.map(f => (
            `<button type="button" class="hub-item" data-alvo="${f.id}">` +
            `<span class="hub-icone">${f.icone}</span>${f.label}</button>`
        )).join('');

        document.body.appendChild(hubFab);
        document.body.appendChild(hubMenu);

        function fecharMenu() {
            hubMenu.classList.remove('hub-visivel');
            hubFab.classList.remove('hub-aberto');
        }

        hubFab.addEventListener('click', () => {
            hubMenu.classList.toggle('hub-visivel');
            hubFab.classList.toggle('hub-aberto');
        });

        hubMenu.querySelectorAll('.hub-item').forEach(item => {
            item.addEventListener('click', () => {
                const alvo = document.getElementById(item.dataset.alvo);
                fecharMenu();
                if (alvo) alvo.click();
            });
        });

        document.addEventListener('click', (evento) => {
            if (!hubMenu.contains(evento.target) && !hubFab.contains(evento.target)) {
                fecharMenu();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciar);
    } else {
        iniciar();
    }
})();
