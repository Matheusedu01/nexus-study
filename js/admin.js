// ========================================
// VERIFICAÇÃO DE ADMIN
// ========================================
const isAdmin = localStorage.getItem('isAdmin');
if (!isAdmin) {
    window.location.href = 'admin-login.html';
    throw new Error('Acesso negado: redirecionando para o login de admin.');
}

document.getElementById('adminName').textContent = '👑 Admin';

// ========================================
// DADOS DAS TRILHAS (UNIFICADO)
// ========================================

let trilhas = JSON.parse(localStorage.getItem('trilhasData')) || [];

// Primeira vez que o app é aberto: popula com o conteúdo de exemplo de dados/trilhas.json
garantirTrilhasSeed().then(() => {
    trilhas = JSON.parse(localStorage.getItem('trilhasData')) || [];
    carregarTrilhasAdmin();
});

// ========================================
// FUNÇÃO: Salvar Dados
// ========================================
function salvarDados() {
    localStorage.setItem('trilhasData', JSON.stringify(trilhas));
    localStorage.setItem('trilhasPublicas', JSON.stringify(trilhas));
    localStorage.setItem('trilhasAdmin', JSON.stringify(trilhas));
    console.log('✅ Dados salvos no localStorage!');
}

// ========================================
// FUNÇÃO: Importar Trilha de Inglês (seed pronta, js/trilha-ingles-dados.js)
// ========================================
// O app guarda as trilhas no formato "materias" (grupos de estudos), mas o
// seed em js/trilha-ingles-dados.js está no formato bruto "estudos" com um
// campo "modulo" em texto — igual ao dados/trilhas.json. Por isso precisamos
// agrupar por módulo aqui, do mesmo jeito que garantirTrilhasSeed() faz
// (js/seed-dados.js) ao carregar o site pela primeira vez.
function importarTrilhaIngles() {
    if (typeof TRILHA_INGLES_SEED === 'undefined') {
        alert('❌ Dados da trilha de Inglês não foram encontrados (js/trilha-ingles-dados.js).');
        return;
    }

    const jaExiste = trilhas.some(t => t.titulo === TRILHA_INGLES_SEED.titulo);
    if (jaExiste) {
        const confirmar = confirm(`⚠️ Já existe uma trilha chamada "${TRILHA_INGLES_SEED.titulo}".\n\nDeseja substituí-la pela versão mais recente? O progresso dos alunos nessa trilha será perdido.`);
        if (!confirmar) return;
        trilhas = trilhas.filter(t => t.titulo !== TRILHA_INGLES_SEED.titulo);
    }

    const bruta = JSON.parse(JSON.stringify(TRILHA_INGLES_SEED));

    const modulos = new Map();
    (bruta.estudos || []).forEach(estudo => {
        const nomeModulo = estudo.modulo || 'Conteúdo';
        if (!modulos.has(nomeModulo)) modulos.set(nomeModulo, []);
        modulos.get(nomeModulo).push(estudo);
    });

    const materias = Array.from(modulos.entries()).map(([nome, estudos]) => ({
        nome,
        icone: '📘',
        estudos: estudos.slice().sort((a, b) => (a.ordem || 0) - (b.ordem || 0))
    }));

    const novaTrilha = {
        titulo: bruta.titulo,
        descricao: bruta.descricao,
        nivel: bruta.nivel,
        icone: bruta.icone,
        cor: bruta.cor,
        tags: bruta.tags,
        duracao: bruta.duracao,
        materias
    };

    trilhas.push(novaTrilha);
    salvarDados();
    carregarTrilhasAdmin();
    atualizarStats();
    mostrarFeedback(`✅ Trilha "${novaTrilha.titulo}" importada com sucesso! ${bruta.estudos.length} estudos em ${materias.length} módulos.`);
}

function importarTrilhaEtec() {
    if (typeof TRILHA_ETEC_SEED === 'undefined') {
        alert('❌ Dados da trilha da ETEC não foram encontrados (js/trilha-etec-dados.js).');
        return;
    }

    const jaExiste = trilhas.some(t => t.titulo === TRILHA_ETEC_SEED.titulo);
    if (jaExiste) {
        const confirmar = confirm(`⚠️ Já existe uma trilha chamada "${TRILHA_ETEC_SEED.titulo}".\n\nDeseja substituí-la pela versão mais recente? O progresso dos alunos nessa trilha será perdido.`);
        if (!confirmar) return;
        trilhas = trilhas.filter(t => t.titulo !== TRILHA_ETEC_SEED.titulo);
    }

    const bruta = JSON.parse(JSON.stringify(TRILHA_ETEC_SEED));

    const modulos = new Map();
    (bruta.estudos || []).forEach(estudo => {
        const nomeModulo = estudo.modulo || 'Conteúdo';
        if (!modulos.has(nomeModulo)) modulos.set(nomeModulo, []);
        modulos.get(nomeModulo).push(estudo);
    });

    const materias = Array.from(modulos.entries()).map(([nome, estudos]) => ({
        nome,
        icone: '🎓',
        estudos: estudos.slice().sort((a, b) => (a.ordem || 0) - (b.ordem || 0))
    }));

    const novaTrilha = {
        titulo: bruta.titulo,
        descricao: bruta.descricao,
        nivel: bruta.nivel,
        icone: bruta.icone,
        cor: bruta.cor,
        tags: bruta.tags,
        duracao: bruta.duracao,
        materias
    };

    trilhas.push(novaTrilha);
    salvarDados();
    carregarTrilhasAdmin();
    atualizarStats();
    mostrarFeedback(`✅ Trilha "${novaTrilha.titulo}" importada com sucesso! ${bruta.estudos.length} estudos em ${materias.length} módulos.`);
}

