document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    // Reset error messages
    document.getElementById('loginEmailError').textContent = '';
    document.getElementById('loginPasswordError').textContent = '';

    // Basic validation
    if (!email) {
        document.getElementById('loginEmailError').textContent = 'Email is required';
        return;
    }

    if (!password) {
        document.getElementById('loginPasswordError').textContent = 'Password is required';
        return;
    }

    // Check if user exists
    const userKey = 'user_' + email;
    const userData = localStorage.getItem(userKey);

    if (!userData) {
        document.getElementById('loginEmailError').textContent = 'User not found';
        return;
    }

    const user = JSON.parse(userData);

    if (user.password !== password) {
        document.getElementById('loginPasswordError').textContent = 'Incorrect password';
        return;
    }

    // Login successful - store user session
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('currentUser', userKey);
    sessionStorage.setItem('userEmail', email); // Store email separately
    
    // Ensure session is set before redirect
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 100);
});