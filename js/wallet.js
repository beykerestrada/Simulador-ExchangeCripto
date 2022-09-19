// Obtiene el dato dell nombre del usuario desde sessionStorage para agregarlo al header
let usuario = sessionStorage.getItem("usuario");
let nombreUsuario = document.createElement("div");
nombreUsuario.innerHTML = `
                        <div class="nombreUsuario__p"><p>Usuario: ${usuario}</p></div>
                        <div class="logOut"><i class="uil uil-signout" id="btnLogOut"></i></div>
                        `;
nombreUsuario.classList.add("nombreUsuario")
contenedorLogin.append(nombreUsuario);

//Boton de logOut para retornar a la página de inicio, tambien limpia el sessionStorage

const btnLogOut = document.getElementById("btnLogOut");
btnLogOut.onclick = () => {
    sessionStorage.clear();
    location.href = "../index.html";
}

//Funciones que controlan las secciones de la billetera según la opcion seleccionada en el menu
let botonAccionado;
function inicio() {
    billetera.style.display = "flex";
        abono.style.display = "none";
        compra.style.display = "none";
        venta.style.display = "none";
        retiro.style.display = "none";
        historial.style.display = "none";
}
function irBilletera() {
    botonAccionado.addEventListener("click", () => {
        billetera.style.display = "flex";
        abono.style.display = "none";
        compra.style.display = "none";
        venta.style.display = "none";
        retiro.style.display = "none";
        historial.style.display = "none";
    });
}

function irAbonar() {
    botonAccionado.addEventListener("click", () => {
        abono.style.display = "flex";
        billetera.style.display = "none";
        compra.style.display = "none";
        venta.style.display = "none";
        retiro.style.display = "none";
        historial.style.display = "none";
    });
}
function irAbonarDesdeWallet (){
    abono.style.display = "flex";
        billetera.style.display = "none";
        compra.style.display = "none";
        venta.style.display = "none";
        retiro.style.display = "none";
        historial.style.display = "none";
}

function irComprar() {
    botonAccionado.addEventListener("click", () => {
        compra.style.display = "flex";
        billetera.style.display = "none";
        abono.style.display = "none";
        venta.style.display = "none";
        retiro.style.display = "none";
        historial.style.display = "none";
    });
}

function irVender() {
    botonAccionado.addEventListener("click", () => {
        venta.style.display = "flex";
        billetera.style.display = "none";
        compra.style.display = "none";
        abono.style.display = "none";
        retiro.style.display = "none";
        historial.style.display = "none";
    });
}

function irRetirar() {
    botonAccionado.addEventListener("click", () => {
        retiro.style.display = "flex";
        billetera.style.display = "none";
        compra.style.display = "none";
        venta.style.display = "none";
        abono.style.display = "none";
        historial.style.display = "none";
    });
}

function irRetirarDesdeWallet() {
        retiro.style.display = "flex";
        billetera.style.display = "none";
        compra.style.display = "none";
        venta.style.display = "none";
        abono.style.display = "none";
        historial.style.display = "none";
}

function irHistorial() {
    botonAccionado.addEventListener("click", () => {
        historial.style.display = "flex";
        billetera.style.display = "none";
        compra.style.display = "none";
        venta.style.display = "none";
        retiro.style.display = "none";
        abono.style.display = "none";
    });
}


for (let i = 0; i < 7; i++) {
    botonAccionado = document.getElementById(`navegacionBtn__${i}`);

    if (i === 1) {
        irBilletera();
    }else if(i === 2){
        irAbonar();
    }else if (i === 3) {
        irComprar();
    } else if (i === 4) {
        irVender();
    }else if (i === 5) {
        irRetirar();
    }else if (i === 6) {
        irHistorial();
    } else {
        inicio();
    }
};




