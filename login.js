document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (!loginForm) return;

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let isLoginValid = true;

        // Limpiar errores previos en pantalla
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        const email = document.getElementById('login-email').value.trim();
        const pass = document.getElementById('login-password').value;

        // Validar correo 
        if (email === '') {
            showError('err-login-email', 'Por favor, ingrese su correo electrónico.');
            isLoginValid = false;
        } else if (!email.includes('@')) {
            showError('err-login-email', 'El formato del correo electrónico no es válido.');
            isLoginValid = false;
        } else if (!email.endsWith('@duoc.cl')) {
            showError('err-login-email', 'El correo debe terminar exclusivamente en @duoc.cl.');
            isLoginValid = false;
        }

        //Validar contraseña obligatoria
        if (pass === '') {
            showError('err-login-password', 'Por favor, ingrese su contraseña.');
            isLoginValid = false;
        }

        // 3. Resultado de la validación[cite: 2]
        if (isLoginValid) {
            alert('¡Inicio de sesión exitoso! Redirigiendo al catálogo de DecoHogar...');
            loginForm.reset();
        }
    });
});


// Muestra el mensaje de error en la etiqueta q corresponde
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}