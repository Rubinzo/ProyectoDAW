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
                        <div class="producto" data-nombre = ${nombre}" 
                        data-status="null" data-pais="${pais}" 
                        data-seleccion="${seleccion}" data-equipo="${equipo}"
                        data-precio="${precio}" data-img="${img}"
                            <p>${nombre}</p>
                            <img src="${img}" alt="${nombre}">
                            <p>${precio}€</p>
                            <button class="boton">Añadir</button>
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

                    elegirProducto();
                })
                .catch((error) => console.error(error));






                
function elegirProducto(){
    const productos = document.querySelectorAll(".producto");
    const botones = document.querySelectorAll(".boton");

    
        botones.forEach(boton => {
            boton.addEventListener("click",subirContador)
        });
        

}



function subirContador(evento){
    const producto = evento.target.parentElement;
    console.log(producto.dataset);
    let precio = Number(producto.dataset.precio);
    console.log(precio);
    
    const a = document.getElementById("a");
    a.innerText = precio;

    // actualizarContador();

    // let ganadorActual = producto.dataset.nombre;
    // const listaP = document.querySelectorAll("div[data-product]");


    // if(votoProducto > mayorVotos){
    //     listaP.forEach((producto) => {
    //     producto.dataset.ganador = false;
    //     });
    //     mayorVotos = votoProducto;
    //     ganadorActual = producto.dataset.nombre;
    //     nombre = ganadorActual;
    //     producto.dataset.ganador = true;
    //     ganador.innerHTML = `${ganadorActual}`;
    // }

}