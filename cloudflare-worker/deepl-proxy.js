// ========================================
// PROXY DO DEEPL (Cloudflare Worker)
// ========================================
// Por que isso existe: a API do DeepL bloqueia chamadas feitas direto do
// navegador (CORS) e não permite expor a chave em código client-side. Este
// Worker fica no meio: seu site (estático, sem backend) chama ESTE endereço,
// e é o Worker quem chama o DeepL de verdade, com a chave guardada em
// segredo do lado do servidor.
//
// COMO IMPLANTAR (sem precisar instalar nada no computador):
// 1. Crie uma conta gratuita em https://dash.cloudflare.com/sign-up
// 2. No painel, vá em "Workers e Pages" → "Criar" → "Criar Worker".
// 3. Dê um nome (ex.: "deepl-proxy") e clique em "Implantar" pra criar o
//    esqueleto padrão.
// 4. Clique em "Editar código" e SUBSTITUA todo o conteúdo pelo código
//    deste arquivo. Clique em "Implantar" de novo pra salvar.
// 5. Vá em "Configurações" → "Variáveis e Secrets" desse Worker → "Adicionar"
//    → nome "DEEPL_API_KEY", valor = sua chave do DeepL (a que termina em
//    ":fx"), tipo "Secret" (criptografado). Salve.
// 6. Copie a URL do Worker (algo como
//    https://deepl-proxy.SEU-USUARIO.workers.dev) e cole em
//    DEEPL_PROXY_URL no arquivo js/config.js do site.
//
// O plano gratuito da Cloudflare cobre 100.000 requisições/dia — muito mais
// do que um tradutor de estudos individual vai usar.

export default {
    async fetch(request, env) {
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        // Requisição de pré-checagem do CORS
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        if (request.method !== 'POST') {
            return new Response(JSON.stringify({ error: 'Use o método POST.' }), {
                status: 405,
                headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
        }

        if (!env.DEEPL_API_KEY) {
            return new Response(JSON.stringify({ error: 'DEEPL_API_KEY não configurada nas variáveis do Worker.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
        }

        let corpo;
        try {
            corpo = await request.json();
        } catch {
            return new Response(JSON.stringify({ error: 'Corpo da requisição precisa ser JSON.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
        }

        const { text, source_lang, target_lang } = corpo;
        if (!text) {
            return new Response(JSON.stringify({ error: 'Campo "text" é obrigatório.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
        }

        const chave = env.DEEPL_API_KEY.trim();
        const urlDeepL = chave.endsWith(':fx')
            ? 'https://api-free.deepl.com/v2/translate'
            : 'https://api.deepl.com/v2/translate';

        try {
            const respostaDeepL = await fetch(urlDeepL, {
                method: 'POST',
                headers: {
                    'Authorization': `DeepL-Auth-Key ${chave}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    text,
                    source_lang: source_lang || 'EN',
                    target_lang: target_lang || 'PT-BR',
                }),
            });

            const dados = await respostaDeepL.json();

            return new Response(JSON.stringify(dados), {
                status: respostaDeepL.status,
                headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
        } catch (erro) {
            return new Response(JSON.stringify({ error: erro.message }), {
                status: 502,
                headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
        }
    },
};
