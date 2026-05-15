console.log(localStorage.getItem("seleccionados"));

let productos = localStorage.getItem("seleccionados");
console.log("Productos" +productos);
if(!(productos === null)){
    productos = JSON.parse(productos);
}else{
    console.log("No hay productos añadidos")
}

let precioProductos = 0;
let cantidadProductos = 0;
let stock = [];

//Crear stock 1
if(stock.length < 1){
    productos.forEach(element => {
        stock.push(1);
        cantidadProductos++;
    });
}



let stockCargado = localStorage.getItem("stock");
if(!( stockCargado == null)){
    console.log(JSON.parse(localStorage.getItem("stock")))
    stock = JSON.parse(localStorage.getItem("stock"));
}



let precios = [];

let indice = 0;
console.log(stock)
productos.forEach(element => {
    console.log(element)
    
    //Crear productos selecionados
    const contenedorCarrito = document.getElementById("contenedorCarrito");
    const nombre = element.nombre;
    const precio = element.precio;
    const img = element.img;
    const id = element.id;
    const cantidadProducto = element.cantidadProducto;
    let subtotalIndividual = parseFloat(precio) * stock[indice];
    precioProductos += subtotalIndividual;
    
    contenedorCarrito.innerHTML += `
        <div class="carrito-item" data-precio="${precio}" >
            <img src="${img}" alt="${nombre}" class="carrito-img">
                    <div class="carrito-info">
                        <h3>${nombre}</h3>
                        <p class="precio">${precio}</p>
                    </div>
                    <div class="carrito-controles" 
                    data-nombre="${nombre}"
                    data-precio="${precio}" data-img="${img}" data-cantidadProducto="${cantidadProducto}"
                    data-id="${id}">
                        <button class="btn-cantidad btnMenos">-</button>
                        <span class="cantidad" data-cantidad="${stock[indice]}"
                        >${stock[indice]}</span>
                        <button class="btn-cantidad btnMas">+</button>
                    </div>
                    <div class="carrito-subtotal">
                        <p class="precio-subtotal">${subtotalIndividual.toFixed(2)}</p>
                    </div>
                    <button class="btn-eliminar">Eliminar</button>
                </div>
    `
    precios.push(precio);
    precioProductos = parseFloat(precio) + precioProductos;
    precioProductos = Math.round(precioProductos * 100) / 100;
    console.log(precioProductos)
    indice++;
});
//Crear div pagar
const carritoResumen = document.getElementById("carritoResumen");
let precioTotal = parseFloat(precioProductos.toFixed(1)) + 4.99;
precioTotal = Math.round(precioTotal * 100) / 100;

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
                <span id="total" data-total="${4.99}">${precioTotal}€</span>
            </div>
            <button id="btn-comprar">Proceder al pago</button>
