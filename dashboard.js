document.addEventListener('DOMContentLoaded', function() {
    // Check multiple session indicators
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const currentUserKey = sessionStorage.getItem('currentUser');
    const userEmail = sessionStorage.getItem('userEmail');

    // If any session indicator is missing, redirect to login
    if (!isLoggedIn || !currentUserKey || !userEmail) {
        sessionStorage.clear();
        window.location.href = 'login.html';
        return;
    }

    // Verify the user actually exists in localStorage
    const userData = localStorage.getItem(currentUserKey);
    if (!userData) {
        sessionStorage.clear();
        window.location.href = 'login.html';
        return;
    }

    const user = JSON.parse(userData);
    
    // Display user data with fallbacks for missing values
    document.getElementById('detail-FullName').textContent = user.fullName || 'Not provided';
    document.getElementById('detailEmail').textContent = user.email || 'Not provided';
    document.getElementById('detailphone').textContent = user.phone || 'Not provided';
    document.getElementById('detailGender').textContent = user.gender || 'Not provided';
    
    // Format date properly
    const dob = user.dob ? new Date(user.dob) : null;
    document.getElementById('detailDob').textContent = dob ? dob.toLocaleDateString() : 'Not provided';

    document.getElementById('detailAddress').textContent = user.address || 'Not provided';
    document.getElementById('detailCity').textContent = user.city || 'Not provided';
    
    // Handle skills display
    const skills = user.skills || [];
    document.getElementById('detailSkills').textContent = skills.length ? skills.join(', ') : 'No skills selected';

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function() {
        // Clear all session data
        sessionStorage.clear();
        window.location.href = 'login.html';
    });

    // Add hover effect via JavaScript (better to use CSS though)
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.2s ease';
    });
    logoutBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});