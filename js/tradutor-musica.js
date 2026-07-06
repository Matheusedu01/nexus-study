// ========================================
// TRADUTOR DE MÚSICAS COM IA (GEMINI 1.5 FLASH)
// ========================================

// ========================================
// FUNÇÃO: Buscar Letra da Música
// ========================================
async function buscarLetraMusica(nomeMusica, artista = '') {
    console.log('🔍 Buscando música:', nomeMusica, 'Artista:', artista);
    
    // Primeiro, tenta buscar na API pública de letras
    try {
        const artistaClean = artista || 'unknown';
        const response = await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artistaClean)}/${encodeURIComponent(nomeMusica)}`);
        
        if (response.ok) {
            const data = await response.json();
            if (data.lyrics) {
                console.log('✅ Letra encontrada na API pública!');
                return data.lyrics;
            }
        }
    } catch (e) {
        console.log('API pública indisponível, usando IA...');
    }
    
    // Se não encontrou, usa a IA para gerar
    console.log('🧠 Gerando letra com IA...');
    return await gerarLetraComIA(nomeMusica, artista);
}

// ========================================
// FUNÇÃO: Gerar Letra com IA
// ========================================
async function gerarLetraComIA(nomeMusica, artista = '') {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'SUA_CHAVE_AQUI') {
        console.error('❌ Chave API não configurada!');
        return gerarLetraFallback(nomeMusica, artista);
    }
    
    const prompt = `Crie uma letra de música completa em inglês com o título "${nomeMusica}"${artista ? `, no estilo do artista ${artista}` : ''}.
    
    A letra deve ter:
    - Versos (verses)
    - Refrão (chorus)
    - Ponte (bridge) - opcional
    
    Responda APENAS com a letra da música, sem comentários adicionais.
    A letra deve ser original e criativa.`;
    
    try {
        console.log('📤 Enviando requisição para Gemini 1.5 Flash...');
        
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.9,
                    maxOutputTokens: 1024,
                }
            })
        });
        
        const data = await response.json();
        console.log('📥 Resposta da API recebida');
        
        if (data.candidates && data.candidates[0]) {
            const letra = data.candidates[0].content.parts[0].text;
            console.log('✅ Letra gerada com sucesso!');
            return letra;
        }
        
        if (data.error) {
            console.error('❌ Erro da API:', data.error);
            throw new Error(data.error.message || 'Erro na API Gemini');
        }
        
        throw new Error('Resposta inesperada da API');
        
    } catch (error) {
        console.error('❌ Erro na IA:', error);
        return gerarLetraFallback(nomeMusica, artista);
    }
}

// ========================================
// FUNÇÃO: Fallback (quando a IA falha)
// ========================================
function gerarLetraFallback(nomeMusica, artista = '') {
    return `"${nomeMusica}" - ${artista || 'Artista'}

[Verse 1]
In the morning light I rise
With a fire in my eyes
Every step I take is new
Every dream I'm chasing too

[Chorus]
Oh oh oh, this is my song
Oh oh oh, where I belong
Oh oh oh, I'm moving on
Oh oh oh, I am strong

[Verse 2]
Through the darkness and the rain
I will find my way again
With the music in my soul
I am finally feeling whole

[Chorus]
Oh oh oh, this is my song
Oh oh oh, where I belong
Oh oh oh, I'm moving on
Oh oh oh, I am strong

[Bridge]
And when the night is over
And the sun begins to shine
I'll keep on moving forward
This journey is all mine

