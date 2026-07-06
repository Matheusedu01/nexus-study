// ========================================
// AVATAR PIXELADO (8-BIT) — ESTILO RETRATO
// ========================================
// Gera um retrato 8-bit (rosto + ombros, fundo colorido) como SVG puro, sem
// depender de nenhuma imagem externa — tudo é desenhado com retângulos.
// As opções de cabelo/acessório/barba não são amarradas a um "gênero": o
// usuário monta o rosto do jeito que quiser, combinando qualquer estilo com
// qualquer outro.
// Compartilhado entre perfil.html (editor) e js/user-header.js (miniatura
// no cabeçalho).

const AVATAR_OPCOES = {
    fundos: ['#3a86ff', '#ff006e', '#06d6a0', '#8338ec', '#ffd60a', '#00b4d8', '#ff6b6b', '#2b2d42'],
    peles: ['#ffdbac', '#f1c27d', '#e0ac69', '#c68642', '#8d5524', '#4a2c14'],
    cabelos: [
        { id: 'careca', nome: 'Careca' },
        { id: 'curto', nome: 'Curto' },
        { id: 'social', nome: 'Social' },
        { id: 'longo', nome: 'Longo' },
        { id: 'cacheado', nome: 'Cacheado' },
        { id: 'afro', nome: 'Black Power' },
        { id: 'moicano', nome: 'Moicano' },
        { id: 'rabo', nome: 'Rabo de Cavalo' },
        { id: 'coque', nome: 'Coque' },
        { id: 'franja', nome: 'Franja' },
        { id: 'trancas', nome: 'Tranças' },
    ],
    coresCabelo: ['#2c1810', '#5c3a1e', '#8a5a2b', '#d4a017', '#e8e8e8', '#ff6b6b', '#3a86ff', '#8338ec'],
    barbas: [
        { id: 'nenhuma', nome: 'Nenhuma' },
        { id: 'bigode', nome: 'Bigode' },
        { id: 'cavanhaque', nome: 'Cavanhaque' },
        { id: 'completa', nome: 'Completa' },
    ],
    roupaCores: ['#3a86ff', '#ff006e', '#ff6b6b', '#06d6a0', '#8338ec', '#ffd60a', '#00b4d8', '#ffffff'],
    acessorios: [
        { id: 'nenhum', nome: 'Nenhum' },
        { id: 'oculos', nome: 'Óculos' },
        { id: 'oculos-sol', nome: 'Óculos de Sol' },
        { id: 'brincos', nome: 'Brincos' },
        { id: 'bandana', nome: 'Bandana' },
        { id: 'bone', nome: 'Boné' },
    ],
};

const AVATAR_PADRAO = {
    fundo: AVATAR_OPCOES.fundos[0],
    pele: AVATAR_OPCOES.peles[0],
    cabelo: 'curto',
    corCabelo: AVATAR_OPCOES.coresCabelo[0],
    barba: 'nenhuma',
    roupaCor: AVATAR_OPCOES.roupaCores[0],
    acessorio: 'nenhum',
};

function obterAvatarUsuario(email) {
    const salvo = JSON.parse(localStorage.getItem(`avatar_${email}`) || 'null');
    return Object.assign({}, AVATAR_PADRAO, salvo || {});
}

function salvarAvatarUsuario(email, config) {
    localStorage.setItem(`avatar_${email}`, JSON.stringify(config));
}

