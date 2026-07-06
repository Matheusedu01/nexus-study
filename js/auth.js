// Gerenciamento de usuários
const users = JSON.parse(localStorage.getItem('users')) || [];

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

// Cadastro
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    
    if (password.length < 6) {
        alert('⚠️ A senha deve ter pelo menos 6 caracteres');
        return;
    }
    
    if (users.find(u => u.email === email)) {
        alert('⚠️ Este e-mail já está cadastrado');
        return;
    }
    
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('✅ Cadastro realizado com sucesso! Faça login.');
    showLogin();
    document.getElementById('regName').value = '';
    document.getElementById('regEmail').value = '';
    document.getElementById('regPassword').value = '';
});

// Login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'dashboard.html';
    } else {
        alert('❌ E-mail ou senha incorretos');
    }
});

// Se estiver na página de dashboard ou estudo, verifica se está logado
if (window.location.pathname.includes('dashboard.html') || 
    window.location.pathname.includes('estudo.html')) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        window.location.href = 'index.html';
    }
}