[Final Chorus]
Oh oh oh, this is my song
Oh oh oh, where I belong
Oh oh oh, I'm moving on
Oh oh oh, I am strong`;
}

// ========================================
// FUNÇÃO: Contar Palavras em Inglês
// ========================================
function contarPalavrasIngles(texto) {
    if (!texto) return 0;
    
    const palavrasComunsIngles = [
        'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
        'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
        'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
        'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their',
        'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go',
        'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know',
        'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them',
        'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over',
        'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first',
        'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day',
        'most', 'us', 'is', 'was', 'are', 'were', 'been', 'being', 'has', 'had',
        'oh', 'yeah', 'baby', 'girl', 'boy', 'love', 'heart', 'soul', 'dream',
        'never', 'always', 'forever', 'together', 'music', 'song', 'sing', 'world'
    ];
    
    const palavras = texto.toLowerCase().split(/\s+/);
    let count = 0;
    
    for (const palavra of palavras) {
        const limpa = palavra.replace(/[^a-z]/g, '');
        if (limpa.length > 2 && palavrasComunsIngles.includes(limpa)) {
            count++;
        }
    }
    
    return count;
}

// ========================================
// FUNÇÃO: Traduzir Texto (VERSÃO FORTE)
// ========================================
async function traduzirTexto(texto, idioma = 'português') {
    // Tenta o DeepL primeiro: é uma API dedicada de tradução (mais confiável e
    // sem os "escapes" em inglês que o Gemini às vezes deixa passar), e aceita
    // a letra inteira de uma vez, sem precisar dividir em partes.
    const traduzidoComDeepL = await traduzirComDeepL(texto);
    if (traduzidoComDeepL) {
        console.log('✅ Traduzido com DeepL');
        return traduzidoComDeepL;
    }

    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'SUA_CHAVE_AQUI') {
        console.warn('⚠️ Nem DeepL nem Gemini configurados/disponíveis');
        return traduzirSimples(texto);
    }

    // Divide em partes menores se for muito grande
    if (texto.length > 3000) {
        console.log('📄 Texto grande, dividindo em partes...');
        return await traduzirTextoGrande(texto, idioma);
    }
    
    // 🔥 PROMPT FORTE E DIRETO - SEM MISTURA DE IDIOMAS!
    const prompt = `Você é um tradutor profissional. Sua tarefa é traduzir a letra de uma música do INGLÊS para o PORTUGUÊS do Brasil.

⚠️ ATENÇÃO: A RESPOSTA DEVE SER 100% EM PORTUGUÊS, SEM NENHUMA PALAVRA EM INGLÊS!

REGRAS OBRIGATÓRIAS:
1. Traduza TODAS as palavras para o português
2. NÃO mantenha NENHUMA palavra em inglês
3. NÃO adicione a letra original em inglês
4. NÃO adicione comentários ou explicações
5. Responda APENAS com a tradução completa
6. Mantenha a estrutura de versos e refrão

TEXTO EM INGLÊS PARA TRADUZIR:
"""
${texto}
"""

RESPOSTA (APENAS A TRADUÇÃO COMPLETA EM PORTUGUÊS):`;
    
    try {
        console.log('📤 Enviando para tradução...');
        
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.2,
                    maxOutputTokens: 4096,
                }
            })
        });
        
        const data = await response.json();
        console.log('📥 Resposta recebida');
        
        if (data.candidates && data.candidates[0]) {
            let traducao = data.candidates[0].content.parts[0].text;
            
            // Limpeza
            traducao = traducao
                .replace(/^(Tradução|TRADUÇÃO|Tradução completa|TRADUÇÃO COMPLETA|Resposta|RESPOSTA)[:\s]*/i, '')
                .replace(/^["']|["']$/g, '')
                .trim();
            
            // Verifica se tem muitas palavras em inglês
            const palavrasIngles = contarPalavrasIngles(traducao);
            const totalPalavras = traducao.split(/\s+/).length;
            const porcentagemIngles = totalPalavras > 0 ? (palavrasIngles / totalPalavras) * 100 : 0;
            
            console.log(`📊 Palavras em inglês: ${porcentagemIngles.toFixed(1)}%`);
            
            // Se mais de 20% estiver em inglês, tenta novamente
            if (porcentagemIngles > 20 && totalPalavras > 10) {
                console.log('🔄 Muitas palavras em inglês, tentando novamente...');
                const traducao2 = await traduzirComGeminiProForte(texto);
                if (traducao2) {
                    const eng2 = contarPalavrasIngles(traducao2);
                    const total2 = traducao2.split(/\s+/).length;
                    if (total2 > 0 && (eng2 / total2) * 100 < 20) {
                        return traducao2;
                    }
                }
            }
            
            return traducao;
        }
        
        return traduzirSimples(texto);
        
    } catch (error) {
        console.error('❌ Erro:', error);
        return traduzirSimples(texto);
    }
}

// ========================================
// FUNÇÃO: Traduzir Texto Grande
// ========================================
async function traduzirTextoGrande(texto, idioma = 'português') {
    const partes = texto.match(/.{1,2000}/g) || [texto];
    let traducaoCompleta = '';
    
    console.log(`📄 Dividindo em ${partes.length} partes`);
    
    for (let i = 0; i < partes.length; i++) {
        const parte = partes[i];
        const prompt = `Traduza APENAS a PARTE ${i+1} de ${partes.length} do texto do INGLÊS para o PORTUGUÊS do Brasil.

