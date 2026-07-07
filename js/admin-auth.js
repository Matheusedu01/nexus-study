// ========================================
// LOGIN DO ADMIN (FIREBASE)
// ========================================
// Antes, o acesso de admin era um usuário/senha fixos ('admin'/'admin123')
// comparados direto no código -- ou seja, visível por qualquer um que
// abrisse o código-fonte da página ou o repositório no GitHub. Agora o
// login passa pelo Firebase Authentication (a senha nunca fica exposta em
// texto puro em lugar nenhum) e só libera o painel se o e-mail que logou
// for exatamente o e-mail autorizado como admin.

import { auth } from './firebase-init.js';
import { signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const ADMIN_EMAIL = 'matheusedu01@gmail.com';

function mensagemDeErro(erro) {
    const mapa = {
        'auth/invalid-email': '⚠️ E-mail inválido',
        'auth/user-not-found': '❌ E-mail ou senha incorretos',
        'auth/wrong-password': '❌ E-mail ou senha incorretos',
        'auth/invalid-credential': '❌ E-mail ou senha incorretos',
        'auth/too-many-requests': '⚠️ Muitas tentativas seguidas. Espere um pouco e tente de novo.',
        'auth/network-request-failed': '⚠️ Falha de conexão. Verifique sua internet e tente de novo.'
    };
    return mapa[erro.code] || ('❌ Algo deu errado: ' + erro.message);
}

document.getElementById('adminLoginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('adminUser').value.trim();
    const password = document.getElementById('adminPassword').value;

    const botao = e.target.querySelector('button[type="submit"]');
    botao.disabled = true;

    try {
        const credencial = await signInWithEmailAndPassword(auth, email, password);

        if (credencial.user.email !== ADMIN_EMAIL) {
            await signOut(auth);
            alert('❌ Essa conta não tem acesso ao painel administrativo.');
            botao.disabled = false;
            return;
        }

        localStorage.setItem('isAdmin', 'true');
        window.location.href = 'admin.html';
    } catch (erro) {
        alert(mensagemDeErro(erro));
        botao.disabled = false;
    }
});