// Monta o SVG do retrato (viewBox 24x24) a partir da config.
function gerarAvatarSVG(config, tamanho) {
    tamanho = tamanho || 96;
    const cfg = Object.assign({}, AVATAR_PADRAO, config || {});
    const INK = '#05050a';

    const fundo = `<rect x="0" y="-2" width="24" height="26" fill="${cfg.fundo}"/>`;

    const ombros = `<rect x="1" y="19" width="22" height="5" fill="${cfg.roupaCor}"/>`;
    const pescoco = `<rect x="10" y="16.5" width="4" height="3" fill="${cfg.pele}"/>`;

    const orelhas = `<rect x="4.5" y="9" width="2" height="3" fill="${cfg.pele}"/><rect x="17.5" y="9" width="2" height="3" fill="${cfg.pele}"/>`;

    // cabelo desenhado atrás da cabeça (dá volume nas bordas, tipo black power/cacheado)
    let cabeloTras = '';
    if (cfg.cabelo === 'afro') {
        cabeloTras = `<rect x="3" y="1" width="18" height="15" fill="${cfg.corCabelo}"/>`;
    } else if (cfg.cabelo === 'cacheado') {
        cabeloTras = `<rect x="4" y="1.5" width="16" height="13" fill="${cfg.corCabelo}"/><rect x="5" y="0.3" width="3" height="2" fill="${cfg.corCabelo}"/><rect x="10.5" y="0" width="3" height="2" fill="${cfg.corCabelo}"/><rect x="16" y="0.3" width="3" height="2" fill="${cfg.corCabelo}"/>`;
    }

    const cabeca = `<rect x="6" y="3" width="12" height="13" fill="${cfg.pele}"/>`;
    const sombraQueixo = `<rect x="7" y="13.5" width="10" height="2" fill="#000" opacity="0.06"/>`;

    const sobrancelhas = `<rect x="8" y="8.5" width="3" height="0.8" fill="${cfg.corCabelo}"/><rect x="13" y="8.5" width="3" height="0.8" fill="${cfg.corCabelo}"/>`;
    const olhos = `
        <rect x="8" y="10" width="2.2" height="2.2" fill="${INK}"/>
        <rect x="13.8" y="10" width="2.2" height="2.2" fill="${INK}"/>
        <rect x="8.3" y="10.3" width="0.7" height="0.7" fill="#fff"/>
        <rect x="14.1" y="10.3" width="0.7" height="0.7" fill="#fff"/>
    `;
    const nariz = `<rect x="11.7" y="12.5" width="0.6" height="2" fill="#000" opacity="0.15"/>`;
    const boca = `<rect x="9.5" y="15.3" width="5" height="1" fill="#7a3b3b"/>`;

    // cabelo desenhado na frente (topo da cabeça e franjas), varia por estilo
    let cabeloFrente = '';
    if (cfg.cabelo === 'curto') {
        cabeloFrente = `<rect x="6" y="2" width="12" height="3.5" fill="${cfg.corCabelo}"/>`;
    } else if (cfg.cabelo === 'social') {
        cabeloFrente = `<rect x="6" y="2" width="12" height="3" fill="${cfg.corCabelo}"/><rect x="10.5" y="2" width="1" height="3" fill="${cfg.pele}"/>`;
    } else if (cfg.cabelo === 'longo') {
        cabeloFrente = `<rect x="6" y="2" width="12" height="3.5" fill="${cfg.corCabelo}"/><rect x="4.5" y="3" width="2" height="15" fill="${cfg.corCabelo}"/><rect x="17.5" y="3" width="2" height="15" fill="${cfg.corCabelo}"/>`;
    } else if (cfg.cabelo === 'cacheado') {
        cabeloFrente = `<rect x="6" y="2" width="12" height="3" fill="${cfg.corCabelo}"/>`;
    } else if (cfg.cabelo === 'moicano') {
        cabeloFrente = `<rect x="10.5" y="-1" width="3" height="5" fill="${cfg.corCabelo}"/>`;
    } else if (cfg.cabelo === 'rabo') {
        cabeloFrente = `<rect x="7" y="2" width="10" height="2.5" fill="${cfg.corCabelo}"/><rect x="18.5" y="5" width="3" height="7" fill="${cfg.corCabelo}"/>`;
    } else if (cfg.cabelo === 'coque') {
        cabeloFrente = `<rect x="7" y="2" width="10" height="2.5" fill="${cfg.corCabelo}"/><rect x="10" y="-0.5" width="4" height="3" fill="${cfg.corCabelo}"/>`;
    } else if (cfg.cabelo === 'franja') {
        cabeloFrente = `<rect x="6" y="2" width="12" height="2.5" fill="${cfg.corCabelo}"/><rect x="6.5" y="4" width="11" height="2.2" fill="${cfg.corCabelo}"/>`;
    } else if (cfg.cabelo === 'trancas') {
        cabeloFrente = `
            <rect x="6" y="2" width="12" height="3" fill="${cfg.corCabelo}"/>
            <rect x="4.5" y="5" width="2" height="2.2" fill="${cfg.corCabelo}"/>
            <rect x="4.7" y="7.3" width="1.6" height="2" fill="${cfg.corCabelo}"/>
            <rect x="4.5" y="9.4" width="2" height="2.2" fill="${cfg.corCabelo}"/>
            <rect x="17.5" y="5" width="2" height="2.2" fill="${cfg.corCabelo}"/>
            <rect x="17.7" y="7.3" width="1.6" height="2" fill="${cfg.corCabelo}"/>
            <rect x="17.5" y="9.4" width="2" height="2.2" fill="${cfg.corCabelo}"/>
        `;
    }
    // careca: nada

    let barba = '';
    if (cfg.barba === 'bigode') {
        barba = `<rect x="9.5" y="14.3" width="5" height="1" fill="${cfg.corCabelo}"/>`;
    } else if (cfg.barba === 'cavanhaque') {
        barba = `<rect x="9.5" y="14.3" width="5" height="1" fill="${cfg.corCabelo}"/><rect x="10.5" y="16.3" width="3" height="1.3" fill="${cfg.corCabelo}"/>`;
    } else if (cfg.barba === 'completa') {
        barba = `<rect x="9.5" y="14.3" width="5" height="1" fill="${cfg.corCabelo}"/><rect x="7" y="13.8" width="10" height="1" fill="${cfg.corCabelo}"/><rect x="8" y="14.8" width="8" height="2.2" fill="${cfg.corCabelo}"/>`;
    }

    let acessorio = '';
    if (cfg.acessorio === 'oculos') {
        acessorio = `<rect x="7.3" y="9.7" width="3.4" height="2.6" fill="none" stroke="${INK}" stroke-width="0.6"/><rect x="13.3" y="9.7" width="3.4" height="2.6" fill="none" stroke="${INK}" stroke-width="0.6"/><rect x="10.7" y="10.6" width="2.6" height="0.4" fill="${INK}"/>`;
    } else if (cfg.acessorio === 'oculos-sol') {
        acessorio = `<rect x="7.3" y="9.7" width="3.4" height="2.6" fill="${INK}"/><rect x="13.3" y="9.7" width="3.4" height="2.6" fill="${INK}"/><rect x="10.7" y="10.6" width="2.6" height="0.4" fill="${INK}"/>`;
    } else if (cfg.acessorio === 'brincos') {
        acessorio = `<rect x="5" y="12" width="1" height="1" fill="#ffd700"/><rect x="18" y="12" width="1" height="1" fill="#ffd700"/>`;
    } else if (cfg.acessorio === 'bandana') {
        acessorio = `<rect x="5.5" y="4.5" width="13" height="2.2" fill="${cfg.roupaCor}"/><rect x="18.5" y="4.8" width="2" height="1.6" fill="${cfg.roupaCor}"/>`;
    } else if (cfg.acessorio === 'bone') {
        acessorio = `<rect x="5" y="1.5" width="14" height="4" fill="${cfg.roupaCor}"/><rect x="5" y="4.5" width="6" height="1.3" fill="${cfg.roupaCor}"/>`;
    }

    const camadas = [
        fundo, ombros, pescoco, orelhas, cabeloTras, cabeca, sombraQueixo,
        sobrancelhas, olhos, nariz, boca, cabeloFrente, barba, acessorio,
    ].join('');

    return `<svg viewBox="0 -2 24 26" width="${tamanho}" height="${Math.round(tamanho * 26 / 24)}" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">${camadas}</svg>`;
}
