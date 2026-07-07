// ========================================
// INICIALIZAÇÃO DO FIREBASE
// ========================================
// Módulo compartilhado: inicializa o app do Firebase uma única vez e
// exporta as instâncias de Authentication e Firestore para quem precisar
// (js/auth.js, e futuramente as páginas que passarem a usar o banco de
// dados em vez de só localStorage).
//
// Como é um <script type="module">, isso não roda como script "normal" —
// quem quiser usar precisa importar (import { auth } from './firebase-init.js').

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCefpssn8R6zTr_nbfPe0GTl9nVqnaPa3s",
    authDomain: "nexus-study-39c5d.firebaseapp.com",
    projectId: "nexus-study-39c5d",
    storageBucket: "nexus-study-39c5d.firebasestorage.app",
    messagingSenderId: "905602455408",
    appId: "1:905602455408:web:b98e374b939facc67821b5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
