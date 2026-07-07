// ========================================
// NOME + AVATAR CLICÁVEL NO CABEÇALHO
// ========================================
// Troca o texto simples de #userName por um link com o mini-avatar do
// usuário, levando pra perfil.html. Depende de js/avatar-pixel.js já
// carregado antes. Precisa rodar depois da checagem de login de cada
// página (currentUser já deve existir em localStorage nesse ponto).

(function () {
    function iniciar() {
        const el = document.getElementById('userName');
        if (!el) return;

        const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (!user) return;

        window.atualizarAvatarCabecalho = iniciar;

        if (!document.getElementById('userHeaderEstilo')) {
        const style = document.createElement('style');
        style.id = 'userHeaderEstilo';
        style.textContent = `
            .user-header-link {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                text-decoration: none;
                color: rgba(255, 255, 255, 0.8);
                transition: transform 0.1s ease;
            }

            .user-header-link:hover {
                transform: translate(-1px, -1px);
                color: #fff;
            }

            .user-header-avatar {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 28px;
                height: 28px;
                background: #14141f;
                border: 2px solid #05050a;
                overflow: hidden;
                flex-shrink: 0;
            }

            .user-header-avatar svg {
                margin-top: 2px;
                animation: avatarBalancar 3s ease-in-out infinite;
            }

            .user-header-avatar .avatar-olho {
                animation: avatarPiscar 4.5s ease-in-out infinite;
                transform-origin: center;
            }

            @keyframes avatarBalancar {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-1px) rotate(-2deg); }
            }

            @keyframes avatarPiscar {
                0%, 90%, 100% { transform: scaleY(1); }
                95% { transform: scaleY(0.15); }
            }

            @media (prefers-reduced-motion: reduce) {
                .user-header-avatar svg,
                .user-header-avatar .avatar-olho {
                    animation: none;
                }
            }

            body.light-theme .user-header-link {
                color: rgba(0, 0, 0, 0.7);
            }

            body.light-theme .user-header-link:hover {
                color: #000;
            }

            body.light-theme .user-header-avatar {
                background: #f0f2f5;
                border-color: #1a1a2e;
            }
        `;
        document.head.appendChild(style);
        }

        const personagem = typeof obterPersonagemUsuario === 'function' ? obterPersonagemUsuario(user.email) : null;
        const avatarHtml = personagem && typeof gerarPersonagemSVG === 'function' ? gerarPersonagemSVG(personagem.id, 22) : '';

        const nomeDiv = document.createElement('div');
        nomeDiv.textContent = user.name || 'Usuário';
        const nomeEscapado = nomeDiv.innerHTML;

        el.innerHTML = `
            <a href="perfil.html" class="user-header-link" title="Ver meu perfil">
                <span class="user-header-avatar">${avatarHtml}</span>
                <span>${nomeEscapado}</span>
            </a>
        `;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciar);
    } else {
        iniciar();
    }
})();
