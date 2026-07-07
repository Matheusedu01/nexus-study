// ========================================
// AUTENTICAÇÃO
// ========================================
const user = JSON.parse(localStorage.getItem('currentUser'));
if (!user) {
    window.location.href = 'index.html';
}

// carregarTrilhasDoStorage() vem de js/utils.js
const TRILHAS = carregarTrilhasDoStorage();

// ========================================
// CARREGAR DADOS DO ESTUDO
// ========================================
const trilhaIndex = parseInt(localStorage.getItem('trilhaIndex'));
const estudoId = parseInt(localStorage.getItem('estudoId'));

console.log('📌 Trilha Index:', trilhaIndex);
console.log('📌 Estudo ID:', estudoId);
console.log('📌 Total de trilhas:', TRILHAS.length);

const trilha = TRILHAS[trilhaIndex];

if (!trilha) {
    alert('❌ Trilha não encontrada!');
    window.location.href = 'dashboard.html';
}

console.log('📌 Trilha encontrada:', trilha.titulo);

// Buscar estudo em todas as matérias
let estudo = null;
let materiaAtual = null;

if (trilha.materias) {
    for (const materia of trilha.materias) {
        if (materia.estudos) {
            const found = materia.estudos.find(e => e.id === estudoId);
            if (found) {
                estudo = found;
                materiaAtual = materia;
                break;
            }
        }
    }
}

if (!estudo) {
    alert('❌ Estudo não encontrado!');
    window.location.href = 'dashboard.html';
}

console.log('✅ Estudo encontrado:', estudo.titulo);
console.log('📚 Matéria:', materiaAtual?.nome);
console.log('📄 Conteúdo do estudo:', estudo.conteudo ? estudo.conteudo.substring(0, 100) + '...' : '❌ CONTEÚDO VAZIO!');

// ========================================
// SE O CONTEÚDO ESTIVER VAZIO, USA EXEMPLO
// ========================================
if (!estudo.conteudo || estudo.conteudo.trim() === '') {
    console.warn('⚠️ Conteúdo vazio! Usando conteúdo de exemplo.');
    estudo.conteudo = `# EXEMPLO DE CONTEÚDO\n\n## Introdução\n\nEste é um conteúdo de exemplo. Para adicionar seu próprio conteúdo, edite este estudo no painel Admin.\n\n## Tópico 1\n\nDigite seu conteúdo aqui...\n\n### Subtópico\n\nVocê pode usar **negrito**, *itálico* e outros formatos.\n\n## Exercícios\n\n<exercicio>\nPergunta do exercício?\n<resposta>Resposta correta</resposta>\n</exercicio>\n\n---\n\n💡 **Dica:** Edite este conteúdo no Admin!`;
}

// ========================================
// PROGRESSO DO USUÁRIO
// ========================================
const progressKey = `progress_${trilhaIndex}_${user.email}`;
let progress = JSON.parse(localStorage.getItem(progressKey)) || {
    concluidos: [],
    atual: estudoId
};

// ========================================
// VARIÁVEIS DO SIMULADO
// ========================================
let questaoAtual = 0;
let respostasUsuario = [];
let simulando = estudo && estudo.tipo === 'simulado' && estudo.questoes;

// A divisão de conteúdo em seções (dividirConteudoEmSecoes) agora vive em
// js/conteudo-render.js, compartilhada com a prévia real do Admin.

let sections = dividirConteudoEmSecoes(estudo?.conteudo || '');
let currentSection = 0;

console.log('📖 Seções encontradas:', sections.length);

// ========================================
// NAVEGAÇÃO POR SEÇÕES (PONTOS + ÍNDICE)
// ========================================
function getSecoesVisitadasKey() {
    return `secoesVisitadas_${trilhaIndex}_${estudo?.id}_${user.email}`;
}

function getSecoesVisitadas() {
    return JSON.parse(localStorage.getItem(getSecoesVisitadasKey())) || [];
}

function marcarSecaoVisitada(index) {
    const visitadas = getSecoesVisitadas();
    if (!visitadas.includes(index)) {
        visitadas.push(index);
        localStorage.setItem(getSecoesVisitadasKey(), JSON.stringify(visitadas));
    }
}

function irParaSecao(index) {
    if (index < 0 || index >= sections.length || simulando) return;
    currentSection = index;
    renderContent();
    fecharIndice();
}

function renderSectionNav() {
    const visitadas = getSecoesVisitadas();

    const dotsContainer = document.getElementById('sectionDots');
    if (dotsContainer) {
        dotsContainer.innerHTML = sections.map((s, i) => {
            const classes = ['dot'];
            if (i === currentSection) classes.push('atual');
            else if (visitadas.includes(i)) classes.push('visitada');
            return `<button type="button" class="${classes.join(' ')}" onclick="irParaSecao(${i})" title="${s.title.replace(/"/g, '&quot;')}"></button>`;
        }).join('');
    }

    const indiceContainer = document.getElementById('indiceLista');
    if (indiceContainer) {
        indiceContainer.innerHTML = sections.map((s, i) => {
            const atual = i === currentSection;
            const visitado = atual || visitadas.includes(i);
            const status = atual ? '📍' : visitado ? '✅' : '○';
            return `
                <button type="button" class="indice-item ${atual ? 'atual' : ''}" onclick="irParaSecao(${i})">
                    <span class="indice-status">${status}</span>
                    <span class="indice-titulo">${s.title}</span>
                </button>
            `;
        }).join('');
    }
}

function toggleIndice() {
    const painel = document.getElementById('indicePanel');
    if (painel) painel.classList.toggle('aberto');
}

