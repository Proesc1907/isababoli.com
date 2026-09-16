document.addEventListener("DOMContentLoaded", () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        // Giriş yapılmış
        document.getElementById('auth-container').classList.remove('active');
        document.getElementById('gallery-container').classList.add('active');
        document.getElementById('welcome-user').innerText = `Hoş geldin, ${currentUser.name}`;

        if (currentUser.role === 'admin') {
            document.getElementById('admin-nav-btn').classList.remove('hidden');
        }
    } else {
        // Giriş yapılmamış
        document.getElementById('auth-container').classList.add('active');
        document.getElementById('gallery-container').classList.remove('active');
    }
});

function openAdminPanel() {
    document.getElementById('gallery-container').classList.remove('active');
    document.getElementById('admin-container').classList.add('active');
    loadAdminUsers();
}

function closeAdminPanel() {
    document.getElementById('admin-container').classList.remove('active');
    document.getElementById('gallery-container').classList.add('active');
}

function loadAdminUsers() {
    const users = JSON.parse(localStorage.getItem('users'));
    const tbody = document.getElementById('admin-user-list');
    tbody.innerHTML = '';

    users.forEach((user, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td style="color: ${user.isBanned ? 'var(--danger)' : 'var(--text-main)'}">${user.isBanned ? 'Banlı' : 'Aktif'}</td>
            <td>
                ${user.role !== 'admin' ? 
                `<button class="glass-btn ${user.isBanned ? '' : 'danger'}" onclick="toggleBan('${user.email}')">
                    ${user.isBanned ? 'Ban Kaldır' : 'Banla'}
                </button>` : 'Yetki Yok'}
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function toggleBan(email) {
    let users = JSON.parse(localStorage.getItem('users'));
    const userIndex = users.findIndex(u => u.email === email);
    
    if (userIndex > -1) {
        users[userIndex].isBanned = !users[userIndex].isBanned;
        localStorage.setItem('users', JSON.stringify(users));
        loadAdminUsers(); // Tabloyu yenile
    }
}