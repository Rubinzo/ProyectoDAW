console.log(localStorage.getItem("seleccionados"));

let productos = localStorage.getItem("seleccionados");
console.log("PRASDASD" +productos)
productos = JSON.parse(productos)

let precioProductos = 0;

productos.forEach(element => {
    console.log(element)

    //Crear productos selecionados
    const contenedorCarrito = document.getElementById("contenedorCarrito");
    const nombre = element.nombre;
    const precio = element.precio;
    const img = element.img;
    contenedorCarrito.innerHTML += `
        <div class="carrito-item">
            <img src="${img}" alt="${nombre}" class="carrito-img">
                    <div class="carrito-info">
                        <h3>${nombre}</h3>
                        <p class="precio">${precio}</p>
                    </div>
                    <div class="carrito-controles">
                        <button class="btn-cantidad btn-menos">-</button>
                        <span class="cantidad">1</span>
                        <button class="btn-cantidad btn-mas">+</button>
                    </div>
                    <div class="carrito-subtotal">
                        <p>${precio}</p>
                    </div>
                    <button class="btn-eliminar">Eliminar</button>
                </div>
    `
    precioProductos = parseFloat(precio) + precioProductos;
    console.log(precioProductos)
});

const carritoResumen = document.getElementById("carritoResumen");
let precioTotal = precioProductos + 4.99;
carritoResumen.innerHTML += `
        
            <h2>Resumen del pedido</h2>
            <div class="resumen-linea">
                <span>Subtotal:</span>
                <span id="subtotal">${precioProductos}€</span>
            </div>
            <div class="resumen-linea">
                <span>Envío:</span>
                <span id="envio">4.99€</span>
            </div>
            <div class="resumen-linea total">
                <span>Total:</span>
                <span id="total">${precioTotal}€</span>
            </div>
            <button class="btn-comprar">Proceder al pago</button>
`