function fecharIndice() {
    const painel = document.getElementById('indicePanel');
    if (painel) painel.classList.remove('aberto');
}

// ========================================
// RENDERIZAR CONTEÚDO (COM VÍDEOS E IMAGENS)
// ========================================
function renderContent() {
    if (simulando) {
        renderSimulado();
        return;
    }
    
    const container = document.getElementById('studyContent');
    if (!container) {
        console.error('❌ Elemento studyContent não encontrado!');
        return;
    }
    
    const section = sections[currentSection] || { title: 'Conteúdo', content: '' };

    document.getElementById('studyTitle').textContent = estudo?.titulo || 'Estudo';
    document.getElementById('trilhaInfo').textContent = `📚 ${trilha?.titulo || 'Trilha'}`;
    document.getElementById('moduloInfo').textContent = `📖 ${estudo?.modulo || 'Geral'}`;

    // Tempo estimado de leitura e contagem de exercícios (com base no texto bruto da seção)
    const textoLimpo = (section.content || '').replace(/<[^>]+>/g, ' ');
    const numPalavras = (textoLimpo.match(/\S+/g) || []).length;
    const tempoLeitura = Math.max(1, Math.round(numPalavras / 200));
    const numExercicios = ((section.content || '').match(/<exercicio[\s>]/g) || []).length;

    let html = `
        <div class="study-description">
            <div class="desc-icon">📌</div>
            <div class="desc-text">${estudo?.descricao || 'Aprenda este conteúdo com exemplos práticos e exercícios.'}</div>
        </div>
        <div class="section-header">📖 ${section.title}</div>
        <div class="secao-meta-bar">
            <span>📍 Seção ${currentSection + 1} de ${sections.length}</span>
            <span>⏱ ~${tempoLeitura} min de leitura</span>
            ${numExercicios > 0 ? `<span>📝 ${numExercicios} exercício${numExercicios > 1 ? 's' : ''}</span>` : ''}
        </div>
    `;
    
    // Motor de renderização compartilhado com a prévia do Admin (js/conteudo-render.js)
    const content = renderizarConteudoEstudo(section.content || '');

    html += content;
    container.innerHTML = html;

    document.getElementById('sectionInfo').textContent =
        `Seção ${currentSection + 1} de ${sections.length}`;

    marcarSecaoVisitada(currentSection);
    renderSectionNav();
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });

    updateProgress();
}

// As funções de interação dos exercícios, quiz, flashcard, código, áudio e
// colapsável agora vivem em js/conteudo-render.js (compartilhado com a
// prévia real do Admin).

