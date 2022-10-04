
const modalContainer = document.getElementById("modalContainer");
const saldoAbonado = document.getElementById("btn__abonar");
const saldoRetirado = document.getElementById("btn__retirar")
let contenedorLogin = document.getElementById("contenedorLogin");
let estandarPesosChilenos = Intl.NumberFormat('es-CL');
const actualizarSaldoClp = document.getElementById("actualizarSaldoClp");
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

// Declaracion de funcion que actualiza el saldo en la seccion billetera 
function actualizarSaldo() {
    let saldoBilletera = JSON.parse(localStorage.getItem("saldoActual"))
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
    } else if (saldoClp < 10000) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El mínimo a abonar es de $10',
        })
    } else {
        saldoActual = JSON.parse(localStorage.getItem("saldoActual"));
        saldoActual = saldoActual + saldoClp;

        //aqui se actualiza el saldo en local storage
        localStorage.setItem("saldoActual", JSON.stringify(saldoActual));
        actualizarSaldo();
        addTransaction(transactionHistory.length + 1, operacion, monedaOperada, saldoClp, "");
        operacionExitosa();
    }
}

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
    } else if (retiroClp < 10000) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El mínimo a retirar es de $10000',
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
        addTransaction(transactionHistory.length + 1, operacion, monedaOperada, retiroClp, "");
        operacionExitosa();
    }
}

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

/* Me falta todavia completar alguna secciones de la billetera

Como compra, venta e historial
*/




