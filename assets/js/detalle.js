document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('detalleProducto');
    if (!container) return;

    const id = Number(new URLSearchParams(window.location.search).get('id')) || 1;
    const p = PRODUCTOS.find(x => x.id === id);

    if (!p) {
        container.innerHTML = '<p class="text-muted">Producto no encontrado.</p>';
        return;
    }

    container.innerHTML = `
        <div class="row g-4">
            <div class="col-md-6">
                <img src="${p.imagen}" class="img-fluid rounded-4 shadow-sm" alt="${p.nombre}">
            </div>
            <div class="col-md-6">
                <span class="badge text-bg-secondary mb-2">${p.categoria}</span>
                <h1 class="h2">${p.nombre}</h1>
                <p class="text-muted small mb-2">Código: ${p.codigo}</p>
                <p class="fs-3 fw-bold">${formatPrice(p.precio)}</p>
                <p>${p.descripcion}</p>
                <p class="small text-muted">Stock disponible: ${p.stock} unidades</p>

                <div class="mb-3" style="max-width: 140px;">
                    <label for="cantidad" class="form-label">Cantidad</label>
                    <input type="number" id="cantidad" class="form-control" value="1" min="1" max="${p.stock}">
                </div>

                <button type="button" class="btn btn-dark btn-lg w-100" id="btnAgregar">
                    Añadir al carrito
                </button>
            </div>
        </div>
    `;

    document.getElementById('btnAgregar').addEventListener('click', () => {
        const cant = Math.max(1, Number(document.getElementById('cantidad').value) || 1);
        if (cant > p.stock) { showToast('No hay suficiente stock.', 'error'); return; }
        addToCart(p, cant);
        showToast(`"${p.nombre}" x${cant} añadido al carrito`, 'success');
    });
});