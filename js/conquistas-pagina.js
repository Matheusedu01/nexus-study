// ========================================
// PÁGINA DE CONQUISTAS
// ========================================
// Extraído do <script> inline que existia em conquistas.html, pra poder
// ser injetado só depois da sincronização com o Firestore -- ver o
// bootstrap no final de conquistas.html.

const user = JSON.parse(localStorage.getItem('currentUser'));
if (!user) {
    window.location.href = 'index.html';
}
// Nome + avatar do cabeçalho (#userName) são preenchidos por js/user-header.js

// carregarTrilhasDoStorage() vem de js/utils.js
// CONQUISTAS, calcularDadosConquistas() e calcularSequenciaConquistas()
// vêm do módulo compartilhado js/conquistas.js

function renderizarConquistas() {
    const container = document.getElementById('conquistasContainer');
    const trilhas = carregarTrilhasDoStorage();
    const dados = calcularDadosConquistas(user.email, trilhas);
    const desbloqueadas = JSON.parse(localStorage.getItem(`conquistas_${user.email}`)) || [];
    const total = CONQUISTAS.length;
    const desbloq = desbloqueadas.length;
    const progresso = total > 0 ? Math.round((desbloq / total) * 100) : 0;

    document.getElementById('totalConquistas').textContent = `${desbloq}/${total}`;
    document.getElementById('progressoConquistas').textContent = `${progresso}%`;
    document.getElementById('diasSeguidos').textContent = dados.sequencia;

    // Agrupar por categoria
    const categorias = {};
    CONQUISTAS.forEach(c => {
        if (!categorias[c.categoria]) categorias[c.categoria] = [];
        categorias[c.categoria].push(c);
    });

    let html = '';
    Object.keys(categorias).forEach(cat => {
        html += `<div class="categoria-titulo">${cat}</div>`;
        html += `<div class="conquistas-grid">`;
        categorias[cat].forEach(c => {
            const desbloq = desbloqueadas.includes(c.id);
            html += `
                <div class="conquista-item ${desbloq ? 'unlock' : 'lock'}">
                    <span class="conquista-badge">${desbloq ? '✅' : '🔒'}</span>
                    <span class="conquista-icon">${desbloq ? c.icone : '❓'}</span>
                    <div class="conquista-nome">${desbloq ? c.nome : '???'}</div>
                    <div class="conquista-desc">${desbloq ? c.descricao : 'Bloqueada'}</div>
                </div>
            `;
        });
        html += `</div>`;
    });

    container.innerHTML = html;
}

// toggleTheme(), loadTheme() e logout() vêm de js/utils.js

// ========================================
// FUNÇÃO: Compartilhar Progresso
// ========================================
function compartilhar() {
    compartilharProgresso(user.email, carregarTrilhasDoStorage()).then(sucesso => {
        if (!sucesso) return;
        const novas = verificarNovasConquistas(user.email, carregarTrilhasDoStorage());
        renderizarConquistas();
        if (typeof window.salvarUsuarioFirestore === 'function') {
            window.salvarUsuarioFirestore(user.email).catch(erro => console.warn('Não foi possível sincronizar com o Firestore:', erro));
        }
        if (novas.length > 0) {
            celebrarConquistaRetro();
            alert(`🏆 Nova conquista desbloqueada!\n\n${novas.map(c => `${c.icone} ${c.nome}`).join('\n')}`);
        }
    });
}

// ========================================
// INICIALIZAÇÃO
// ========================================
loadTheme();
// Também verifica aqui (não só ao concluir um estudo) para já
// desbloquear conquistas de progresso feito antes desta checagem existir.
verificarNovasConquistas(user.email, carregarTrilhasDoStorage());
renderizarConquistas();
