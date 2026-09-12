# DECOHOGAR - Evaluación Parcial 1

Proyecto de tienda online de muebles y decoración desarrollado como parte de la **Evaluación Parcial 1**.

El sitio permite explorar productos, gestionar un carrito de compras, registrarse, iniciar sesión y administrar productos y usuarios a través de un panel de administrador.

---

## Integrantes

- Victoria Bustos
- Silvana Reyes
- Oscar Tavolari

---

## Tecnologías utilizadas

- **HTML5** — estructura semántica (`header`, `nav`, `main`, `section`, `article`, `footer`)
- **CSS3** — hoja de estilos externa con diseño responsivo
- **JavaScript (Vanilla)** — validaciones de formularios, render dinámico y CRUD
- **Bootstrap 5.3** — grillas y componentes base
- **GitHub** — control de versiones y trabajo colaborativo

---

## Estructura del proyecto
```text
Evaluacion_Parcial_1-CASO-5/
│
├── assets/
│ ├── img/ → Imágenes locales (logo, hero, etc.)
│ ├── js/ → Scripts JavaScript
│ │ ├── app.js → Utilidades (carrito, toast, reglas)
│ │ ├── productos.js → Productos, render, detalle y CRUD admin
│ │ ├── carrito.js → Render y lógica del carrito
│ │ ├── detalle.js → Render del detalle de producto
│ │ ├── login.js → Validación del formulario de login
│ │ ├── registro.js → Validación del formulario de registro
│ │ └── contacto.js → Validación del formulario de contacto
│ └── stylesheet.css → Estilos globales + estilos del admin
│
├── admin.html → Panel de administrador (CRUD)
├── index.html → Página principal (Home)
├── productos.html → Listado de productos
├── detalle-producto.html → Detalle de un producto
├── carrito.html → Carrito de compras
├── login.html → Inicio de sesión
├── registro.html → Registro de usuario
├── nosotros.html → Información de la empresa
├── blogs.html → Listado de blogs
├── blog-minimalista.html → Detalle de blog #1
├── blog-textiles.html → Detalle de blog #2
└──contacto.html → Formulario de contacto
```

---

## Funcionalidades

### Tienda (vista pública)
- Página principal con productos destacados
- Listado completo de productos renderizados con JavaScript
- Detalle de cada producto y opción de añadir al carrito
- Carrito de compras con persistencia en **localStorage** (agregar, modificar cantidad, eliminar)
- Formulario de contacto con validación
- Sección de blogs con 2 artículos completos
- Página "Nosotros"

### Registro y Login
- Validación en tiempo real con JavaScript
- Reglas aplicadas:
    - **Correo:** solo dominios `@duoc.cl`
    - **Contraseña:** mínimo 10 caracteres, al menos 1 mayúscula, 1 número y 1 símbolo (`$ % & / *`)
    - **Nombre:** solo letras, máx. 100 caracteres
    - **Estilos de preferencia:** mínimo 1 seleccionado
    - **Direcciones dinámicas:** agregar/eliminar múltiples direcciones con alias, dirección y comuna

### Panel de Administrador (`admin.html`)
- Dashboard con totales de productos y usuarios
- CRUD completo de **Productos** (crear, editar, eliminar)
- CRUD completo de **Usuarios** (con región/comuna dinámicas)
- Persistencia en **localStorage**

---

## Validaciones destacadas

| Formulario | Campo | Regla |
|---|---|---|
| Login | Correo | Requerido · Formato válido · termina en `@duoc.cl` |
| Login | Contraseña | Mín. 10 · 1 mayúscula · 1 número · 1 símbolo |
| Registro | Nombre | Solo letras · Máx. 100 |
| Registro | Correo | Termina en `@duoc.cl` |
| Registro | Estilos | ≥ 1 checkbox marcado |
| Registro | Direcciones | Alias máx. 20 · Dirección mín. 10 · Comuna obligatoria |
| Contacto | Comentario | Máx. 500 caracteres |
| Admin Producto | Código | Mín. 3 caracteres |
| Admin Usuario | RUN | 7-9 caracteres, sin puntos ni guión |

---
*DECOHOGAR — Tu hogar, tu mejor espacio*
