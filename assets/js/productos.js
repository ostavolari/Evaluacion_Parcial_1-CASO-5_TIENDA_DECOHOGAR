const PRODUCTOS = [
    { id: 1, codigo:'DEC001', nombre:'Lámpara Nórdica',    descripcion:'Lámpara de mesa con base de madera y pantalla de lino.',   precio: 29990, stock: 15, categoria:'Iluminación', imagen:'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80' },
    { id: 2, codigo:'DEC002', nombre:'Sillón Minimalista', descripcion:'Sillón de dos cuerpos, tapiz gris claro, líneas simples.',      precio:189990, stock:  6, categoria:'Muebles',     imagen:'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=600&q=80' },
    { id: 3, codigo:'DEC003', nombre:'Cojín Rústico',      descripcion:'Cojín de lino con textura natural, tonos tierra.',             precio: 12990, stock: 30, categoria:'Textiles',    imagen:'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80' },
    { id: 4, codigo:'DEC004', nombre:'Mesa de Centro',     descripcion:'Mesa de centro en madera maciza estilo industrial.',           precio: 89990, stock:  8, categoria:'Muebles',     imagen:'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=80' },
    { id: 5, codigo:'DEC005', nombre:'Espejo Vintage',     descripcion:'Espejo de pared con marco dorado estilo vintage.',             precio: 45990, stock: 12, categoria:'Decoración',  imagen:'https://images.unsplash.com/photo-1616627561950-9f746e330187?auto=format&fit=crop&w=600&q=80' },
    { id: 6, codigo:'DEC006', nombre:'Alfombra Nórdica',   descripcion:'Alfombra con patrón geométrico en tonos neutros.',             precio: 65990, stock: 10, categoria:'Textiles',    imagen:'https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=600&q=80' },
    { id: 7, codigo:'DEC007', nombre:'Estante Industrial', descripcion:'Estante de pared con estructura metálica y madera.',            precio: 74990, stock:  7, categoria:'Muebles',     imagen:'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=600&q=80' },
    { id: 8, codigo:'DEC008', nombre:'Jarrón Cerámico',    descripcion:'Jarrón decorativo hecho a mano, acabado mate.',                 precio: 18990, stock: 20, categoria:'Decoración',  imagen:'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=600&q=80' }
];

const PRODUCTS_KEY = 'decohogar_products';
const USERS_KEY    = 'decohogar_users';

/* ---------- Productos ---------- */
function getProductList() {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (raw) { try { return JSON.parse(raw); } catch (e) {} }
    // Primera vez: sembrar con el array PRODUCTOS original
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(PRODUCTOS));
    return PRODUCTOS.slice();
}
function saveProductList(list) { localStorage.setItem(PRODUCTS_KEY, JSON.stringify(list)); }

function addProduct(p) {
    const list = getProductList();
    p.id = list.length ? Math.max(...list.map(x => x.id)) + 1 : 1;
    list.push(p);
    saveProductList(list);
}
function updateProduct(id, data) {
    const list = getProductList();
    const i = list.findIndex(p => p.id === id);
    if (i !== -1) { list[i] = { ...list[i], ...data, id }; saveProductList(list); }
}
function deleteProduct(id) {
    saveProductList(getProductList().filter(p => p.id !== id));
}

/* ---------- Usuarios ---------- */
function getUserList() {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) { try { return JSON.parse(raw); } catch (e) {} }
    return [];
}
function saveUserList(list) { localStorage.setItem(USERS_KEY, JSON.stringify(list)); }

function addUser(u) {
    const list = getUserList();
    u.id = list.length ? Math.max(...list.map(x => x.id)) + 1 : 1;
    list.push(u);
    saveUserList(list);
}
function updateUser(id, data) {
    const list = getUserList();
    const i = list.findIndex(u => u.id === id);
    if (i !== -1) { list[i] = { ...list[i], ...data, id }; saveUserList(list); }
}
function deleteUser(id) {
    saveUserList(getUserList().filter(u => u.id !== id));
}

function renderProductos(containerId, limit) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const all  = getProductList();
    const list = limit ? all.slice(0, limit) : all;

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
    const p = getProductList().find(x => x.id === id);
    if (!p) return;
    addToCart(p, 1);
    showToast(`"${p.nombre}" añadido al carrito`, 'success');
}

function renderDetalle() {
    const container = document.getElementById('detalleProducto');
    if (!container) return;

    const id = Number(new URLSearchParams(window.location.search).get('id')) || 1;
    const p  = getProductList().find(x => x.id === id);

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
}

