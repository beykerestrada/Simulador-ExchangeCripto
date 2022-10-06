
const modalContainer = document.getElementById("modalContainer");
const saldoAbonado = document.getElementById("btn__abonar");
const saldoRetirado = document.getElementById("btn__retirar")
let estandarPesosChilenos = Intl.NumberFormat('es-CL');
const actualizarSaldoClp = document.getElementById("actualizarSaldoClp");
const actualizarSaldoBtc = document.getElementById("actualizarSaldoBtc");
const actualizarSaldoEth = document.getElementById("actualizarSaldoEth");
const actualizarSaldoUsdc = document.getElementById("actualizarSaldoUsdc");
const actualizarSaldoLtc = document.getElementById("actualizarSaldoLtc");
const actualizarSaldoBch = document.getElementById("actualizarSaldoBch");
const saldos = [];


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
let saldoBilletera;
// Declaracion de funcion que actualiza el saldo en la seccion billetera 
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
let saldoActual;
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
// invocacion de función al presionar la Enter
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
let retiroClp;

// Declaracion de funcion
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
let cancelar;
for (let i = 0; i < 6; i++) {
    cancelar = document.getElementById(`cancelar__${i}`);

    if (i === 1) {
        cancelar.addEventListener("click", inicio);
    } else if (i === 2) {
        cancelar.addEventListener("click", inicio);
    } else if (i === 3) {
        cancelar.addEventListener("click", inicio);
    } else if (i === 4) {
        cancelar.addEventListener("click", inicio);
    } else if (i === 5) {
        cancelar.addEventListener("click", inicio);
    }
};





//COMIENZO DEL FLUJO DE COMPRA

//Funciones que activan la compra de alguna cripto, según la opción de la lista que se elija
let saldoBilleteraBtc;
function updateSaldoBtc() {
    saldoBilleteraBtc = JSON.parse(localStorage.getItem("saldoBtc"));

    if (!saldoBilleteraBtc) {
        actualizarSaldoBtc.innerHTML = `$ 0`;
    } else {
        actualizarSaldoBtc.innerHTML = `&#8383; ${saldoBilleteraBtc}`;
    }
}
updateSaldoBtc();

let saldoEth;
function updateSaldoEth() {
    saldoEth = JSON.parse(localStorage.getItem("saldoEth"));

    if (!saldoEth) {
        actualizarSaldoEth.innerHTML = `$ 0`;
    } else {
        actualizarSaldoEth.innerHTML = `&#8383; ${saldoEth}`;
    }
}
updateSaldoEth();

let saldoUsdc;
function updateSaldoUsdc() {
    saldoUsdc = JSON.parse(localStorage.getItem("saldoUsdc"));

    if (!saldoUsdc) {
        actualizarSaldoUsdc.innerHTML = `$ 0`;
    } else {
        actualizarSaldoUsdc.innerHTML = `$ ${saldoUsdc}`;
    }
}
updateSaldoUsdc();

let saldoLtc;
function updateSaldoLtc() {
    saldoLtc = JSON.parse(localStorage.getItem("saldoLtc"));

    if (!saldoLtc) {
        actualizarSaldoLtc.innerHTML = `$ 0`;
    } else {
        actualizarSaldoLtc.innerHTML = `$ ${saldoLtc}`;
    }
}
updateSaldoLtc();

let saldoBch;
function updateSaldoBch() {
    saldoBch = JSON.parse(localStorage.getItem("saldoBch"));

    if (!saldoBch) {
        actualizarSaldoBch.innerHTML = `$ 0`;
    } else {
        actualizarSaldoBch.innerHTML = `$ ${saldoBch}`;
    }
}
updateSaldoBch();

function comprarBtc() {
    monedaOperada = "BTC";
    let cantidadRecibida = valorCompra / valorBtc;
    console.log(cantidadRecibida);

    let saldoBtc = JSON.parse(localStorage.getItem("saldoBtc"));
    saldoBtc = parseFloat(saldoBtc + cantidadRecibida);
    saldoBtc = saldoBtc.toFixed(8);

    saldoActual = JSON.parse(localStorage.getItem("saldoActual"));
    saldoActual = saldoActual - valorCompra;

    //aqui se actualiza el saldo en local storage
    localStorage.setItem("saldoBtc", JSON.stringify(saldoBtc));
    localStorage.setItem("saldoActual", JSON.stringify(saldoActual));

    actualizarSaldo();
    updateSaldoBtc();
    addCryptoTransaction(transactionHistory.length + 1, operacion, monedaOperada, cantidadRecibida, `$ ${estandarPesosChilenos.format(valorBtc)}`);
    operacionExitosa();
}

