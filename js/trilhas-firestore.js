// ========================================
// TRILHAS NO FIRESTORE (conteúdo compartilhado entre usuários)
// ========================================
// Antes, o conteúdo das trilhas (o que o admin cria/edita) ficava só no
// localStorage de cada navegador -- por isso uma edição no admin não
// aparecia pros alunos em outro dispositivo. Agora o Firestore é a fonte
// de verdade compartilhada; o localStorage continua existindo como cache
// local (pra o resto do site, que já lê 'trilhasData' de forma síncrona,
// não precisar ser todo reescrito).
//
// Documento único: dados/trilhas, campo "lista" = o mesmo array que já
// vivia em localStorage.trilhasData.
//
// Como é um módulo, expõe as funções tanto via export (pra quem também for
// módulo, tipo os bootstraps das páginas) quanto via window.* (pra
// js/admin.js, que é um script clássico e não pode dar "import").

import { db, auth } from './firebase-init.js';
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { signInAnonymously } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const REF = doc(db, 'dados', 'trilhas');

export async function buscarTrilhasFirestore() {
    const snap = await getDoc(REF);
    return snap.exists() ? (snap.data().lista || []) : null;
}

export async function salvarTrilhasFirestore(trilhas) {
    // O admin precisa estar autenticado (mesmo que anonimamente) pra escrita
    // ser aceita pelas regras de segurança do Firestore -- ver garantirLoginAnonimo().
    await garantirLoginAnonimo();
    await setDoc(REF, { lista: trilhas, atualizadoEm: new Date().toISOString() });
}

// O modo admin usa um login próprio (usuário/senha fixos, sem Firebase) --
// pra ainda assim conseguir escrever no Firestore com alguma proteção
// (bloqueando visitantes anônimos "de fora"), ele entra de forma anônima
// no Firebase só pra ter uma sessão válida na hora de salvar.
export async function garantirLoginAnonimo() {
    if (!auth.currentUser) {
        await signInAnonymously(auth);
    }
}

window.buscarTrilhasFirestore = buscarTrilhasFirestore;
window.salvarTrilhasFirestore = salvarTrilhasFirestore;
window.garantirLoginAnonimoFirestore = garantirLoginAnonimo;
window.dispatchEvent(new Event('trilhasFirestorePronto'));
