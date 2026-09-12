const PRODUCTOS = [
    { id: 1, codigo:'DEC001', nombre:'Lámpara Nórdica',   descripcion:'Lámpara de mesa con base de madera y pantalla de lino.',        precio: 29990, stock: 15, categoria:'Iluminación', imagen:'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80' },
    { id: 2, codigo:'DEC002', nombre:'Sillón Minimalista',descripcion:'Sillón de dos cuerpos, tapiz gris claro, líneas simples.',       precio:189990, stock:  6, categoria:'Muebles',     imagen:'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=600&q=80' },
    { id: 3, codigo:'DEC003', nombre:'Cojín Rústico',     descripcion:'Cojín de lino con textura natural, tonos tierra.',              precio: 12990, stock: 30, categoria:'Textiles',    imagen:'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80' },
    { id: 4, codigo:'DEC004', nombre:'Mesa de Centro',    descripcion:'Mesa de centro en madera maciza estilo industrial.',            precio: 89990, stock:  8, categoria:'Muebles',     imagen:'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=80' },
    { id: 5, codigo:'DEC005', nombre:'Espejo Vintage',    descripcion:'Espejo de pared con marco dorado estilo vintage.',              precio: 45990, stock: 12, categoria:'Decoración',  imagen:'https://images.unsplash.com/photo-1616627561950-9f746e330187?auto=format&fit=crop&w=600&q=80' },
    { id: 6, codigo:'DEC006', nombre:'Alfombra Nórdica',  descripcion:'Alfombra con patrón geométrico en tonos neutros.',              precio: 65990, stock: 10, categoria:'Textiles',    imagen:'https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=600&q=80' },
    { id: 7, codigo:'DEC007', nombre:'Estante Industrial',descripcion:'Estante de pared con estructura metálica y madera.',             precio: 74990, stock:  7, categoria:'Muebles',     imagen:'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=600&q=80' },
    { id: 8, codigo:'DEC008', nombre:'Jarrón Cerámico',   descripcion:'Jarrón decorativo hecho a mano, acabado mate.',                  precio: 18990, stock: 20, categoria:'Decoración',  imagen:'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=600&q=80' }
];

/* Renderiza las tarjetas dentro de un contenedor (#listaProductos) */
function renderProductos(containerId, limit) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const list = limit ? PRODUCTOS.slice(0, limit) : PRODUCTOS;

    container.innerHTML = list.map(p => `
        <div class="col-md-6 col-lg-4 mb-4">
            <article class="card h-100 shadow-sm">
                <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
                <div class="card-body d-flex flex-column">
                    <h3 class="h5 card-title">${p.nombre}</h3>
                    <p class="card-text text-muted small">${p.descripcion}</p>
                    <p class="fw-bold mb-3">${formatPrice(p.precio)}</p>
                    <div class="mt-auto d-flex gap-2">
                        <a href="detalle-producto.html?id=${p.id}" class="btn btn-outline-dark btn-sm flex-grow-1">Ver detalle</a>
                        <button type="button" class="btn btn-dark btn-sm"
                                onclick="agregarDesdeListado(${p.id})">
                            Añadir
                        </button>
                    </div>
                </div>
            </article>
        </div>
    `).join('');
}

function agregarDesdeListado(id) {
    const p = PRODUCTOS.find(x => x.id === id);
    if (!p) return;
    addToCart(p, 1);
    showToast(`"${p.nombre}" añadido al carrito`, 'success');
}

document.addEventListener('DOMContentLoaded', () => {
    // index.html usa #listaProductos (limit 4), productos.html usa #listaProductos (todos)
    renderProductos('listaProductos', document.body.dataset.limit ? Number(document.body.dataset.limit) : null);
});