// ========================================
// SEED INICIAL DE TRILHAS (a partir de dados/trilhas.json)
// ========================================
// Roda apenas na primeiríssima vez que o app é aberto neste navegador,
// ou seja, quando a chave 'trilhasData' nunca foi criada no localStorage.
// Se um admin já apagou todas as trilhas de propósito, 'trilhasData' existe
// como um array vazio "[]" e este seed NÃO roda de novo (respeita a decisão).
async function garantirTrilhasSeed() {
    if (localStorage.getItem('trilhasData') !== null) {
        return;
    }

    try {
        const resp = await fetch('dados/trilhas.json');
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const json = await resp.json();
        const trilhasBrutas = json.trilhas || [];

        const trilhas = trilhasBrutas.map(t => {
            // dados/trilhas.json guarda "estudos" direto na trilha, com um campo
            // "modulo" em texto. O app espera "materias" (grupos de estudos).
            // Aqui agrupamos os estudos pelo texto do módulo, mantendo a ordem.
            const modulos = new Map();
            (t.estudos || []).forEach(estudo => {
                const nomeModulo = estudo.modulo || 'Conteúdo';
                if (!modulos.has(nomeModulo)) modulos.set(nomeModulo, []);
                modulos.get(nomeModulo).push(estudo);
            });

            const materias = Array.from(modulos.entries()).map(([nome, estudos]) => ({
                nome,
                icone: '📘',
                estudos: estudos.slice().sort((a, b) => (a.ordem || 0) - (b.ordem || 0))
            }));

            return {
                titulo: t.titulo,
                descricao: t.descricao,
                nivel: t.nivel,
                icone: t.icone,
                cor: t.cor,
                tags: t.tags,
                duracao: t.duracao,
                materias
            };
        });

        localStorage.setItem('trilhasData', JSON.stringify(trilhas));
    } catch (e) {
        console.error('Não foi possível carregar dados/trilhas.json como conteúdo inicial:', e);
    }
}