function comprarEth() {
    monedaOperada = "ETH";
    let cantidadRecibida = valorCompra / valorEth;
    console.log(cantidadRecibida);

    saldoEth = JSON.parse(localStorage.getItem(saldoEth));
    saldoEth = parseFloat(saldoEth + cantidadRecibida);
    saldoEth = saldoEth.toFixed(8);

    saldoActual = JSON.parse(localStorage.getItem("saldoActual"));
    saldoActual = saldoActual - valorCompra;

    //aqui se actualiza el saldo en local storage
    localStorage.setItem("saldoEth", JSON.stringify(saldoEth));
    localStorage.setItem("saldoActual", JSON.stringify(saldoActual));

    actualizarSaldo();
    updateSaldoEth();
    addCryptoTransaction(transactionHistory.length + 1, operacion, monedaOperada, cantidadRecibida, `$ ${estandarPesosChilenos.format(valorEth)}`);
    operacionExitosa();
}

function comprarUsdc() {
    monedaOperada = "USDC";
    let cantidadRecibida = valorCompra / valorUsdc;
    console.log(cantidadRecibida);

    saldoUsdc = JSON.parse(localStorage.getItem(saldoUsdc));
    saldoUsdc = parseFloat(saldoUsdc + cantidadRecibida);
    saldoUsdc = saldoUsdc.toFixed(8);

    saldoActual = JSON.parse(localStorage.getItem("saldoActual"));
    saldoActual = saldoActual - valorCompra;

    //aqui se actualiza el saldo en local storage
    localStorage.setItem("saldoUsdc", JSON.stringify(saldoUsdc));
    localStorage.setItem("saldoActual", JSON.stringify(saldoActual));

    actualizarSaldo();
    updateSaldoUsdc();
    addCryptoTransaction(transactionHistory.length + 1, operacion, monedaOperada, cantidadRecibida, `$ ${estandarPesosChilenos.format(valorUsdc)}`);
    operacionExitosa();
}

function comprarLtc() {
    monedaOperada = "LTC";
    let cantidadRecibida = valorCompra / valorLtc;
    console.log(cantidadRecibida);

    saldoLtc = JSON.parse(localStorage.getItem(saldoLtc));
    saldoLtc = parseFloat(saldoLtc + cantidadRecibida);
    saldoLtc = saldoLtc.toFixed(8);

    saldoActual = JSON.parse(localStorage.getItem("saldoActual"));
    saldoActual = saldoActual - valorCompra;

    //aqui se actualiza el saldo en local storage
    localStorage.setItem("saldoLtc", JSON.stringify(saldoLtc));
    localStorage.setItem("saldoActual", JSON.stringify(saldoActual));

    actualizarSaldo();
    updateSaldoUsdc();
    addCryptoTransaction(transactionHistory.length + 1, operacion, monedaOperada, cantidadRecibida, `$ ${estandarPesosChilenos.format(valorLtc)}`);
    operacionExitosa();
}

function comprarBch() {
    monedaOperada = "BCH";
    let cantidadRecibida = valorCompra / valorBch;
    console.log(cantidadRecibida);

    saldoBch = JSON.parse(localStorage.getItem(saldoBch));
    saldoBch = parseFloat(saldoBch + cantidadRecibida);
    saldoBch = saldoBch.toFixed(8);

    saldoActual = JSON.parse(localStorage.getItem("saldoActual"));
    saldoActual = saldoActual - valorCompra;

    //aqui se actualiza el saldo en local storage
    localStorage.setItem("saldoBch", JSON.stringify(saldoBch));
    localStorage.setItem("saldoActual", JSON.stringify(saldoActual));

    actualizarSaldo();
    updateSaldoUsdc();
    addCryptoTransaction(transactionHistory.length + 1, operacion, monedaOperada, cantidadRecibida, `$ ${estandarPesosChilenos.format(valorBch)}`);
    operacionExitosa();
}

//Funcion que identifica la opción seleccionada 
let moneda;
let listaCompra = document.getElementById("listaCompra");
listaCompra.addEventListener("change", (event) => {
    obtenerMonedaSeleccionada();
})

function obtenerMonedaSeleccionada() {
    let monedaSeleccionada = document.getElementById("listaCompra").value;
    console.log(monedaSeleccionada);

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
            text: `Saldo insuficiente, ingresa un monto menor a $${estandarPesosChilenos.format(saldoBilletera + 1)}`,
        })
    } else {
        obtenerMonedaSeleccionada();
        
        if (moneda === 1) {
            comprarBtc();
        }else if(moneda === 2){
            comprarEth();
        }else if(moneda === 3){
            comprarUsdc();
        }else if(moneda === 4){
            comprarLtc();
        }else if(moneda === 5){
            comprarBch();
        }
    }
}

let inputCompra = document.getElementById("valorCompra");
inputCompra.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        comprarMoneda();
    }
});