// ========================================
// FUNÇÃO: Atualizar Estatísticas
// ========================================
function atualizarStats() {
    const totalTrilhas = trilhas.length;
    let totalEstudos = 0;
    trilhas.forEach(t => {
        if (t.materias) {
            t.materias.forEach(m => {
                totalEstudos += m.estudos ? m.estudos.length : 0;
            });
        }
    });
    
    const usuarios = JSON.parse(localStorage.getItem('users')) || [];
    const totalUsuarios = usuarios.length;

    document.getElementById('totalTrilhasAdmin').textContent = totalTrilhas;
    document.getElementById('totalEstudosAdmin').textContent = totalEstudos;
    document.getElementById('totalUsuariosAdmin').textContent = totalUsuarios;
}

// ========================================
// FUNÇÃO: Carregar Trilhas no Admin
// ========================================
function carregarTrilhasAdmin() {
    const container = document.getElementById('adminTrilhasContainer');
    trilhas = JSON.parse(localStorage.getItem('trilhasData')) || [];
    
    if (trilhas.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 50px; color: rgba(255,255,255,0.2);">
                <p style="font-size: 48px; margin-bottom: 15px;">📚</p>
                <p>Nenhuma trilha criada ainda.</p>
                <p style="font-size: 13px;">Clique em "Nova Trilha" para começar!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = trilhas.map((trilha, index) => {
        let totalEstudos = 0;
        let estudosHtml = '';
        
        if (trilha.materias) {
            const materiasOrdenadas = [...trilha.materias].sort((a, b) => a.nome.localeCompare(b.nome));
            
            materiasOrdenadas.forEach(materia => {
                if (materia.estudos && materia.estudos.length > 0) {
                    totalEstudos += materia.estudos.length;
                    const estudosOrdenados = [...materia.estudos].sort((a, b) => (a.ordem || 0) - (b.ordem || 0));
                    
                    const materiaNomeJs = materia.nome.replace(/'/g, "\\'");
                    estudosHtml += `
                        <div class="admin-modulo-container">
                            <div class="admin-modulo-header">
                                <span class="modulo-nome">📚 ${materia.nome}</span>
                                <span class="modulo-count">${estudosOrdenados.length} estudos</span>
                            </div>
                            <div class="admin-estudos-list" ondragover="onDragOverEstudo(event)" ondrop="onDropEstudo(event, ${index}, '${materiaNomeJs}')">
                                ${estudosOrdenados.map(estudo => `
                                    <div class="admin-estudo-item${estudo.publicado === false ? ' rascunho' : ''}" draggable="true" data-estudo-id="${estudo.id}" ondragstart="onDragStartEstudo(event, ${estudo.id})" ondragend="onDragEndEstudo(event)">
                                        <span class="drag-handle" title="Arraste para reordenar">⠿</span>
                                        <div class="estudo-info">
                                            <span class="ordem">#${estudo.ordem || '?'}</span>
                                            <span class="titulo">${estudo.titulo}</span>
                                            <span class="modulo">${estudo.modulo || 'Geral'}</span>
                                            ${estudo.publicado === false ? '<span class="badge-rascunho">📝 Rascunho</span>' : ''}
                                        </div>
                                        <div class="estudo-actions">
                                            ${estudo.publicado === false
                                                ? `<button class="btn-publicar-estudo" onclick="alternarPublicacao(${index}, ${estudo.id})" title="Publicar para os alunos">🚀</button>`
                                                : `<button class="btn-despublicar-estudo" onclick="alternarPublicacao(${index}, ${estudo.id})" title="Tornar rascunho">📝</button>`
                                            }
                                            <button class="btn-duplicar-estudo" onclick="duplicarEstudo(${index}, ${estudo.id})" title="Duplicar">⎘</button>
                                            <button class="btn-edit-estudo" onclick="editarEstudo(${index}, ${estudo.id})">✏️</button>
                                            <button class="btn-delete-estudo" onclick="deletarEstudo(${index}, ${estudo.id})">🗑️</button>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }
            });
        }
        
        return `
            <div class="admin-trilha-card">
                <div class="trilha-header">
                    <div class="trilha-info">
                        <h3>${trilha.icone || '📚'} ${trilha.titulo}</h3>
                        <p>${trilha.descricao || ''}</p>
                        <div class="tags">
                            <span>📚 ${totalEstudos} estudos</span>
                            <span>🎯 ${trilha.nivel || 'N/A'}</span>
                            <span>⏱️ ${trilha.duracao || 'N/A'}</span>
                            ${trilha.tags ? trilha.tags.map(tag => `<span>#${tag}</span>`).join('') : ''}
                        </div>
                    </div>
                    <div class="trilha-actions">
                        <button class="btn-add-estudo" onclick="abrirModalAddEstudo(${index})">+ Estudo</button>
                        <button class="btn-edit-trilha" onclick="abrirModalEditarTrilha(${index})">✏️</button>
                        <button class="btn-delete-trilha" onclick="deletarTrilha(${index})">🗑️</button>
                    </div>
                </div>
                ${estudosHtml ? `<div class="admin-estudos-list-wrapper">${estudosHtml}</div>` : '<div style="color: rgba(255,255,255,0.2); padding: 15px; text-align: center;">Nenhum estudo adicionado ainda.</div>'}
            </div>
        `;
    }).join('');
    
    atualizarStats();
}

// ========================================
// FUNÇÃO: Criar Trilha
// ========================================
document.getElementById('adminCriarTrilhaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const tagsInput = document.getElementById('adminTrilhaTags').value;
    const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(t => t) : [];
    
    const novaTrilha = {
        id: Date.now(),
        titulo: document.getElementById('adminTrilhaTitulo').value,
        descricao: document.getElementById('adminTrilhaDescricao').value,
        nivel: document.getElementById('adminTrilhaNivel').value,
        icone: document.getElementById('adminTrilhaIcone').value || '📚',
        tags: tags,
        duracao: document.getElementById('adminTrilhaDuracao').value || '8 semanas',
        materias: []
    };
    
    trilhas.push(novaTrilha);
    salvarDados();
    carregarTrilhasAdmin();
    
    this.reset();
    document.getElementById('adminTrilhaIcone').value = '📚';
    document.getElementById('adminTrilhaDuracao').value = '8 semanas';
    
    alert('✅ Trilha criada com sucesso! Os usuários já podem ver!');
});

// ========================================
// FUNÇÃO: Deletar Trilha
// ========================================
function deletarTrilha(index) {
    if (confirm(`Tem certeza que deseja excluir a trilha "${trilhas[index].titulo}"?`)) {
        trilhas.splice(index, 1);
        salvarDados();
        carregarTrilhasAdmin();
    }
}

// ========================================
// FUNÇÃO: Abrir Modal para Adicionar Estudo
// ========================================
let addEstudoTrilhaIndex = null;
let estudoEditando = null; // { trilhaIndex, estudoId } quando o modal está editando um estudo já existente

function abrirModalAddEstudo(index) {
    addEstudoTrilhaIndex = index;
    estudoEditando = null;
    document.getElementById('modalAddEstudoTitulo').textContent = '📚 Adicionar Estudo';
    document.getElementById('btnSalvarEstudo').textContent = '✦ Salvar Estudo';
    document.getElementById('adminTrilhaId').value = index;
    document.getElementById('modalAddEstudo').style.display = 'block';
    document.getElementById('adminAddEstudoForm').reset();
    trocarAbaEditor('escrever');
    atualizarPreview();
    atualizarPreviewSplit();

    const trilha = trilhas[index];
    let nextOrdem = 1;
    if (trilha.materias) {
        trilha.materias.forEach(m => {
            if (m.estudos) {
                m.estudos.forEach(e => {
                    if (e.ordem >= nextOrdem) nextOrdem = e.ordem + 1;
                });
            }
        });
    }
    document.getElementById('adminEstudoOrdem').value = nextOrdem;
}

function fecharModalAddEstudo() {
    document.getElementById('modalAddEstudo').style.display = 'none';
    addEstudoTrilhaIndex = null;
    estudoEditando = null;
}

// ========================================
// FUNÇÃO: Adicionar Estudo (CORRIGIDA)
// ========================================
document.getElementById('adminAddEstudoForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const trilhaIndex = parseInt(document.getElementById('adminTrilhaId').value);
    const trilha = trilhas[trilhaIndex];

    if (!trilha) {
        alert('❌ Trilha não encontrada!');
        return;
    }

    const moduloNome = document.getElementById('adminEstudoModulo').value || 'Geral';
    const conteudo = document.getElementById('adminEstudoConteudo').value || '';
    const titulo = document.getElementById('adminEstudoTitulo').value || 'Sem título';
    const descricao = document.getElementById('adminEstudoDescricao').value || '';
    const ordem = parseInt(document.getElementById('adminEstudoOrdem').value) || 1;
    const publicado = document.getElementById('adminEstudoPublicado').checked;

    if (estudoEditando && estudoEditando.trilhaIndex === trilhaIndex) {
        // ATUALIZA UM ESTUDO JÁ EXISTENTE (em vez de criar um novo)
        let estudo = null;
        let materiaAtual = null;
        for (const m of trilha.materias) {
            const found = m.estudos.find(e => e.id === estudoEditando.estudoId);
            if (found) { estudo = found; materiaAtual = m; break; }
        }

        if (!estudo) {
            alert('❌ Estudo não encontrado! Ele pode ter sido excluído.');
            fecharModalAddEstudo();
            return;
        }

        estudo.titulo = titulo;
        estudo.descricao = descricao;
        estudo.conteudo = conteudo;
        estudo.ordem = ordem;
        estudo.publicado = publicado;

        if (moduloNome !== materiaAtual.nome) {
            // Módulo mudou: move o estudo para a matéria de destino (criando-a se preciso)
            materiaAtual.estudos = materiaAtual.estudos.filter(e => e.id !== estudo.id);
            let novaMateria = trilha.materias.find(m => m.nome === moduloNome);
            if (!novaMateria) {
                novaMateria = { nome: moduloNome, icone: '📚', estudos: [] };
                trilha.materias.push(novaMateria);
            }
            estudo.modulo = moduloNome;
            novaMateria.estudos.push(estudo);
            novaMateria.estudos.sort((a, b) => (a.ordem || 0) - (b.ordem || 0));
            trilha.materias = trilha.materias.filter(m => m.estudos.length > 0);
        } else {
            materiaAtual.estudos.sort((a, b) => (a.ordem || 0) - (b.ordem || 0));
        }

        salvarDados();
        carregarTrilhasAdmin();
        fecharModalAddEstudo();
        alert(publicado ? '✅ Estudo atualizado com sucesso! Os usuários verão as alterações!' : '📝 Estudo salvo como rascunho — os alunos ainda não veem esse estudo.');
        return;
    }

    const novoEstudo = {
        id: Date.now(),
        titulo: titulo,
        descricao: descricao,
        conteudo: conteudo,
        modulo: moduloNome,
        ordem: ordem,
        tipo: 'conteudo',
        publicado: publicado
    };

    // VERIFICA SE A MATÉRIA JÁ EXISTE
    let materia = trilha.materias.find(m => m.nome === moduloNome);
    if (!materia) {
        materia = {
            nome: moduloNome,
            icone: '📚',
            estudos: []
        };
        trilha.materias.push(materia);
    }

    // ADICIONA O ESTUDO
    materia.estudos.push(novoEstudo);
    materia.estudos.sort((a, b) => (a.ordem || 0) - (b.ordem || 0));

    // SALVA NO LOCALSTORAGE
    salvarDados();

    // RECARREGA A LISTA
    carregarTrilhasAdmin();
    fecharModalAddEstudo();

    // LIMPA OS CAMPOS
    document.getElementById('adminEstudoVideo').value = '';
    document.getElementById('videoStatus').textContent = 'Nenhum vídeo adicionado';
    document.getElementById('videoStatus').style.color = 'rgba(255,255,255,0.3)';
    document.getElementById('adminEstudoImagem').value = '';
    document.getElementById('imagemStatus').textContent = 'Nenhuma imagem adicionada';
    document.getElementById('imagemStatus').style.color = 'rgba(255,255,255,0.3)';

    alert(publicado ? '✅ Estudo adicionado com sucesso! Os usuários já podem ver!' : '📝 Estudo salvo como rascunho — publique quando estiver pronto.');
});

// ========================================
// FUNÇÃO: Publicar / Tornar Rascunho
// ========================================
function alternarPublicacao(trilhaIndex, estudoId) {
    const trilha = trilhas[trilhaIndex];
    for (const materia of trilha.materias) {
        const estudo = materia.estudos.find(e => e.id === estudoId);
        if (estudo) {
            estudo.publicado = estudo.publicado === false ? true : false;
            salvarDados();
            carregarTrilhasAdmin();
            mostrarFeedback(estudo.publicado ? '🚀 Estudo publicado! Os alunos já podem ver.' : '📝 Estudo marcado como rascunho.');
            return;
        }
    }
}

// ========================================
// FUNÇÃO: Duplicar Estudo
// ========================================
function duplicarEstudo(trilhaIndex, estudoId) {
    const trilha = trilhas[trilhaIndex];
    let estudo = null;
    let materiaAtual = null;
    for (const materia of trilha.materias) {
        const found = materia.estudos.find(e => e.id === estudoId);
        if (found) { estudo = found; materiaAtual = materia; break; }
    }
    if (!estudo) return;

    const maiorOrdem = materiaAtual.estudos.reduce((max, e) => Math.max(max, e.ordem || 0), 0);
    const copia = {
        ...estudo,
        id: Date.now(),
        titulo: `${estudo.titulo} (cópia)`,
        ordem: maiorOrdem + 1,
        publicado: false // começa como rascunho, para não duplicar conteúdo visível sem querer
    };

    materiaAtual.estudos.push(copia);
    salvarDados();
    carregarTrilhasAdmin();
    mostrarFeedback('✅ Estudo duplicado como rascunho! Edite e publique quando quiser.');
}

// ========================================
// FUNÇÃO: Reordenar Estudos por Arrastar (drag-and-drop)
// ========================================
let estudoArrastandoId = null;

function onDragStartEstudo(event, estudoId) {
    estudoArrastandoId = estudoId;
    event.dataTransfer.effectAllowed = 'move';
    event.target.classList.add('arrastando');
}

function onDragEndEstudo(event) {
    event.target.classList.remove('arrastando');
    document.querySelectorAll('.admin-estudo-item.drag-over').forEach(el => el.classList.remove('drag-over'));
    estudoArrastandoId = null;
}

function onDragOverEstudo(event) {
    event.preventDefault();
    document.querySelectorAll('.admin-estudo-item.drag-over').forEach(el => el.classList.remove('drag-over'));
    const item = event.target.closest('.admin-estudo-item');
    if (item) item.classList.add('drag-over');
}

function onDropEstudo(event, trilhaIndex, materiaNome) {
    event.preventDefault();
    document.querySelectorAll('.admin-estudo-item.drag-over').forEach(el => el.classList.remove('drag-over'));

    if (estudoArrastandoId === null) return;
    const alvoEl = event.target.closest('.admin-estudo-item');
    if (!alvoEl) return;
    const alvoId = parseInt(alvoEl.dataset.estudoId, 10);
    if (alvoId === estudoArrastandoId) return;

    const trilha = trilhas[trilhaIndex];
    const materia = trilha.materias.find(m => m.nome === materiaNome);
    if (!materia) return;

    const ordenados = [...materia.estudos].sort((a, b) => (a.ordem || 0) - (b.ordem || 0));
    const origemIdx = ordenados.findIndex(e => e.id === estudoArrastandoId);
    const destinoIdx = ordenados.findIndex(e => e.id === alvoId);
    if (origemIdx === -1 || destinoIdx === -1) return;

    const [movido] = ordenados.splice(origemIdx, 1);
    ordenados.splice(destinoIdx, 0, movido);

    // Renumera a ordem de acordo com a nova posição (os objetos são os mesmos,
    // então isso já reflete em materia.estudos sem precisar reatribuir o array)
    ordenados.forEach((e, i) => { e.ordem = i + 1; });

    salvarDados();
    carregarTrilhasAdmin();
    mostrarFeedback('✅ Ordem atualizada!');
}

// ========================================
// FUNÇÃO: Deletar Estudo
// ========================================
function deletarEstudo(trilhaIndex, estudoId) {
    if (confirm('Tem certeza que deseja excluir este estudo?')) {
        const trilha = trilhas[trilhaIndex];
        trilha.materias.forEach(materia => {
            materia.estudos = materia.estudos.filter(e => e.id !== estudoId);
        });
        trilha.materias = trilha.materias.filter(m => m.estudos.length > 0);
        salvarDados();
        carregarTrilhasAdmin();
    }
}

// ========================================
// FUNÇÃO: Editar Estudo
// ========================================
function editarEstudo(trilhaIndex, estudoId) {
    const trilha = trilhas[trilhaIndex];
    let estudo = null;
    let materiaAtual = null;
    for (const materia of trilha.materias) {
        const found = materia.estudos.find(e => e.id === estudoId);
        if (found) { estudo = found; materiaAtual = materia; break; }
    }
    if (!estudo) return;

    addEstudoTrilhaIndex = trilhaIndex;
    estudoEditando = { trilhaIndex, estudoId };

    document.getElementById('modalAddEstudoTitulo').textContent = '✏️ Editar Estudo';
    document.getElementById('btnSalvarEstudo').textContent = '💾 Salvar Alterações';
    document.getElementById('adminTrilhaId').value = trilhaIndex;
    document.getElementById('adminEstudoTitulo').value = estudo.titulo || '';
    document.getElementById('adminEstudoDescricao').value = estudo.descricao || '';
    document.getElementById('adminEstudoModulo').value = estudo.modulo || materiaAtual.nome || '';
    document.getElementById('adminEstudoOrdem').value = estudo.ordem || 1;
    document.getElementById('adminEstudoPublicado').checked = estudo.publicado !== false;
    document.getElementById('adminEstudoConteudo').value = estudo.conteudo || '';
    document.getElementById('adminEstudoConteudoSplit').value = estudo.conteudo || '';
    document.getElementById('adminEstudoVideo').value = '';
    document.getElementById('videoStatus').textContent = 'Nenhum vídeo adicionado';
    document.getElementById('videoStatus').style.color = 'rgba(255,255,255,0.3)';
    document.getElementById('adminEstudoImagem').value = '';
    document.getElementById('imagemStatus').textContent = 'Nenhuma imagem adicionada';
    document.getElementById('imagemStatus').style.color = 'rgba(255,255,255,0.3)';

    trocarAbaEditor('escrever');
    atualizarPreview();
    atualizarPreviewSplit();

    document.getElementById('modalAddEstudo').style.display = 'block';
}

// ========================================
// FUNÇÃO: Abrir Modal Editar Trilha
// ========================================
let editTrilhaIndex = null;

function abrirModalEditarTrilha(index) {
    editTrilhaIndex = index;
    const trilha = trilhas[index];
    document.getElementById('editTrilhaId').value = index;
    document.getElementById('editTrilhaTitulo').value = trilha.titulo;
    document.getElementById('editTrilhaDescricao').value = trilha.descricao;
    document.getElementById('editTrilhaNivel').value = trilha.nivel;
    document.getElementById('editTrilhaTags').value = trilha.tags ? trilha.tags.join(', ') : '';
    document.getElementById('editTrilhaIcone').value = trilha.icone || '📚';
    document.getElementById('editTrilhaDuracao').value = trilha.duracao || '8 semanas';
    document.getElementById('modalEditarTrilha').style.display = 'block';
}

function fecharModalEditarTrilha() {
    document.getElementById('modalEditarTrilha').style.display = 'none';
    editTrilhaIndex = null;
}

// ========================================
// FUNÇÃO: Salvar Edição da Trilha
// ========================================
document.getElementById('adminEditarTrilhaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const index = parseInt(document.getElementById('editTrilhaId').value);
    const tagsInput = document.getElementById('editTrilhaTags').value;
    const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(t => t) : [];
    
    trilhas[index].titulo = document.getElementById('editTrilhaTitulo').value;
    trilhas[index].descricao = document.getElementById('editTrilhaDescricao').value;
    trilhas[index].nivel = document.getElementById('editTrilhaNivel').value;
    trilhas[index].tags = tags;
    trilhas[index].icone = document.getElementById('editTrilhaIcone').value || '📚';
    trilhas[index].duracao = document.getElementById('editTrilhaDuracao').value || '8 semanas';
    
    salvarDados();
    carregarTrilhasAdmin();
    fecharModalEditarTrilha();
    alert('✅ Trilha atualizada com sucesso! Os usuários verão as alterações!');
});

// ========================================
// FUNÇÃO: Tabs
// ========================================
document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.admin-content').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        document.getElementById('tab-' + this.dataset.tab).classList.add('active');
    });
});

function abrirTabCriar() {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.admin-content').forEach(c => c.classList.remove('active'));
    document.querySelector('[data-tab="criar"]').classList.add('active');
    document.getElementById('tab-criar').classList.add('active');
}

// ========================================
// FUNÇÃO: Logout Admin
// ========================================
function logoutAdmin() {
    localStorage.removeItem('isAdmin');
    window.location.href = 'admin-login.html';
}

function voltarSite() {
    window.location.href = 'dashboard.html';
}

// ========================================
// FUNÇÃO: Feedback Visual
// ========================================
function mostrarFeedback(mensagem) {
    const div = document.createElement('div');
    div.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 24px;
        background: rgba(0,245,212,0.12);
        border: 1px solid rgba(0,245,212,0.2);
        border-radius: 10px;
        color: #00f5d4;
        z-index: 9999;
        animation: fadeInOut 2.5s ease;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 500;
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    div.textContent = mensagem;
    document.body.appendChild(div);
    setTimeout(() => { div.remove(); }, 2500);
}

// ========================================
// VÍDEO (LINK DO YOUTUBE OU GOOGLE DRIVE)
// ========================================
// Em vez de fazer upload do arquivo (o que estourava o limite de ~5-10MB do
// localStorage em vídeos maiores), o admin cola o link de um vídeo já
// hospedado no YouTube ou Google Drive e ele é embutido via <video-embed>.
function uploadVideo() {
    const input = document.getElementById('adminEstudoVideo');
    const url = input.value.trim();

    if (!url) {
        alert('⚠️ Cole o link do vídeo primeiro!');
        return;
    }

    if (!/^https?:\/\//i.test(url)) {
        alert('⚠️ Cole um link válido (começando com http:// ou https://).');
        return;
    }

    const textarea = document.getElementById('adminEstudoConteudo');
    if (textarea) {
        const tag = `\n<video-embed url="${url}"></video-embed>\n`;
        textarea.value = textarea.value + tag;
        atualizarPreview();
        document.getElementById('adminEstudoConteudoSplit').value = textarea.value;
    }

    const status = document.getElementById('videoStatus');
    if (status) {
        status.textContent = `✅ Vídeo inserido no conteúdo! (${url})`;
        status.style.color = '#00f5d4';
    }

    input.value = '';
    mostrarFeedback('✅ Vídeo inserido no conteúdo!');
}

// ========================================
// IMAGEM (LINK EXTERNO)
// ========================================
// Assim como o vídeo, a imagem entra por link em vez de upload de arquivo
// (evita estourar a cota do localStorage com base64).
function uploadImagem() {
    const input = document.getElementById('adminEstudoImagem');
    const url = input.value.trim();

    if (!url) {
        alert('⚠️ Cole o link da imagem primeiro!');
        return;
    }

    if (!/^https?:\/\//i.test(url)) {
        alert('⚠️ Cole um link válido (começando com http:// ou https://).');
        return;
    }

    const alt = window.prompt('Descrição da imagem (opcional, ajuda na acessibilidade):', '') || 'Imagem do estudo';

    const textarea = document.getElementById('adminEstudoConteudo');
    if (textarea) {
        const tag = `\n<img src="${url}" alt="${alt}">\n`;
        textarea.value = textarea.value + tag;
        atualizarPreview();
        document.getElementById('adminEstudoConteudoSplit').value = textarea.value;
    }

    const status = document.getElementById('imagemStatus');
    if (status) {
        status.textContent = `✅ Imagem inserida no conteúdo! (${url})`;
        status.style.color = '#00f5d4';
    }

    input.value = '';
    mostrarFeedback('✅ Imagem inserida no conteúdo!');
}

// ========================================
// INICIALIZAÇÃO
// ========================================
carregarTrilhasAdmin();
// ========================================
// EDITOR DE CONTEÚDO MELHORADO
// ========================================

// ========================================
// 1. TROCAR ABA DO EDITOR
// ========================================
function trocarAbaEditor(aba) {
    // Esconder todas as abas
    document.getElementById('conteudoEscrever').style.display = 'none';
    document.getElementById('conteudoPreview').style.display = 'none';
    document.getElementById('conteudoSplit').style.display = 'none';
    
    // Remover classe ativa de todas as abas
    document.querySelectorAll('.aba-editor').forEach(el => {
        el.style.color = 'rgba(255,255,255,0.3)';
        el.style.borderBottom = '2px solid transparent';
    });
    
    // Mostrar aba selecionada
    if (aba === 'escrever') {
        document.getElementById('conteudoEscrever').style.display = 'block';
        document.getElementById('abaEscrever').style.color = '#3a86ff';
        document.getElementById('abaEscrever').style.borderBottom = '2px solid #3a86ff';
        // Sincronizar conteúdo
        document.getElementById('adminEstudoConteudo').value = document.getElementById('adminEstudoConteudoSplit').value;
    } else if (aba === 'preview') {
        document.getElementById('conteudoPreview').style.display = 'block';
        document.getElementById('abaPreview').style.color = '#00f5d4';
        document.getElementById('abaPreview').style.borderBottom = '2px solid #00f5d4';
        atualizarPreview();
    } else if (aba === 'split') {
        document.getElementById('conteudoSplit').style.display = 'block';
        document.getElementById('abaSplit').style.color = '#ffd700';
        document.getElementById('abaSplit').style.borderBottom = '2px solid #ffd700';
        // Sincronizar conteúdo
        const conteudo = document.getElementById('adminEstudoConteudo').value;
        document.getElementById('adminEstudoConteudoSplit').value = conteudo;
        atualizarPreviewSplit();
    }
}

// ========================================
// 2. ATUALIZAR PRÉVIA (RENDERIZAÇÃO REAL, IGUAL O ALUNO VÊ)
// ========================================
// Usa o mesmo motor de renderização de js/conteudo-render.js (o que o aluno
// vê em estudo.html), dentro de um iframe isolado com css/estudo.css, para
// que vídeo, tabela, quiz, flashcard, código, áudio etc. apareçam de verdade
// na prévia — e não só como texto puro, como acontecia antes.
function atualizarPreview() {
    const conteudo = document.getElementById('adminEstudoConteudo').value;
    renderizarPreviewReal('previewContent', conteudo);
}

function atualizarPreviewSplit() {
    const conteudo = document.getElementById('adminEstudoConteudoSplit').value;
    renderizarPreviewReal('previewContentSplit', conteudo);
    // Sincronizar com o editor principal
    document.getElementById('adminEstudoConteudo').value = conteudo;
}

function renderizarPreviewReal(containerId, conteudo) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let iframe = container.querySelector('iframe.preview-iframe');
    if (!iframe) {
        container.innerHTML = '';
        iframe = document.createElement('iframe');
        iframe.className = 'preview-iframe';
        container.appendChild(iframe);
    }

    // Divide em seções como o aluno vê (cada "#" vira o título de uma seção,
    // em vez de aparecer como texto solto), e renderiza todas encadeadas para
    // dar uma visão completa do estudo de uma vez só.
    const htmlConteudo = (conteudo && conteudo.trim())
        ? dividirConteudoEmSecoes(conteudo).map(secao => `
            <div class="section-header">📖 ${secao.title}</div>
            ${renderizarConteudoEstudo(secao.content)}
        `).join('<hr>')
        : '<div class="preview-vazio">Digite algo para ver a prévia aqui 👆</div>';

    iframe.srcdoc = `<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="css/estudo.css">
<style>
  html, body { background: #0a0a0f; margin: 0; }
  body { padding: 20px; }
  .preview-vazio { text-align: center; padding: 60px 20px; color: rgba(255,255,255,0.3); font-family: 'Inter', sans-serif; }
</style>
</head>
<body>
<div class="study-content">${htmlConteudo}</div>
<script src="js/conteudo-render.js"><\/script>
</body>
</html>`;
}

// ========================================
// 4. INSERIR FORMATAÇÃO
// ========================================
function inserirFormatacao(tipo) {
    const textarea = document.getElementById('adminEstudoConteudo');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    
    let antes = '';
    let depois = '';
    let placeholder = '';
    
    switch(tipo) {
        case 'negrito':
            antes = '**';
            depois = '**';
            placeholder = 'texto em negrito';
            break;
        case 'italico':
            antes = '*';
            depois = '*';
            placeholder = 'texto em itálico';
            break;
        case 'sublinhado':
            antes = '__';
            depois = '__';
            placeholder = 'texto sublinhado';
            break;
        case 'lista':
            antes = '- ';
            depois = '';
            placeholder = 'item da lista';
            break;
        case 'listaNumerada':
            antes = '1. ';
            depois = '';
            placeholder = 'item da lista';
            break;
        default:
            return;
    }
    
    const novoTexto = selected ? `${antes}${selected}${depois}` : `${antes}${placeholder}${depois}`;
    const newText = text.substring(0, start) + novoTexto + text.substring(end);
    textarea.value = newText;
    textarea.focus();
    
    if (!selected) {
        const newPos = start + antes.length + placeholder.length;
        textarea.selectionStart = newPos;
        textarea.selectionEnd = newPos;
    }
    
    atualizarPreview();
    // Sincronizar split
    document.getElementById('adminEstudoConteudoSplit').value = newText;
}

// ========================================
// 5. INSERIR TAG (ATUALIZADO)
// ========================================
function inserirTag(tipo) {
    const textarea = document.getElementById('adminEstudoConteudo');
    const cursorPos = textarea.selectionStart;
    const text = textarea.value;
    let tag = '';
    
    switch(tipo) {
        case 'titulo':
            tag = '\n## Novo Título\n\n';
            break;
        case 'subtitulo':
            tag = '\n### Novo Subtítulo\n\n';
            break;
        case 'video':
            tag = '\n<video-youtube id="ID_DO_VIDEO"></video-youtube>\n';
            break;
        case 'imagem':
            tag = '\n<img src="URL_DA_IMAGEM" alt="Descrição da imagem">\n';
            break;
        case 'link':
            tag = '\n[Texto do link](URL_DO_LINK)\n';
            break;
        case 'exercicio':
            tag = '\n<exercicio>\nPergunta do exercício?\n<resposta>Resposta correta</resposta>\n</exercicio>\n';
            break;
        case 'dica':
            tag = '\n💡 **Dica:** Digite sua dica aqui...\n';
            break;
        case 'tabela':
            tag = '\n**[TABELA]**\n| Coluna 1 | Coluna 2 |\n|----------|----------|\n| Dado 1 | Dado 2 |\n**[FIM_TABELA]**\n';
            break;
        case 'quiz':
            tag = '\n<quiz>\nPergunta do quiz aqui?\n[correta] Alternativa certa\nAlternativa errada 1\nAlternativa errada 2\n</quiz>\n';
            break;
        case 'flashcard':
            tag = '\n<flashcard frente="Palavra ou pergunta" verso="Tradução ou resposta"></flashcard>\n';
            break;
        case 'codigo':
            tag = '\n<codigo>\nEscreva aqui o código ou frase de exemplo\n</codigo>\n';
            break;
        case 'audio':
            tag = '\n<audio-tts texto="Digite a frase em inglês aqui"></audio-tts>\n';
            break;
        case 'colapsavel':
            tag = '\n<colapsavel titulo="Saiba mais">\nConteúdo extra aqui...\n</colapsavel>\n';
            break;
        case 'exemplo':
            tag = '\n<exemplo en="Example sentence in English." pt="Frase de exemplo em português."></exemplo>\n';
            break;
        default:
            return;
    }
    
    const newText = text.slice(0, cursorPos) + tag + text.slice(cursorPos);
    textarea.value = newText;
    textarea.focus();
    textarea.selectionStart = cursorPos + tag.length;
    textarea.selectionEnd = cursorPos + tag.length;
    
    atualizarPreview();
    document.getElementById('adminEstudoConteudoSplit').value = newText;
    mostrarFeedback(`✅ Tag "${tipo}" inserida!`);
}
// ========================================
// EXPORTAR DADOS
// ========================================

// ========================================
// 1. EXPORTAR CSV (USUÁRIOS)
// ========================================
function exportarCSV() {
    const usuarios = JSON.parse(localStorage.getItem('users')) || [];
    const trilhas = JSON.parse(localStorage.getItem('trilhasData')) || [];
    
    if (usuarios.length === 0) {
        alert('⚠️ Nenhum usuário cadastrado para exportar.');
        return;
    }
    
    // Cabeçalho do CSV
    let csv = 'Nome,Email,Data Cadastro,Estudos Concluídos,Total Estudos,Progresso %,Dias Seguidos,Conquistas\n';
    
    usuarios.forEach(u => {
        let totalConcluidos = 0;
        let totalEstudos = 0;
        let diasSeguidos = 0;
        let conquistas = 0;
        
        // Calcular progresso
        trilhas.forEach((trilha, index) => {
            const progressKey = `progress_${index}_${u.email}`;
            const prog = JSON.parse(localStorage.getItem(progressKey));
            if (prog && prog.concluidos) {
                totalConcluidos += prog.concluidos.length;
            }
            
            if (trilha.materias) {
                trilha.materias.forEach(m => {
                    if (m.estudos) {
                        totalEstudos += m.estudos.length;
                    }
                });
            }
        });
        
        // Dias seguidos
        const historico = JSON.parse(localStorage.getItem(`historico_${u.email}`)) || [];
        const hoje = new Date().toISOString().split('T')[0];
        if (historico.length > 0 && historico[historico.length - 1] === hoje) {
            diasSeguidos = 1;
            for (let i = historico.length - 2; i >= 0; i--) {
                const dataAtual = new Date(historico[i + 1]);
                const dataAnterior = new Date(historico[i]);
                const diff = (dataAtual - dataAnterior) / (1000 * 60 * 60 * 24);
                if (diff === 1) diasSeguidos++;
                else break;
            }
        }
        
        // Conquistas
        const conquistasList = JSON.parse(localStorage.getItem(`conquistas_${u.email}`)) || [];
        conquistas = conquistasList.length;
        
        const progresso = totalEstudos > 0 ? Math.round((totalConcluidos / totalEstudos) * 100) : 0;
        const dataCadastro = u.dataCadastro || 'N/A';
        
        csv += `"${u.name}","${u.email}","${dataCadastro}",${totalConcluidos},${totalEstudos},${progresso}%,${diasSeguidos},${conquistas}\n`;
    });
    
    // Baixar arquivo
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_usuarios_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert(`✅ CSV exportado com sucesso! (${usuarios.length} usuários)`);
}

// ========================================
// 2. EXPORTAR JSON (COMPLETO)
// ========================================
function exportarJSON() {
    const dados = {
        versao: '1.0',
        dataExportacao: new Date().toISOString(),
        totalUsuarios: 0,
        totalTrilhas: 0,
        dados: {
            usuarios: JSON.parse(localStorage.getItem('users')) || [],
            trilhas: JSON.parse(localStorage.getItem('trilhasData')) || [],
            progressos: {}
        }
    };
    
    // Coletar todos os progressos
    const usuarios = dados.dados.usuarios;
    const trilhas = dados.dados.trilhas;
    dados.totalUsuarios = usuarios.length;
    dados.totalTrilhas = trilhas.length;
    
    usuarios.forEach(u => {
        const progressos = {};
        trilhas.forEach((trilha, index) => {
            const progressKey = `progress_${index}_${u.email}`;
            const prog = JSON.parse(localStorage.getItem(progressKey));
            if (prog) {
                progressos[`trilha_${index}`] = prog;
            }
        });
        if (Object.keys(progressos).length > 0) {
            dados.dados.progressos[u.email] = progressos;
        }
    });
    
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_completo_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert(`✅ JSON exportado com sucesso! (${usuarios.length} usuários, ${trilhas.length} trilhas)`);
}

// ========================================
// 3. EXPORTAR PROGRESSO DOS USUÁRIOS
// ========================================
function exportarProgresso() {
    const usuarios = JSON.parse(localStorage.getItem('users')) || [];
    const trilhas = JSON.parse(localStorage.getItem('trilhasData')) || [];
    
    if (usuarios.length === 0) {
        alert('⚠️ Nenhum usuário cadastrado.');
        return;
    }
    
    let html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Relatório de Progresso - Nexus Study</title>
            <style>
                body { font-family: Arial, sans-serif; background: #0a0a0f; color: #fff; padding: 20px; }
                h1 { color: #3a86ff; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 10px; }
                .user { background: rgba(255,255,255,0.03); border-radius: 12px; padding: 15px; margin-bottom: 15px; border: 1px solid rgba(255,255,255,0.04); }
                .user h3 { color: #00f5d4; margin-bottom: 5px; }
                .user p { color: rgba(255,255,255,0.3); margin: 3px 0; }
                .progress-bar { width: 100%; height: 6px; background: rgba(255,255,255,0.05); border-radius: 3px; margin: 8px 0; overflow: hidden; }
                .progress-bar .fill { height: 100%; border-radius: 3px; transition: width 0.5s; background: linear-gradient(90deg, #00f5d4, #3a86ff); }
                .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 10px; margin-top: 10px; }
                .stat { text-align: center; padding: 8px; background: rgba(255,255,255,0.02); border-radius: 8px; }
                .stat .num { font-size: 20px; font-weight: 700; color: #fff; }
                .stat .label { font-size: 11px; color: rgba(255,255,255,0.3); }
                .footer { margin-top: 30px; color: rgba(255,255,255,0.2); font-size: 12px; text-align: center; }
            </style>
        </head>
        <body>
            <h1>📊 Relatório de Progresso</h1>
            <p style="color: rgba(255,255,255,0.3);">Gerado em: ${new Date().toLocaleString('pt-BR')}</p>
            <p style="color: rgba(255,255,255,0.3);">Total de usuários: ${usuarios.length}</p>
    `;
    
    usuarios.forEach(u => {
        let totalConcluidos = 0;
        let totalEstudos = 0;
        
        trilhas.forEach((trilha, index) => {
            const progressKey = `progress_${index}_${u.email}`;
            const prog = JSON.parse(localStorage.getItem(progressKey));
            if (prog && prog.concluidos) {
                totalConcluidos += prog.concluidos.length;
            }
            
            if (trilha.materias) {
                trilha.materias.forEach(m => {
                    if (m.estudos) {
                        totalEstudos += m.estudos.length;
                    }
                });
            }
        });
        
        const progresso = totalEstudos > 0 ? Math.round((totalConcluidos / totalEstudos) * 100) : 0;
        const conquistas = JSON.parse(localStorage.getItem(`conquistas_${u.email}`)) || [];
        
        html += `
            <div class="user">
                <h3>👤 ${u.name}</h3>
                <p>📧 ${u.email}</p>
                <div class="progress-bar">
                    <div class="fill" style="width: ${progresso}%;"></div>
                </div>
                <div class="stats">
                    <div class="stat">
                        <div class="num">${totalEstudos}</div>
                        <div class="label">Total Estudos</div>
                    </div>
                    <div class="stat">
                        <div class="num">${totalConcluidos}</div>
                        <div class="label">Concluídos</div>
                    </div>
                    <div class="stat">
                        <div class="num">${progresso}%</div>
                        <div class="label">Progresso</div>
                    </div>
                    <div class="stat">
                        <div class="num">${conquistas.length}</div>
                        <div class="label">Conquistas</div>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += `
            <div class="footer">Nexus Study - Relatório gerado automaticamente</div>
        </body>
        </html>
    `;
    
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_progresso_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ========================================
// 4. IMPORTAR DADOS
// ========================================
function importarDados() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const dados = JSON.parse(e.target.result);
                
                if (!dados.dados) {
                    alert('❌ Formato de arquivo inválido!');
                    return;
                }
                
                const confirmar = confirm(
                    `⚠️ Isso vai SOBRESCREVER todos os dados atuais!\n\n` +
                    `Usuários: ${dados.dados.usuarios.length}\n` +
                    `Trilhas: ${dados.dados.trilhas.length}\n\n` +
                    `Deseja continuar?`
                );
                
                if (!confirmar) return;
                
                // Restaurar dados
                if (dados.dados.usuarios) {
                    localStorage.setItem('users', JSON.stringify(dados.dados.usuarios));
                }
                if (dados.dados.trilhas) {
                    localStorage.setItem('trilhasData', JSON.stringify(dados.dados.trilhas));
                    localStorage.setItem('trilhasPublicas', JSON.stringify(dados.dados.trilhas));
                }
                if (dados.dados.progressos) {
                    Object.keys(dados.dados.progressos).forEach(email => {
                        const progressos = dados.dados.progressos[email];
                        Object.keys(progressos).forEach(key => {
                            const index = key.replace('trilha_', '');
                            const progressKey = `progress_${index}_${email}`;
                            localStorage.setItem(progressKey, JSON.stringify(progressos[key]));
                        });
                    });
                }
                
                alert('✅ Dados importados com sucesso! Recarregue a página.');
                location.reload();
            } catch (error) {
                alert('❌ Erro ao importar dados: ' + error.message);
            }
        };
        reader.readAsText(file);
    };
    input.click();
}