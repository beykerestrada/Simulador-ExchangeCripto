const modalContainer = document.getElementById("modalContainer");
const saldoAbonado = document.getElementById("btn__abonar");
const saldoRetirado = document.getElementById("btn__retirar")
let estandarPesosChilenos = Intl.NumberFormat('es-CL');
const actualizarSaldoClp = document.getElementById("actualizarSaldoClp");
let saldoActual = JSON.parse(localStorage.getItem("saldoActual"));
const saldoBtc = JSON.parse(localStorage.getItem("saldoBtc"));
const saldoEth = JSON.parse(localStorage.getItem("saldoEth"));
const saldoUsdc = JSON.parse(localStorage.getItem("saldoUsdc"));
const saldoLtc = JSON.parse(localStorage.getItem("saldoLtc"));
const saldoBch = JSON.parse(localStorage.getItem("saldoBch"));
const saldos = []

// Declaracion de funcion que muestra mensaje de éxito al completar una operacion
// Además recarga la página para que la operacion quede reflejada en el historial y devuelve a inicio
function operacionExitosa() {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    Toast.fire({
        icon: 'success',
        title: 'Operación exitosa'
    }).then(() => {
        location.reload().then(() => {
            inicio();
        })
    })
}

// Declaracion de funcion que actualiza el saldo en la seccion billetera 
let saldoBilletera;
function actualizarSaldo() {
    saldoBilletera = JSON.parse(localStorage.getItem("saldoActual"))
    if (!saldoBilletera) {
        actualizarSaldoClp.innerHTML = `$ 0`;
    }
    else {
        actualizarSaldoClp.innerHTML = `$ ${estandarPesosChilenos.format(saldoBilletera)}`;
    }
}
actualizarSaldo();

//COMIENZO FLUJO DE ABONO DE SALDO
//declaracion de variables
let saldoClp;
let monedaAbonada;
let newTransaction;
let id = 0;

// Declaracion de funcion
function abonarSaldo() {
    operacion = "Abono";
    monedaOperada = "CLP";
    saldoClp = parseInt(document.getElementById("valorAbono").value);
    if (!saldoClp) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingresa la cantidad a abonar',
        })
    } else if (saldoClp < 2000) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El mínimo a abonar es de $2000',
        })
    } else {
        saldoActual = JSON.parse(localStorage.getItem("saldoActual"));
        saldoActual = saldoActual + saldoClp;

        //aqui se actualiza el saldo en local storage
        localStorage.setItem("saldoActual", JSON.stringify(saldoActual));
        actualizarSaldo();
        addFiatTransaction(transactionHistory.length + 1, operacion, monedaOperada, `$ ${estandarPesosChilenos.format(saldoClp)}`, "");
        operacionExitosa();
    }
}
// invocacion de función al presionar la tecla Enter
let inputAbono = document.getElementById("valorAbono");
inputAbono.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        abonarSaldo();
    }
});

//Invocacion de funcion desde la opcion Abonar en el menu de navegacion
saldoAbonado.onclick = () => {
    abonarSaldo();

}

//Invocacion de funcion desde el boton Abonar en la seccion Billetera
let btnAbonar = document.getElementById("btnAbonar");
btnAbonar.onclick = () => {
    irAbonarDesdeWallet();
}
// FIN FLUJO DE ABONO DE SALDO

