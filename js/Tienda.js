//Generar tarjetas
const contenedorProductos = document.getElementById("contenedorProductos");

    
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
                        <div class="producto" data-nombre = ${nombre} 
                        data-status="activo" data-pais="${equipo} 
                        data-seleccion="${seleccion}" data-equipo="${equipo}">
                            <p>${nombre}</p>
                            <img src="${img}" alt="${nombre}">
                            <p>${precio}€</p>
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
                })
                .catch((error) => console.error(error));


//localStorage 
