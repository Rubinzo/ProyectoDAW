//Generar tarjetas
const contenedorProductos = document.getElementById("contenedorProductos");


//localStorage 
const user = document.getElementById("user");
let usuario = localStorage.getItem("usuario");
user.innerText = usuario;
    
const myHeaders = new Headers();
const getCamisetas = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
            };
fetch("http://localhost:8080/stock/camisetas", getCamisetas)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    for(let i = 0; i < result.length; i++ ){

                        const nombre = result[i].nombre;
                        const precio = result[i].precio;
                        const img = result[i].img;
                        const pais = result[i].pais;
                        const seleccion = result[i].seleccion;
                        const equipo = result[i].equipo;

                        

                        contenedorProductos.innerHTML += `
                        <div class="producto" data-nombre = "${nombre}" 
                        data-status="null" data-pais="${pais}" 
                        data-seleccion="${seleccion}" data-equipo="${equipo}"
                        data-precio="${precio}" data-img="${img}"
                        data-id="${i}"
                            <p>${nombre}</p>
                            <img src="${img}" alt="${nombre}">
                            <p>${precio}€</p>
                            <button class="send">Añadir</button>
                        </div>
                        `;

                    }
                    const producto = document.getElementsByClassName("producto");
                    const buscar = document.getElementById("buscar");
                    //buscar.addEventListener("input", filtrar);
                    const inputNombre = document.getElementById("inputNombre");
                    inputNombre.addEventListener("input",filtrar)
                    function filtrar(){
                        for(let i = 0; i < result.length; i++){
                            let nombreInput = result[i].nombre.toLowerCase();
                            if(nombreInput.includes(inputNombre.value.toLowerCase())){
                                producto[i].style.display ="block";
                            
                            }else{
                                producto[i].style.display = "none";
                                
                            }
                        }
                    }

                const productos = document.querySelectorAll(".producto");
                const botones = document.querySelectorAll(".send");

                
                    botones.forEach(boton => {
                        boton.addEventListener("click",elegirProducto)
                    });
                    
                })
                .catch((error) => console.error(error));






                


 let productos = []
function elegirProducto(evento){
   
    const producto = evento.target.parentElement;
    console.log(producto.dataset);
    let precio = Number(producto.dataset.precio);
    

    let json = {
        nombre: producto.dataset.nombre,
        precio: producto.dataset.precio,
        img: producto.dataset.img,
        id: producto.dataset.id
    }


    
    let igual = false;
    if(productos.length == 0){
        const imgCarrito = document.getElementById("imgCarrito");
        imgCarrito.src ="/Img/carrito-de-compras-lleno.png"
        productos.push(json);
        localStorage.setItem("seleccionados", JSON.stringify(productos))
    }else{
        for(let i = 0; i < productos.length; i++ ){
            console.log("Element" +productos[i])
            if(JSON.stringify(productos[i]) === JSON.stringify(json)){
                console.log("igual");
                igual = true;
            }
        }
        if(!igual){
                console.log("Añadiendo producto2");
                productos.push(json);
                localStorage.setItem("seleccionados", JSON.stringify(productos));
        }

    }

    console.log(productos)
    
}
const carritoBoton = document.getElementById("carritoBoton");
carritoBoton.addEventListener("click",function(){
    setTimeout(() =>{
        window.location.href = "Carrito.html"; 
    }, 1000);
});

//Borrar cache
const borrar = document.getElementById("borrar");
borrar.addEventListener("click",function(){
    console.log("Cache borrado");
    localStorage.setItem("seleccionados", "");

});