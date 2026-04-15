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

send.addEventListener("click", function(){
    usuario.value = "";
    contraseña.value = "";
});