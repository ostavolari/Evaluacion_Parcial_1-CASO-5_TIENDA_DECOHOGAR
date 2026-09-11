
const loginForm = document.querySelector("#loginForm");
const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");
const errorLoginEmail = document.querySelector("#errorLoginEmail");
const errorLoginPassword = document.querySelector("#errorLoginPassword");


// VALIDAR EMAIL

function validarLoginEmail() {
  const regexEmail = /^[a-zA-Z0-9._%+-]+@duoc\.cl$/;

  if (!loginEmail.value.trim()) {
    errorLoginEmail.textContent = "El correo es obligatorio.";
    return false;
  }
  if (!regexEmail.test(loginEmail.value)) {
    errorLoginEmail.textContent = "El correo debe terminar exclusivamente en @duoc.cl.";
    return false;
  }
  return true;
}
// VALIDAR PASSWORD

function validarLoginPassword() {
  if (!loginPassword.value) {
    errorLoginPassword.textContent = "La contraseña es obligatoria.";
    return false;
  }
  return true;
}

// LIMPIAR ERRORES

function limpiarErrores() {
  const mensajes = document.querySelectorAll(".error-msg");
  mensajes.forEach(function (el) {
    el.textContent = "";
  });
}

// BUSCAR USUARIO




function buscarUsuario(email, password) {
  const usuarios = JSON.parse(localStorage.getItem("decoUsers")) || [];

  const encontrado = usuarios.find(function (u) {
    return u.email === email && u.password === password;
  });

  return encontrado;
}
// INICIAR SESIÓN


function iniciarSesion() {
  const usuario = buscarUsuario(loginEmail.value, loginPassword.value);

  if (usuario) {
    alert(`¡Bienvenido de nuevo, ${usuario.nombre}!`);
    window.location.href = "registro.html";
  } else {
    // si el correo existe pero la contraseña no, avisa
    const usuarios = JSON.parse(localStorage.getItem("decoUsers")) || [];
    const existeEmail = usuarios.find(function (u) {
      return u.email === loginEmail.value;
    });

    if (existeEmail) {
      errorLoginPassword.textContent = "Contraseña incorrecta. Verifique e intente nuevamente.";
    } else {
      errorLoginEmail.textContent = "Usuario no registrado. Verifique el correo o regístrese.";
    }
  }
}


// EVENTOS

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  limpiarErrores();

  const v1 = validarLoginEmail();
  const v2 = validarLoginPassword();

  if (v1 && v2) {
    iniciarSesion();
  }
});