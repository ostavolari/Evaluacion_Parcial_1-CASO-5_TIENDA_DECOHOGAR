//Identificador autoincremental para cada direccion
let addressCount = 0; 

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const btnAddAddress = document.getElementById('btn-add-address');

    if (!registerForm) return;

    // crear la primera dirección obligatoria por defecto
    addAddress();

    // añadir más direcciones dinámicamente
    btnAddAddress.addEventListener('click', addAddress);

    // Evento de envio del formulario
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        // limpiar mensajes de error previos
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        // nombre Completo
        const name = document.getElementById('reg-name').value.trim();
        const alphaRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (name === '') {
            showError('err-reg-name', 'El nombre completo es obligatorio.');
            isValid = false;
        } else if (name.length > 100) {
            showError('err-reg-name', 'El nombre no debe superar los 100 caracteres.');
            isValid = false;
        } else if (!alphaRegex.test(name)) {
            showError('err-reg-name', 'El nombre solo permite letras y espacios.');
            isValid = false;
        }

        // 2. Correo Electrónico (Terminado en @duoc.cl)
        const email = document.getElementById('reg-email').value.trim();
        if (email === '') {
            showError('err-reg-email', 'El correo electrónico es obligatorio.');
            isValid = false;
        } else if (!email.endsWith('@duoc.cl')) {
            showError('err-reg-email', 'El correo debe terminar exclusivamente en @duoc.cl.');
            isValid = false;
        }

        // Contraseña con mañas
        const pass = document.getElementById('reg-password').value;
        const confirmPass = document.getElementById('reg-confirm').value;

        if (pass.length < 10) {
            showError('err-reg-password', 'Debe contener al menos 10 caracteres.');
            isValid = false;
        } else if (!/[A-Z]/.test(pass)) {
            showError('err-reg-password', 'Debe incluir al menos una letra mayúscula.');
            isValid = false;
        } else if (!/\d/.test(pass)) {
            showError('err-reg-password', 'Debe incluir al menos un número.');
            isValid = false;
        } else if (!/[$%&/*]/.test(pass)) {
            showError('err-reg-password', 'Debe incluir al menos un símbolo especial ($ % & / *).');
            isValid = false;
        }

        // Confirmacin de Contraseña
        if (confirmPass === '') {
            showError('err-reg-confirm', 'Por favor, confirme su contraseña.');
            isValid = false;
        } else if (pass !== confirmPass) {
            showError('err-reg-confirm', 'Las contraseñas ingresadas no coinciden.');
            isValid = false;
        }

        // Checklist de Preferencias 
        const selectedStyles = document.querySelectorAll('input[name="estilo"]:checked');
        if (selectedStyles.length === 0) {
            showError('err-reg-styles', 'Debe seleccionar al menos un estilo de preferencia.');
            isValid = false;
        }

        //  Validaciones de Direcciones Dinamicas
        const addressBlocks = document.querySelectorAll('.address-item');
        let addressesValid = true;

        addressBlocks.forEach(block => {
            const alias = block.querySelector('.addr-alias').value.trim();
            const street = block.querySelector('.addr-street').value.trim();
            const comuna = block.querySelector('.addr-comuna').value;
            const errSpan = block.querySelector('.addr-error');

            errSpan.textContent = ''; // Limpieza interna del bloque

            if (alias.length > 20) {
                errSpan.textContent += 'El alias no puede superar los 20 caracteres. ';
                addressesValid = false;
            }
            if (street === '') {
                errSpan.textContent += 'La dirección es obligatoria. ';
                addressesValid = false;
            } else if (street.length < 10) {
                errSpan.textContent += 'La dirección debe tener al menos 10 caracteres. ';
                addressesValid = false;
            }
            if (comuna === '') {
                errSpan.textContent += 'Debe seleccionar una comuna.';
                addressesValid = false;
            }
        });

        if (!addressesValid) {
            isValid = false;
        }

        //Registro Exitoso
        if (isValid) {
            alert('¡Registro completado exitosamente en DecoHogar!');
            registerForm.reset();
            // Resetear el contenedor a una dirección por defecto
            document.getElementById('address-container').innerHTML = '';
            addressCount = 0;
            addAddress();
        }
    });
});

// inyecta un nuevo bloque HTML de dirección al contenedor, le pregunté a la IA para que lo inyectara como en el desafio de las mascotas
function addAddress() {
    const addressContainer = document.getElementById('address-container');
    if (!addressContainer) return;

    addressCount++;
    const addressDiv = document.createElement('div');
    addressDiv.classList.add('address-item');
    addressDiv.setAttribute('data-id', addressCount);

    addressDiv.innerHTML = `
        <div class="input-group">
            <label>Alias (Ej. Casa, Oficina):</label>
            <input type="text" class="addr-alias" maxlength="20" placeholder="Máx 20 caracteres">
        </div>
        <div class="input-group">
            <label>Dirección:</label>
            <input type="text" class="addr-street" placeholder="Mínimo 10 caracteres">
        </div>
        <div class="input-group">
            <label>Comuna:</label>
            <select class="addr-comuna">
                <option value="">Seleccione una comuna...</option>
                <option value="Maipu">Maipú</option>
                <option value="Santiago">Santiago Centro</option>
                <option value="Providencia">Providencia</option>
                <option value="LasCondes">Las Condes</option>
                <option value="LaFlorida">La Florida</option>
            </select>
        </div>
        <span class="error-message addr-error"></span>
    `;

    // Si existe más de 1 direccion, habilita el boton de eliminacion
    if (addressCount > 1) {
        const btnRemove = document.createElement('button');
        btnRemove.type = 'button';
        btnRemove.className = 'btn-danger';
        btnRemove.textContent = 'Eliminar Dirección';
        btnRemove.addEventListener('click', () => {
            addressDiv.remove();
        });
        addressDiv.appendChild(btnRemove);
    }

    addressContainer.appendChild(addressDiv);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}