// ========================================
// RENDERIZAR SIMULADO
// ========================================
function renderSimulado() {
    const container = document.getElementById('studyContent');
    if (!container) return;
    
    if (!estudo || !estudo.questoes || estudo.questoes.length === 0) {
        container.innerHTML = '<p style="color: rgba(255,255,255,0.3);">Nenhuma questão disponível.</p>';
        return;
    }
    
    const questoes = estudo.questoes;
    const q = questoes[questaoAtual] || questoes[0];
    
    document.getElementById('studyTitle').textContent = `📊 ${estudo?.titulo || 'Simulado'}`;
    document.getElementById('trilhaInfo').textContent = `📚 ${trilha?.titulo || 'Trilha'}`;
    document.getElementById('moduloInfo').textContent = `📖 ${estudo?.modulo || 'Simulado'}`;
    
    if (respostasUsuario.length === 0) {
        respostasUsuario = new Array(questoes.length).fill(null);
    }
    
    const total = questoes.length;
    const respondidas = respostasUsuario.filter(r => r !== null).length;
    const acertos = respostasUsuario.filter((r, i) => r === questoes[i]?.correta).length;
    
    let html = `
        <div class="study-description">
            <div class="desc-icon">📌</div>
            <div class="desc-text">${estudo?.descricao || 'Teste seus conhecimentos com este simulado!'}</div>
        </div>
        <div style="margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                <span style="color: #3a86ff; font-weight: 600;">Questão ${questaoAtual + 1} de ${total}</span>
                <span style="color: rgba(255,255,255,0.3);">✅ ${acertos} acertos | ❌ ${respondidas - acertos} erros | ⬜ ${total - respondidas} pendentes</span>
            </div>
            <div class="progress-bar-container" style="margin: 10px 0;">
                <div class="progress-bar" style="width: ${(respondidas/total)*100}%;"></div>
            </div>
        </div>
        
        <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 12px; margin-bottom: 25px;">
            <h3 style="color: #fff; margin-bottom: 15px; font-size: 18px;">${q.pergunta || ''}</h3>
            
            <div style="display: flex; flex-direction: column; gap: 10px;">
                ${q.alternativas ? q.alternativas.map((alt, idx) => {
                    const selecionada = respostasUsuario[questaoAtual] === idx;
                    const correta = idx === q.correta;
                    const jaRespondida = respostasUsuario[questaoAtual] !== null;
                    
                    let classe = '';
                    let statusIcon = '';
                    let statusText = '';
                    
                    if (jaRespondida) {
                        if (selecionada && correta) {
                            classe = 'correta';
                            statusIcon = '✅';
                            statusText = 'Correta!';
                        } else if (selecionada && !correta) {
                            classe = 'errada';
                            statusIcon = '❌';
                            statusText = 'Errada';
                        } else if (correta) {
                            classe = 'mostrar-correta';
                            statusIcon = '✅';
                            statusText = 'Resposta correta';
                        }
                    }
                    
                    const letra = String.fromCharCode(65 + idx);
                    
                    return `
                        <div class="alternativa ${classe}" onclick="responderQuestao(${idx})" style="
                            padding: 14px 18px;
                            border-radius: 10px;
                            border: 2px solid rgba(255,255,255,0.06);
                            cursor: ${jaRespondida ? 'default' : 'pointer'};
                            transition: all 0.3s ease;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            ${jaRespondida && selecionada && correta ? 'background: rgba(0,245,212,0.15); border-color: #00f5d4;' : ''}
                            ${jaRespondida && selecionada && !correta ? 'background: rgba(255,50,50,0.15); border-color: #ff4444;' : ''}
                            ${jaRespondida && !selecionada && correta ? 'background: rgba(0,245,212,0.05); border-color: rgba(0,245,212,0.3);' : ''}
                            ${!jaRespondida ? 'hover:background: rgba(255,255,255,0.03);' : ''}
                        ">
                            <span>
                                <strong style="color: rgba(255,255,255,0.3); margin-right: 10px;">${letra})</strong>
                                <span style="color: #fff;">${alt}</span>
                            </span>
                            <span style="font-size: 14px; font-weight: 600; color: ${selecionada && correta ? '#00f5d4' : selecionada && !correta ? '#ff4444' : correta && jaRespondida ? '#00f5d4' : 'rgba(255,255,255,0.2)'};">
                                ${jaRespondida ? statusIcon : ''}
                                ${jaRespondida ? ' ' + statusText : ''}
                            </span>
                        </div>
                    `;
                }).join('') : ''}
            </div>
            
            ${respostasUsuario[questaoAtual] !== null ? `
                <div style="margin-top: 15px; padding: 12px; border-radius: 8px; background: ${respostasUsuario[questaoAtual] === q.correta ? 'rgba(0,245,212,0.1)' : 'rgba(255,50,50,0.1)'}; border: 1px solid ${respostasUsuario[questaoAtual] === q.correta ? 'rgba(0,245,212,0.2)' : 'rgba(255,50,50,0.2)'};">
                    <span style="color: ${respostasUsuario[questaoAtual] === q.correta ? '#00f5d4' : '#ff4444'}; font-weight: 600;">
                        ${respostasUsuario[questaoAtual] === q.correta ? '✅ Correto! 🎉' : '❌ Incorreto.'}
                    </span>
                    ${respostasUsuario[questaoAtual] !== q.correta ? `
                        <span style="color: rgba(255,255,255,0.3); margin-left: 10px; font-size: 14px;">
                            A resposta correta é: <strong style="color: #00f5d4;">${q.alternativas ? q.alternativas[q.correta] : ''}</strong>
                        </span>
                    ` : ''}
                </div>
            ` : ''}
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
            <div>
                <button onclick="questaoAnterior()" class="btn-nav" ${questaoAtual === 0 ? 'disabled' : ''}>
                    ⬅ Anterior
                </button>
                <button onclick="proximaQuestao()" class="btn-nav" ${questaoAtual === total - 1 ? 'disabled' : ''}>
                    Próximo ➡
                </button>
            </div>
            <div>
                <button onclick="finalizarSimulado()" class="btn-progress" style="background: linear-gradient(135deg, #00f5d4, #3a86ff); color: #0a0a0f;">
                    📊 Ver Resultado Final
                </button>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    document.getElementById('sectionInfo').textContent = `Questão ${questaoAtual + 1} de ${total}`;
    updateProgress();
}

// ========================================
// FUNÇÕES DO SIMULADO
// ========================================
function responderQuestao(index) {
    if (respostasUsuario[questaoAtual] !== null) return;
    respostasUsuario[questaoAtual] = index;
    renderSimulado();
}

function proximaQuestao() {
    if (!estudo || !estudo.questoes) return;
    if (questaoAtual < estudo.questoes.length - 1) {
        questaoAtual++;
        renderSimulado();
    }
}

function questaoAnterior() {
    if (questaoAtual > 0) {
        questaoAtual--;
        renderSimulado();
    }
}

function finalizarSimulado() {
    if (!estudo || !estudo.questoes) return;
    const questoes = estudo.questoes;
    const total = questoes.length;
    const respondidas = respostasUsuario.filter(r => r !== null).length;
    const acertos = respostasUsuario.filter((r, i) => r === questoes[i]?.correta).length;
    const erros = respondidas - acertos;
    
    if (respondidas < total) {
        const confirmar = confirm(`⚠️ Você respondeu apenas ${respondidas} de ${total} questões. Deseja finalizar mesmo assim?`);
        if (!confirmar) return;
    }
    
    const percentual = total > 0 ? Math.round((acertos / total) * 100) : 0;
    let mensagem = '', emoji = '', cor = '';
    
    if (percentual === 100) { mensagem = 'PERFEITO! Você acertou todas! 🏆'; emoji = '🎉'; cor = '#00f5d4'; }
    else if (percentual >= 80) { mensagem = 'Excelente! ⭐'; emoji = '🌟'; cor = '#3a86ff'; }
    else if (percentual >= 60) { mensagem = 'Bom desempenho! 📚'; emoji = '💪'; cor = '#ffd700'; }
    else if (percentual >= 40) { mensagem = 'Revisar alguns conteúdos. 📖'; emoji = '📖'; cor = '#ff8c00'; }
    else { mensagem = 'Tentar novamente! 🔄'; emoji = '🔄'; cor = '#ff4444'; }
    
    const modal = document.createElement('div');
    modal.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); backdrop-filter: blur(20px); display: flex; justify-content: center; align-items: center; z-index: 9999; padding: 20px; animation: fadeIn 0.5s ease;`;
    modal.innerHTML = `
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 40px; max-width: 500px; width: 100%; text-align: center; animation: slideUp 0.5s ease;">
            <div style="font-size: 64px; margin-bottom: 15px;">${emoji}</div>
            <h2 style="color: #fff; font-size: 28px; margin-bottom: 10px;">Resultado Final</h2>
            <p style="color: ${cor}; font-size: 18px; font-weight: 600; margin-bottom: 20px;">${mensagem}</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin: 25px 0;">
                <div style="background: rgba(0,245,212,0.05); border-radius: 12px; padding: 15px; border: 1px solid rgba(0,245,212,0.1);">
                    <div style="font-size: 32px; font-weight: 700; color: #00f5d4;">${acertos}</div>
                    <div style="color: rgba(255,255,255,0.3); font-size: 13px;">Acertos</div>
                </div>
                <div style="background: rgba(255,50,50,0.05); border-radius: 12px; padding: 15px; border: 1px solid rgba(255,50,50,0.1);">
                    <div style="font-size: 32px; font-weight: 700; color: #ff4444;">${erros}</div>
                    <div style="color: rgba(255,255,255,0.3); font-size: 13px;">Erros</div>
                </div>
                <div style="background: rgba(58,134,255,0.05); border-radius: 12px; padding: 15px; border: 1px solid rgba(58,134,255,0.1);">
                    <div style="font-size: 32px; font-weight: 700; color: #3a86ff;">${percentual}%</div>
                    <div style="color: rgba(255,255,255,0.3); font-size: 13px;">Aproveitamento</div>
                </div>
            </div>
            <div style="margin-bottom: 25px; padding: 15px; background: rgba(255,255,255,0.02); border-radius: 10px;">
                <div style="display: flex; justify-content: space-between; color: rgba(255,255,255,0.3); font-size: 14px;">
                    <span>📊 Respondidas: ${respondidas}/${total}</span>
                    <span>⏱️ ${new Date().toLocaleTimeString()}</span>
                </div>
            </div>
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <button onclick="this.closest('div[style]').remove()" style="padding: 12px 30px; background: linear-gradient(135deg, #3a86ff, #8338ec); color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; font-size: 16px; transition: all 0.3s ease;">
                    👍 Continuar
                </button>
                <button onclick="location.reload()" style="padding: 12px 30px; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; font-size: 16px; transition: all 0.3s ease;">
                    🔄 Refazer Simulado
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// ========================================
// NAVEGAÇÃO NORMAL
// ========================================
function nextSection() {
    if (currentSection < sections.length - 1) {
        currentSection++;
        renderContent();
    }
}

function previousSection() {
    if (currentSection > 0) {
        currentSection--;
        renderContent();
    }
}

// ========================================
// TOASTS DE NOTIFICAÇÃO
// ========================================
function mostrarToast(mensagem, tipo = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) { alert(mensagem.replace(/<br>/g, '\n')); return; }

    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;
    toast.innerHTML = `<div class="toast-texto">${mensagem.replace(/\n/g, '<br>')}</div>`;
    container.appendChild(toast);

    setTimeout(() => toast.classList.add('saindo'), 4000);
    setTimeout(() => toast.remove(), 4600);
}

// ========================================
// MODAL DE CONCLUSÃO
// ========================================
function abrirModalConcluido({ icone, titulo, texto, botoes }) {
    document.getElementById('modalConcluidoIcon').textContent = icone;
    document.getElementById('modalConcluidoTitulo').textContent = titulo;
    document.getElementById('modalConcluidoTexto').textContent = texto;
    document.getElementById('modalConcluidoBotoes').innerHTML = botoes;
    document.getElementById('modalConcluido').classList.add('aberto');
}

function fecharModalConcluido() {
    document.getElementById('modalConcluido').classList.remove('aberto');
}

// ========================================
// MARCAR PROGRESSO
// ========================================
function marcarProgresso() {
    if (simulando) {
        mostrarToast('📊 Para concluir o simulado, responda todas as questões e clique em "Ver Resultado Final"!', 'aviso');
        return;
    }

    if (!estudo) return;

    if (progress.concluidos.includes(estudo.id)) {
        mostrarToast('⚠️ Este estudo já foi concluído anteriormente.', 'aviso');
        return;
    }

    progress.concluidos.push(estudo.id);
    localStorage.setItem(progressKey, JSON.stringify(progress));

    updateProgress();
    registrarHistorico(user.email);
    verificarConquistas();

    const total = contarTotalEstudos();
    const concluidos = progress.concluidos.length;

    if (concluidos === total) {
        abrirModalConcluido({
            icone: '🎉',
            titulo: 'Parabéns!',
            texto: `Você concluiu TODOS os ${total} estudos desta trilha!`,
            botoes: `<button onclick="window.location.href='dashboard.html'" class="btn-modal-primario">Voltar ao Dashboard</button>`
        });
        return;
    }

    abrirModalConcluido({
        icone: '✅',
        titulo: 'Estudo concluído!',
        texto: `${concluidos} de ${total} estudos concluídos nesta trilha.`,
        botoes: `
            <button onclick="fecharModalConcluido(); window.location.href='dashboard.html';" class="btn-modal-secundario">Ficar por aqui</button>
            <button onclick="fecharModalConcluido(); irProximoEstudo();" class="btn-modal-primario">Próximo estudo ▶</button>
        `
    });
}

// ========================================
// CONQUISTAS E META DIÁRIA (usa js/conquistas.js)
// ========================================
function verificarConquistas() {
    const meta = registrarConclusaoDiaria(user.email);
    const novas = verificarNovasConquistas(user.email, TRILHAS);

    if (meta.metaBatidaAgora) {
        mostrarToast(`✅ Meta diária batida! (${meta.concluidosHoje}/${meta.alvo} estudos hoje)`, 'sucesso');
    }
    if (novas.length > 0) {
        mostrarToast(`🏆 Nova conquista desbloqueada!\n${novas.map(c => `${c.icone} ${c.nome}`).join('\n')}`, 'conquista');
        celebrarConquistaRetro();
    }
}

function irProximoEstudo() {
    if (!trilha || !trilha.materias) return;

    let proximo = null;

    for (const materia of trilha.materias) {
        if (!materia.estudos) continue;
        for (const est of materia.estudos) {
            if (!progress.concluidos.includes(est.id)) {
                proximo = est;
                break;
            }
        }
        if (proximo) break;
    }

    if (!proximo) {
        mostrarToast('🎉 PARABÉNS! Você concluiu TODOS os estudos desta trilha!', 'sucesso');
        window.location.href = 'dashboard.html';
        return;
    }

    localStorage.setItem('estudoId', proximo.id);
    window.location.reload();
}

function contarTotalEstudos() {
    let total = 0;
    if (trilha && trilha.materias) {
        for (const materia of trilha.materias) {
            if (materia.estudos) {
                total += materia.estudos.length;
            }
        }
    }
    return total;
}

// ========================================
// ATUALIZAR PROGRESSO
// ========================================
function updateProgress() {
    const total = contarTotalEstudos();
    const concluidos = progress.concluidos ? progress.concluidos.length : 0;
    const percentage = total > 0 ? Math.round((concluidos / total) * 100) : 0;
    
    const bar = document.getElementById('progressBar');
    const text = document.getElementById('progressText');
    if (bar) bar.style.width = `${percentage}%`;
    if (text) text.textContent = `${percentage}%`;
}

// ========================================
// ANOTAÇÕES
// ========================================
function loadNotes() {
    if (!estudo) return;
    const notesKey = `notes_${trilhaIndex}_${estudo.id}_${user.email}`;
    const notes = localStorage.getItem(notesKey);
    if (notes) {
        document.getElementById('studyNotes').value = notes;
    }
}

function saveNotes() {
    if (!estudo) return;
    const notesKey = `notes_${trilhaIndex}_${estudo.id}_${user.email}`;
    localStorage.setItem(notesKey, document.getElementById('studyNotes').value);
    alert('✅ Anotações salvas com sucesso!');
}

// ========================================
// VOLTAR
// ========================================
function voltarDashboard() {
    localStorage.removeItem('estudoId');
    window.location.href = 'dashboard.html';
}

// ========================================
// BOTÃO VOLTAR AO TOPO
// ========================================
window.addEventListener('scroll', function() {
    const btn = document.getElementById('backToTop');
    if (btn) {
        if (window.scrollY > 300) {
            btn.style.display = 'block';
        } else {
            btn.style.display = 'none';
        }
    }
});

// ========================================
// EXPORTAR PDF
// ========================================
function exportPDF() {
    const element = document.getElementById('studyContent');
    if (!element) return;
    
    const opt = {
        margin: 10,
        filename: `${estudo?.titulo || 'estudo'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    const btn = document.querySelector('.btn-export');
    if (btn) {
        btn.textContent = '⏳ Gerando...';
        btn.disabled = true;
    }
    
    html2pdf().set(opt).from(element).save().then(function() {
        if (btn) {
            btn.textContent = '📄 PDF';
            btn.disabled = false;
        }
    });
}

