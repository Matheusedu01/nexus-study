// ========================================
// AUTENTICAÇÃO
// ========================================
const user = JSON.parse(localStorage.getItem('currentUser'));
if (!user) {
    window.location.href = 'index.html';
}

// Nome + avatar do cabeçalho (#userName) são preenchidos por js/user-header.js

// carregarTrilhasDoStorage() vem de js/utils.js

// ========================================
// CARREGAR DADOS DA TRILHA ATUAL
// ========================================

const trilhaIndex = parseInt(localStorage.getItem('trilhaIndex'));
const trilhas = carregarTrilhasDoStorage();
const trilha = trilhas[trilhaIndex];

if (!trilha) {
    alert('Trilha não encontrada!');
    window.location.href = 'dashboard.html';
}

// ========================================
// PROGRESSO DO USUÁRIO
// ========================================
const progressKey = `progress_${trilhaIndex}_${user.email}`;
let progress = JSON.parse(localStorage.getItem(progressKey)) || { concluidos: [] };

// ========================================
// FUNÇÃO: Contar Total de Estudos
// ========================================
function contarTotalEstudos() {
    let total = 0;
    if (trilha.materias) {
        trilha.materias.forEach(m => {
            if (m.estudos) total += m.estudos.length;
        });
    }
    return total;
}

// ========================================
// FUNÇÃO: Contar Concluídos
// ========================================
function contarConcluidos() {
    return progress.concluidos ? progress.concluidos.length : 0;
}

// ========================================
// FUNÇÃO: Renderizar Cabeçalho
// ========================================
function renderizarCabecalho() {
    const total = contarTotalEstudos();
    const concluidos = contarConcluidos();
    const percentual = total > 0 ? Math.round((concluidos / total) * 100) : 0;

    document.getElementById('trilhaTitulo').textContent = `${trilha.icone || '📚'} ${trilha.titulo}`;
    document.getElementById('trilhaDescricao').textContent = trilha.descricao || '';
    document.getElementById('totalEstudos').textContent = total;
    document.getElementById('concluidosEstudos').textContent = concluidos;
    document.getElementById('progressoEstudos').textContent = `${percentual}%`;
    document.getElementById('duracaoEstudos').textContent = trilha.duracao || 'N/A';
}

// ========================================
// FUNÇÃO: Renderizar Abas
// ========================================
function renderizarAbas(abaAtiva = 0) {
    const container = document.getElementById('abasContainer');
    
    if (!trilha.materias || trilha.materias.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; color: rgba(255,255,255,0.2);">
                <p>Nenhuma matéria disponível nesta trilha.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = trilha.materias.map((materia, index) => {
        const total = materia.estudos ? materia.estudos.length : 0;
        const concluidos = materia.estudos ? materia.estudos.filter(e => 
            progress.concluidos && progress.concluidos.includes(e.id)
        ).length : 0;
        const concluido = concluidos === total && total > 0;
        
        return `
            <button class="aba ${index === abaAtiva ? 'active' : ''}" onclick="trocarAba(${index})">
                ${materia.icone || '📚'} ${materia.nome}
                <span class="badge ${concluido ? 'concluido' : ''}">${concluidos}/${total}</span>
                ${concluido ? ' ✅' : ''}
            </button>
        `;
    }).join('');
}

// ========================================
// FUNÇÃO: Renderizar Estudos de uma Aba
// ========================================
function renderizarEstudos(abaIndex) {
    const container = document.getElementById('listaEstudos');
    const materia = trilha.materias[abaIndex];
    
    if (!materia || !materia.estudos || materia.estudos.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 30px; color: rgba(255,255,255,0.2);">
                <p>Nenhum estudo nesta matéria.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = materia.estudos.map(estudo => {
        const isConcluido = progress.concluidos && progress.concluidos.includes(estudo.id);
        const isAtual = progress.atual === estudo.id;
        const isSimulado = estudo.tipo === 'simulado';
        
        let statusClass = 'status-pendente';
        let statusText = '⏳ Pendente';
        let btnClass = '';
        let btnText = '▶ Estudar';
        
        if (isConcluido) {
            statusClass = 'status-concluido';
            statusText = '✅ Concluído';
            btnClass = 'concluido';
            btnText = '✅ Concluído';
        } else if (isAtual) {
            statusClass = 'status-atual';
            statusText = '📖 Em andamento';
        }
        
        const iconeTipo = isSimulado ? '📊' : '📚';
        
        return `
            <div class="estudo-item">
                <div class="info">
                    <span class="ordem">#${estudo.ordem || '?'}</span>
                    <span class="titulo">${iconeTipo} ${estudo.titulo}</span>
                    <span class="modulo">${estudo.modulo || 'Geral'}</span>
                    ${isSimulado ? '<span style="background: rgba(255,200,0,0.15); color: #ffd700; padding: 2px 10px; border-radius: 12px; font-size: 11px; font-weight: 600;">🎯 Simulado</span>' : ''}
                </div>
                <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                    <span class="status ${statusClass}">${statusText}</span>
                    <button class="btn-estudar ${btnClass}" onclick="abrirEstudo(${estudo.id})">${btnText}</button>
                </div>
            </div>
        `;
    }).join('');
}

// ========================================
// FUNÇÃO: Trocar Aba
// ========================================
function trocarAba(index) {
    renderizarAbas(index);
    renderizarEstudos(index);
}

// ========================================
// FUNÇÃO: Abrir Estudo
// ========================================
function abrirEstudo(estudoId) {
    localStorage.setItem('trilhaIndex', trilhaIndex);
    localStorage.setItem('estudoId', estudoId);
    window.location.href = 'estudo.html';
}

// ========================================
// FUNÇÃO: Voltar para Dashboard
// ========================================
function voltarDashboard() {
    window.location.href = 'dashboard.html';
}

// ========================================
// toggleTheme(), loadTheme() e logout() vêm de js/utils.js

// ========================================
// INICIALIZAÇÃO
// ========================================
loadTheme();
renderizarCabecalho();
renderizarAbas(0);
renderizarEstudos(0);

// Sincroniza com o Admin a cada 5 segundos
setInterval(() => {
    // Usa carregarTrilhasDoStorage() (e não o localStorage cru) para que
    // rascunhos criados/editados no Admin continuem escondidos dos alunos
    // e não disparem um reload a cada 5s só por existirem.
    const novaTrilha = carregarTrilhasDoStorage()[trilhaIndex];
    if (novaTrilha && JSON.stringify(novaTrilha) !== JSON.stringify(trilha)) {
        // Recarrega a página para mostrar as alterações
        location.reload();
    }
}, 5000);