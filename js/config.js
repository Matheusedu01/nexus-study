// ========================================
// CONFIGURAÇÃO DA IA
// ========================================

// 🔑 SUA CHAVE API DO GOOGLE GEMINI
// Gerada em https://aistudio.google.com/apikey (novo formato "AQ....", que substituiu o antigo "AIzaSy...").
// Sem uma chave válida aqui, os recursos de IA usam automaticamente os fallbacks locais/offline.
const GEMINI_API_KEY = 'SUA_CHAVE_AQUI';

// 🚀 MODELO ATUAL (a família 1.5 foi descontinuada pelo Google)
// Trocado de gemini-2.5-flash para gemini-2.0-flash: o 2.5 estava retornando
// 503 "UNAVAILABLE" por alta demanda no momento; o 2.0 costuma ter menos contenção.
const GEMINI_MODEL = 'gemini-2.0-flash';

// URL DA API
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// Verifica se uma chave real foi configurada (não é o placeholder)
function geminiConfigurado() {
    return typeof GEMINI_API_KEY === 'string' && GEMINI_API_KEY && GEMINI_API_KEY !== 'SUA_CHAVE_AQUI';
}

// ========================================
// CONFIGURAÇÃO DO DEEPL (tradução de texto, via proxy)
// ========================================
// A API do DeepL bloqueia chamadas diretas do navegador (CORS) e não permite
// expor a chave em código client-side — por isso a chave NÃO fica aqui, e sim
// como "secret" em um Cloudflare Worker que faz a chamada por trás.
// Código do proxy e passo a passo de implantação: cloudflare-worker/deepl-proxy.js
//
// Depois de implantar o Worker, cole a URL dele aqui embaixo (algo como
// "https://deepl-proxy.seu-usuario.workers.dev").
const DEEPL_PROXY_URL = 'SEU_WORKER_AQUI';

function deeplConfigurado() {
    return typeof DEEPL_PROXY_URL === 'string' && DEEPL_PROXY_URL && DEEPL_PROXY_URL !== 'SEU_WORKER_AQUI';
}

// Traduz um texto (palavra, frase ou letra inteira) do inglês para português do
// Brasil, através do proxy do DeepL. Retorna a string traduzida, ou null se o
// proxy não estiver configurado ou a chamada falhar (quem chamar deve cair pro
// próximo fallback nesse caso).
async function traduzirComDeepL(texto, sourceLang = 'EN', targetLang = 'PT-BR') {
    if (!deeplConfigurado() || !texto || !texto.trim()) return null;

    try {
        const resposta = await fetch(DEEPL_PROXY_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: texto,
                source_lang: sourceLang,
                target_lang: targetLang,
            }),
        });

        if (!resposta.ok) {
            console.error('❌ Proxy do DeepL respondeu com erro HTTP:', resposta.status);
            return null;
        }

        const dados = await resposta.json();
        const traduzido = dados?.translations?.[0]?.text;
        return traduzido ? traduzido.trim() : null;
    } catch (error) {
        console.error('❌ Erro ao chamar o proxy do DeepL:', error);
        return null;
    }
}