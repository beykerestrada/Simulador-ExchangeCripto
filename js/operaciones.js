
const modalContainer = document.getElementById("modalContainer");
const saldoAbonado = document.getElementById("btn__abonar");
const saldoRetirado = document.getElementById("btn__retirar")
let contenedorLogin = document.getElementById("contenedorLogin");
const estandarDolaresAmericanos = Intl.NumberFormat('en-US');
const actualizarSaldoUsd = document.getElementById("actualizarSaldoUsd");
const saldos = [];




// Declaracion de funcion que actualiza el saldo en la seccion billetera 
function actualizarSaldo(){
    let saldoBilletera = JSON.parse(localStorage.getItem("saldoActual"))
    if(!saldoBilletera){
        actualizarSaldoUsd.innerHTML = `$ 0`;
    }
    else {
        actualizarSaldoUsd.innerHTML = `$ ${estandarDolaresAmericanos.format(saldoBilletera)}`;
    }
    
}
actualizarSaldo();



//COMIENZO FLUJO DE ABONO DE SALDO
//declaracion de variables
let saldoUsd;
let saldoActual;
let monedaAbonada;
let newTransaction;
let id = 0;

// Declaracion de funcion
function abonarSaldo() {
        operacion = "Abono";
        monedaOperada= "USD";
        saldoUsd = parseInt(document.getElementById("valorAbono").value);
        if(!saldoUsd){
            alert("Por favor ingresa el saldo a abonar");
        }else if(saldoUsd < 10) {
            alert("El mínimo a abonar es 10 USD");
        }else {
            saldoActual = JSON.parse(localStorage.getItem("saldoActual"));
            saldoActual = saldoActual + saldoUsd;

            //aqui se actualiza el saldo en local storage
            localStorage.setItem("saldoActual", JSON.stringify(saldoActual));
            actualizarSaldo();
            inicio();
            addTransaction(transactionHistory.length + 1, operacion, monedaOperada, saldoUsd, "");
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

let retiroUsd;

// Declaracion de funcion
function retirarSaldo() {
        monedaOperada = "USD";
        operacion = "Retiro";
        retiroUsd = parseInt(document.getElementById("valorRetiro").value);
        if(!retiroUsd){
            alert("Por favor ingresa el saldo a retirar");
        }else if(retiroUsd < 10) {
            alert("El mínimo a retirar es 10 USD");
        }else {
            saldoActual = JSON.parse(localStorage.getItem("saldoActual"));
            saldoActual = saldoActual - retiroUsd;

            //Aqui hago uso del localStorage para actualizar el saldo
            localStorage.setItem("saldoActual", JSON.stringify(saldoActual));
            actualizarSaldo();
            inicio();
            addTransaction(transactionHistory.length + 1, operacion, monedaOperada, retiroUsd, "");
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
    }else if (i === 2){
        cancelar.addEventListener("click", inicio);
    }else if (i === 3){
        cancelar.addEventListener("click", inicio);
    }else if (i === 4){
        cancelar.addEventListener("click", inicio);
    }else if (i === 5){
        cancelar.addEventListener("click", inicio);
    }
};

/* Me falta todavia completar alguna secciones de la billetera

Como compra, venta e historial
*/




