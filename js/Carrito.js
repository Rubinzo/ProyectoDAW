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

});