console.log(localStorage.getItem("seleccionados"));

let productos = localStorage.getItem("seleccionados");
console.log("PRASDASD" +productos)
productos = JSON.parse(productos)

let precioProductos = 0;
let cantidadProducto = 1;
let precios = [];

productos.forEach(element => {
    console.log(element)

    //Crear productos selecionados
    const contenedorCarrito = document.getElementById("contenedorCarrito");
    const nombre = element.nombre;
    const precio = element.precio;
    const img = element.img;
    contenedorCarrito.innerHTML += `
        <div class="carrito-item" data-precio="${precio}">
            <img src="${img}" alt="${nombre}" class="carrito-img">
                    <div class="carrito-info">
                        <h3>${nombre}</h3>
                        <p class="precio">${precio}</p>
                    </div>
                    <div class="carrito-controles" 
                    data-nombre="${nombre}"
                    data-precio="${precio}" data-img="${img}">
                        <button class="btn-cantidad btnMenos">-</button>
                        <span class="cantidad" data-cantidad="${cantidadProducto}"
                        >${cantidadProducto}</span>
                        <button class="btn-cantidad btnMas">+</button>
                    </div>
                    <div class="carrito-subtotal">
                        <p class="precio-subtotal">${precio}</p>
                    </div>
                    <button class="btn-eliminar">Eliminar</button>
                </div>
    `
    precios.push(precio);
    precioProductos = parseFloat(precio) + precioProductos;
    console.log(precioProductos)
});

const carritoResumen = document.getElementById("carritoResumen");
let precioTotal = parseFloat(precioProductos.toFixed(1)) + 4.99;
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

const btnMas = document.querySelectorAll(".btnMas");

                
btnMas.forEach(boton => {
    boton.addEventListener("click",sumarPedido);
});

function sumarPedido(evento){
    const pedido = evento.target.parentElement;
    const cantidad = pedido.querySelector(".cantidad");
    let nuevaCantidad = parseInt(cantidad.innerText);
    cantidad.innerText = nuevaCantidad + 1;
    cantidad.dataset.cantidad = nuevaCantidad + 1;
    const pedidoParent = pedido.parentElement;
    const subtotal = pedidoParent.querySelector(".precio-subtotal");
    let precioSubTotal = pedidoParent.dataset.precio * (nuevaCantidad + 1);
    console.log(subtotal)
    subtotal.innerText = precioSubTotal.toFixed(2);
    console.log(precios)
    calcularTotalPrecio()
}


const btnMenos = document.querySelectorAll(".btnMenos");

                
btnMenos.forEach(boton => {
    boton.addEventListener("click",restarPedido);
});

function restarPedido(evento){
    const pedido = evento.target.parentElement;
    const cantidad = pedido.querySelector(".cantidad");
    let nuevaCantidad = parseInt(cantidad.innerText);
    if(!(nuevaCantidad == 0)){
        cantidad.innerText = nuevaCantidad - 1;
        cantidad.dataset.cantidad = nuevaCantidad - 1;
        const pedidoParent = pedido.parentElement;
        const subtotal = pedidoParent.querySelector(".precio-subtotal");
        let precioSubTotal = pedidoParent.dataset.precio * (nuevaCantidad - 1);
        console.log(subtotal)
        subtotal.innerText = precioSubTotal.toFixed(2);
        console.log(precios)
        calcularTotalPrecio()
    }

}



function calcularTotalPrecio(){
    const subtotal = document.getElementById("subtotal");
    const total = document.getElementById("total");

    const pedidos = document.querySelectorAll(".carrito-item");
    let totalPrecio = 0;
    pedidos.forEach(element => {
        let suma = parseFloat(element.dataset.precio);
        // console.log("Precio " + suma);
        const cantidad = element.querySelector(".cantidad");
        suma = parseFloat(suma.toFixed(2)) * parseFloat(cantidad.dataset.cantidad);
        totalPrecio = parseFloat(totalPrecio.toFixed(2)) + suma;
        // console.log("suma " + parseFloat(cantidad.dataset.cantidad))
        // console.log(suma)
    });
    subtotal.innerText = totalPrecio.toFixed(2);
    let totalPrecioEnvio = totalPrecio + 4.99;
    total.innerText = totalPrecioEnvio.toFixed(2);
}


const comprar = document.getElementById("btn-comprar");
