// Başlangıçta varsayılan bir admin hesabı oluştur
if (!localStorage.getItem('users')) {
    const defaultUsers = [{ name: "Admin", email: "admin@panel.com", password: "123", role: "admin", isBanned: false }];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
}

function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(`${tab}-form`).classList.add('active');
    document.getElementById('auth-error').innerText = '';
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    let users = JSON.parse(localStorage.getItem('users'));
    if (users.find(u => u.email === email)) {
        document.getElementById('auth-error').innerText = "Bu e-posta zaten kayıtlı!";
        return;
    }

    users.push({ name, email, password, role: "user", isBanned: false });
    localStorage.setItem('users', JSON.stringify(users));
    alert("Kayıt başarılı! Giriş yapabilirsiniz.");
    switchTab('login');
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    let users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        document.getElementById('auth-error').innerText = "E-posta veya şifre hatalı!";
        return;
    }
    if (user.isBanned) {
        document.getElementById('auth-error').innerText = "Hesabınız yönetici tarafından engellenmiştir.";
        return;
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.reload();
}

function handleLogout() {
    localStorage.removeItem('currentUser');
    window.location.reload();
}