// ========================================
// INICIALIZAÇÃO
// ========================================
loadTheme();
if (simulando) {
    renderSimulado();
} else {
    renderContent();
}
loadNotes();

console.log('📚 Estudo atual:', estudo?.titulo);
console.log('📈 Progresso:', progress.concluidos ? progress.concluidos.length : 0, 'de', contarTotalEstudos());
// ========================================
// TRADUTOR DE PALAVRAS
// ========================================

// ========================================
// CARREGAR TRADUTOR
// ========================================
function carregarTradutorPalavras() {
    // Carrega histórico
    const historico = JSON.parse(localStorage.getItem(`historico_traducoes_${user.email}`)) || [];
    atualizarHistorico(historico);
    
    // Ativa clique nas palavras do conteúdo
    ativarCliquePalavras();
}

// ========================================
// ATIVAR CLIQUE NAS PALAVRAS
// ========================================
function ativarCliquePalavras() {
    const content = document.getElementById('studyContent');
    if (!content) return;

    // Esse recurso (clicar numa palavra pra traduzir) só faz sentido em
    // trilhas de idioma -- numa trilha 100% em português (ETEC, etc.),
    // "traduzir" uma palavra em português pra português não ajuda em nada,
    // e só deixa o texto com espaçamento estranho por causa dos <span>s.
    const ehTrilhaDeIdioma = trilha?.tags?.some(t => ['inglês', 'idiomas'].includes((t || '').toLowerCase()));
    if (!ehTrilhaDeIdioma) return;

    // Pega todas as palavras do texto
    const texto = content.innerText || content.textContent;
    const palavras = texto.split(/\s+/).filter(p => p.length > 1);

    // Remove palavras duplicadas e muito comuns
    const palavrasUnicas = [...new Set(palavras)];
    const palavrasIgnoradas = ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know'];

    // Cria um mapa de palavras para destacar
    const palavrasParaDestacar = [...new Set(palavrasUnicas.map(p => p.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ]/g, '')).filter(limpa => {
        return limpa.length > 2 && !palavrasIgnoradas.includes(limpa.toLowerCase());
    }))].slice(0, 30); // Limita para não ficar pesado

    if (palavrasParaDestacar.length === 0) return;

    // Opera apenas sobre nós de texto (nunca sobre HTML bruto), para não
    // corromper atributos/classes de elementos que contenham a mesma palavra
    // (ex.: um botão "Copiar" perto de uma classe "btn-copiar-codigo").
    const regexPalavras = new RegExp(`\\b(${palavrasParaDestacar.join('|')})\\b`, 'gi');

    // Só faz sentido destacar palavras no texto corrido — títulos, subtítulos
    // e rótulos (que muitas vezes já misturam português e inglês no mesmo
    // texto) ficam de fora, senão o clique-para-traduzir "quebra" o título.
    const tagsIgnoradas = ['SCRIPT', 'STYLE', 'BUTTON', 'CODE', 'PRE', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

    const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            const tag = node.parentElement?.tagName;
            if (tagsIgnoradas.includes(tag)) {
                return NodeFilter.FILTER_REJECT;
            }
            if (node.parentElement?.classList.contains('palavra-destaque') || node.parentElement?.classList.contains('desc-text')) {
                return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
        }
    });

    const nos = [];
    let atual;
    while ((atual = walker.nextNode())) nos.push(atual);

    nos.forEach(node => {
        const texto = node.textContent;
        regexPalavras.lastIndex = 0;
        if (!regexPalavras.test(texto)) return;
        regexPalavras.lastIndex = 0;

        const frag = document.createDocumentFragment();
        let lastIndex = 0;
        let match;
        while ((match = regexPalavras.exec(texto)) !== null) {
            if (match.index > lastIndex) {
                frag.appendChild(document.createTextNode(texto.slice(lastIndex, match.index)));
            }
            const palavraClicada = match[0];
            const span = document.createElement('span');
            span.className = 'palavra-destaque';
            span.title = 'Clique para traduzir';
            span.textContent = palavraClicada;
            span.addEventListener('click', () => traduzirPalavraSelecionada(palavraClicada));
            frag.appendChild(span);
            lastIndex = match.index + match[0].length;
        }
        if (lastIndex < texto.length) {
            frag.appendChild(document.createTextNode(texto.slice(lastIndex)));
        }
        node.parentNode.replaceChild(frag, node);
    });
}

