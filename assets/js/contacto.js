document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        clearErrors(form);
        let ok = true;

        const nombre = document.getElementById('nombre').value.trim();
        const email  = document.getElementById('email').value.trim();
        const coment = document.getElementById('comentario').value.trim();

        /* Nombre */
        if (!nombre) { showError('err-contact-nombre', 'El nombre es obligatorio.'); ok = false; }
        else if (nombre.length > 100) { showError('err-contact-nombre', 'Máximo 100 caracteres.'); ok = false; }

        /* Correo */
        if (!email) { showError('err-contact-email', 'El correo es obligatorio.'); ok = false; }
        else if (email.length > 100) { showError('err-contact-email', 'Máximo 100 caracteres.'); ok = false; }
        else if (!RULES.emailGen.test(email)) {
            showError('err-contact-email', 'Solo se aceptan @duoc.cl, @profesor.duoc.cl o @gmail.com');
            ok = false;
        }

        /* Comentario */
        if (!coment) { showError('err-contact-comentario', 'El comentario es obligatorio.'); ok = false; }
        else if (coment.length > 500) { showError('err-contact-comentario', 'Máximo 500 caracteres.'); ok = false; }

        if (ok) {
            showToast('¡Mensaje enviado correctamente!', 'success');
            form.reset();
        }
    });
});