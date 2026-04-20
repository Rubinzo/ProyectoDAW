//Generar tarjetas
const contenedorProductos = document.getElementById("contenedorProductos");


fetch("/Producto.xml").then((response) => response.text())
    .then((data) => {

        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "text/xml");
        const productos = xml.getElementsByTagName("producto");

        for(let producto of productos){

            const nombre = producto.getElementsByTagName("nombre")[0].textContent;
            const precio = producto.getElementsByTagName("precio")[0].textContent;


            contenedorProductos.innerHTML += `
            <div class="producto" data-nombre = ${nombre} 
            data-status="activo">
                <p>${nombre}</p>
                <p>${precio}</p>
            </div>
            `;

        }

    });