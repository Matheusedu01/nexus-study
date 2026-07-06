// ========================================
// UTILITÁRIOS COMPARTILHADOS
// Usado por dashboard.js, trilha-detalhe.js, estudo.js, conquistas.html e tradutor-musica.html
// ========================================

function carregarTrilhasDoStorage() {
    const dados = localStorage.getItem('trilhasData');
    if (dados) {
        try {
            const trilhas = JSON.parse(dados);
            // Esconde dos alunos os estudos marcados como rascunho pelo admin
            // (o painel Admin lê o localStorage direto, sem passar por aqui,
            // então continua enxergando rascunhos normalmente).
            return trilhas.map(trilha => ({
                ...trilha,
                materias: (trilha.materias || [])
                    .map(materia => ({
                        ...materia,
                        estudos: (materia.estudos || []).filter(e => e.publicado !== false)
                    }))
                    .filter(materia => materia.estudos.length > 0)
            }));
        } catch (e) {
            console.error('Erro ao carregar trilhas:', e);
            return [];
        }
    }
    return [];
}

// ========================================
// TEMA
// ========================================
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-theme');
    const isLight = body.classList.contains('light-theme');
    const btn = document.querySelector('.btn-theme');
    if (btn) btn.textContent = isLight ? '☀️ Claro' : '🌙 Tema';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

function loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
        document.body.classList.add('light-theme');
        const btn = document.querySelector('.btn-theme');
        if (btn) btn.textContent = '☀️ Claro';
    }
}

// ========================================
// SESSÃO
// ========================================
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}
