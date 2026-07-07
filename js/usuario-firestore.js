// ========================================
// DADOS DO USUÁRIO NO FIRESTORE (progresso, conquistas, avatar, frase...)
// ========================================
// Mesma ideia de js/trilhas-firestore.js, mas pro lado do aluno: progresso
// por trilha, conquistas desbloqueadas, sequência de dias estudados,
// avatar escolhido e frase do perfil ficavam só no localStorage (por
// navegador/dispositivo). Agora sincronizam com um documento por usuário
// no Firestore (coleção "usuarios", com o uid do Firebase como id).
//
// Em vez de listar campo por campo, guardamos TODAS as chaves do
// localStorage que terminam em "_<email-do-usuario>" -- é assim que esse
// site já nomeia toda informação por aluno (progress_0_fulano@x.com,
// conquistas_fulano@x.com, personagem_fulano@x.com, bio_fulano@x.com,
// etc), então isso cobre tudo automaticamente, inclusive coisas novas que
// vierem a existir no futuro com esse mesmo padrão de nome.

import { db, auth } from './firebase-init.js';
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

function aguardarUsuarioFirebase() {
    if (auth.currentUser) return Promise.resolve(auth.currentUser);
    return new Promise(resolve => {
        const cancelar = onAuthStateChanged(auth, (user) => {
            cancelar();
            resolve(user);
        });
    });
}

function refUsuario(uid) {
    return doc(db, 'usuarios', uid);
}

export async function sincronizarUsuarioLocal(email) {
    const user = await aguardarUsuarioFirebase();
    if (!user) return;

    const snap = await getDoc(refUsuario(user.uid));
    if (!snap.exists()) return;

    const chaves = snap.data().chaves || {};
    Object.entries(chaves).forEach(([chave, valor]) => {
        localStorage.setItem(chave, valor);
    });
}

export async function salvarUsuarioFirestore(email) {
    const user = await aguardarUsuarioFirebase();
    if (!user) return;

    const chaves = {};
    for (let i = 0; i < localStorage.length; i++) {
        const chave = localStorage.key(i);
        if (chave && chave.endsWith(`_${email}`)) {
            chaves[chave] = localStorage.getItem(chave);
        }
    }

    await setDoc(refUsuario(user.uid), { chaves, atualizadoEm: new Date().toISOString() });
}

window.sincronizarUsuarioLocal = sincronizarUsuarioLocal;
window.salvarUsuarioFirestore = salvarUsuarioFirestore;
window.dispatchEvent(new Event('usuarioFirestorePronto'));