// ========================================
// FUNÇÃO: Traduzir Palavra Selecionada
// ========================================
let ultimaPalavraTraduzida = '';

function traduzirPalavraSelecionada(palavra) {
    const limpa = palavra.replace(/[^a-zA-Z]/g, '');
    if (limpa.length < 2) return;
    
    document.getElementById('palavraBusca').value = limpa;
    traduzirPalavra();
}

// ========================================
// FUNÇÃO: Traduzir Palavra (Manual)
// ========================================
async function traduzirPalavra() {
    const input = document.getElementById('palavraBusca');
    const palavra = input.value.trim();
    
    if (!palavra) {
        alert('⚠️ Digite uma palavra em inglês para traduzir.');
        return;
    }

    if (/\s/.test(palavra)) {
        alert('⚠️ Digite apenas UMA palavra por vez. Este tradutor não traduz frases inteiras — clique em cada palavra do texto separadamente, ou digite uma única palavra aqui.');
        return;
    }

    const limpa = palavra.replace(/[^a-zA-Z]/g, '');
    if (limpa.length < 2) {
        alert('⚠️ Digite uma palavra válida (mínimo 2 caracteres).');
        return;
    }

    // Mostra loading
    document.getElementById('areaTraducao').style.display = 'block';
    document.getElementById('palavraIngles').textContent = '⏳ Carregando...';
    document.getElementById('palavraPortugues').textContent = '...';
    document.getElementById('exemploTraducao').textContent = '⏳ Buscando tradução...';

    try {
        // Tenta o DeepL primeiro (tradutor dedicado, mais confiável que o Gemini pra isso)
        let traducao = await traduzirPalavraComDeepL(limpa);

        // Se o DeepL não estiver configurado/falhar, tenta a IA (Gemini, se configurado)
        if (!traducao) {
            traducao = await traduzirPalavraComIA(limpa);
        }

        // Se nenhuma IA estiver disponível, tenta o dicionário local (palavras comuns)
        if (!traducao) {
            traducao = traduzirPalavraLocal(limpa);
        }

        // Se não estiver no dicionário local, tenta um dicionário online gratuito (sem chave)
        if (!traducao) {
            traducao = await traduzirPalavraOnline(limpa);
        }

        if (traducao) {
            document.getElementById('palavraIngles').textContent = limpa;
            document.getElementById('palavraPortugues').textContent = traducao.traducao || traducao;
            document.getElementById('exemploTraducao').innerHTML = `
                <strong style="color: #3a86ff;">📖 Exemplos:</strong><br>
                ${traducao.exemplos ? traducao.exemplos.map(e => `"${e.en}" → "${e.pt}"`).join('<br>') : 'Nenhum exemplo disponível.'}
            `;
            
            // Salva no histórico
            salvarHistorico(limpa, traducao.traducao || traducao);
        } else {
            document.getElementById('palavraIngles').textContent = limpa;
            document.getElementById('palavraPortugues').textContent = '❌ Tradução não encontrada';
            document.getElementById('exemploTraducao').textContent = 'Tente outra palavra ou verifique a ortografia.';
        }
        
        ultimaPalavraTraduzida = limpa;
        
    } catch (error) {
        console.error('Erro na tradução:', error);
        document.getElementById('palavraIngles').textContent = limpa;
        document.getElementById('palavraPortugues').textContent = '❌ Erro ao traduzir';
        document.getElementById('exemploTraducao').textContent = 'Ocorreu um erro. Tente novamente.';
    }
}

