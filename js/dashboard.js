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
// VARIÁVEL GLOBAL
// ========================================
let trilhas = carregarTrilhasDoStorage();
let resetIndex = null;

// ========================================
// FUNÇÃO: Calcular Progresso do Usuário
// ========================================
function calcularProgresso(trilhaIndex) {
    const progressKey = `progress_${trilhaIndex}_${user.email}`;
    const prog = JSON.parse(localStorage.getItem(progressKey));
    
    if (!prog) return 0;
    
    let totalEstudos = 0;
    let concluidos = 0;
    
    const trilha = trilhas[trilhaIndex];
    if (trilha && trilha.materias) {
        trilha.materias.forEach(materia => {
            if (materia.estudos) {
                materia.estudos.forEach(estudo => {
                    totalEstudos++;
                    if (prog.concluidos && prog.concluidos.includes(estudo.id)) {
                        concluidos++;
                    }
                });
            }
        });
    }
    
    return totalEstudos > 0 ? Math.round((concluidos / totalEstudos) * 100) : 0;
}

// ========================================
// FUNÇÃO: Carregar Cards das Trilhas
// ========================================
function carregarTrilhas() {
    // Recarrega os dados do localStorage
    trilhas = carregarTrilhasDoStorage();
    
    const container = document.getElementById('trilhasContainer');
    
    if (!trilhas || trilhas.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: rgba(255,255,255,0.3);">
                <p style="font-size: 64px; margin-bottom: 20px;">📚</p>
                <h3 style="color: #fff; margin-bottom: 10px;">Nenhuma trilha disponível</h3>
                <p>Volte mais tarde, novas trilhas serão adicionadas em breve!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = trilhas.map((trilha, index) => {
        // Calcular progresso
        const percentual = calcularProgresso(index);
        const concluido = percentual === 100;
        
        // Calcular total de estudos
        let totalEstudos = 0;
        if (trilha.materias) {
            trilha.materias.forEach(m => {
                if (m.estudos) totalEstudos += m.estudos.length;
            });
        }
        
        const nivelClass = trilha.nivel === 'Iniciante' ? 'nivel-iniciante' :
                          trilha.nivel === 'Intermediário' ? 'nivel-intermediario' :
                          'nivel-avancado';
        
        let botoes;
        if (concluido && totalEstudos > 0) {
            botoes = `
                <button class="btn-concluida">🏆 Concluída!</button>
                <button class="btn-reset" onclick="abrirModalReset(${index})">🔄 Resetar</button>
            `;
        } else if (percentual > 0) {
            botoes = `
                <button class="btn-continuar-trilha" onclick="entrarTrilha(${index})">▶ Continuar (${percentual}%)</button>
                <button class="btn-reset" onclick="abrirModalReset(${index})">🔄 Resetar</button>
            `;
        } else {
            botoes = `
                <button class="btn-entrar-trilha" onclick="entrarTrilha(${index})">🚀 Entrar na Trilha</button>
            `;
        }
        
        // Contar estudos concluídos
        let estudosConcluidos = 0;
        const progressKey = `progress_${index}_${user.email}`;
        const prog = JSON.parse(localStorage.getItem(progressKey));
        if (prog && prog.concluidos) {
            estudosConcluidos = prog.concluidos.length;
        }
        
        return `
            <div class="trilha-card" onclick="abrirTrilhaPeloCard(${index}, event)">
                <div class="trilha-header">
                    <span class="trilha-icon">${trilha.icone || '📚'}</span>
                    <span class="trilha-nivel ${nivelClass}">${trilha.nivel || 'Iniciante'}</span>
                </div>
                
                <div class="trilha-titulo">${trilha.titulo}</div>
                <div class="trilha-desc">${trilha.descricao || ''}</div>
                
                ${trilha.tags ? `
                    <div class="tags">
                        ${trilha.tags.map(tag => `<span>#${tag}</span>`).join('')}
                    </div>
                ` : ''}
                
                <div class="trilha-progresso">
                    <div class="progress-label">
                        <span>Progresso Geral</span>
                        <span>${percentual}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="fill" style="width: ${percentual}%;"></div>
                    </div>
                </div>
                
                <div class="trilha-meta">
                    <span>📚 <strong>${totalEstudos}</strong> estudos</span>
                    <span>✅ <strong>${estudosConcluidos}</strong> concluídos</span>
                    <span>⏱️ ${trilha.duracao || 'N/A'}</span>
                </div>
                
                <div class="trilha-actions">
                    ${botoes}
                </div>
            </div>
        `;
    }).join('');
}

// ========================================
// FUNÇÃO: Entrar na Trilha
// ========================================
function entrarTrilha(index) {
    localStorage.setItem('trilhaIndex', index);
    window.location.href = 'trilha-detalhe.html';
}

// Clique em qualquer parte do card entra na trilha, exceto quando o clique
// foi em um dos botões (Entrar/Continuar/Resetar), que já tratam sua própria ação.
function abrirTrilhaPeloCard(index, event) {
    if (event.target.closest('button')) return;
    entrarTrilha(index);
}

// ========================================
// FUNÇÃO: Resetar Progresso
// ========================================
function abrirModalReset(index) {
    resetIndex = index;
    document.getElementById('modalReset').style.display = 'flex';
}

function fecharModalReset() {
    document.getElementById('modalReset').style.display = 'none';
    resetIndex = null;
}

function confirmarReset() {
    if (resetIndex !== null) {
        const progressKey = `progress_${resetIndex}_${user.email}`;
        localStorage.removeItem(progressKey);
        if (typeof window.salvarUsuarioFirestore === 'function') {
            window.salvarUsuarioFirestore(user.email).catch(erro => console.warn('Não foi possível sincronizar reset com o Firestore:', erro));
        }
        carregarTrilhas();
        fecharModalReset();
        alert('🔄 Progresso resetado com sucesso!');
    }
}

// toggleTheme(), loadTheme() e logout() vêm de js/utils.js

// ========================================
// FUNÇÃO: Meta Diária
// ========================================
function renderizarMetaDiaria() {
    const concluidos = getConcluidosHoje(user.email);
    const alvo = getMetaDiariaAlvo(user.email);
    const texto = document.getElementById('metaDiariaTexto');
    const barra = document.getElementById('metaDiariaBarra');
    const select = document.getElementById('metaDiariaSelect');
    if (texto) texto.textContent = `${concluidos} / ${alvo} estudos hoje${concluidos >= alvo ? ' ✅' : ''}`;
    if (barra) barra.style.width = `${Math.min(100, Math.round((concluidos / alvo) * 100))}%`;
    if (select) select.value = String(alvo);
}

function alterarMetaDiaria(valor) {
    setMetaDiariaAlvo(user.email, parseInt(valor));
    renderizarMetaDiaria();
}

// ========================================
// FUNÇÃO: Saudação da Hero Section
// ========================================
function renderizarSaudacao() {
    const heroSaudacao = document.getElementById('heroSaudacao');
    const heroSubtitulo = document.getElementById('heroSubtitulo');
    if (!heroSaudacao || !heroSubtitulo) return;

    const hora = new Date().getHours();
    const primeiroNome = (user.name || '').trim().split(' ')[0] || 'por aqui';
    const periodo = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite';

    heroSaudacao.textContent = `👋 ${periodo}, ${primeiroNome}!`;

    // calcularSequenciaConquistas() vem de js/conquistas.js
    const sequencia = typeof calcularSequenciaConquistas === 'function'
        ? calcularSequenciaConquistas(user.email)
        : 0;

    if (sequencia > 1) {
        heroSubtitulo.textContent = `🔥 Você está há ${sequencia} dias seguidos estudando. Bora manter o ritmo!`;
    } else if (sequencia === 1) {
        heroSubtitulo.textContent = `🔥 Você estudou hoje! Volte amanhã pra começar uma sequência.`;
    } else {
        heroSubtitulo.textContent = 'Escolha uma trilha e comece (ou continue) seus estudos!';
    }
}

// ========================================
// INICIALIZAÇÃO
// ========================================
loadTheme();
garantirTrilhasSeed().then(carregarTrilhas);
renderizarMetaDiaria();
renderizarSaudacao();

// Sincroniza com o Admin a cada 5 segundos
setInterval(() => {
    // Usa carregarTrilhasDoStorage() (e não o localStorage cru) para que
    // rascunhos criados/editados no Admin continuem escondidos dos alunos.
    const novasTrilhas = carregarTrilhasDoStorage();
    if (JSON.stringify(novasTrilhas) !== JSON.stringify(trilhas)) {
        trilhas = novasTrilhas;
        carregarTrilhas();
    }
}, 5000);