document.addEventListener('DOMContentLoaded', () => {
    // Render de tarjetas (index con data-limit="4" y productos.html sin límite)
    if (document.getElementById('listaProductos')) {
        const limit = document.body.dataset.limit ? Number(document.body.dataset.limit) : null;
        renderProductos('listaProductos', limit);
    }

    // Render del detalle (solo en detalle-producto.html)
    if (document.getElementById('detalleProducto')) {
        renderDetalle();
    }

    // Inicializar el admin (solo en admin.html)
    if (document.getElementById('sec-productos')) {
        initAdmin();
    }
});

const REGIONES_ADMIN = {
    'Región Metropolitana': ['Santiago','Providencia','Las Condes','Maipú','La Florida'],
    'Región de Valparaíso': ['Valparaíso','Viña del Mar','Quilpué'],
    'Región del Biobío':    ['Concepción','Talcahuano','Chillán']
};

function initAdmin() {
    /* ----- Navegación entre secciones ----- */
    document.querySelectorAll('.admin-link[data-section]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            document.querySelectorAll('.admin-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const sec = link.dataset.section;
            document.querySelectorAll('.admin-section').forEach(s => s.classList.add('d-none'));
            const target = document.getElementById('sec-' + sec);
            if (target) target.classList.remove('d-none');

            if (sec === 'dashboard') actualizarDashboard();
            if (sec === 'productos') renderTablaProductos();
            if (sec === 'usuarios')  renderTablaUsuarios();
        });
    });

    /* ----- Formulario Productos ----- */
    const formProd = document.getElementById('formProducto');
    document.getElementById('btnNuevoProducto').addEventListener('click', () => abrirFormProducto());
    document.getElementById('btnCancelarProducto').addEventListener('click', () => {
        formProd.classList.add('d-none');
        formProd.reset();
        document.getElementById('prod-id').value = '';
        clearErrors(formProd);
    });
    formProd.addEventListener('submit', e => {
        e.preventDefault();
        if (!validarFormProducto()) return;

        const data = {
            codigo:      document.getElementById('prod-codigo').value.trim(),
            nombre:      document.getElementById('prod-nombre').value.trim(),
            descripcion: document.getElementById('prod-descripcion').value.trim(),
            precio:      Number(document.getElementById('prod-precio').value),
            stock:       Number(document.getElementById('prod-stock').value),
            categoria:   document.getElementById('prod-categoria').value,
            imagen:      document.getElementById('prod-imagen').value.trim() ||
                'https://via.placeholder.com/600x400?text=DECOHOGAR'
        };
        const id = document.getElementById('prod-id').value;
        if (id) { updateProduct(Number(id), data); showToast('Producto actualizado', 'success'); }
        else    { addProduct(data);                showToast('Producto creado', 'success'); }

        formProd.reset();
        formProd.classList.add('d-none');
        document.getElementById('prod-id').value = '';
        renderTablaProductos();
        actualizarDashboard();
    });

    /* ----- Formulario Usuarios ----- */
    const formUser  = document.getElementById('formUsuario');
    const selRegion = document.getElementById('user-region');
    const selComuna = document.getElementById('user-comuna');

    // Poblar regiones
    Object.keys(REGIONES_ADMIN).forEach(r => {
        const opt = document.createElement('option');
        opt.value = r; opt.textContent = r;
        selRegion.appendChild(opt);
    });
    selRegion.addEventListener('change', () => {
        selComuna.innerHTML = '<option value="">Seleccione...</option>';
        (REGIONES_ADMIN[selRegion.value] || []).forEach(c => {
            const opt = document.createElement('option');
            opt.value = c; opt.textContent = c;
            selComuna.appendChild(opt);
        });
    });

    document.getElementById('btnNuevoUsuario').addEventListener('click', () => abrirFormUsuario());
    document.getElementById('btnCancelarUsuario').addEventListener('click', () => {
        formUser.classList.add('d-none');
        formUser.reset();
        document.getElementById('user-id').value = '';
        selComuna.innerHTML = '<option value="">Seleccione...</option>';
        clearErrors(formUser);
    });
    formUser.addEventListener('submit', e => {
        e.preventDefault();
        if (!validarFormUsuario()) return;

        const data = {
            run:       document.getElementById('user-run').value.trim(),
            nombre:    document.getElementById('user-nombre').value.trim(),
            apellidos: document.getElementById('user-apellidos').value.trim(),
            correo:    document.getElementById('user-correo').value.trim(),
            tipo:      document.getElementById('user-tipo').value,
            region:    document.getElementById('user-region').value,
            comuna:    document.getElementById('user-comuna').value,
            direccion: document.getElementById('user-direccion').value.trim()
        };
        const id = document.getElementById('user-id').value;
        if (id) { updateUser(Number(id), data); showToast('Usuario actualizado', 'success'); }
        else    { addUser(data);                showToast('Usuario creado', 'success'); }

        formUser.reset();
        formUser.classList.add('d-none');
        document.getElementById('user-id').value = '';
        selComuna.innerHTML = '<option value="">Seleccione...</option>';
        renderTablaUsuarios();
        actualizarDashboard();
    });

    /* ----- Render inicial del admin ----- */
    actualizarDashboard();
    renderTablaProductos();
    renderTablaUsuarios();
}

