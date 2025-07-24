document.getElementById('registrationForm').addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            // Reset error messages
            document.querySelectorAll('.error').forEach(el => el.textContent = '');

            // Full Name validation
            const fullName = document.getElementById('fullName').value;
            if (fullName.length < 3) {
                document.getElementById('nameError').textContent = 'Name must be at least 3 characters';
                isValid = false;
            }
            if (/\d/.test(fullName)) {
                document.getElementById('nameError').textContent = 'Name cannot contain digits';
                isValid = false;
            }
            if (/(.)\1\1/.test(fullName)) {
                document.getElementById('nameError').textContent = 'Name cannot have same character 3 times in a row';
                isValid = false;
            }

            // Email validation
            const email = document.getElementById('email').value;
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email';
                isValid = false;
            }

            // Password validation
            const password = document.getElementById('password').value;
            if (password.length < 8) {
                document.getElementById('passwordError').textContent = 'Password must be at least 8 characters';
                isValid = false;
            }
            if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
                document.getElementById('passwordError').textContent = 'Password must include uppercase, lowercase, and number';
                isValid = false;
            }

            // Confirm Password
            const confirmPassword = document.getElementById('confirmPassword').value;
            if (password !== confirmPassword) {
                document.getElementById('confirmError').textContent = 'Passwords do not match';
                isValid = false;
            }

            // Phone validation
            const phone = document.getElementById('phone').value;
            if (!/^\d{10}$/.test(phone)) {
                document.getElementById('phoneError').textContent = 'Phone must be exactly 10 digits';
                isValid = false;
            }

            // Gender validation
            const gender = document.querySelector('input[name="gender"]:checked');
            if (!gender) {
                document.getElementById('genderError').textContent = 'Please select a gender';
                isValid = false;
            }

            // Date of Birth validation
            const dob = new Date(document.getElementById('dob').value);
            const today = new Date();
            const age = today.getFullYear() - dob.getFullYear();
            if (isNaN(dob.getTime())) {
                document.getElementById('dobError').textContent = 'Please enter a valid date';
                isValid = false;
            } else if (age < 18) {
                document.getElementById('dobError').textContent = 'You must be at least 18 years old';
                isValid = false;
            }

            // Address validation
            const address = document.getElementById('address').value;
            if (address.length < 10) {
                document.getElementById('addressError').textContent = 'Address must be at least 10 characters';
                isValid = false;
            }

            // City validation
            const city = document.getElementById('city').value;
            if (!city) {
                document.getElementById('cityError').textContent = 'Please select a city';
                isValid = false;
            }

            // Skills validation
            const skills = document.querySelectorAll('input[name="skills"]:checked');
            if (skills.length === 0) {
                document.getElementById('skillsError').textContent = 'Please select at least one skill';
                isValid = false;
            }

            // Terms validation
            const terms = document.getElementById('terms').checked;
            if (!terms) {
                document.getElementById('termsError').textContent = 'You must accept the terms';
                isValid = false;
            }

            if (isValid) {
                // Store user data in localStorage
                const user = {
                    fullName,
                    email,
                    password,
                    phone,
                    gender: gender.value,
                    dob: document.getElementById('dob').value,
                    address,
                    city,
                    skills: Array.from(skills).map(skill => skill.value)
                };

                localStorage.setItem('user_' + email, JSON.stringify(user));
                alert('Registration successful!');
                window.location.href = 'login.html';
            }
        });