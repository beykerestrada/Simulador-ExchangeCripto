// Obtiene el dato del nombre del usuario desde sessionStorage para agregarlo al header
let contenedorLogin = document.getElementById("contenedorLogin");
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
let botonInicio = document.getElementById(`navegacionBtn__1`);
let botonAbonar = document.getElementById(`navegacionBtn__2`);
let botonRetirar = document.getElementById(`navegacionBtn__3`);
let botonComprar = document.getElementById(`navegacionBtn__4`);
let botonHistorial = document.getElementById(`navegacionBtn__5`);
function inicio() {
    billetera.style.display = "flex";
    abono.style.display = "none";
    compra.style.display = "none";
    retiro.style.display = "none";
    historial.style.display = "none";
    if (screen.width < 769){
        botonInicio.classList.add("active");
        botonAbonar.classList.remove("active");
        botonRetirar.classList.remove("active");
        botonComprar.classList.remove("active");
        botonHistorial.classList.remove("active");
    }
}
function irBilletera() {
    botonAccionado.addEventListener("click", () => {
        billetera.style.display = "flex";
        abono.style.display = "none";
        compra.style.display = "none";
        retiro.style.display = "none";
        historial.style.display = "none";
        if (screen.width < 769){
            botonInicio.classList.add("active");
            botonAbonar.classList.remove("active");
            botonRetirar.classList.remove("active");
            botonComprar.classList.remove("active");
            botonHistorial.classList.remove("active");
        }
    });
}
function irAbonar() {
    botonAccionado.addEventListener("click", () => {
        abono.style.display = "flex";
        billetera.style.display = "none";
        compra.style.display = "none";
        retiro.style.display = "none";
        historial.style.display = "none";
        if (screen.width < 769){
            botonInicio.classList.remove("active");
            botonAbonar.classList.add("active");
            botonRetirar.classList.remove("active");
            botonComprar.classList.remove("active");
            botonHistorial.classList.remove("active");
        }
    });

}
function irAbonarDesdeWallet() {
    abono.style.display = "flex";
    billetera.style.display = "none";
    compra.style.display = "none";
    retiro.style.display = "none";
    historial.style.display = "none";
    if (screen.width < 769){
        botonInicio.classList.remove("active");
        botonAbonar.classList.add("active");
        botonRetirar.classList.remove("active");
        botonComprar.classList.remove("active");
        botonHistorial.classList.remove("active");
    }
}
function irComprar() {
    botonAccionado.addEventListener("click", () => {
        compra.style.display = "flex";
        billetera.style.display = "none";
        abono.style.display = "none";
        retiro.style.display = "none";
        historial.style.display = "none";
        if (screen.width < 769){
            botonInicio.classList.remove("active");
            botonAbonar.classList.remove("active");
            botonRetirar.classList.remove("active");
            botonComprar.classList.add("active");
            botonHistorial.classList.remove("active");
        }
    });
}
function irRetirar() {
    botonAccionado.addEventListener("click", () => {
        retiro.style.display = "flex";
        billetera.style.display = "none";
        compra.style.display = "none";
        abono.style.display = "none";
        historial.style.display = "none";
        if (screen.width < 769){
            botonInicio.classList.remove("active");
            botonAbonar.classList.remove("active");
            botonRetirar.classList.add("active");
            botonComprar.classList.remove("active");
            botonHistorial.classList.remove("active");
        }
    });

}
function irRetirarDesdeWallet() {
    retiro.style.display = "flex";
    billetera.style.display = "none";
    compra.style.display = "none";
    abono.style.display = "none";
    historial.style.display = "none";
    if (screen.width < 769){
        botonInicio.classList.remove("active");
        botonAbonar.classList.remove("active");
        botonRetirar.classList.add("active");
        botonComprar.classList.remove("active");
        botonHistorial.classList.remove("active");
    }
}
function irHistorial() {
    botonAccionado.addEventListener("click", () => {
        historial.style.display = "flex";
        billetera.style.display = "none";
        compra.style.display = "none";
        retiro.style.display = "none";
        abono.style.display = "none";
        if (screen.width < 769){
            botonInicio.classList.remove("active");
            botonAbonar.classList.remove("active");
            botonRetirar.classList.remove("active");
            botonComprar.classList.remove("active");
            botonHistorial.classList.add("active");
        }
    });
}

//Itera los botones del menu de navegacion para mostrar la seccion seleccionada

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

//Modifica los estilos en la seccion Comprar/Vender según el boton al que se haga clic
for (let i = 0; i < 3; i++) {
    btnCompraVenta = document.getElementById(`compraVenta__${i}`)

    if (i === 1) {
        btnCompraVenta.onclick = () => {
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
    } else if (i === 2) {
        btnCompraVenta.onclick = () => {
            contenedorFormVenta.style.display = "flex";
            contenedorFormCompra.style.display = "none";
            windowVenta.classList.remove("btnDisabled")
            windowVenta.classList.add("btnActiveVenta");
            windowCompra.classList.add("btnDisabled");
            windowVenta.style.borderTop = "3px solid #c3451b";
            windowVenta.style.borderRight = "1px solid #ddd";
            windowCompra.style.border = "none";
            btnWindowVenta.style.color = "#c3451b"
            btnWindowCompra.style.color = "#000";
            
            //Dibuja el saldo disponible en Btc, que está seleccionado por defecto
            let div = document.getElementById("disponibleCripto");
            div.innerHTML = "";
            let span = document.createElement("span");
            span.innerText = `Disponible: ${saldoBtc} BTC`;
            div.append(span);
        }
    } else {
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