// ========================================
// FUNÇÃO: Traduzir com IA (Gemini)
// ========================================
async function traduzirPalavraComIA(palavra) {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'SUA_CHAVE_AQUI') {
        return traduzirPalavraLocal(palavra);
    }
    
    const prompt = `Traduza a palavra em inglês "${palavra}" para o português do Brasil.

Responda no seguinte formato JSON:
{
    "traducao": "tradução principal",
    "outras": ["outras traduções possíveis"],
    "exemplos": [
        {"en": "frase em inglês com a palavra", "pt": "tradução da frase"}
    ]
}`;
    
    try {
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0.3, maxOutputTokens: 512 }
            })
        });
        
        const data = await response.json();
        
        if (data.candidates && data.candidates[0]) {
            const texto = data.candidates[0].content.parts[0].text;
            try {
                return JSON.parse(texto);
            } catch {
                // Se não for JSON, tenta extrair a tradução
                const match = texto.match(/tradução["\s:]+([^"\n]+)/i);
                if (match) {
                    return { traducao: match[1].trim() };
                }
                return { traducao: texto.replace(/["']/g, '').trim() };
            }
        }
        
        return null;
        
    } catch (error) {
        console.error('Erro na IA:', error);
        return null;
    }
}

// ========================================
// FUNÇÃO: Traduzir com DeepL
// ========================================
async function traduzirPalavraComDeepL(palavra) {
    const traduzido = await traduzirComDeepL(palavra);
    if (!traduzido) return null;
    return { traducao: traduzido };
}

