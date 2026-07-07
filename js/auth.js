// ========================================
// AUTENTICAÇÃO (FIREBASE)
// ========================================
// Login e cadastro de verdade, via Firebase Authentication, em vez de
// senha em texto puro salva no localStorage. Depois que o login dá certo,
// continuamos gravando um "currentUser" no localStorage (nome, e-mail, uid)
// -- é assim que o resto do site (dashboard, estudo, perfil etc.) já sabe
// quem está logado, então nada mais precisou mudar nessas outras páginas.

import { auth } from './firebase-init.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('formTitle').textContent = '📝 Criar Conta';
}

function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('formTitle').textContent = '🔐 Acessar Sistema';
}

// Os botões "Cadastre-se" / "Faça login" chamam essas funções via
// onclick="" no HTML, então precisam existir no escopo global (um módulo,
// por padrão, não expõe suas funções pra fora dele).
window.showRegister = showRegister;
window.showLogin = showLogin;

function salvarUsuarioAtual(user, nomeManual) {
    localStorage.setItem('currentUser', JSON.stringify({
        uid: user.uid,
        name: nomeManual || user.displayName || (user.email ? user.email.split('@')[0] : 'Usuário'),
        email: user.email
    }));
}

function mensagemDeErro(erro) {
    const mapa = {
        'auth/email-already-in-use': '⚠️ Este e-mail já está cadastrado',
        'auth/invalid-email': '⚠️ E-mail inválido',
        'auth/weak-password': '⚠️ A senha deve ter pelo menos 6 caracteres',
        'auth/missing-password': '⚠️ Digite uma senha',
        'auth/user-not-found': '❌ E-mail ou senha incorretos',
        'auth/wrong-password': '❌ E-mail ou senha incorretos',
        'auth/invalid-credential': '❌ E-mail ou senha incorretos',
        'auth/too-many-requests': '⚠️ Muitas tentativas seguidas. Espere um pouco e tente de novo.',
        'auth/network-request-failed': '⚠️ Falha de conexão. Verifique sua internet e tente de novo.'
    };
    return mapa[erro.code] || ('❌ Algo deu errado: ' + erro.message);
}

// Cadastro
document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;

    if (!name) {
        alert('⚠️ Digite seu nome');
        return;
    }

    if (password.length < 6) {
        alert('⚠️ A senha deve ter pelo menos 6 caracteres');
        return;
    }

    const botao = e.target.querySelector('button[type="submit"]');
    botao.disabled = true;

    try {
        const credencial = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(credencial.user, { displayName: name });

        alert('✅ Cadastro realizado com sucesso! Faça login.');
        showLogin();
        document.getElementById('regName').value = '';
        document.getElementById('regEmail').value = '';
        document.getElementById('regPassword').value = '';
    } catch (erro) {
        alert(mensagemDeErro(erro));
    } finally {
        botao.disabled = false;
    }
});

// Login
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const botao = e.target.querySelector('button[type="submit"]');
    botao.disabled = true;

    try {
        const credencial = await signInWithEmailAndPassword(auth, email, password);
        salvarUsuarioAtual(credencial.user);
        window.location.href = 'dashboard.html';
    } catch (erro) {
        alert(mensagemDeErro(erro));
        botao.disabled = false;
    }
});
