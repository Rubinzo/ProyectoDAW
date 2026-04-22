const inicio = document.getElementById("inicio");
const texto = document.getElementById("texto");
const send = document.getElementById("send");
const usuario = document.getElementById("usuario");
const contraseña1 = document.getElementById("contraseña1");
const contraseña2 = document.getElementById("contraseña2");
const validar = document.getElementById("validar");


contraseña2.style.display = "none";
validar.style.display = "none";
let login = true;
inicio.addEventListener("click", function(){
    if(login == true){
        inicio.innerHTML = "Login";
        texto.innerHTML = "Register";
        send.innerHTML = "Registrarte";
        usuario.value = "";
        contraseña1.value = "";
        contraseña2.style.display = "block";
        validar.style.display = "block";
        login = false;
    }else{
        inicio.innerHTML = "Register";
        texto.innerHTML = "Login";
        send.innerHTML = "Iniciar sesión";
        usuario.value = "";
        contraseña1.value = "";
        contraseña2.value = "";
        contraseña2.style.display = "none";
        validar.style.display = "none";
        login = true;
    }
});
const myHeaders = new Headers();

send.addEventListener("click", sesion);
const mensaje = document.getElementById("mensaje");
//Registrarse
function sesion() {
    const usuario = document.getElementById("usuario");
    const contraseña1 = document.getElementById("contraseña1");
    const contraseña2 = document.getElementById("contraseña2");

    let usuarioValue;
    let contraseña;

    if(login == true){
        usuarioValue = usuario.value;
        contraseña = contraseña1.value;
        console.log("Nombre: " , usuarioValue);
        console.log("Contraseña: " , contraseña);
        let json = {
            usuario: usuario.value,
            contraseña: contraseña1.value
        };
        console.log(json)
        const sendLogin = {
            method: "POST",
            headers: myHeaders,
            redirect: "follow",
            body: JSON.stringify(json)
        };
        usuario.value = "";
        contraseña1.value = "";
        fetch("http://localhost:8080/user/login", sendLogin)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);

                    if(result.registrado == true){
                        if(result.equal == true){
                            mensaje.innerText = "Sesión iniciada correctamente";
                            mensaje.style.color = "green";
                            setTimeout(() =>{
                                window.location.href = "Tienda.html"; 
                            }, 1500);
                        }else{
                            mensaje.innerText ="La contraseña no es correcta";
                            mensaje.style.color = "red";
                            setTimeout(() =>{
                                mensaje.innerText ="";
                            }, 1500);
                        }
                    }else{
                        mensaje.innerText ="Ese usuario no está registrado";
                        mensaje.style.color = "red";
                        setTimeout(() =>{
                            mensaje.innerText ="";
                        }, 1500);
                    }
                })
                .catch((error) => console.error(error));
    }else{
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
            contraseña1.value = "";
            contraseña2.value = "";
            fetch("http://localhost:8080/user/register", sendRegistro)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);

                    if(result.registrado == false){
                        mensaje.innerText = "Usuario registrado correctamente";
                        mensaje.style.color = "green";
                        setTimeout(() =>{
                            window.location.href = "Tienda.html"; 
                        }, 1500);
                    }else{
                        mensaje.innerText ="Ese usuario ya está registrado";
                        mensaje.style.color = "red";
                        setTimeout(() =>{
                            mensaje.innerText ="";
                        }, 1500);
                    }
                })
                .catch((error) => console.error(error));

        } else {
            mensaje.innerText ="La contraseña tiene que ser igual";
            mensaje.style.color = "red";
            setTimeout(() =>{
                mensaje.innerText ="";
            }, 1500);
        }
    }


}


  let currentIndex = 1;
  const totalSlides = 3;
  setInterval(() => {
    currentIndex = (currentIndex % totalSlides) + 1;
    document.getElementById(`slide-${currentIndex}`).checked = true;
  }, 4000);