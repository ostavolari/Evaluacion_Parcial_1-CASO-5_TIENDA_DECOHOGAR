let addressCount = 0;

const COMUNAS = ['Maipú','Santiago Centro','Providencia','Las Condes','La Florida'];

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');
    const btnAdd = document.getElementById('btnAgregarDireccion');
    const cont   = document.getElementById('direcciones');
    if (!form || !cont) return;

    addAddress(); // primera dirección obligatoria
    btnAdd.addEventListener('click', addAddress);

    /* -------- Validación en tiempo real -------- */
    document.getElementById('nombre').addEventListener('input', e => validarNombre(e.target.value));
    document.getElementById('correo').addEventListener('input', e => validarCorreo(e.target.value));
    document.getElementById('contrasena').addEventListener('input', e => validarPassword(e.target.value));
    document.getElementById('confirmarContrasena').addEventListener('input',
        e => validarConfirm(e.target.value));

    /* -------- Envío -------- */
    form.addEventListener('submit', e => {
        e.preventDefault();
        clearErrors(form);

        const okNombre = validarNombre(document.getElementById('nombre').value.trim());
        const okCorreo = validarCorreo(document.getElementById('correo').value.trim());
        const okPass   = validarPassword(document.getElementById('contrasena').value);
        const okConf   = validarConfirm(document.getElementById('confirmarContrasena').value);

        // Estilos
        const estilos = document.querySelectorAll('input[name="estilo"]:checked, input[name="genero"]:checked');
        if (estilos.length === 0) {
            showError('err-reg-styles', 'Seleccione al menos un estilo de preferencia.');
        }

        // Direcciones
        const direccionesOk = validarDirecciones();

        if (okNombre && okCorreo && okPass && okConf && estilos.length > 0 && direccionesOk) {
            showToast('¡Registro completado exitosamente!', 'success');
            form.reset();
            document.getElementById('direcciones').innerHTML = '';
            addressCount = 0;
            addAddress();
        }
    });
});

/* -------- Validadores -------- */
function validarNombre(v) {
    if (!v) { showError('err-reg-name', 'El nombre completo es obligatorio.'); return false; }
    if (v.length > 100) { showError('err-reg-name', 'Máximo 100 caracteres.'); return false; }
    if (!RULES.soloLetras.test(v)) { showError('err-reg-name', 'Solo se permiten letras y espacios.'); return false; }
    showError('err-reg-name', '');
    return true;
}

function validarCorreo(v) {
    if (!v) { showError('err-reg-email', 'El correo electrónico es obligatorio.'); return false; }
    if (v.length > 100) { showError('err-reg-email', 'Máximo 100 caracteres.'); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { showError('err-reg-email', 'Formato inválido.'); return false; }
    if (!RULES.emailDuoc.test(v)) { showError('err-reg-email', 'Debe terminar en @duoc.cl'); return false; }
    showError('err-reg-email', '');
    return true;
}

function validarPassword(v) {
    if (v.length < 10) { showError('err-reg-password', 'Mínimo 10 caracteres.'); return false; }
    if (!RULES.tieneMayus.test(v)) { showError('err-reg-password', 'Debe incluir una mayúscula.'); return false; }
    if (!RULES.tieneNum.test(v)) { showError('err-reg-password', 'Debe incluir un número.'); return false; }
    if (!RULES.tieneSimbolo.test(v)) { showError('err-reg-password', 'Debe incluir un símbolo ($ % & / *).'); return false; }
    showError('err-reg-password', '');
    return true;
}

function validarConfirm(v) {
    const pass = document.getElementById('contrasena').value;
    if (!v) { showError('err-reg-confirm', 'Debe confirmar la contraseña.'); return false; }
    if (v !== pass) { showError('err-reg-confirm', 'Las contraseñas no coinciden.'); return false; }
    showError('err-reg-confirm', '');
    return true;
}

function validarDirecciones() {
    const bloques = document.querySelectorAll('.address-item');
    let ok = true;

    bloques.forEach(b => {
        const alias  = b.querySelector('.addr-alias').value.trim();
        const calle  = b.querySelector('.addr-street').value.trim();
        const comuna = b.querySelector('.addr-comuna').value;
        const err    = b.querySelector('.addr-error');
        err.textContent = '';

        if (alias.length > 20) { err.textContent += 'Alias máx 20 caracteres. '; ok = false; }
        if (!calle) { err.textContent += 'La dirección es obligatoria. '; ok = false; }
        else if (calle.length < 10) { err.textContent += 'Dirección mín 10 caracteres. '; ok = false; }
        if (!comuna) { err.textContent += 'Seleccione una comuna.'; ok = false; }
    });

    return ok && bloques.length > 0;
}

/* -------- Inyección dinámica de bloques de dirección -------- */
function addAddress() {
    const cont = document.getElementById('direcciones');
    if (!cont) return;
    addressCount++;

    const div = document.createElement('div');
    div.classList.add('address-item');
    div.dataset.id = addressCount;

    div.innerHTML = `
        <div class="input-group">
            <label>Alias (Ej. Casa, Trabajo):</label>
            <input type="text" class="addr-alias" maxlength="20" placeholder="Máx 20 caracteres">
        </div>
        <div class="input-group">
            <label>Dirección:</label>
            <input type="text" class="addr-street" placeholder="Mín 10 caracteres">
        </div>
        <div class="input-group">
            <label>Comuna:</label>
            <select class="addr-comuna">
                <option value="">Seleccione una comuna...</option>
                ${COMUNAS.map(c => `<option value="${c}">${c}</option>`).join('')}
            </select>
        </div>
        <span class="error-message addr-error"></span>
    `;

    if (addressCount > 1) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn-danger';
        btn.textContent = 'Eliminar dirección';
        btn.addEventListener('click', () => div.remove());
        div.appendChild(btn);
    }

    cont.appendChild(div);
}