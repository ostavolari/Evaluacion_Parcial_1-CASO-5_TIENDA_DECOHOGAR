
let usuarios = [];

// ELEMENTOS DEL DOM


const registroForm = document.querySelector("#registroForm");
const agregarDireccionBtn = document.querySelector("#agregarDireccionBtn");
const direccionesContainer = document.querySelector("#direccionesContainer");

const nombreInput = document.querySelector("#nombre");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirmPassword");

const errorNombre = document.querySelector("#errorNombre");
const errorEmail = document.querySelector("#errorEmail");
const errorPassword = document.querySelector("#errorPassword");
const errorConfirmPassword = document.querySelector("#errorConfirmPassword");
const errorEstilos = document.querySelector("#errorEstilos");
const errorDirecciones = document.querySelector("#errorDirecciones");

// DATOS


const comunas = ["Santiago", "Maipú", "Providencia", "Las Condes", "Ñuñoa"];

// CARGAR USUARIOS DESDE localStorage

function cargarUsuarios() {
  const guardados = JSON.parse(localStorage.getItem("decoUsers")) || [];
  usuarios = guardados;
}


// AGREGAR DIRECCIÓN

function agregarDireccion() {
  const div = document.createElement("div");
  div.classList.add("direccion-item");

  div.innerHTML = `
    <div class="input-group">
      <label>Alias (ej. Casa, Trabajo - máx 20 car.):</label>
      <input type="text" class="alias-input" maxlength="20" required autocomplete="off">
      <small class="error-msg alias-error"></small>
    </div>
    <div class="input-group">
      <label>Dirección (mín. 10 car.):</label>
      <input type="text" class="dir-input" required autocomplete="street-address">
      <small class="error-msg dir-error"></small>
    </div>
    <div class="input-group">
      <label>Comuna:</label>
      <select class="comuna-select" required autocomplete="address-level2">
        <option value="">Seleccione comuna...</option>
        ${comunas.map(function (c) {
          return `<option value="${c}">${c}</option>`;
        }).join("")}
      </select>
      <small class="error-msg comuna-error"></small>
    </div>
    <button type="button" class="delete-btn">Eliminar Dirección</button>
  `;

  const deleteBtn = div.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", function () {
    div.remove();
  });

  direccionesContainer.appendChild(div);
}

// VALIDAR NOMBRE


function validarNombre() {
  const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

  if (!nombreInput.value.trim()) {
    errorNombre.textContent = "El nombre es obligatorio.";
    return false;
  }
  if (!regexNombre.test(nombreInput.value)) {
    errorNombre.textContent = "El nombre solo debe contener letras.";
    return false;
  }
  if (nombreInput.value.length > 100) {
    errorNombre.textContent = "Máximo 100 caracteres.";
    return false;
  }
  return true;
}


// VALIDAR EMAIL

function validarEmail() {
  const regexEmail = /^[a-zA-Z0-9._%+-]+@duoc\.cl$/;

  if (!emailInput.value.trim()) {
    errorEmail.textContent = "El correo es obligatorio.";
    return false;
  }
  if (!regexEmail.test(emailInput.value)) {
    errorEmail.textContent = "El correo debe terminar exclusivamente en @duoc.cl.";
    return false;
  }

  const existe = usuarios.find(function (u) {
    return u.email === emailInput.value;
  });

  if (existe) {
    errorEmail.textContent = "Este correo ya está registrado en el sistema.";
    return false;
  }
  return true;
}


// VALIDAR CONTRASEÑA

function validarPassword() {
  const regexPass = /^(?=.*[A-Z])(?=.*\d)(?=.*[$%&/*])[A-Za-z\d$%&/*]{10,}$/;

  if (!passwordInput.value) {
    errorPassword.textContent = "La contraseña es obligatoria.";
    return false;
  }
  if (!regexPass.test(passwordInput.value)) {
    errorPassword.textContent = "Mínimo 10 caracteres, una mayúscula, un número y un símbolo ($%&/*).";
    return false;
  }
  return true;
}

// VALIDAR CONFIRMACIÓN


function validarConfirmPassword() {
  if (!confirmPasswordInput.value) {
    errorConfirmPassword.textContent = "Debe confirmar la contraseña.";
    return false;
  }
  if (confirmPasswordInput.value !== passwordInput.value) {
    errorConfirmPassword.textContent = "Las contraseñas no coinciden.";
    return false;
  }
  return true;
}

// VALIDAR ESTILOS


function validarEstilos() {
  const estilos = document.querySelectorAll("input[name='estilos']:checked");

  if (estilos.length === 0) {
    errorEstilos.textContent = "Debe seleccionar al menos 1 estilo de preferencia.";
    return false;
  }
  return true;
}


// VALIDAR DIRECCIONES


function validarDirecciones() {
  const itemsDireccion = document.querySelectorAll(".direccion-item");

  if (itemsDireccion.length === 0) {
    errorDirecciones.textContent = "Debe registrar al menos una dirección de envío.";
    return false;
  }

  let valido = true;

  itemsDireccion.forEach(function (item) {
    const aliasInput = item.querySelector(".alias-input");
    const dirInput = item.querySelector(".dir-input");
    const comunaSelect = item.querySelector(".comuna-select");

    const aliasError = item.querySelector(".alias-error");
    const dirError = item.querySelector(".dir-error");
    const comunaError = item.querySelector(".comuna-error");

    if (!aliasInput.value.trim()) {
      aliasError.textContent = "El alias es obligatorio.";
      valido = false;
    } else if (aliasInput.value.length > 20) {
      aliasError.textContent = "Máximo 20 caracteres.";
      valido = false;
    }

    if (!dirInput.value.trim()) {
      dirError.textContent = "La dirección es obligatoria.";
      valido = false;
    } else if (dirInput.value.length < 10) {
      dirError.textContent = "Mínimo 10 caracteres.";
      valido = false;
    }

    if (!comunaSelect.value) {
      comunaError.textContent = "Seleccione una comuna.";
      valido = false;
    }
  });

  return valido;
}


// LIMPIAR ERRORES

function limpiarErrores() {
  const mensajes = document.querySelectorAll(".error-msg");
  mensajes.forEach(function (el) {
    el.textContent = "";
  });
}


// GUARDAR USUARIO


function guardarUsuario() {
  const estilos = document.querySelectorAll("input[name='estilos']:checked");

  const nuevoUsuario = {
    nombre: nombreInput.value,
    email: emailInput.value,
    password: passwordInput.value,
    estilos: Array.from(estilos).map(function (e) {
      return e.value;
    })
  };

  usuarios.push(nuevoUsuario);
  localStorage.setItem("decoUsers", JSON.stringify(usuarios));

  alert("¡Registro exitoso en DecoHogar!");
  window.location.href = "login.html";
}

// EVENTOS

agregarDireccionBtn.addEventListener("click", agregarDireccion);

registroForm.addEventListener("submit", function (e) {
  e.preventDefault();
  limpiarErrores();

  const v1 = validarNombre();
  const v2 = validarEmail();
  const v3 = validarPassword();
  const v4 = validarConfirmPassword();
  const v5 = validarEstilos();
  const v6 = validarDirecciones();

  if (v1 && v2 && v3 && v4 && v5 && v6) {
    guardarUsuario();
  }
});

// ===================================
// INICIALIZAR
// ===================================

cargarUsuarios();
agregarDireccion();