//COMIENZO FLUJO DE RETIRO
// Declaracion de funcion
let retiroClp;
function retirarSaldo() {
    saldoActual = JSON.parse(localStorage.getItem("saldoActual"));
    monedaOperada = "CLP";
    operacion = "Retiro";
    retiroClp = parseInt(document.getElementById("valorRetiro").value);
    if (!retiroClp) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingresa un monto válido',
        })
    } else if (retiroClp < 2000) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El mínimo a retirar es de $2000',
        })
    } else if (retiroClp > saldoActual) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Saldo insuficiente, ingresa un monto menor a $${estandarPesosChilenos.format(saldoActual) + 1}`,
        })
    }
    else {
        saldoActual = saldoActual - retiroClp;
        //Aqui hago uso del localStorage para actualizar el saldo
        localStorage.setItem("saldoActual", JSON.stringify(saldoActual));
        actualizarSaldo();
        addFiatTransaction(transactionHistory.length + 1, operacion, monedaOperada, `$ ${estandarPesosChilenos.format(retiroClp)}`, "");
        operacionExitosa();
    }
}

//invocacion de funcion al presionar Enter
let inputRetiro = document.getElementById("valorRetiro");
inputRetiro.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        retirarSaldo();
    }
});
//Invocacion de funcion desde la opcion Abonar en el menu de navegacion
saldoRetirado.onclick = () => {
    retirarSaldo();
}

//Invocacion de funcion desde el boton Abonar en la seccion Billetera
let btnRetirar = document.getElementById("btnRetirar");
btnRetirar.onclick = () => {
    irRetirarDesdeWallet();
}
//FIN FLUJO DE RETIRO

//Cuando se presiona el boton cancelar desde cualquier flujo, vuelve al inicio
function operacionCancelada() {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    Toast.fire({
        icon: 'error',
        title: 'Operación cancelada'
    }).then(() => {
        location.reload().then(() => {
            inicio();
        })
    })
}

let cancelar;
for (let i = 0; i < 6; i++) {
    cancelar = document.getElementById(`cancelar__${i}`);

    if (i === 1) {
        cancelar.addEventListener("click", operacionCancelada);
    } else if (i === 2) {
        cancelar.addEventListener("click", operacionCancelada);
    } else if (i === 3) {
        cancelar.addEventListener("click", operacionCancelada);
    } else if (i === 4) {
        cancelar.addEventListener("click", operacionCancelada);
    } else if (i === 5) {
        cancelar.addEventListener("click", inicio);
    }
};

//COMIENZO DEL FLUJO DE COMPRA
//Funciones que actualizan el saldo en cripto despues de una compra o venta

function updateSaldo(moneda) {
    const localStorageKey = `saldoBilletera${moneda}`
    const actualizarSaldo = document.getElementById(`actualizarSaldo${moneda}`);
    let saldo = JSON.parse(localStorage.getItem(`saldo${moneda}`));
    if (!saldo) {
        actualizarSaldo.innerHTML = `$ 0`;
    } else {
        actualizarSaldo.innerHTML = "";
        actualizarSaldo.innerHTML = `$ ${saldo}`;
    }
}
updateSaldo("Btc");
updateSaldo("Eth");
updateSaldo("Usdc");
updateSaldo("Ltc");
updateSaldo("Bch");

function comprar(moneda) {
    const localStorageKey = `saldo${moneda}`;
    const valorEnClp = obtenerValor(moneda);
    const monedaEnUpperCase = moneda.toUpperCase();
    let cantidadRecibida = valorCompra / valorEnClp;
    let saldo = JSON.parse(localStorage.getItem(localStorageKey));
    saldo = parseFloat(saldo + cantidadRecibida);
    saldo = parseFloat(saldo.toFixed(8));
    saldoActual = JSON.parse(localStorage.getItem("saldoActual"));
    saldoActual = saldoActual - valorCompra;

    //aqui se actualiza el saldo en local storage
    localStorage.setItem(localStorageKey, JSON.stringify(saldo));
    localStorage.setItem("saldoActual", JSON.stringify(saldoActual));

    actualizarSaldo();
    updateSaldo(moneda);
    addCryptoTransaction(transactionHistory.length + 1, operacion, monedaEnUpperCase, cantidadRecibida, `$ ${estandarPesosChilenos.format(valorEnClp)}`);
    operacionExitosa();
}

/* Funcion que identifica cuando se hace clic en boton "Comprar" dentro de la fila de la moneda deseada 
para que quede seleccionada por defecto en el formulario de compra */
let moneda;
let listaCompra = document.getElementById("listaCompra");
listaCompra.addEventListener("change", (event) => {
    obtenerMonedaSeleccionada();
})

function obtenerMonedaSeleccionada() {
    let monedaSeleccionada = document.getElementById("listaCompra").value;
    if (monedaSeleccionada === "Btc") {
        moneda = 1;
    } else if (monedaSeleccionada === "Eth") {
        moneda = 2;
    } else if (monedaSeleccionada === "Usdc") {
        moneda = 3;
    } else if (monedaSeleccionada === "Ltc") {
        moneda = 4;
    } else if (monedaSeleccionada === "Bch") {
        moneda = 5;
    }
}

//Invocación de la funcion comprarMoneda desde el formulario de compra
let btnComprar = document.getElementById("btn__confirmarCompra");
btnComprar.onclick = () => {
    comprarMoneda();
}

//Función que dispara las compras segun la opción identificada
function comprarMoneda() {
    operacion = "Compra";
    valorCompra = parseInt(document.getElementById("valorCompra").value);
    if (!valorCompra) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingresa la cantidad a gastar',
        })
    } else if (valorCompra < 2000) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El mínimo a de compra es de $2000',
        })
    } else if (valorCompra > saldoBilletera || valorCompra > saldoActual) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Saldo insuficiente, ingresa un monto menor a $${estandarPesosChilenos.format(saldoBilletera + 1)} o abona saldo a tu billetera para poder comprar esta cantidad`,
        })
    } else {
        obtenerMonedaSeleccionada();
        if (moneda === 1) {
            comprar("Btc")
        } else if (moneda === 2) {
            comprar("Eth");
        } else if (moneda === 3) {
            comprar("Usdc");
        } else if (moneda === 4) {
            comprar("Ltc");
        } else if (moneda === 5) {
            comprar("Bch");
        }
    }
}
//Invocacion de funcion comprarMoneda al presionar Enter
let inputCompra = document.getElementById("valorCompra");
inputCompra.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        comprarMoneda();
    }
});
//FIN FLUJO DE COMPRA

