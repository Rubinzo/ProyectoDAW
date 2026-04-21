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


                        contenedorProductos.innerHTML += `
                        <div class="producto" data-nombre = ${nombre} 
                        data-status="activo">
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
                                console.log("coincide")
                                producto[i].style.display ="block";
                            
                            }else{
                                console.log("No coincide");
                                producto[i].style.display = "none";
                                
                            }
                        }
                    }
                })
                .catch((error) => console.error(error));

//Buscador por nombre

