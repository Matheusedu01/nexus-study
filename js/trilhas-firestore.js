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

import { db } from './firebase-init.js';
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const REF = doc(db, 'dados', 'trilhas');

export async function buscarTrilhasFirestore() {
    const snap = await getDoc(REF);
    return snap.exists() ? (snap.data().lista || []) : null;
}

// Quem chama isso (admin.js, ou o bootstrap de dashboard.html na primeira
// vez que o app roda) já passou por um login real no Firebase antes de
// chegar aqui, então a escrita já sai autenticada -- sem precisar de
// nenhum login anônimo extra.
export async function salvarTrilhasFirestore(trilhas) {
    await setDoc(REF, { lista: trilhas, atualizadoEm: new Date().toISOString() });
}

window.buscarTrilhasFirestore = buscarTrilhasFirestore;
window.salvarTrilhasFirestore = salvarTrilhasFirestore;
window.dispatchEvent(new Event('trilhasFirestorePronto'));