function obtenerValor(moneda){
    if(moneda === "Btc"){
        return valorBtc
    }else if(moneda === "Eth"){
        return valorEth
    }else if(moneda === "Usdc"){
        return valorUsdc
    }else if(moneda === "Ltc"){
        return valorLtc
    }else if(moneda === "Bch"){
        return valorBch
    }else {
        throw new Error("Moneda no soportada")
    }
}

//COMIENZO FLUJO DE VENTA
function vender(moneda) {
    const localStorageKey = `saldo${moneda}`
    const valorEnClp = obtenerValor(moneda);
    let saldo = JSON.parse(localStorage.getItem(localStorageKey));
    let valorVenta = parseFloat(document.getElementById("valorVenta").value);
    let cantidadRecibida = valorVenta * valorEnClp;
    const monedaEnUpperCase = moneda.toUpperCase();
    if (!valorVenta) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingresa la cantidad a vender',
        })
    } else if (valorVenta < 0.00005) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El mínimo que puedes vender es BTC 0.00005',
        })
    } else if (valorVenta > saldo) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `No tienes suficiente saldo, intenta con una cantidad menor`,
        })
    } else {
        saldo = parseFloat(saldo - valorVenta);
        saldo = parseFloat(saldo.toFixed(8));
        saldoActual = JSON.parse(localStorage.getItem("saldoActual"));
        saldoActual = saldoActual + cantidadRecibida;

        //aqui se actualiza el saldo en local storage
        localStorage.setItem(localStorageKey, JSON.stringify(saldo));
        localStorage.setItem("saldoActual", JSON.stringify(saldoActual));

        actualizarSaldo();
        updateSaldo(moneda);
        addCryptoTransaction(transactionHistory.length + 1, operacion, monedaEnUpperCase, valorVenta, `$ ${estandarPesosChilenos.format(valorEnClp)}`);
        operacionExitosa();
    }
}

/* Funcion que identifica cuando se hace clic en boton "Vender" dentro de la fila de la moneda deseada 
para que quede seleccionada por defecto en el formulario de venta */
function obtenerCryptoSeleccionada() {
    let monedaSeleccionada = document.getElementById("listaCripto").value;
    if (monedaSeleccionada === "Btc") {
        moneda = 1;
    } else if (monedaSeleccionada === "Eth") {
        moneda = 2;
    } else if (monedaSeleccionada === "Usdc") {
        moneda = 3;
    } else if (monedaSeleccionada === "Ltc") {
        moneda = 4;
    } else if (monedaSeleccionada === "Bch") {
        moneda = 5;
    }
}

