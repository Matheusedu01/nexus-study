// ========================================
// AVATAR PIXELADO (8-BIT) — PERSONAGENS PRONTOS
// ========================================
// Em vez de montar o rosto por peças soltas (o que ficava sem graça em
// muitas combinações), aqui tem um conjunto fixo de personagens já prontos,
// cada um com cores e sombreado ajustados à mão — o usuário escolhe um dos
// prontos, não monta por partes. Tudo continua sendo SVG puro (retângulos),
// sem depender de nenhuma imagem externa.
// Compartilhado entre perfil.html (galeria de escolha) e js/user-header.js
// (miniatura no cabeçalho).

const INK = '#05050a';

function camadaFundo(cor) {
    return `<rect x="0" y="-6" width="24" height="30" fill="${cor}"/>`;
}

function camadaOmbros(cor) {
    return `<rect x="1" y="19" width="22" height="5" fill="${cor}"/>`;
}

function camadaPescoco(pele) {
    return `<rect x="10" y="16.5" width="4" height="3" fill="${pele}"/>`;
}

function camadaOrelhas(pele) {
    return `<rect x="4.5" y="9" width="2" height="3" fill="${pele}"/><rect x="17.5" y="9" width="2" height="3" fill="${pele}"/>`;
}

function camadaCabeca(pele) {
    return `<rect x="6" y="3" width="12" height="13" fill="${pele}"/><rect x="7" y="13.5" width="10" height="2" fill="#000" opacity="0.06"/>`;
}

function camadaOlhos(corSobrancelha) {
    return `
        <rect x="8" y="8.5" width="3" height="0.8" fill="${corSobrancelha}"/><rect x="13" y="8.5" width="3" height="0.8" fill="${corSobrancelha}"/>
        <rect x="8" y="10" width="2.2" height="2.2" fill="${INK}"/>
        <rect x="13.8" y="10" width="2.2" height="2.2" fill="${INK}"/>
        <rect x="8.3" y="10.3" width="0.7" height="0.7" fill="#fff"/>
        <rect x="14.1" y="10.3" width="0.7" height="0.7" fill="#fff"/>
        <rect x="11.7" y="12.5" width="0.6" height="2" fill="#000" opacity="0.15"/>
    `;
}

function camadaBoca(cor) {
    return `<rect x="9.5" y="15.3" width="5" height="1" fill="${cor || '#7a3b3b'}"/>`;
}

function montarSVG(camadas, tamanho) {
    tamanho = tamanho || 96;
    return `<svg viewBox="0 -6 24 30" width="${tamanho}" height="${Math.round(tamanho * 30 / 24)}" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">${camadas.join('')}</svg>`;
}

