// Obtiene el dato del nombre del usuario desde sessionStorage para agregarlo al header
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
    retiro.style.display = "none";
    historial.style.display = "none";
}
function irBilletera() {
    botonAccionado.addEventListener("click", () => {
        billetera.style.display = "flex";
        abono.style.display = "none";
        compra.style.display = "none";
        retiro.style.display = "none";
        historial.style.display = "none";
    });
}

function irAbonar() {
    botonAccionado.addEventListener("click", () => {
        abono.style.display = "flex";
        billetera.style.display = "none";
        compra.style.display = "none";
        retiro.style.display = "none";
        historial.style.display = "none";
    });
}
function irAbonarDesdeWallet() {
    abono.style.display = "flex";
    billetera.style.display = "none";
    compra.style.display = "none";
    retiro.style.display = "none";
    historial.style.display = "none";
}

function irComprar() {
    botonAccionado.addEventListener("click", () => {
        compra.style.display = "flex";
        billetera.style.display = "none";
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
        abono.style.display = "none";
        historial.style.display = "none";
    });
}

function irRetirarDesdeWallet() {
    retiro.style.display = "flex";
    billetera.style.display = "none";
    compra.style.display = "none";
    abono.style.display = "none";
    historial.style.display = "none";
}

function irHistorial() {
    botonAccionado.addEventListener("click", () => {
        historial.style.display = "flex";
        billetera.style.display = "none";
        compra.style.display = "none";
        retiro.style.display = "none";
        abono.style.display = "none";
    });
}


for (let i = 0; i < 6; i++) {
    botonAccionado = document.getElementById(`navegacionBtn__${i}`);

    if (i === 1) {
        irBilletera();
    } else if (i === 2) {
        irAbonar();
    } else if (i === 3) {
        irRetirar();
    } else if (i === 4) {
        irComprar();
    } else if (i === 5) {
        irHistorial();
    } else {
        inicio();
    }
};



// Cambia la selección en la seccion Comprar/Vender según se presione la seccion compra o venta
let btnCompraVenta;
let contenedorCompraVenta; let contenedorFormCompra = document.getElementById("contenedorForm__compra");
let contenedorFormVenta = document.getElementById("contenedorForm__venta");
let windowCompra = document.getElementById("windowCompra");
let windowVenta = document.getElementById("windowVenta");
let btnWindowCompra = document.getElementById("compraVenta__1");
let btnWindowVenta = document.getElementById("compraVenta__2");


/* 
Rodrigo, aquí tuve que harcodearlo un poco ya que cuando seleccionaba venta, me modificaba los estilos correctamente
segun la clase agregada, pero al volver a Compra, me dejaba algunos estilos de la clase que debía remover

¿Habrá alguna manera para simplificarlo? 
*/

for (let i = 0; i < 3; i++) {
    btnCompraVenta = document.getElementById(`compraVenta__${i}`)

    if (i === 1) {
        btnCompraVenta.onclick = () => {
            contenedorFormCompra.style.display = "flex";
            contenedorFormVenta.style.display = "none";

            // Estas son las clases que debía agregar o remover
            windowCompra.classList.remove("btnDisabled");
            windowCompra.classList.add("btnActiveCompra");
            windowVenta.classList.add("btnDisabled");

            // Y así tuve que hardcodearlo
            windowCompra.style.borderTop = "3px solid #255f85";
            windowCompra.style.borderRight = "1px solid #ddd";
            windowVenta.style.border = "none";
            btnWindowCompra.style.color = "#255f85"
            btnWindowVenta.style.color = "#000";
        }
    } else if (i === 2) {
        btnCompraVenta.onclick = () => {
            contenedorFormVenta.style.display = "flex";
            contenedorFormCompra.style.display = "none";
            // Lo mismo en este caso
            windowVenta.classList.remove("btnDisabled")
            windowVenta.classList.add("btnActiveVenta");
            windowCompra.classList.add("btnDisabled");

            // Y aquí
            windowVenta.style.borderTop = "3px solid #c3451b";
            windowVenta.style.borderRight = "1px solid #ddd";
            windowCompra.style.border = "none";
            btnWindowVenta.style.color = "#c3451b"
            btnWindowCompra.style.color = "#000";
        }
    } else {
        // Este es lo mismo de la primera condicion, tuve que agregarlo para que me deje estos estilos por defecto
        contenedorFormCompra.style.display = "flex";
        contenedorFormVenta.style.display = "none";
        windowCompra.classList.remove("btnDisabled");
        windowCompra.classList.add("btnActiveCompra");
        windowVenta.classList.add("btnDisabled");
        windowCompra.style.borderTop = "3px solid #255f85";
        windowCompra.style.borderRight = "1px solid #ddd";
        windowVenta.style.border = "none";
        btnWindowCompra.style.color = "#255f85"
        btnWindowVenta.style.color = "#000";
    }
}


