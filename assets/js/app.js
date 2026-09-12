const CART_KEY = 'decohogar_cart';

/* Formato de precio en pesos chilenos */
function formatPrice(value) {
    return '$' + Number(value).toLocaleString('es-CL');
}

/* ---------- CARRITO (localStorage) ---------- */
function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch (e) { return []; }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(product, cantidad = 1) {
    const cart = getCart();
    const existing = cart.find(i => i.id === product.id);
    if (existing) existing.cantidad += cantidad;
    else cart.push({
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        imagen: product.imagen,
        cantidad: cantidad
    });
    saveCart(cart);
    updateCartCount();
}

function removeFromCart(id) {
    saveCart(getCart().filter(i => i.id !== id));
    updateCartCount();
}

function updateQuantity(id, cantidad) {
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if (item) item.cantidad = Math.max(1, cantidad);
    saveCart(cart);
    updateCartCount();
}

function cartTotal() {
    return getCart().reduce((s, i) => s + i.precio * i.cantidad, 0);
}

function cartCount() {
    return getCart().reduce((s, i) => s + i.cantidad, 0);
}

function updateCartCount() {
    const n = cartCount();
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = n);
}

/* ---------- TOAST (Bootstrap) ---------- */
function showToast(message, type = 'info') {
    const toastEl = document.getElementById('toast');
    if (!toastEl) { alert(message); return; }
    const body = toastEl.querySelector('.toast-body');
    body.textContent = message;
    toastEl.classList.remove('bg-success','bg-danger','bg-dark','text-white');
    if (type === 'success') toastEl.classList.add('bg-success','text-white');
    else if (type === 'error') toastEl.classList.add('bg-danger','text-white');
    else toastEl.classList.add('bg-dark','text-white');
    bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3000 }).show();
}

/* ---------- HELPERS DE VALIDACIÓN (reutilizables) ---------- */
function showError(id, message) {
    const el = document.getElementById(id);
    if (el) el.textContent = message;
}

function clearErrors(scope = document) {
    scope.querySelectorAll('.error-message').forEach(el => el.textContent = '');
}

/* Reglas de negocio */
const RULES = {
    emailDuoc:   /^[^\s@]+@duoc\.cl$/,
    emailGen:    /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/,
    soloLetras:  /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
    tieneMayus:  /[A-Z]/,
    tieneNum:    /\d/,
    tieneSimbolo:/[$%&/*]/
};

/* Actualiza contador al cargar cualquier página */
document.addEventListener('DOMContentLoaded', updateCartCount);