// ========================================
// MOTOR DE RENDERIZAÇÃO DE CONTEÚDO DE ESTUDO
// Compartilhado entre estudo.html (aluno) e admin.html (prévia real do editor)
// ========================================

// Divide o conteúdo bruto em seções: qualquer linha começando com "#"
// (de qualquer nível) marca o início de uma seção nova, e essa linha vira o
// título da seção em vez de aparecer no corpo do texto.
function dividirConteudoEmSecoes(conteudo) {
    if (!conteudo) return [{ title: 'Conteúdo', content: '' }];

    const sections = [];
    const lines = conteudo.split('\n');
    let currentSection = '';
    let sectionTitle = 'Introdução';

    lines.forEach(line => {
        if (line.trim().startsWith('#')) {
            if (currentSection) {
                sections.push({ title: sectionTitle, content: currentSection.trim() });
            }
            sectionTitle = line.replace(/^#+\s*/, '').trim();
            currentSection = '';
        } else {
            currentSection += line + '\n';
        }
    });

    if (currentSection) {
        sections.push({ title: sectionTitle, content: currentSection.trim() });
    }

    return sections.length > 0 ? sections : [{ title: 'Conteúdo', content: conteudo }];
}

function renderizarConteudoEstudo(content) {
    content = content || '';

    // ========================================
    // 1. PROCESSAR VÍDEO LOCAL (SALVO NO ADMIN)
    // ========================================
    content = content.replace(/<video-local\s+key="([^"]*)"\s*><\/video-local>/g, function(match, videoKey) {
        const videoData = localStorage.getItem(videoKey);
        if (!videoData) {
            return `<p style="color: rgba(255,255,255,0.3);">🎬 Vídeo não encontrado. (Chave: ${videoKey})</p>`;
        }
        return `
            <div class="video-container">
                <video
                    width="100%"
                    height="400"
                    controls
                    style="border-radius: 12px; background: #0a0a0f;"
                    preload="metadata"
                    playsinline
                >
                    <source src="${videoData}" type="video/mp4">
                    <source src="${videoData}" type="video/webm">
                    <source src="${videoData}" type="video/ogg">
                    Seu navegador não suporta a reprodução de vídeos.
                </video>
            </div>
        `;
    });

    // ========================================
    // 2. PROCESSAR IMAGEM LOCAL (SALVA NO ADMIN)
    // ========================================
    content = content.replace(/<img-local\s+key="([^"]*)"\s+alt="([^"]*)"\s*>/g, function(match, imageKey, alt) {
        const imageData = localStorage.getItem(imageKey);
        if (!imageData) {
            return `<p style="color: rgba(255,255,255,0.3);">🖼️ Imagem não encontrada. (Chave: ${imageKey})</p>`;
        }
        return `
            <div class="image-container">
                <img src="${imageData}" alt="${alt || 'Imagem do estudo'}" loading="lazy" style="max-width: 100%; border-radius: 12px;">
            </div>
        `;
    });

    // ========================================
    // 3. PROCESSAR VÍDEO DO YOUTUBE
    // ========================================
    content = content.replace(/<video-youtube\s+id="([^"]*)"\s*><\/video-youtube>/g, function(match, videoId) {
        if (!videoId) return '';
        return `
            <div class="video-container">
                <iframe
                    width="100%"
                    height="400"
                    src="https://www.youtube.com/embed/${videoId}"
                    frameborder="0"
                    allowfullscreen
                    loading="lazy"
                    style="border-radius: 12px;"
                ></iframe>
            </div>
        `;
    });

    content = content.replace(/<video-youtube\s+url="([^"]*)"\s*><\/video-youtube>/g, function(match, url) {
        const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
        if (!videoId) return '';
        return `
            <div class="video-container">
                <iframe
                    width="100%"
                    height="400"
                    src="https://www.youtube.com/embed/${videoId}"
                    frameborder="0"
                    allowfullscreen
                    loading="lazy"
                    style="border-radius: 12px;"
                ></iframe>
            </div>
        `;
    });

    // ========================================
    // 3B. PROCESSAR VÍDEO POR LINK (YOUTUBE, GOOGLE DRIVE OU URL DIRETA)
    // ========================================
    content = content.replace(/<video-embed\s+url="([^"]*)"\s*><\/video-embed>/g, function(match, url) {
        if (!url) return '';

        const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/);
        if (youtubeMatch) {
            return `
                <div class="video-container">
                    <iframe width="100%" height="400" src="https://www.youtube.com/embed/${youtubeMatch[1]}"
                        frameborder="0" allowfullscreen loading="lazy" style="border-radius: 12px;"></iframe>
                </div>
            `;
        }

        const driveMatch = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
        if (driveMatch) {
            return `
                <div class="video-container">
                    <iframe width="100%" height="400" src="https://drive.google.com/file/d/${driveMatch[1]}/preview"
                        frameborder="0" allowfullscreen loading="lazy" style="border-radius: 12px;"></iframe>
                </div>
            `;
        }

        return `
            <div class="video-container">
                <video width="100%" height="400" controls preload="metadata" playsinline
                    style="border-radius: 12px; background: #0a0a0f;">
                    <source src="${url}">
                    Seu navegador não suporta a reprodução de vídeos.
                </video>
            </div>
        `;
    });

    // ========================================
    // 4. PROCESSAR IMAGEM EXTERNA (URL)
    // ========================================
    content = content.replace(/<img\s+src="([^"]*)"\s+alt="([^"]*)"\s*\/?>/g, function(match, src, alt) {
        return `
            <div class="image-container">
                <img src="${src}" alt="${alt || 'Imagem do estudo'}" loading="lazy" style="max-width: 100%; border-radius: 12px;">
                ${alt ? `<p style="text-align: center; color: rgba(255,255,255,0.3); font-size: 13px; margin-top: 5px;">${alt}</p>` : ''}
            </div>
        `;
    });

    // ========================================
    // 5. TABELAS
    // ========================================
    content = content.replace(/\[TABELA\]([\s\S]*?)\[FIM_TABELA\]/g, function(match, tableContent) {
        const celulasDaLinha = (linha) => linha.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());

        const lines = tableContent.trim().split('\n').filter(line => line.trim());
        const headers = celulasDaLinha(lines[0] || '');
        const rows = lines.slice(2).map(celulasDaLinha);

        if (headers.length === 0 || rows.length === 0) {
            return '<div style="background: rgba(255,255,255,0.03); padding: 15px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);"><pre>' + tableContent + '</pre></div>';
        }

        let tableHtml = '<div style="overflow-x: auto; margin: 15px 0;"><table style="width: 100%; border-collapse: collapse; font-size: 14px;">';

        tableHtml += '<thead><tr>';
        headers.forEach(header => {
            tableHtml += `<th style="background: rgba(58,134,255,0.1); color: #3a86ff; padding: 10px 14px; text-align: left; border-bottom: 2px solid rgba(58,134,255,0.2); font-weight: 600;">${header}</th>`;
        });
        tableHtml += '</tr></thead>';

        tableHtml += '<tbody>';
        rows.forEach(row => {
            tableHtml += '<tr>';
            row.forEach((cell, index) => {
                const isEven = rows.indexOf(row) % 2 === 0;
                tableHtml += `<td style="padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,0.05); ${isEven ? 'background: rgba(255,255,255,0.02);' : ''} color: rgba(255,255,255,0.8);">${cell}</td>`;
            });
            tableHtml += '</tr>';
        });
        tableHtml += '</tbody></table></div>';

        return tableHtml;
    });

    // ========================================
    // 6. EXERCÍCIOS
    // ========================================
    let exercicioId = 0;
    content = content.replace(/<exercicio-interativo pergunta=\"([^\"]*)\" resposta=\"([^\"]*)\"(?: dica=\"([^\"]*)\")?><\/exercicio-interativo>/g, function(match, pergunta, resposta, dica) {
        const id = ++exercicioId;
        const dicaHtml = dica ? `<div class="dica-label">💡 Dica: ${dica}</div>` : '';

        return `
            <div class="exercicio-interativo" id="exercicio-${id}">
                <div class="exercicio-header">
                    <span class="exercicio-numero">📝 Exercício ${id}</span>
                    <span class="exercicio-status" id="status-${id}">⏳ Aguardando</span>
                </div>
                <div class="exercicio-pergunta">${pergunta}</div>
                ${dicaHtml}
                <div class="exercicio-input-area">
                    <input type="text" id="input-${id}" class="exercicio-input" placeholder="Digite sua resposta..." onkeydown="if(event.key==='Enter') verificarResposta(${id})">
                    <button class="btn-verificar" onclick="verificarResposta(${id})">✅ Verificar</button>
                    <button class="btn-mostrar-resposta" onclick="mostrarResposta(${id})">👁️ Mostrar Resposta</button>
                </div>
                <div class="exercicio-feedback" id="feedback-${id}"></div>
                <div class="exercicio-resposta-oculta" id="resposta-oculta-${id}" style="display: none;">
                    ✅ <strong>Resposta correta:</strong> ${resposta}
                </div>
            </div>
        `;
    });

    content = content.replace(/<exercicio>([\s\S]*?)<resposta>([\s\S]*?)<\/resposta>/g, function(match, pergunta, resposta) {
        const id = ++exercicioId;
        return `
            <div class="exercicio-card" id="exercicio-${id}">
                <div class="exercicio-pergunta">📝 ${pergunta.trim()}</div>
                <button class="btn-ver-resposta" onclick="toggleResposta(${id})">
                    👁️ Ver Resposta
                </button>
                <div class="exercicio-resposta" id="resposta-${id}" style="display: none;">
                    ✅ <strong>Resposta:</strong> ${resposta.trim()}
                </div>
            </div>
        `;
    });

    // ========================================
    // 6B. QUIZ INLINE (MÚLTIPLA ESCOLHA)
    // ========================================
    let quizId = 0;
    content = content.replace(/<quiz>([\s\S]*?)<\/quiz>/g, function(match, corpo) {
        const linhas = corpo.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        if (linhas.length < 2) return match;

        const pergunta = linhas[0];
        let corretaIdx = 0;
        const alternativas = linhas.slice(1).map((linha, idx) => {
            if (/^\[correta\]/i.test(linha)) corretaIdx = idx;
            return linha.replace(/^\[correta\]\s*/i, '');
        });

        const id = ++quizId;
        const alternativasHtml = alternativas.map((alt, idx) =>
            `<button type="button" class="quiz-alternativa" onclick="responderQuizInline(${id}, ${idx})">${alt}</button>`
        ).join('');

        return `
            <div class="quiz-inline" id="quiz-${id}" data-correta="${corretaIdx}">
                <div class="quiz-pergunta">❓ ${pergunta}</div>
                <div class="quiz-alternativas">${alternativasHtml}</div>
                <div class="quiz-feedback" id="quiz-feedback-${id}"></div>
            </div>
        `;
    });

    // ========================================
    // 6C. FLASHCARD
    // ========================================
    let flashcardId = 0;
    content = content.replace(/<flashcard\s+frente="([^"]*)"\s+verso="([^"]*)"\s*><\/flashcard>/g, function(match, frente, verso) {
        const id = ++flashcardId;
        return `
            <div class="flashcard" id="flashcard-${id}" onclick="this.classList.toggle('virado')">
                <div class="flashcard-inner">
                    <div class="flashcard-frente">
                        <span class="flashcard-label">🎴 Clique para virar</span>
                        <div class="flashcard-texto">${frente}</div>
                    </div>
                    <div class="flashcard-verso">
                        <span class="flashcard-label">✅ Resposta</span>
                        <div class="flashcard-texto">${verso}</div>
                    </div>
                </div>
            </div>
        `;
    });

    // ========================================
    // 6D. BLOCO DE CÓDIGO
    // ========================================
    content = content.replace(/<codigo>([\s\S]*?)<\/codigo>/g, function(match, codigo) {
        let escapado = codigo.trim()
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        // Impede que linhas em branco dentro do código sejam confundidas com
        // quebras de parágrafo pelo passo de formatação mais abaixo.
        escapado = escapado.replace(/\n{2,}/g, quebras => quebras.split('').join('​'));
        return `
            <div class="codigo-bloco">
                <div class="codigo-topo">
                    <span class="codigo-label">💻 Código</span>
                    <button type="button" class="btn-copiar-codigo" onclick="copiarCodigo(this)">📋 Copiar</button>
                </div>
                <pre class="codigo-conteudo"><code>${escapado}</code></pre>
            </div>
        `;
    });

    // ========================================
    // 6E. ÁUDIO (PRONÚNCIA)
    // ========================================
    content = content.replace(/<audio-tts\s+texto="([^"]*)"\s*><\/audio-tts>/g, function(match, texto) {
        const textoJs = texto.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
        return `
            <div class="audio-tts-box">
                <button type="button" class="btn-audio-tts" onclick="tocarAudioTexto('${textoJs}')">🔊</button>
                <span class="audio-tts-texto">${texto}</span>
            </div>
        `;
    });

    // ========================================
    // 6F. COLAPSÁVEL ("SAIBA MAIS")
    // ========================================
    let colapsavelId = 0;
    content = content.replace(/<colapsavel\s+titulo="([^"]*)">([\s\S]*?)<\/colapsavel>/g, function(match, titulo, corpo) {
        const id = ++colapsavelId;
        const corpoHtml = corpo.trim().split(/\n\s*\n/).filter(p => p.trim()).map(p => `<p>${p.trim()}</p>`).join('');
        return `
            <div class="colapsavel">
                <button type="button" class="colapsavel-titulo" onclick="toggleColapsavel(${id})">
                    <span>📂 ${titulo}</span>
                    <span class="colapsavel-seta" id="colapsavel-seta-${id}">▾</span>
                </button>
                <div class="colapsavel-corpo" id="colapsavel-corpo-${id}">
                    <div class="colapsavel-corpo-inner">${corpoHtml}</div>
                </div>
            </div>
        `;
    });

    // ========================================
    // 6G. EXEMPLO BILÍNGUE EM DESTAQUE
    // ========================================
    content = content.replace(/<exemplo\s+en="([^"]*)"\s+pt="([^"]*)"\s*><\/exemplo>/g, function(match, en, pt) {
        return `
            <div class="exemplo-frase-box">
                <div class="exemplo-en">🇺🇸 ${en}</div>
                <div class="exemplo-pt">🇧🇷 ${pt}</div>
            </div>
        `;
    });

    // ========================================
    // 7. SUBSTITUIR TÍTULOS E FORMATAR
    // ========================================
    content = content.replace(/^## (.*?)$/gm, '<h2 class="subtitle">$1</h2>');
    content = content.replace(/^### (.*?)$/gm, '<h3 class="sub-subtitle">$1</h3>');
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');

    content = content.split('\n\n').filter(p => p.trim()).map(p => {
        if (p.trim().startsWith('<')) {
            return p;
        }
        return `<p>${p.trim()}</p>`;
    }).join('');

    content = content.replace(/---/g, '<hr>');
    content = content.replace(/💡 (.*?)(?=<br>|$|<\/p>)/g, '<div class="dica-box">💡 $1</div>');

    // Se o conteúdo estiver vazio, mostra mensagem
    if (!content || content.trim() === '' || content.trim() === '<p></p>') {
        content = `
            <div style="text-align: center; padding: 50px 20px; color: rgba(255,255,255,0.3);">
                <p style="font-size: 48px; margin-bottom: 15px;">📝</p>
                <h3 style="color: #fff; margin-bottom: 10px;">Este estudo está vazio</h3>
                <p>Adicione conteúdo no painel Admin!</p>
                <p style="font-size: 13px; margin-top: 10px;">Vá em "Admin" → edite este estudo</p>
            </div>
        `;
    }

    return content;
}

// ========================================
// FUNÇÕES DOS EXERCÍCIOS
// ========================================
function toggleResposta(id) {
    const resposta = document.getElementById(`resposta-${id}`);
    const btn = document.querySelector(`#exercicio-${id} .btn-ver-resposta`);
    if (!resposta || !btn) return;

    if (resposta.style.display === 'none') {
        resposta.style.display = 'block';
        btn.textContent = '🙈 Esconder Resposta';
        btn.style.background = 'rgba(255,50,50,0.15)';
        btn.style.color = '#ff4444';
    } else {
        resposta.style.display = 'none';
        btn.textContent = '👁️ Ver Resposta';
        btn.style.background = 'rgba(58,134,255,0.15)';
        btn.style.color = '#3a86ff';
    }
}

function verificarResposta(id) {
    const input = document.getElementById(`input-${id}`);
    const feedback = document.getElementById(`feedback-${id}`);
    const status = document.getElementById(`status-${id}`);
    const respostaOculta = document.getElementById(`resposta-oculta-${id}`);

    if (!input || !feedback || !status || !respostaOculta) return;

    const respostaUsuario = input.value.trim();
    const exercicio = document.getElementById(`exercicio-${id}`);
    if (!exercicio) return;

    const respostaCorretaEl = exercicio.querySelector('.exercicio-resposta-oculta');
    if (!respostaCorretaEl) return;

    // O texto "Resposta correta:" fica dentro de um <strong>, mas a resposta em
    // si é um nó de texto irmão logo depois — por isso lemos o textContent do
    // container inteiro e removemos só o prefixo fixo.
    const respostaCorreta = respostaCorretaEl.textContent.replace(/^\s*✅?\s*Resposta correta:\s*/, '').trim();

    if (!respostaUsuario) {
        feedback.innerHTML = `<span style="color: #ffd700;">⚠️ Digite uma resposta antes de verificar!</span>`;
        return;
    }

    if (respostaUsuario.toLowerCase() === respostaCorreta.toLowerCase()) {
        feedback.innerHTML = `<span style="color: #00f5d4;">✅ Correto! 🎉 Muito bem!</span>`;
        status.textContent = '✅ Correto!';
        status.style.color = '#00f5d4';
        input.style.borderColor = '#00f5d4';
        input.style.background = 'rgba(0,245,212,0.05)';

        input.disabled = true;
        const btnVerificar = exercicio.querySelector('.btn-verificar');
        const btnMostrar = exercicio.querySelector('.btn-mostrar-resposta');
        if (btnVerificar) { btnVerificar.disabled = true; btnVerificar.style.opacity = '0.5'; }
        if (btnMostrar) { btnMostrar.disabled = true; btnMostrar.style.opacity = '0.5'; }

        respostaOculta.style.display = 'block';
        respostaOculta.style.color = '#00f5d4';

    } else {
        const dicaEl = exercicio.querySelector('.dica-label');
        const dica = dicaEl ? dicaEl.textContent.replace('💡 Dica: ', '') : 'Pense novamente!';

        feedback.innerHTML = `
            <span style="color: #ff4444;">❌ Incorreto. Tente novamente!</span>
            <span style="color: rgba(255,255,255,0.3); font-size: 13px; margin-left: 10px;">💡 Dica: ${dica}</span>
        `;
        status.textContent = '❌ Errado';
        status.style.color = '#ff4444';
        input.style.borderColor = '#ff4444';
        input.style.background = 'rgba(255,50,50,0.05)';

        setTimeout(() => {
            input.style.borderColor = 'rgba(255,255,255,0.06)';
            input.style.background = 'rgba(255,255,255,0.02)';
            if (feedback) feedback.innerHTML = '';
        }, 2000);
    }
}

function mostrarResposta(id) {
    const respostaOculta = document.getElementById(`resposta-oculta-${id}`);
    const feedback = document.getElementById(`feedback-${id}`);
    const status = document.getElementById(`status-${id}`);
    const input = document.getElementById(`input-${id}`);

    if (!respostaOculta || !feedback || !status || !input) return;

    if (respostaOculta.style.display === 'none') {
        respostaOculta.style.display = 'block';
        feedback.innerHTML = `<span style="color: #ffd700;">👁️ Resposta revelada. Tente lembrar para a próxima!</span>`;
        status.textContent = '👁️ Revelada';
        status.style.color = '#ffd700';
    } else {
        respostaOculta.style.display = 'none';
        feedback.innerHTML = '';
        status.textContent = '⏳ Aguardando';
        status.style.color = 'rgba(255,255,255,0.3)';
    }
}

// ========================================
// FUNÇÕES DOS NOVOS BLOCOS DE CONTEÚDO
// ========================================
function responderQuizInline(id, idx) {
    const container = document.getElementById(`quiz-${id}`);
    if (!container || container.classList.contains('respondido')) return;

    const correta = parseInt(container.dataset.correta, 10);
    container.classList.add('respondido');

    const botoes = container.querySelectorAll('.quiz-alternativa');
    botoes.forEach((btn, i) => {
        btn.disabled = true;
        if (i === correta) btn.classList.add('correta');
        else if (i === idx) btn.classList.add('errada');
    });

    const feedback = document.getElementById(`quiz-feedback-${id}`);
    if (!feedback) return;
    if (idx === correta) {
        feedback.textContent = '✅ Correto! Mandou bem.';
        feedback.className = 'quiz-feedback sucesso';
    } else {
        feedback.textContent = '❌ Não foi essa. A resposta certa está em verde.';
        feedback.className = 'quiz-feedback erro';
    }
}

function copiarCodigo(btn) {
    const bloco = btn.closest('.codigo-bloco');
    const codeEl = bloco?.querySelector('code');
    if (!codeEl) return;

    const texto = codeEl.textContent.replace(/​/g, '');
    navigator.clipboard.writeText(texto).then(() => {
        const original = btn.textContent;
        btn.textContent = '✅ Copiado!';
        setTimeout(() => { btn.textContent = original; }, 1500);
    });
}

function tocarAudioTexto(texto) {
    if (!('speechSynthesis' in window)) {
        if (typeof mostrarToast === 'function') mostrarToast('⚠️ Seu navegador não suporta leitura de voz.', 'aviso');
        else alert('⚠️ Seu navegador não suporta leitura de voz.');
        return;
    }
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
}

function toggleColapsavel(id) {
    const corpo = document.getElementById(`colapsavel-corpo-${id}`);
    const seta = document.getElementById(`colapsavel-seta-${id}`);
    if (!corpo) return;
    corpo.classList.toggle('aberto');
    if (seta) seta.textContent = corpo.classList.contains('aberto') ? '▴' : '▾';
}
