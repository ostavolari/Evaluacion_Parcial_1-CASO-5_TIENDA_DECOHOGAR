document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    if (!form) return;

    const email = document.getElementById('Correo');
    const pass  = document.getElementById('Contrasena');

    // Validación en tiempo real
    email.addEventListener('input', () => validarCorreo(email.value.trim(), false));
    pass.addEventListener('input',  () => validarPassword(pass.value, false));

    form.addEventListener('submit', e => {
        e.preventDefault();
        clearErrors(form);

        const okEmail = validarCorreo(email.value.trim(), true);
        const okPass  = validarPassword(pass.value, true);

        if (okEmail && okPass) {
            showToast('¡Inicio de sesión exitoso! Redirigiendo...', 'success');
            form.reset();
            setTimeout(() => window.location.href = 'index.html', 1200);
        }
    });
});

function validarCorreo(valor, mostrarTodo) {
    if (!valor) { showError('err-login-email', 'El correo es obligatorio.'); return false; }
    if (valor.length > 100) { showError('err-login-email', 'Máximo 100 caracteres.'); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
        showError('err-login-email', 'Formato de correo inválido.');
        return false;
    }
    if (!RULES.emailDuoc.test(valor)) {
        showError('err-login-email', 'El correo debe terminar en @duoc.cl');
        return false;
    }
    showError('err-login-email', '');
    return true;
}

function validarPassword(valor, mostrarTodo) {
    if (!valor) { showError('err-login-password', 'La contraseña es obligatoria.'); return false; }
    if (valor.length < 10) { showError('err-login-password', 'Mínimo 10 caracteres.'); return false; }
    if (!RULES.tieneMayus.test(valor)) { showError('err-login-password', 'Debe incluir al menos una mayúscula.'); return false; }
    if (!RULES.tieneNum.test(valor))   { showError('err-login-password', 'Debe incluir al menos un número.'); return false; }
    if (!RULES.tieneSimbolo.test(valor)){ showError('err-login-password', 'Debe incluir un símbolo ($ % & / *).'); return false; }
    showError('err-login-password', '');
    return true;
}