`

const btnMas = document.querySelectorAll(".btnMas");

                
btnMas.forEach(boton => {
    boton.addEventListener("click",sumarPedido);
});

//Funciones de botones
function sumarPedido(evento){
    const pedido = evento.target.parentElement;
    const cantidad = pedido.querySelector(".cantidad");
    let nuevaCantidad = parseInt(cantidad.innerText);
    cantidad.innerText = nuevaCantidad + 1;
    cantidad.dataset.cantidad = nuevaCantidad + 1;
    const pedidoParent = pedido.parentElement;
    const subtotal = pedidoParent.querySelector(".precio-subtotal");
    let precioSubTotal = pedidoParent.dataset.precio * (nuevaCantidad + 1);
    console.log(precioSubTotal)
    subtotal.innerText = precioSubTotal.toFixed(2);
    console.log(precios)
    calcularTotalPrecio()
    for(let i = 0; i < productos.length; i++){
        if(pedido.dataset.nombre == productos[i].nombre){
            stock.splice(i, 1, (nuevaCantidad + 1));
            console.log(nuevaCantidad +1);
        }
    }
    console.log(pedido.dataset.cantidadproducto)
    localStorage.setItem("stock", JSON.stringify(stock));
    
}


const btnMenos = document.querySelectorAll(".btnMenos");

                
btnMenos.forEach(boton => {
    boton.addEventListener("click",restarPedido);
});

function restarPedido(evento){
    const pedido = evento.target.parentElement;
    const cantidad = pedido.querySelector(".cantidad");
    let nuevaCantidad = parseInt(cantidad.innerText);
    if((nuevaCantidad > 1)){
        cantidad.innerText = nuevaCantidad - 1;
        cantidad.dataset.cantidad = nuevaCantidad - 1;
        const pedidoParent = pedido.parentElement;
        const subtotal = pedidoParent.querySelector(".precio-subtotal");
        let precioSubTotal = pedidoParent.dataset.precio * (nuevaCantidad - 1);
        console.log(subtotal)
        console.log(pedidoParent.dataset.precio.toFixed)
        subtotal.innerText = precioSubTotal.toFixed(2);
        console.log(precios)
        calcularTotalPrecio()
        

    for(let i = 0; i < productos.length; i++){
        if(pedido.dataset.nombre == productos[i].nombre){
            stock.splice(i, 1, (nuevaCantidad - 1));
            console.log(nuevaCantidad -1);
        }
    }
    console.log(stock)
    localStorage.setItem("stock", JSON.stringify(stock));
    }


}



function calcularTotalPrecio(){
    const subtotal = document.getElementById("subtotal");
    const total = document.getElementById("total");

    const pedidos = document.querySelectorAll(".carrito-item");
    let totalPrecio = 0;
    console.log(pedidos)
    pedidos.forEach(element => {
        if(!(element.style.display === "none")){
            let suma = parseFloat(element.dataset.precio);
            // console.log("Precio " + suma);
            const cantidad = element.querySelector(".cantidad");
            suma = parseFloat(suma.toFixed(2)) * parseFloat(cantidad.dataset.cantidad);
            totalPrecio = parseFloat(totalPrecio.toFixed(2)) + suma;
            // console.log("suma " + parseFloat(cantidad.dataset.cantidad))
            // console.log(suma)
        }

    });
    subtotal.innerText = totalPrecio.toFixed(2);
    let totalPrecioEnvio = totalPrecio + 4.99;
    total.innerText = totalPrecioEnvio.toFixed(2);
    total.dataset.total = totalPrecioEnvio.toFixed(2);
}

    //Pagar productos
    const comprar = document.getElementById("btn-comprar");
 
    comprar.addEventListener("click", function(){

        const modal = document.getElementById("modal");
        const total = document.getElementById("total");
        console.log(total)
                modal.innerHTML = `
                    <button id="cerrar">x</button>
                    <p>Pago exitoso</p>
                    <span>${total.dataset.total}€</span>
            `;
            const cerrarModal = document.getElementById("cerrar");
            
            cerrarModal.addEventListener('click', () => {
                modal.close();
            });
            modal.showModal();
        
    });



const eliminar = document.querySelectorAll(".btn-eliminar");

                
eliminar.forEach(boton => {
    boton.addEventListener("click",eliminarProducto);
});

function eliminarProducto(evento){
    const pedido = evento.target.parentElement;
    console.log("Pedido a eliminar");
    console.log(pedido);
    const pedidoImg = pedido.querySelector(".carrito-img");
    pedido.style.display = "none";
    let pedidoBorrar = "";
    productos.forEach(element => {
        if(element.nombre == pedidoImg.alt){
            pedidoBorrar = element;
        }
    });
    console.log(productos)
    let indice = productos.indexOf(pedidoBorrar);
    
    if (indice !== -1) {
        productos.splice(indice, 1);
        stock = JSON.parse(localStorage.getItem("stock"));
        stock.splice(indice, 1);
        localStorage.setItem("stock", JSON.stringify(stock));
    }
    console.log(productos);
    localStorage.setItem("seleccionados", JSON.stringify(productos));
    calcularTotalPrecio();
}

//Flecha Cambio de página
const flecha = document.getElementById("flecha");
flecha.addEventListener("click", function(){
    setTimeout(() =>{
        window.location.href = "Tienda.html"; 
    }, 1000);
})

//Calcular precio al cargar la pagina
calcularTotalPrecio()