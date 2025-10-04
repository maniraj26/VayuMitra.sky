// Temporary storage for users (replace with backend storage later)
let users = JSON.parse(localStorage.getItem('users')) || [];
const adminCredentials = {
    username: 'admin',
    password: 'admin123'
};

// User Registration
if (document.getElementById('userRegisterForm')) {
    document.getElementById('userRegisterForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Check if user already exists
        if (users.find(user => user.email === email)) {
            alert('User already exists!');
            return;
        }

        // Create new user
        const newUser = {
            name,
            email,
            phone,
            password
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful! Please login.');
        window.location.href = 'user-login.html';
    });
}

// User Login
if (document.getElementById('userLoginForm')) {
    document.getElementById('userLoginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'user-dashboard.html';
        } else {
            alert('Invalid credentials!');
        }
    });
}

// Admin Login
if (document.getElementById('adminLoginForm')) {
    document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;

        if (username === adminCredentials.username && password === adminCredentials.password) {
            localStorage.setItem('adminLoggedIn', 'true');
            window.location.href = 'admin-dashboard.html';
        } else {
            alert('Invalid admin credentials!');
        }
    });
}

// Logout functionality
if (document.getElementById('logout')) {
    document.getElementById('logout').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        localStorage.removeItem('adminLoggedIn');
        window.location.href = '../index.html';
    });
}
