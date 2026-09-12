document.addEventListener('DOMContentLoaded', renderCarrito);

function renderCarrito() {
    const cont = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');
    if (!cont) return;

    const cart = getCart();

    if (cart.length === 0) {
        cont.innerHTML = `
            <div class="alert alert-secondary">
                Tu carrito está vacío. <a href="productos.html">Ver productos</a>
            </div>`;
        if (totalEl) totalEl.textContent = formatPrice(0);
        return;
    }

    cont.innerHTML = cart.map(item => `
        <div class="card mb-3 shadow-sm">
            <div class="row g-0 align-items-center">
                <div class="col-3">
                    <img src="${item.imagen}" class="img-fluid rounded-start" alt="${item.nombre}" style="height:110px;object-fit:cover;width:100%;">
                </div>
                <div class="col-9">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <h3 class="h6 mb-1">${item.nombre}</h3>
                            <strong>${formatPrice(item.precio)}</strong>
                        </div>
                        <div class="d-flex align-items-center gap-2 mt-2">
                            <button class="btn btn-sm btn-outline-dark" onclick="cambiarCantidad(${item.id}, ${item.cantidad - 1})">−</button>
                            <span class="px-2">${item.cantidad}</span>
                            <button class="btn btn-sm btn-outline-dark" onclick="cambiarCantidad(${item.id}, ${item.cantidad + 1})">+</button>
                            <button class="btn btn-sm btn-danger ms-auto" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
                        </div>
                        <p class="small text-muted mb-0 mt-2">Subtotal: ${formatPrice(item.precio * item.cantidad)}</p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    if (totalEl) totalEl.textContent = formatPrice(cartTotal());
}

function cambiarCantidad(id, cant) {
    updateQuantity(id, cant);
    renderCarrito();
}

function eliminarDelCarrito(id) {
    removeFromCart(id);
    renderCarrito();
    showToast('Producto eliminado del carrito', 'info');
}