REGRA: Responda APENAS com a tradução em português, sem comentários.

PARTE ${i+1}:
"""
${parte}
"""

TRADUÇÃO:`;
        
        try {
            const response = await fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }],
                    generationConfig: {
                        temperature: 0.2,
                        maxOutputTokens: 4096,
                    }
                })
            });
            
            const data = await response.json();
            
            if (data.candidates && data.candidates[0]) {
                let traducao = data.candidates[0].content.parts[0].text;
                traducao = traducao.replace(/^(Tradução|TRADUÇÃO|Parte \d+)[:\s]*/i, '').trim();
                traducaoCompleta += traducao + '\n\n';
            }
        } catch (error) {
            console.error(`❌ Erro na parte ${i+1}:`, error);
            traducaoCompleta += parte + '\n\n';
        }
    }
    
    return traducaoCompleta.trim();
}

// ========================================
// FUNÇÃO: Tradução Forte com Gemini Pro
// ========================================
async function traduzirComGeminiProForte(texto) {
    const urlPro = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${GEMINI_API_KEY}`;
    
    const prompt = `TRADUZA 100% PARA O PORTUGUÊS.

REGRAS:
- NENHUMA palavra em inglês
- Traduza TUDO
- Só responda com a tradução

TEXTO:
${texto}

TRADUÇÃO:`;
    
    try {
        const response = await fetch(urlPro, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0.2, maxOutputTokens: 4096 }
            })
        });
        
        const data = await response.json();
        
        if (data.candidates && data.candidates[0]) {
            let traducao = data.candidates[0].content.parts[0].text;
            traducao = traducao.replace(/^(Tradução|TRADUÇÃO|Resposta|RESPOSTA)[:\s]*/i, '').trim();
            return traducao;
        }
        
        return null;
        
    } catch (error) {
        console.error('Erro:', error);
        return null;
    }
}

// ========================================
// FUNÇÃO: Tradução Simples (Fallback)
// ========================================
function traduzirSimples(texto) {
    const dicionario = {
        'love': 'amor', 'heart': 'coração', 'dream': 'sonho',
        'song': 'música', 'sing': 'cantar', 'together': 'juntos',
        'never': 'nunca', 'always': 'sempre', 'forever': 'para sempre',
        'music': 'música', 'word': 'palavra', 'note': 'nota',
        'melody': 'melodia', 'spirit': 'espírito', 'free': 'livre',
        'world': 'mundo', 'life': 'vida', 'time': 'tempo',
        'day': 'dia', 'night': 'noite', 'you': 'você',
        'me': 'mim', 'we': 'nós', 'they': 'eles',
        'our': 'nosso', 'your': 'seu', 'my': 'meu',
        'and': 'e', 'the': 'o/a', 'of': 'de',
        'to': 'para', 'for': 'por', 'with': 'com',
        'on': 'em', 'at': 'em', 'from': 'de', 'by': 'por',
        'morning': 'manhã', 'light': 'luz', 'fire': 'fogo',
        'eyes': 'olhos', 'step': 'passo', 'rain': 'chuva',
        'soul': 'alma', 'journey': 'jornada', 'strong': 'forte',
        'belong': 'pertencer', 'moving': 'se movendo', 'rise': 'levantar',
        'chasing': 'perseguindo', 'darkness': 'escuridão', 'finally': 'finalmente',
        'feeling': 'sentindo', 'whole': 'completo', 'shine': 'brilhar',
        'forward': 'em frente', 'mine': 'meu', 'trust': 'confiança'
    };
    
    return texto.split('\n').map(line => {
        if (line.trim().startsWith('[') || line.trim().startsWith('(') || line.trim().startsWith('"')) {
            return line;
        }
        return line.split(' ').map(word => {
            const clean = word.toLowerCase().replace(/[^a-z]/g, '');
            if (dicionario[clean]) {
                return word.replace(new RegExp(clean, 'i'), dicionario[clean]);
            }
            return word;
        }).join(' ');
    }).join('\n');
}