//Función que dispara las ventas segun la opción identificada
function venderMoneda() {
    operacion = "Venta";
    obtenerCryptoSeleccionada();
    if (moneda === 1) {
        vender("Btc");
    } else if (moneda === 2) {
        vender("Eth");
    } else if (moneda === 3) {
        vender("Usdc");
    } else if (moneda === 4) {
        vender("Ltc");
    } else if (moneda === 5) {
        vender("Bch");
    }
}

////Invocación de la funcion venderMoneda desde al presionar Enter
let inputVenta = document.getElementById("valorVenta");
inputVenta.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        venderMoneda();
    }
});
//Invocación de la funcion venderMoneda desde el formulario de venta
let btnVender = document.getElementById("btn__confirmarVenta");
btnVender.onclick = () => {
    venderMoneda();
}
//FIN FLUJO DE VENTA

//Invocación de funciones desde los botones de la wallet
let opcionCompraBtc = document.getElementById("optionCompra__1");
let opcionCompraEth = document.getElementById("optionCompra__2");
let opcionCompraUsdc = document.getElementById("optionCompra__3");
let opcionCompraLtc = document.getElementById("optionCompra__4");
let opcionCompraBch = document.getElementById("optionCompra__5");
let botonAccionadoCompra;

function irCompraDesdeWallet(option) {
    botonAccionadoCompra.addEventListener("click", () => {
        compra.style.display = "flex";
        billetera.style.display = "none";
        abono.style.display = "none";
        retiro.style.display = "none";
        historial.style.display = "none";
        option.setAttribute("selected", "true")
        if (screen.width < 769){
            botonInicio.classList.remove("active");
            botonAbonar.classList.remove("active");
            botonRetirar.classList.remove("active");
            botonComprar.classList.add("active");
            botonHistorial.classList.remove("active");
        }
    });
}

for (let i = 0; i < 6; i++) {
    botonAccionadoCompra = document.getElementById(`btnComprar__${i}`);
    switch (i) {
        case 1:
            irCompraDesdeWallet(opcionCompraBtc);
            break;
        case 2:
            irCompraDesdeWallet(opcionCompraEth);
            break;
        case 3:
            irCompraDesdeWallet(opcionCompraUsdc);
            break;
        case 4:
            irCompraDesdeWallet(opcionCompraLtc);
            break;
        case 5:
            irCompraDesdeWallet(opcionCompraBch);
            break;
        default:
            break;
    }
};

//Invocación de funciones desde los botones de la wallet
let opcionVentaBtc = document.getElementById("optionVenta__1");
let opcionVentaEth = document.getElementById("optionVenta__2");
let opcionVentaUsdc = document.getElementById("optionVenta__3");
let opcionVentaLtc = document.getElementById("optionVenta__4");
let opcionVentaBch = document.getElementById("optionVenta__5");
let botonAccionadoVenta;

function irVentaDesdeWallet(option) {
    botonAccionadoVenta.addEventListener("click", () => {
        compra.style.display = "flex";
        billetera.style.display = "none";
        abono.style.display = "none";
        retiro.style.display = "none";
        historial.style.display = "none";
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
        option.setAttribute("selected", "true");
        if (screen.width < 769){
            botonInicio.classList.remove("active");
            botonAbonar.classList.remove("active");
            botonRetirar.classList.remove("active");
            botonComprar.classList.add("active");
            botonHistorial.classList.remove("active");
        }
    });
}

//Muestra en un span, el saldo disponible cuando se quiere vender una cripto
const criptomonedas = document.getElementById("listaCripto");
function mostrarSaldoCriptoSpan({ i, saldo, sigla }) {
    let btn = document.getElementById(`btnVender__${i}`);
    btn.addEventListener("click", () => {
        let div = document.getElementById("disponibleCripto");
        div.innerHTML = "";
        let span = document.createElement("span");
        span.innerText = `Disponible: ${saldo} ${sigla}`;
        div.append(span);
    });
}
mostrarSaldoCriptoSpan({ i: 1, saldo: saldoBtc, sigla: "BTC" });
mostrarSaldoCriptoSpan({ i: 2, saldo: saldoEth, sigla: "ETH" });
mostrarSaldoCriptoSpan({ i: 3, saldo: saldoUsdc, sigla: "USDC" });
mostrarSaldoCriptoSpan({ i: 4, saldo: saldoLtc, sigla: "LTC" });
mostrarSaldoCriptoSpan({ i: 5, saldo: saldoBch, sigla: "BCH" });

