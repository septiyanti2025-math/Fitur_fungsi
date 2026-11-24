
// Menampilkan halaman login
function showLogin() {
    loginPage.classList.remove("hidden");
    registerPage.classList.add("hidden");
    dashboard.classList.add("hidden");
}

// Menampilkan halaman daftar
function showRegister() {
    loginPage.classList.add("hidden");
    registerPage.classList.remove("hidden");
    dashboard.classList.add("hidden");
}

// Registrasi akun
function register() {
    let username = document.getElementById("regUsername").value.trim();
    let password = document.getElementById("regPassword").value;

    if (!username || !password) {
        alert("Isi semua data terlebih dahulu!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let exists = users.some(user => user.username === username);

    if (exists) {
        alert("Username sudah digunakan!");
        return;
    }

    users.push({
        username: username,
        password: password
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registrasi berhasil!");

    document.getElementById("regUsername").value = "";
    document.getElementById("regPassword").value = "";

    showLogin();
}

// Login akun
function login() {
    let username = document.getElementById("loginUsername").value.trim();
    let password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(
        u => u.username === username && u.password === password
    );

    if (user) {
        localStorage.setItem("loggedInUser", username);
        showDashboard(username);
    } else {
        alert("Username atau password salah!");
    }
}

// Menampilkan dashboard
function showDashboard(username) {
    loginPage.classList.add("hidden");
    registerPage.classList.add("hidden");
    dashboard.classList.remove("hidden");

    document.getElementById("welcomeUser").textContent =
        "Halo, " + username;
}

// Logout
function logout() {
    localStorage.removeItem("loggedInUser");
    document.getElementById("loginUsername").value = "";
    document.getElementById("loginPassword").value = "";
    showLogin();
}

// Memeriksa sesi login saat halaman dibuka
window.onload = function() {
    let username = localStorage.getItem("loggedInUser");

    if (username) {
        showDashboard(username);
    } else {
        showLogin();
    }
};