// ========================================
// FUNÇÃO: Traduzir com Dicionário Local
// ========================================
function traduzirPalavraLocal(palavra) {
    const limpa = palavra.toLowerCase().replace(/[^a-z]/g, '');
    
    const dicionario = {
        'hello': { traducao: 'olá', exemplos: [{ en: 'Hello, how are you?', pt: 'Olá, como você está?' }] },
        'goodbye': { traducao: 'adeus', exemplos: [{ en: 'Goodbye, see you later!', pt: 'Adeus, até mais tarde!' }] },
        'beautiful': { traducao: 'bonita / lindo', exemplos: [{ en: 'The sunset is beautiful.', pt: 'O pôr do sol é bonito.' }] },
        'amazing': { traducao: 'incrível', exemplos: [{ en: 'This is amazing!', pt: 'Isso é incrível!' }] },
        'happy': { traducao: 'feliz', exemplos: [{ en: 'She is very happy today.', pt: 'Ela está muito feliz hoje.' }] },
        'sad': { traducao: 'triste', exemplos: [{ en: 'I feel sad today.', pt: 'Me sinto triste hoje.' }] },
        'love': { traducao: 'amor / amar', exemplos: [{ en: 'I love you.', pt: 'Eu te amo.' }] },
        'friend': { traducao: 'amigo / amiga', exemplos: [{ en: 'She is my best friend.', pt: 'Ela é minha melhor amiga.' }] },
        'house': { traducao: 'casa', exemplos: [{ en: 'I live in a big house.', pt: 'Moro em uma casa grande.' }] },
        'car': { traducao: 'carro', exemplos: [{ en: 'I have a new car.', pt: 'Tenho um carro novo.' }] },
        'book': { traducao: 'livro', exemplos: [{ en: 'I am reading a book.', pt: 'Estou lendo um livro.' }] },
        'school': { traducao: 'escola', exemplos: [{ en: 'I go to school every day.', pt: 'Vou à escola todos os dias.' }] },
        'teacher': { traducao: 'professor / professora', exemplos: [{ en: 'My teacher is nice.', pt: 'Meu professor é legal.' }] },
        'student': { traducao: 'estudante / aluno', exemplos: [{ en: 'She is a good student.', pt: 'Ela é uma boa aluna.' }] },
        'water': { traducao: 'água', exemplos: [{ en: 'I drink water every day.', pt: 'Bebo água todos os dias.' }] },
        'sun': { traducao: 'sol', exemplos: [{ en: 'The sun is shining.', pt: 'O sol está brilhando.' }] },
        'moon': { traducao: 'lua', exemplos: [{ en: 'The moon is beautiful tonight.', pt: 'A lua está bonita esta noite.' }] },
        'star': { traducao: 'estrela', exemplos: [{ en: 'Look at the stars.', pt: 'Olhe para as estrelas.' }] },
        'music': { traducao: 'música', exemplos: [{ en: 'I love music.', pt: 'Amo música.' }] },
        'song': { traducao: 'música / canção', exemplos: [{ en: 'This is a beautiful song.', pt: 'Esta é uma bela canção.' }] },
        'good': { traducao: 'bom / boa', exemplos: [{ en: 'This is a good book.', pt: 'Este é um bom livro.' }] },
        'bad': { traducao: 'ruim / mau', exemplos: [{ en: 'That is bad news.', pt: 'Isso é uma má notícia.' }] },
        'big': { traducao: 'grande', exemplos: [{ en: 'This is a big house.', pt: 'Esta é uma casa grande.' }] },
        'small': { traducao: 'pequeno / pequena', exemplos: [{ en: 'I have a small dog.', pt: 'Tenho um cachorro pequeno.' }] },
        'fast': { traducao: 'rápido', exemplos: [{ en: 'The car is fast.', pt: 'O carro é rápido.' }] },
        'slow': { traducao: 'devagar / lento', exemplos: [{ en: 'The turtle is slow.', pt: 'A tartaruga é lenta.' }] },
        'new': { traducao: 'novo / nova', exemplos: [{ en: 'This is a new phone.', pt: 'Este é um celular novo.' }] },
        'old': { traducao: 'velho / antigo', exemplos: [{ en: 'This is an old book.', pt: 'Este é um livro antigo.' }] }
    };
    
    if (dicionario[limpa]) {
        return dicionario[limpa];
    }

    return null;
}

