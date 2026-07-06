// ========================================
// AVATAR PIXELADO (8-BIT)
// ========================================
// Gera um "bonequinho" 8-bit simples (cabeça, cabelo, roupa, acessório) como
// SVG, a partir de uma configuração salva por usuário no localStorage. Sem
// depender de nenhuma imagem externa — tudo é desenhado com retângulos.
// Compartilhado entre perfil.html (editor) e qualquer página que mostre o
// avatar no cabeçalho (via js/user-header.js).

const AVATAR_OPCOES = {
    peles: ['#ffdbac', '#f1c27d', '#e0ac69', '#c68642', '#8d5524', '#4a2c14'],
    cabelos: [
        { id: 'careca', nome: 'Careca' },
        { id: 'curto', nome: 'Curto' },
        { id: 'longo', nome: 'Longo' },
        { id: 'moicano', nome: 'Moicano' },
        { id: 'crespo', nome: 'Black Power' },
        { id: 'bone', nome: 'Boné' },
    ],
    coresCabelo: ['#2c1810', '#5c3a1e', '#8a5a2b', '#d4a017', '#e8e8e8', '#ff6b6b', '#3a86ff', '#8338ec'],
    roupas: [
        { id: 'camiseta', nome: 'Camiseta' },
        { id: 'moletom', nome: 'Moletom' },
        { id: 'jaqueta', nome: 'Jaqueta' },
        { id: 'vestido', nome: 'Vestido' },
    ],
    coresRoupa: ['#3a86ff', '#ff006e', '#ff6b6b', '#06d6a0', '#8338ec', '#ffd60a', '#00b4d8', '#ffffff'],
    acessorios: [
        { id: 'nenhum', nome: 'Nenhum' },
        { id: 'oculos', nome: 'Óculos' },
        { id: 'fone', nome: 'Fone' },
    ],
};

const AVATAR_PADRAO = {
    pele: AVATAR_OPCOES.peles[0],
    cabelo: 'curto',
    corCabelo: AVATAR_OPCOES.coresCabelo[0],
    roupa: 'camiseta',
    corRoupa: AVATAR_OPCOES.coresRoupa[0],
    acessorio: 'nenhum',
};

function obterAvatarUsuario(email) {
    const salvo = JSON.parse(localStorage.getItem(`avatar_${email}`) || 'null');
    return Object.assign({}, AVATAR_PADRAO, salvo || {});
}

function salvarAvatarUsuario(email, config) {
    localStorage.setItem(`avatar_${email}`, JSON.stringify(config));
}

// Monta o SVG do bonequinho (viewBox 16x20) a partir da config.
function gerarAvatarSVG(config, tamanho) {
    tamanho = tamanho || 40;
    const cfg = Object.assign({}, AVATAR_PADRAO, config || {});
    const INK = '#05050a';

    let corpo;
    if (cfg.roupa === 'vestido') {
        corpo = `<rect x="3" y="10" width="10" height="4" fill="${cfg.corRoupa}"/><rect x="1" y="14" width="14" height="3" fill="${cfg.corRoupa}"/>`;
    } else if (cfg.roupa === 'moletom') {
        corpo = `<rect x="2" y="10" width="12" height="7" fill="${cfg.corRoupa}"/><rect x="3" y="9" width="2" height="2" fill="${cfg.corRoupa}"/><rect x="11" y="9" width="2" height="2" fill="${cfg.corRoupa}"/>`;
    } else if (cfg.roupa === 'jaqueta') {
        corpo = `<rect x="2" y="10" width="12" height="7" fill="${cfg.corRoupa}"/><rect x="7.5" y="10" width="1" height="7" fill="${INK}" opacity="0.35"/>`;
    } else {
        corpo = `<rect x="2" y="10" width="12" height="7" fill="${cfg.corRoupa}"/>`;
    }

    let cabeloTras = '';
    if (cfg.cabelo === 'crespo') {
        cabeloTras = `<rect x="2" y="1" width="12" height="9" fill="${cfg.corCabelo}"/>`;
    }

    const cabeca = `<rect x="4" y="3" width="8" height="7" fill="${cfg.pele}"/>`;
    const olhos = `<rect x="6" y="6" width="1" height="1" fill="${INK}"/><rect x="9" y="6" width="1" height="1" fill="${INK}"/>`;

    let cabeloFrente = '';
    if (cfg.cabelo === 'curto') {
        cabeloFrente = `<rect x="4" y="2" width="8" height="2" fill="${cfg.corCabelo}"/>`;
    } else if (cfg.cabelo === 'longo') {
        cabeloFrente = `<rect x="4" y="2" width="8" height="2" fill="${cfg.corCabelo}"/><rect x="3" y="4" width="1" height="6" fill="${cfg.corCabelo}"/><rect x="12" y="4" width="1" height="6" fill="${cfg.corCabelo}"/>`;
    } else if (cfg.cabelo === 'moicano') {
        cabeloFrente = `<rect x="7" y="0" width="2" height="4" fill="${cfg.corCabelo}"/>`;
    } else if (cfg.cabelo === 'bone') {
        cabeloFrente = `<rect x="3" y="1" width="10" height="3" fill="${cfg.corCabelo}"/><rect x="3" y="3" width="4" height="1" fill="${cfg.corCabelo}"/>`;
    }

    let acessorio = '';
    if (cfg.acessorio === 'oculos') {
        acessorio = `<rect x="5" y="5.3" width="3" height="2" fill="none" stroke="${INK}" stroke-width="0.5"/><rect x="8" y="5.3" width="3" height="2" fill="none" stroke="${INK}" stroke-width="0.5"/><rect x="8" y="6.1" width="1" height="0.4" fill="${INK}"/>`;
    } else if (cfg.acessorio === 'fone') {
        acessorio = `<rect x="4" y="2" width="8" height="1" fill="#23233a"/><rect x="2.3" y="4" width="1.7" height="3" fill="#23233a"/><rect x="12" y="4" width="1.7" height="3" fill="#23233a"/>`;
    }

    return `<svg viewBox="0 0 16 20" width="${tamanho}" height="${Math.round(tamanho * 1.25)}" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">${corpo}${cabeloTras}${cabeca}${olhos}${cabeloFrente}${acessorio}</svg>`;
}