//Dibuja span de saldo disponible cuando se cambia a cualquier option del select
function dibujarSaldoSpan(saldo, sigla) {
    let div = document.getElementById("disponibleCripto");
    div.innerHTML = "";
    let span = document.createElement("span");
    span.innerText = `Disponible: ${saldo} ${sigla}`;
    div.append(span);
}

//Muestra en un span, el saldo disponible en CLP cuando se quiere hacer un retiro
function mostrarSaldoFiatSpan() {
    let btn = document.getElementById("navegacionBtn__3");
    let btn2 = document.getElementById("btnRetirar");
    let btn3 = document.getElementById("compraVenta__1");
    let btn4 = document.getElementById("navegacionBtn__4")
    btn.addEventListener("click", () => {
        let div = document.getElementById("disponibleClp__1");
        div.innerHTML = "";
        let span = document.createElement("span");
        span.innerText = `Disponible: $${estandarPesosChilenos.format(saldoActual)}`;
        div.append(span);
    });
    btn2.addEventListener("click", () => {
        let div = document.getElementById("disponibleClp__1");
        div.innerHTML = "";
        let span = document.createElement("span");
        span.innerText = `Disponible: $${estandarPesosChilenos.format(saldoActual)}`;
        div.append(span);
    });
    btn3.addEventListener("click", () => {
        let div = document.getElementById("disponibleClp__2");
        div.innerHTML = "";
        let span = document.createElement("span");
        span.innerText = `Disponible: $${estandarPesosChilenos.format(saldoActual)}`;
        div.append(span);
    });
    btn4.addEventListener("click", () => {
        let div = document.getElementById("disponibleClp__2");
        div.innerHTML = "";
        let span = document.createElement("span");
        span.innerText = `Disponible: $${estandarPesosChilenos.format(saldoActual)}`;
        div.append(span);
    });
}
mostrarSaldoFiatSpan();

//Muestra en un span, el saldo disponible en CLP cuando se quiere comprar una cripto
function mostrarSaldoFiatFromComprar(i) {
    let btn = document.getElementById(`btnComprar__${i}`);
    btn.addEventListener("click", () => {
        let div = document.getElementById("disponibleClp__2");
        div.innerHTML = "";
        let span = document.createElement("span");
        span.innerText = `Disponible: $${estandarPesosChilenos.format(saldoActual)}`;
        div.append(span);
    });
}
mostrarSaldoFiatFromComprar(1);
mostrarSaldoFiatFromComprar(2);
mostrarSaldoFiatFromComprar(3);
mostrarSaldoFiatFromComprar(4);
mostrarSaldoFiatFromComprar(5);

for (let i = 0; i < 6; i++) {
    botonAccionadoVenta = document.getElementById(`btnVender__${i}`);
    switch (i) {
        case 1:
            irVentaDesdeWallet(opcionVentaBtc);
            break;
        case 2:
            irVentaDesdeWallet(opcionVentaEth);
            break;
        case 3:
            irVentaDesdeWallet(opcionVentaUsdc);
            break;
        case 4:
            irVentaDesdeWallet(opcionVentaLtc);
            break;
        case 5:
            irVentaDesdeWallet(opcionVentaBch);
            break;
        default:
            break;
    }
};

const mostrarSaldoDisponible = () => {
    const indice = criptomonedas.selectedIndex;
    if (indice === 0) {
        dibujarSaldoSpan(saldoBtc, "BTC");
    } else if (indice === 1) {
        dibujarSaldoSpan(saldoEth, "ETH");
    } else if (indice === 2) {
        dibujarSaldoSpan(saldoUsdc, "USDC");
    } else if (indice === 3) {
        dibujarSaldoSpan(saldoLtc, "LTC");
    } else if (indice === 4) {
        dibujarSaldoSpan(saldoBch, "BCH");
    }
};
criptomonedas.addEventListener("change", mostrarSaldoDisponible);