const PERSONAGENS = [
    {
        id: 'zumbi',
        nome: 'Zumbi',
        fundo: '#14281f',
        camadas() {
            const pele = '#8bc98b';
            return [
                camadaFundo(this.fundo),
                camadaOmbros('#5a5a5a'),
                camadaPescoco(pele),
                camadaOrelhas(pele),
                camadaCabeca(pele),
                `<rect x="8" y="6.3" width="4" height="0.5" fill="#2c1810"/>`,
                camadaOlhos('#1c1c1c'),
                camadaBoca('#3d1f1f'),
                `<rect x="6" y="1.4" width="3" height="2" fill="#1c1c1c"/><rect x="9" y="0.9" width="3" height="2.4" fill="#1c1c1c"/><rect x="13" y="1.1" width="3" height="2.1" fill="#1c1c1c"/><rect x="16" y="1.6" width="2.2" height="1.7" fill="#1c1c1c"/>`,
            ];
        },
    },
    {
        id: 'policial',
        nome: 'Policial',
        fundo: '#22577a',
        camadas() {
            const pele = '#f1c27d';
            return [
                camadaFundo(this.fundo),
                camadaOmbros('#1b263b'),
                camadaPescoco(pele),
                camadaOrelhas(pele),
                camadaCabeca(pele),
                camadaOlhos('#2c1810'),
                camadaBoca(),
                `<rect x="10" y="19" width="4" height="1" fill="#fff"/>`,
                `<rect x="5" y="1.5" width="14" height="4" fill="#1b263b"/><rect x="5" y="4.5" width="14" height="1" fill="#0d1321"/><rect x="11" y="2.3" width="2" height="1.5" fill="#ffd700"/>`,
            ];
        },
    },
    {
        id: 'bombeiro',
        nome: 'Bombeiro',
        fundo: '#780000',
        camadas() {
            const pele = '#e0ac69';
            return [
                camadaFundo(this.fundo),
                camadaOmbros('#ffb703'),
                camadaPescoco(pele),
                camadaOrelhas(pele),
                camadaCabeca(pele),
                camadaOlhos('#4a2c14'),
                camadaBoca(),
                `<rect x="9" y="14.2" width="6" height="1" fill="#4a2c14"/>`,
                `<rect x="5" y="1" width="14" height="4.5" fill="#c1121f"/><rect x="4.5" y="4.5" width="15" height="1.2" fill="#780000"/><rect x="10.5" y="2" width="3" height="2" fill="#fff"/>`,
            ];
        },
    },
    {
        id: 'papai-noel',
        nome: 'Papai Noel',
        fundo: '#1b4332',
        camadas() {
            const pele = '#f1c27d';
            return [
                camadaFundo(this.fundo),
                camadaOmbros('#c1121f'),
                `<rect x="1" y="19" width="22" height="1" fill="#fff"/>`,
                camadaPescoco(pele),
                camadaOrelhas(pele),
                camadaCabeca(pele),
                camadaOlhos('#f5f5f5'),
                camadaBoca('#a4433a'),
                `<rect x="9.5" y="14.2" width="5" height="1" fill="#f5f5f5"/><rect x="7" y="13.6" width="10" height="1" fill="#f5f5f5"/><rect x="8" y="14.6" width="8" height="2.4" fill="#f5f5f5"/>`,
                `<rect x="6" y="0.5" width="12" height="2.8" fill="#c1121f"/><rect x="5.5" y="2.8" width="13" height="1.4" fill="#f5f5f5"/><rect x="16.5" y="-1.8" width="2.6" height="2.6" fill="#f5f5f5"/>`,
            ];
        },
    },
    {
        id: 'astronauta',
        nome: 'Astronauta',
        fundo: '#03071e',
        camadas() {
            const pele = '#f1c27d';
            return [
                camadaFundo(this.fundo),
                `<rect x="4" y="14" width="1" height="1" fill="#fff"/><rect x="20" y="6" width="1" height="1" fill="#fff"/><rect x="19" y="18" width="0.8" height="0.8" fill="#fff"/>`,
                camadaOmbros('#e8e8e8'),
                camadaPescoco(pele),
                `<rect x="4" y="1" width="16" height="16" fill="#e8e8e8"/>`,
                camadaOrelhas(pele),
                camadaCabeca(pele),
                camadaOlhos('#4a2c14'),
                camadaBoca(),
                `<rect x="6" y="3" width="12" height="10" fill="#48cae4" opacity="0.32"/>`,
                `<rect x="17" y="1.5" width="1.4" height="1.4" fill="#e63946"/>`,
            ];
        },
    },
    {
        id: 'pirata',
        nome: 'Pirata',
        fundo: '#023047',
        camadas() {
            const pele = '#c68642';
            return [
                camadaFundo(this.fundo),
                camadaOmbros('#3d2b1f'),
                camadaPescoco(pele),
                camadaOrelhas(pele),
                camadaCabeca(pele),
                camadaOlhos('#2c1810'),
                camadaBoca(),
                `<rect x="9" y="14.3" width="5" height="1" fill="#2c1810"/><rect x="7" y="13.8" width="10" height="1" fill="#2c1810"/><rect x="8" y="14.8" width="8" height="2.2" fill="#2c1810"/>`,
                `<rect x="6" y="2" width="12" height="3" fill="#9d0208"/>`,
                `<rect x="6" y="10.4" width="14" height="0.6" fill="${INK}"/><rect x="13.6" y="9.8" width="2.6" height="2.6" fill="${INK}"/>`,
                `<rect x="18" y="12" width="1" height="1" fill="#ffd700"/>`,
            ];
        },
    },
    {
        id: 'robo',
        nome: 'Robô',
        fundo: '#3c096c',
        camadas() {
            const metal = '#adb5bd';
            return [
                camadaFundo(this.fundo),
                camadaOmbros('#495057'),
                `<rect x="11" y="20.3" width="2" height="1.4" fill="#00f5d4"/>`,
                `<rect x="10" y="16.5" width="4" height="3" fill="${metal}"/>`,
                `<rect x="4.5" y="9" width="2" height="3" fill="${metal}"/><rect x="17.5" y="9" width="2" height="3" fill="${metal}"/>`,
                `<rect x="6" y="3" width="12" height="13" fill="${metal}"/><rect x="6" y="8" width="12" height="0.4" fill="#495057"/>`,
                `<rect x="8" y="10" width="2.2" height="2.2" fill="#00f5d4"/><rect x="13.8" y="10" width="2.2" height="2.2" fill="#00f5d4"/>`,
                `<rect x="9.5" y="15" width="0.6" height="1.4" fill="#495057"/><rect x="11.5" y="15" width="0.6" height="1.4" fill="#495057"/><rect x="13.5" y="15" width="0.6" height="1.4" fill="#495057"/>`,
                `<rect x="11.5" y="-1.5" width="1" height="3.5" fill="#495057"/><rect x="11" y="-2.3" width="2" height="1.6" fill="#e63946"/>`,
            ];
        },
    },
    {
        id: 'bruxa',
        nome: 'Bruxa',
        fundo: '#240046',
        camadas() {
            const pele = '#f1c27d';
            return [
                camadaFundo(this.fundo),
                camadaOmbros('#3d2b56'),
                camadaPescoco(pele),
                `<rect x="4" y="3" width="2" height="14" fill="#1c1c1c"/><rect x="18" y="3" width="2" height="14" fill="#1c1c1c"/>`,
                camadaOrelhas(pele),
                camadaCabeca(pele),
                camadaOlhos('#1c1c1c'),
                camadaBoca('#5a2d5a'),
                `<rect x="13" y="13" width="0.7" height="0.7" fill="#4a2c14"/>`,
                `<rect x="6" y="2" width="12" height="2" fill="#1c1c1c"/>`,
                `<rect x="5" y="1.3" width="14" height="1.4" fill="#2b2118"/><rect x="6" y="1" width="12" height="0.7" fill="#ffd700"/><rect x="9" y="-2" width="6" height="1.6" fill="#3d2b56"/><rect x="9.7" y="-3.4" width="4.6" height="1.5" fill="#3d2b56"/><rect x="10.4" y="-4.6" width="3.2" height="1.3" fill="#3d2b56"/><rect x="11.1" y="-5.6" width="1.8" height="1.1" fill="#3d2b56"/>`,
            ];
        },
    },
    {
        id: 'cientista',
        nome: 'Cientista',
        fundo: '#0077b6',
        camadas() {
            const pele = '#f1c27d';
            return [
                camadaFundo(this.fundo),
                camadaOmbros('#f8f9fa'),
                `<rect x="9" y="19" width="2" height="2" fill="#e9ecef"/><rect x="13" y="19" width="2" height="2" fill="#e9ecef"/>`,
                camadaPescoco(pele),
                camadaOrelhas(pele),
                camadaCabeca(pele),
                camadaOlhos('#d9d9d9'),
                camadaBoca(),
                `<rect x="7.3" y="9.7" width="3.4" height="2.6" fill="none" stroke="${INK}" stroke-width="0.6"/><rect x="13.3" y="9.7" width="3.4" height="2.6" fill="none" stroke="${INK}" stroke-width="0.6"/><rect x="10.7" y="10.6" width="2.6" height="0.4" fill="${INK}"/>`,
                `<rect x="6" y="0.8" width="3" height="3" fill="#d9d9d9"/><rect x="9.3" y="0.2" width="3" height="3.6" fill="#d9d9d9"/><rect x="13" y="0.5" width="3" height="3.3" fill="#d9d9d9"/><rect x="16" y="1.1" width="2.3" height="2.6" fill="#d9d9d9"/>`,
            ];
        },
    },
    {
        id: 'ninja',
        nome: 'Ninja',
        fundo: '#212529',
        camadas() {
            const pele = '#e0ac69';
            return [
                camadaFundo(this.fundo),
                camadaOmbros(INK),
                `<rect x="1" y="19" width="22" height="0.8" fill="#9d0208"/>`,
                camadaPescoco(pele),
                camadaOrelhas(pele),
                camadaCabeca(pele),
                `<rect x="8" y="10" width="2.2" height="2.2" fill="${INK}"/><rect x="13.8" y="10" width="2.2" height="2.2" fill="${INK}"/><rect x="8.3" y="10.3" width="0.7" height="0.7" fill="#fff"/><rect x="14.1" y="10.3" width="0.7" height="0.7" fill="#fff"/>`,
                `<rect x="6.5" y="12.3" width="11" height="4" fill="${INK}"/>`,
                `<rect x="6" y="6.3" width="12" height="2" fill="${INK}"/><rect x="17.5" y="6.6" width="2.5" height="1.2" fill="${INK}"/>`,
            ];
        },
    },
    {
        id: 'rainha',
        nome: 'Rainha',
        fundo: '#ff70a6',
        camadas() {
            const pele = '#ffdbac';
            return [
                camadaFundo(this.fundo),
                camadaOmbros('#7b2cbf'),
                camadaPescoco(pele),
                `<rect x="4.5" y="3" width="2" height="14" fill="#e9c46a"/><rect x="17.5" y="3" width="2" height="14" fill="#e9c46a"/>`,
                camadaOrelhas(pele),
                camadaCabeca(pele),
                camadaOlhos('#8a5a2b'),
                camadaBoca('#c9184a'),
                `<rect x="9" y="16.9" width="6" height="1" fill="#ffd700"/><rect x="11" y="17" width="1" height="1" fill="#e63946"/>`,
                `<rect x="6" y="2" width="12" height="2" fill="#e9c46a"/>`,
                `<rect x="7" y="1.4" width="10" height="1.3" fill="#ffd700"/><rect x="8" y="-0.4" width="1.3" height="2" fill="#ffd700"/><rect x="10.6" y="-1.1" width="1.5" height="2.7" fill="#ffd700"/><rect x="13.3" y="-0.4" width="1.3" height="2" fill="#ffd700"/><rect x="10.7" y="0.1" width="1.5" height="1.3" fill="#e63946"/>`,
            ];
        },
    },
    {
        id: 'rei',
        nome: 'Rei',
        fundo: '#6a040f',
        camadas() {
            const pele = '#e0ac69';
            return [
                camadaFundo(this.fundo),
                camadaOmbros('#9d0208'),
                `<rect x="1" y="19" width="22" height="0.7" fill="#ffd700"/>`,
                camadaPescoco(pele),
                camadaOrelhas(pele),
                camadaCabeca(pele),
                camadaOlhos('#4a2c14'),
                camadaBoca(),
                `<rect x="9" y="14.3" width="5" height="1" fill="#5c3a1e"/><rect x="7.5" y="13.9" width="9" height="0.9" fill="#5c3a1e"/><rect x="8.3" y="14.9" width="7.3" height="2" fill="#5c3a1e"/>`,
                `<rect x="6" y="2" width="12" height="1" fill="#5c3a1e"/>`,
                `<rect x="6.5" y="1.4" width="11" height="1.4" fill="#ffd700"/><rect x="7.5" y="-0.5" width="1.4" height="2.2" fill="#ffd700"/><rect x="10.6" y="-0.8" width="1.6" height="2.5" fill="#ffd700"/><rect x="14" y="-0.5" width="1.4" height="2.2" fill="#ffd700"/><rect x="10.7" y="0" width="1.5" height="1.2" fill="#2a9d8f"/>`,
            ];
        },
    },
    {
        id: 'alien',
        nome: 'Alienígena',
        fundo: '#b5e48c',
        camadas() {
            const pele = '#7ed957';
            return [
                camadaFundo(this.fundo),
                camadaOmbros('#7209b7'),
                `<rect x="10.5" y="16.8" width="3" height="2.7" fill="${pele}"/>`,
                `<rect x="5" y="9.3" width="1.6" height="2.6" fill="${pele}"/><rect x="17.4" y="9.3" width="1.6" height="2.6" fill="${pele}"/>`,
                `<rect x="6.5" y="2" width="11" height="13.5" fill="${pele}"/>`,
                `<rect x="7.3" y="9" width="4" height="3.6" fill="${INK}"/><rect x="12.7" y="9" width="4" height="3.6" fill="${INK}"/>`,
                `<rect x="10.5" y="15" width="3" height="0.5" fill="#3d5a3d"/>`,
            ];
        },
    },
    {
        id: 'vampiro',
        nome: 'Vampiro',
        fundo: '#1a0000',
        camadas() {
            const pele = '#f4e4d4';
            return [
                camadaFundo(this.fundo),
                camadaOmbros('#0d0d0d'),
                `<rect x="8.3" y="15" width="2" height="3.5" fill="#6a0400"/><rect x="13.7" y="15" width="2" height="3.5" fill="#6a0400"/>`,
                camadaPescoco(pele),
                camadaOrelhas(pele),
                camadaCabeca(pele),
                camadaOlhos('#0d0d0d'),
                `<rect x="9.5" y="15.3" width="5" height="1" fill="#6a0400"/><rect x="10" y="16.2" width="0.7" height="1" fill="#fff"/><rect x="13.3" y="16.2" width="0.7" height="1" fill="#fff"/>`,
                `<rect x="6" y="2" width="12" height="3" fill="#0d0d0d"/><rect x="10.8" y="4.5" width="2.4" height="1.3" fill="#0d0d0d"/>`,
            ];
        },
    },
    {
        id: 'roqueiro',
        nome: 'Roqueiro',
        fundo: '#fb8500',
        camadas() {
            const pele = '#e0ac69';
            return [
                camadaFundo(this.fundo),
                camadaOmbros('#1c1c1c'),
                `<rect x="4" y="20" width="1" height="1" fill="#adb5bd"/><rect x="19" y="20" width="1" height="1" fill="#adb5bd"/>`,
                camadaPescoco(pele),
                camadaOrelhas(pele),
                camadaCabeca(pele),
                camadaBoca(),
                `<rect x="7.3" y="9.7" width="3.4" height="2.6" fill="${INK}"/><rect x="13.3" y="9.7" width="3.4" height="2.6" fill="${INK}"/><rect x="10.7" y="10.6" width="2.6" height="0.4" fill="${INK}"/>`,
                `<rect x="10.5" y="-1.6" width="3" height="5.6" fill="#ff006e"/>`,
            ];
        },
    },
    {
        id: 'medica',
        nome: 'Médica(o)',
        fundo: '#8ecae6',
        camadas() {
            const pele = '#ffdbac';
            return [
                camadaFundo(this.fundo),
                camadaOmbros('#f8f9fa'),
                `<rect x="9" y="19" width="2" height="2" fill="#e9ecef"/><rect x="13" y="19" width="2" height="2" fill="#e9ecef"/>`,
                `<rect x="9.5" y="17" width="1" height="2.6" fill="#212529"/><rect x="13.5" y="17" width="1" height="2.6" fill="#212529"/><rect x="10.5" y="19.2" width="3" height="1" fill="#212529"/><rect x="11.3" y="20" width="1.4" height="1.4" fill="#adb5bd"/>`,
                camadaPescoco(pele),
                camadaOrelhas(pele),
                camadaCabeca(pele),
                camadaOlhos('#5c3a1e'),
                camadaBoca(),
                `<rect x="7" y="2" width="10" height="2.5" fill="#3d2b1f"/><rect x="10" y="-0.3" width="4" height="2.8" fill="#3d2b1f"/>`,
            ];
        },
    },
    {
        id: 'fantasma',
        nome: 'Fantasma',
        fundo: '#1b1035',
        camadas() {
            const branco = '#f5f5f5';
            return [
                camadaFundo(this.fundo),
                `<rect x="1" y="13" width="22" height="10" fill="${branco}"/>`,
                `<rect x="3" y="22.3" width="2" height="1.7" fill="${this.fundo}"/><rect x="8" y="22.8" width="2" height="1.2" fill="${this.fundo}"/><rect x="13" y="22.3" width="2" height="1.7" fill="${this.fundo}"/><rect x="18" y="22.8" width="2" height="1.2" fill="${this.fundo}"/>`,
                `<rect x="6" y="3" width="12" height="10.5" fill="${branco}"/>`,
                `<rect x="8.2" y="9.3" width="1.9" height="2.6" fill="${INK}"/><rect x="13.9" y="9.3" width="1.9" height="2.6" fill="${INK}"/>`,
                `<rect x="10.6" y="12.6" width="2.8" height="1.8" fill="${INK}"/>`,
            ];
        },
    },
    {
        id: 'esqueleto',
        nome: 'Esqueleto',
        fundo: '#0a0a0a',
        camadas() {
            const osso = '#ece9e1';
            return [
                camadaFundo(this.fundo),
                `<rect x="1" y="19" width="22" height="5" fill="${INK}"/><rect x="8" y="20" width="8" height="0.5" fill="${osso}"/><rect x="8" y="21.2" width="8" height="0.5" fill="${osso}"/>`,
                camadaPescoco(osso),
                camadaCabeca(osso),
                `<rect x="7.6" y="9.3" width="3" height="3" fill="${INK}"/><rect x="13.4" y="9.3" width="3" height="3" fill="${INK}"/>`,
                `<rect x="10.8" y="12.6" width="2.4" height="1.6" fill="${INK}"/>`,
                `<rect x="8" y="14.8" width="8" height="1.6" fill="${INK}"/><rect x="8.3" y="14.8" width="0.5" height="1.6" fill="${osso}"/><rect x="9.5" y="14.8" width="0.5" height="1.6" fill="${osso}"/><rect x="10.7" y="14.8" width="0.5" height="1.6" fill="${osso}"/><rect x="11.9" y="14.8" width="0.5" height="1.6" fill="${osso}"/><rect x="13.1" y="14.8" width="0.5" height="1.6" fill="${osso}"/><rect x="14.3" y="14.8" width="0.5" height="1.6" fill="${osso}"/><rect x="15.2" y="14.8" width="0.5" height="1.6" fill="${osso}"/>`,
            ];
        },
    },
    {
        id: 'chef',
        nome: 'Chef',
        fundo: '#e76f51',
        camadas() {
            const pele = '#f1c27d';
            return [
                camadaFundo(this.fundo),
                camadaOmbros('#f8f9fa'),
                `<rect x="9.3" y="19" width="1" height="2.4" fill="#e9ecef"/><rect x="10.9" y="19" width="1" height="2.4" fill="#e9ecef"/><rect x="12.5" y="19" width="1" height="2.4" fill="#e9ecef"/>`,
                camadaPescoco(pele),
                camadaOrelhas(pele),
                camadaCabeca(pele),
                camadaOlhos('#4a2c14'),
                `<rect x="9.5" y="14.3" width="5" height="1" fill="#4a2c14"/>`,
                camadaBoca(),
                `<rect x="6.5" y="1.6" width="11" height="1.6" fill="#fff"/><rect x="7" y="-2.6" width="10" height="4.4" fill="#fff"/>`,
            ];
        },
    },
    {
        id: 'professor',
        nome: 'Professor(a)',
        fundo: '#606c38',
        camadas() {
            const pele = '#e0ac69';
            return [
                camadaFundo(this.fundo),
                camadaOmbros('#6c584c'),
                `<rect x="10.8" y="19" width="2.4" height="4" fill="#6a040f"/>`,
                camadaPescoco(pele),
                camadaOrelhas(pele),
                camadaCabeca(pele),
                camadaOlhos('#4a2c14'),
                camadaBoca(),
                `<rect x="7.3" y="9.7" width="3.4" height="2.6" fill="none" stroke="${INK}" stroke-width="0.6"/><rect x="13.3" y="9.7" width="3.4" height="2.6" fill="none" stroke="${INK}" stroke-width="0.6"/><rect x="10.7" y="10.6" width="2.6" height="0.4" fill="${INK}"/>`,
                `<rect x="6" y="2" width="12" height="3" fill="#4a2c14"/><rect x="10.5" y="2" width="1" height="3" fill="${pele}"/>`,
            ];
        },
    },
    {
        id: 'mago',
        nome: 'Mago',
        fundo: '#3a0ca3',
        camadas() {
            const pele = '#e0ac69';
            return [
                camadaFundo(this.fundo),
                camadaOmbros('#1d3557'),
                camadaPescoco(pele),
                camadaOrelhas(pele),
                camadaCabeca(pele),
                camadaOlhos('#4a2c14'),
                `<rect x="9.5" y="15.3" width="5" height="1" fill="#e9ecef"/><rect x="7" y="13.9" width="10" height="0.9" fill="#e9ecef"/><rect x="7.5" y="14.9" width="9" height="4.5" fill="#e9ecef"/>`,
                `<rect x="6" y="2" width="12" height="1.6" fill="#e9ecef"/>`,
                `<rect x="5" y="1.3" width="14" height="1.3" fill="#7209b7"/><rect x="9" y="-2" width="6" height="1.6" fill="#1d3557"/><rect x="9.7" y="-3.4" width="4.6" height="1.5" fill="#1d3557"/><rect x="10.4" y="-4.6" width="3.2" height="1.3" fill="#1d3557"/><rect x="11.1" y="-5.6" width="1.8" height="1.1" fill="#1d3557"/>`,
                `<rect x="7" y="0.5" width="0.8" height="0.8" fill="#ffd700"/><rect x="15.5" y="1.5" width="0.8" height="0.8" fill="#ffd700"/><rect x="11.5" y="-3" width="0.8" height="0.8" fill="#ffd700"/>`,
            ];
        },
    },
    {
        id: 'super-heroi',
        nome: 'Super-herói',
        fundo: '#0466c8',
        camadas() {
            const pele = '#f1c27d';
            return [
                camadaFundo(this.fundo),
                camadaOmbros('#d00000'),
                `<rect x="10.5" y="20" width="3" height="2.6" fill="#ffd700"/>`,
                camadaPescoco(pele),
                camadaOrelhas(pele),
                camadaCabeca(pele),
                `<rect x="6" y="2" width="12" height="3.5" fill="#1c1c1c"/>`,
                camadaBoca(),
                `<rect x="7" y="8.7" width="4.4" height="3.2" fill="#d00000"/><rect x="12.6" y="8.7" width="4.4" height="3.2" fill="#d00000"/><rect x="11.4" y="9.8" width="1.2" height="0.5" fill="#d00000"/>`,
                `<rect x="8" y="10" width="0.9" height="0.9" fill="#fff"/><rect x="14.5" y="10" width="0.9" height="0.9" fill="#fff"/>`,
            ];
        },
    },
    {
        id: 'vilao',
        nome: 'Vilão(ã)',
        fundo: '#001219',
        camadas() {
            const pele = '#e0ac69';
            return [
                camadaFundo(this.fundo),
                `<rect x="8.5" y="15" width="2" height="4" fill="#3c096c"/><rect x="13.5" y="15" width="2" height="4" fill="#3c096c"/>`,
                camadaOmbros('#240046'),
                camadaPescoco(pele),
                camadaOrelhas(pele),
                camadaCabeca(pele),
                `<rect x="12.8" y="11.5" width="0.5" height="2.4" fill="#8a5a2b" opacity="0.7"/>`,
                camadaOlhos('#1c1c1c'),
                camadaBoca('#5a1a1a'),
                `<rect x="6" y="2" width="12" height="3.5" fill="#1c1c1c"/><rect x="4.5" y="3" width="1.5" height="8" fill="#1c1c1c"/><rect x="18" y="3" width="1.5" height="8" fill="#1c1c1c"/>`,
            ];
        },
    },
    {
        id: 'palhaco',
        nome: 'Palhaço(a)',
        fundo: '#f72585',
        camadas() {
            const pele = '#fdf0f5';
            return [
                camadaFundo(this.fundo),
                camadaOmbros('#ffd60a'),
                `<rect x="2" y="19.3" width="2" height="2" fill="#06d6a0"/><rect x="5.5" y="19.3" width="2" height="2" fill="#f72585"/><rect x="9" y="19.3" width="2" height="2" fill="#06d6a0"/><rect x="13" y="19.3" width="2" height="2" fill="#f72585"/><rect x="16.5" y="19.3" width="2" height="2" fill="#06d6a0"/><rect x="20" y="19.3" width="2" height="2" fill="#f72585"/>`,
                camadaPescoco(pele),
                camadaOrelhas(pele),
                camadaCabeca(pele),
                `<rect x="8" y="8.5" width="3" height="0.8" fill="#1c1c1c"/><rect x="13" y="8.5" width="3" height="0.8" fill="#1c1c1c"/>`,
                `<rect x="8" y="10" width="2.2" height="2.2" fill="${INK}"/><rect x="13.8" y="10" width="2.2" height="2.2" fill="${INK}"/><rect x="8.3" y="10.3" width="0.7" height="0.7" fill="#fff"/><rect x="14.1" y="10.3" width="0.7" height="0.7" fill="#fff"/>`,
                `<rect x="8.5" y="15" width="7" height="1.6" fill="#d00000"/>`,
                `<rect x="10.9" y="12.2" width="2.2" height="2.2" fill="#d00000"/>`,
                `<rect x="6" y="1" width="3" height="2.6" fill="#06d6a0"/><rect x="9.3" y="0.4" width="3" height="3.2" fill="#ffd60a"/><rect x="13" y="0.6" width="3" height="2.9" fill="#00b4d8"/><rect x="16" y="1.2" width="2.3" height="2.3" fill="#06d6a0"/>`,
            ];
        },
    },
    {
        id: 'detetive',
        nome: 'Detetive',
        fundo: '#495057',
        camadas() {
            const pele = '#f1c27d';
            return [
                camadaFundo(this.fundo),
                camadaOmbros('#c9a66b'),
                camadaPescoco(pele),
                camadaOrelhas(pele),
                camadaCabeca(pele),
                camadaOlhos('#4a2c14'),
                `<rect x="9.5" y="14.3" width="5" height="1" fill="#4a2c14"/>`,
                camadaBoca(),
                `<rect x="5" y="1.6" width="14" height="2.6" fill="#4a2c14"/><rect x="4.5" y="4.2" width="6" height="1" fill="#4a2c14"/><rect x="6" y="1" width="12" height="0.9" fill="#8a5a2b"/>`,
            ];
        },
    },
    {
        id: 'cowboy',
        nome: 'Cowboy(girl)',
        fundo: '#bc6c25',
        camadas() {
            const pele = '#c68642';
            return [
                camadaFundo(this.fundo),
                camadaOmbros('#5a3825'),
                `<rect x="9" y="15.8" width="6" height="1.8" fill="#9d0208"/>`,
                camadaPescoco(pele),
                camadaOrelhas(pele),
                camadaCabeca(pele),
                camadaOlhos('#4a2c14'),
                `<rect x="9.5" y="14.3" width="5" height="1" fill="#4a2c14"/>`,
                camadaBoca(),
                `<rect x="4" y="1.8" width="16" height="1.3" fill="#a97142"/><rect x="6" y="-1" width="12" height="3" fill="#a97142"/><rect x="7" y="-1.6" width="10" height="1" fill="#8a5a2b"/>`,
            ];
        },
    },
];

function obterPersonagemUsuario(email) {
    const salvo = localStorage.getItem(`personagem_${email}`);
    return PERSONAGENS.find(p => p.id === salvo) || PERSONAGENS[0];
}

function salvarPersonagemUsuario(email, id) {
    localStorage.setItem(`personagem_${email}`, id);
}

function gerarPersonagemSVG(id, tamanho) {
    const personagem = PERSONAGENS.find(p => p.id === id) || PERSONAGENS[0];
    return montarSVG(personagem.camadas(), tamanho);
}
