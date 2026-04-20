const inicio = document.getElementById("inicio");
const texto = document.getElementById("texto");
const send = document.getElementById("send");
const usuario = document.getElementById("usuario");
const contraseña = document.getElementById("contraseña");

let contador = 0;
inicio.addEventListener("click", function(){
    if(contador == 0){
        inicio.innerHTML = "Login";
        texto.innerHTML = "Register";
        send.innerHTML = "Registrarte";
        usuario.value = "";
        contraseña.value = "";
        contador++;
    }else{
        inicio.innerHTML = "Register";
        texto.innerHTML = "Login";
        send.innerHTML = "Iniciar sesión";
        usuario.value = "";
        contraseña.value = "";
        contador--;
    }
});
const myHeaders = new Headers();

send.addEventListener("click", registrarse);

//Registrarse
function registrarse() {
    const usuario = document.getElementById("usuario");
    const contraseña1 = document.getElementById("contraseña1");
    const contraseña2 = document.getElementById("contraseña2");

    let usuarioValue;
    let contraseña;
    if (contraseña1.value == contraseña2.value) {
        usuarioValue = usuario.value;
        contraseña = contraseña1.value;
        console.log("Nombre: " , usuarioValue);
        console.log("Contraseña: " , contraseña);
        let json = {
            usuario: usuario.value,
            contraseña: contraseña1.value
        };
        console.log(json)
        const sendRegistro = {
            method: "POST",
            headers: myHeaders,
            redirect: "follow",
            body: JSON.stringify(json)
        };
        usuario.value = "";
        contraseña2.value = "";
        fetch("http://localhost:8080/usuario/register", sendRegistro)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
            })
            .catch((error) => console.error(error));

    } else {
        console.log("La contraseña tiene que ser igual");
    }



}