// ========================================
// FUNÇÃO: Traduzir com Dicionário Online (gratuito, sem chave)
// ========================================
async function traduzirPalavraOnline(palavra) {
    try {
        const resposta = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(palavra)}&langpair=en|pt-br`);
        if (!resposta.ok) return null;

        const dados = await resposta.json();
        const texto = dados?.responseData?.translatedText;

        // MyMemory às vezes devolve a própria palavra quando não encontra tradução real
        if (!texto || dados.responseStatus !== 200 || texto.trim().toLowerCase() === palavra.trim().toLowerCase()) {
            return null;
        }

        return { traducao: texto };
    } catch (error) {
        console.error('Erro no dicionário online:', error);
        return null;
    }
}

// ========================================
// FUNÇÃO: Salvar Histórico
// ========================================
function salvarHistorico(palavra, traducao) {
    const historico = JSON.parse(localStorage.getItem(`historico_traducoes_${user.email}`)) || [];
    
    // Remove se já existir
    const index = historico.findIndex(h => h.palavra.toLowerCase() === palavra.toLowerCase());
    if (index !== -1) {
        historico.splice(index, 1);
    }
    
    // Adiciona no início
    historico.unshift({
        palavra: palavra,
        traducao: typeof traducao === 'string' ? traducao : traducao.traducao,
        data: new Date().toISOString()
    });
    
    // Mantém apenas os últimos 20
    if (historico.length > 20) {
        historico.pop();
    }
    
    localStorage.setItem(`historico_traducoes_${user.email}`, JSON.stringify(historico));
    atualizarHistorico(historico);
}

// ========================================
// FUNÇÃO: Atualizar Histórico
// ========================================
function atualizarHistorico(historico) {
    const container = document.getElementById('historicoPalavras');
    if (!container) return;
    
    if (historico.length === 0) {
        container.innerHTML = `<span style="color: rgba(255,255,255,0.2); font-size: 13px;">Nenhuma palavra traduzida ainda.</span>`;
        return;
    }
    
    container.innerHTML = historico.map(item => `
        <span class="historico-item" onclick="traduzirHistorico('${item.palavra}')">
            <span class="en">${item.palavra}</span>
            <span class="pt">→ ${item.traducao}</span>
            <span class="remove" onclick="event.stopPropagation(); removerHistorico('${item.palavra}')">×</span>
        </span>
    `).join('');
}

// ========================================
// FUNÇÃO: Traduzir do Histórico
// ========================================
function traduzirHistorico(palavra) {
    document.getElementById('palavraBusca').value = palavra;
    traduzirPalavra();
}

// ========================================
// FUNÇÃO: Remover do Histórico
// ========================================
function removerHistorico(palavra) {
    const historico = JSON.parse(localStorage.getItem(`historico_traducoes_${user.email}`)) || [];
    const novoHistorico = historico.filter(h => h.palavra.toLowerCase() !== palavra.toLowerCase());
    localStorage.setItem(`historico_traducoes_${user.email}`, JSON.stringify(novoHistorico));
    atualizarHistorico(novoHistorico);
}

// ========================================
// FUNÇÃO: Limpar Tradução
// ========================================
function limparTraducao() {
    document.getElementById('palavraBusca').value = '';
    document.getElementById('areaTraducao').style.display = 'none';
    document.getElementById('palavraIngles').textContent = '';
    document.getElementById('palavraPortugues').textContent = '';
    document.getElementById('exemploTraducao').textContent = '';
}

// ========================================
// FUNÇÃO: Ouvir Pronúncia
// ========================================
function ouvirPalavra() {
    const palavra = document.getElementById('palavraIngles').textContent;
    if (!palavra || palavra === '⏳ Carregando...') {
        alert('⚠️ Nenhuma palavra para ouvir.');
        return;
    }
    
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(palavra);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    } else {
        alert('Seu navegador não suporta áudio.');
    }
}

// ========================================
// FUNÇÃO: Copiar Tradução
// ========================================
function copiarTraducaoPalavra() {
    const palavra = document.getElementById('palavraIngles').textContent;
    const traducao = document.getElementById('palavraPortugues').textContent;
    
    if (!palavra || !traducao || palavra === '⏳ Carregando...') {
        alert('⚠️ Nenhuma tradução para copiar.');
        return;
    }
    
    const texto = `${palavra} → ${traducao}`;
    
    navigator.clipboard.writeText(texto).then(() => {
        alert('📋 Tradução copiada!');
    }).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = texto;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('📋 Tradução copiada!');
    });
}

// ========================================
// INICIALIZAR TRADUTOR
// ========================================
// Chame esta função após carregar o conteúdo
setTimeout(() => {
    carregarTradutorPalavras();
}, 500);