/* ---------- Dashboard ---------- */
function actualizarDashboard() {
    const sp = document.getElementById('stat-productos');
    const su = document.getElementById('stat-usuarios');
    if (sp) sp.textContent = getProductList().length;
    if (su) su.textContent = getUserList().length;
}

/* ---------- Tabla Productos ---------- */
function renderTablaProductos() {
    const tbody = document.getElementById('tablaProductos');
    if (!tbody) return;
    const list = getProductList();
    if (!list.length) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">Sin productos</td></tr>';
        return;
    }
    tbody.innerHTML = list.map(p => `
        <tr>
            <td>${p.codigo}</td>
            <td>${p.nombre}</td>
            <td>${p.categoria}</td>
            <td>${formatPrice(p.precio)}</td>
            <td>${p.stock}</td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-dark" onclick="editarProducto(${p.id})">Editar</button>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto(${p.id})">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

function abrirFormProducto(p) {
    const form = document.getElementById('formProducto');
    form.classList.remove('d-none');
    clearErrors(form);
    if (p) {
        document.getElementById('prod-id').value          = p.id;
        document.getElementById('prod-codigo').value      = p.codigo;
        document.getElementById('prod-nombre').value      = p.nombre;
        document.getElementById('prod-descripcion').value = p.descripcion || '';
        document.getElementById('prod-precio').value      = p.precio;
        document.getElementById('prod-stock').value       = p.stock;
        document.getElementById('prod-categoria').value   = p.categoria;
        document.getElementById('prod-imagen').value      = p.imagen || '';
    } else {
        form.reset();
        document.getElementById('prod-id').value = '';
    }
}
function editarProducto(id) {
    const p = getProductList().find(x => x.id === id);
    if (p) abrirFormProducto(p);
}
function eliminarProducto(id) {
    if (!confirm('¿Eliminar este producto?')) return;
    deleteProduct(id);
    renderTablaProductos();
    actualizarDashboard();
    showToast('Producto eliminado', 'info');
}
function validarFormProducto() {
    const form = document.getElementById('formProducto');
    clearErrors(form);
    let ok = true;

    const codigo = document.getElementById('prod-codigo').value.trim();
    const nombre = document.getElementById('prod-nombre').value.trim();
    const desc   = document.getElementById('prod-descripcion').value.trim();
    const precio = document.getElementById('prod-precio').value;
    const stock  = document.getElementById('prod-stock').value;
    const cat    = document.getElementById('prod-categoria').value;

    if (!codigo)                  { showError('err-prod-codigo', 'El código es obligatorio.'); ok = false; }
    else if (codigo.length < 3)   { showError('err-prod-codigo', 'Mínimo 3 caracteres.');     ok = false; }

    if (!nombre)                  { showError('err-prod-nombre', 'El nombre es obligatorio.'); ok = false; }
    else if (nombre.length > 100) { showError('err-prod-nombre', 'Máximo 100 caracteres.');    ok = false; }

    if (desc.length > 500)        { showError('err-prod-descripcion', 'Máximo 500 caracteres.'); ok = false; }

    if (precio === '')            { showError('err-prod-precio', 'El precio es obligatorio.'); ok = false; }
    else if (Number(precio) < 0)  { showError('err-prod-precio', 'Debe ser ≥ 0.');             ok = false; }

    if (stock === '')             { showError('err-prod-stock', 'El stock es obligatorio.'); ok = false; }
    else if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {
        showError('err-prod-stock', 'Debe ser un entero ≥ 0.'); ok = false;
    }

    if (!cat)                     { showError('err-prod-categoria', 'Seleccione una categoría.'); ok = false; }

    return ok;
}

/* ---------- Tabla Usuarios ---------- */
function renderTablaUsuarios() {
    const tbody = document.getElementById('tablaUsuarios');
    if (!tbody) return;
    const list = getUserList();
    if (!list.length) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">Sin usuarios</td></tr>';
        return;
    }
    tbody.innerHTML = list.map(u => `
        <tr>
            <td>${u.run}</td>
            <td>${u.nombre} ${u.apellidos}</td>
            <td>${u.correo}</td>
            <td><span class="badge text-bg-secondary">${u.tipo}</span></td>
            <td>${u.comuna}</td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-dark" onclick="editarUsuario(${u.id})">Editar</button>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarUsuario(${u.id})">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

function abrirFormUsuario(u) {
    const form = document.getElementById('formUsuario');
    form.classList.remove('d-none');
    clearErrors(form);

    const selRegion = document.getElementById('user-region');
    const selComuna = document.getElementById('user-comuna');
    selComuna.innerHTML = '<option value="">Seleccione...</option>';

    if (u) {
        document.getElementById('user-id').value        = u.id;
        document.getElementById('user-run').value       = u.run;
        document.getElementById('user-nombre').value    = u.nombre;
        document.getElementById('user-apellidos').value = u.apellidos;
        document.getElementById('user-correo').value    = u.correo;
        document.getElementById('user-tipo').value      = u.tipo;
        selRegion.value = u.region;
        (REGIONES_ADMIN[u.region] || []).forEach(c => {
            const opt = document.createElement('option');
            opt.value = c; opt.textContent = c;
            selComuna.appendChild(opt);
        });
        selComuna.value = u.comuna;
        document.getElementById('user-direccion').value = u.direccion;
    } else {
        form.reset();
        document.getElementById('user-id').value = '';
    }
}
function editarUsuario(id) {
    const u = getUserList().find(x => x.id === id);
    if (u) abrirFormUsuario(u);
}
function eliminarUsuario(id) {
    if (!confirm('¿Eliminar este usuario?')) return;
    deleteUser(id);
    renderTablaUsuarios();
    actualizarDashboard();
    showToast('Usuario eliminado', 'info');
}
function validarFormUsuario() {
    const form = document.getElementById('formUsuario');
    clearErrors(form);
    let ok = true;

    const run       = document.getElementById('user-run').value.trim();
    const nombre    = document.getElementById('user-nombre').value.trim();
    const apellidos = document.getElementById('user-apellidos').value.trim();
    const correo    = document.getElementById('user-correo').value.trim();
    const region    = document.getElementById('user-region').value;
    const comuna    = document.getElementById('user-comuna').value;
    const direccion = document.getElementById('user-direccion').value.trim();

    // RUN: 7-9 caracteres, sin puntos ni guión. Último puede ser dígito o k/K.
    if (!run)                               { showError('err-user-run', 'El RUN es obligatorio.'); ok = false; }
    else if (!/^\d{7,8}[0-9kK]$/.test(run)) { showError('err-user-run', 'Formato inválido (Ej: 19011022K).'); ok = false; }

    if (!nombre)                            { showError('err-user-nombre', 'El nombre es obligatorio.'); ok = false; }
    else if (nombre.length > 50)            { showError('err-user-nombre', 'Máximo 50 caracteres.');     ok = false; }

    if (!apellidos)                         { showError('err-user-apellidos', 'Los apellidos son obligatorios.'); ok = false; }
    else if (apellidos.length > 100)        { showError('err-user-apellidos', 'Máximo 100 caracteres.');         ok = false; }

    if (!correo)                            { showError('err-user-correo', 'El correo es obligatorio.'); ok = false; }
    else if (correo.length > 100)           { showError('err-user-correo', 'Máximo 100 caracteres.');    ok = false; }
    else if (!RULES.emailGen.test(correo))  { showError('err-user-correo', 'Solo @duoc.cl, @profesor.duoc.cl o @gmail.com'); ok = false; }

    if (!region)                            { showError('err-user-region', 'Seleccione una región.'); ok = false; }
    if (!comuna)                            { showError('err-user-comuna', 'Seleccione una comuna.');  ok = false; }

    if (!direccion)                         { showError('err-user-direccion', 'La dirección es obligatoria.'); ok = false; }
    else if (direccion.length > 300)        { showError('err-user-direccion', 'Máximo 300 caracteres.');      ok = false; }

    return ok;
}