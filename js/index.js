
// Se crean constantes para trabajar con modal en el sitio

const open = document.getElementById("open");
const close = document.getElementById("close");
const modalContainer = document.getElementById("modalContainer");
const saldoAbonado = document.getElementById("btn__abonar");

// Deteccion de eventos para mostrar y esconder el modal que tiene como función el abono a la billetera
saldoAbonado.addEventListener("click", (e) => {
    e.preventDefault();
    modalContainer.classList.remove("show");
})

open.addEventListener("click", (e) => {
    e.preventDefault();
    modalContainer.classList.add("show");
});
close.addEventListener("click", (e) => {
    modalContainer.classList.remove("show");
    e.preventDefault();
});




/* Con esta función practiqué la consigna del desafío, que es recibir datos y modificar el HTML con esos datos
    Funcion abonar se activa al hacer clic en el boton "Abonar Saldo".
    Antes tenía un bucle que validaba que se ingresara un valor numérico, mayor a 10 USD.
    Ahora esto se hace mediante el HTML.
    
    Además al terminar el proceso con el botón "Abonar" dentro del modal. Se escribe mediante 
    JavaScript, el saldo abonado en la parte derecha de la cabecera*/
function abonar(){
    saldoUsd = document.getElementById("valorAbono").value;
    let saldoUsdCifra = document.getElementById("saldoUsdCifra");
    saldoUsdCifra.innerHTML = saldoUsd;
}

// Deteccion de eventos para activar la función abonar 
let btnAbonar = document.getElementById("btn__abonar");
btnAbonar.onclick = abonar;

function simulador() {

    let cantidad = 0;
    let compra = 0;
    let moneda = 0;

    // ARRAY QUE ALMACENA LAS DIFERENTES CRIPTOMONEDAS EN OFERTA COMO OBJETOS

    const currencies = [
        { nombre: "USDCoin", signo: "USDC", valor: 1 },
        { nombre: "Bitcoin", signo: "BTC", valor: 20067.80 },
        { nombre: "Ether", signo: "ETH", valor: 1487.74 },
    ]

    // SE CREA LA CONSTANTE PRECIOS PARA EXTRAER EL PRECIO DE LAS CRIPTOS DESDE EL ARRAY "CURRENCIES" Y PODER USARLO PARA REALIZAR LA CONVERSION MÁS ADELANTE
    const precios = currencies.map(i => i.valor);




    //Esta función primero valida que el monto a gastar no se mayor que el saldo disponible

    function comprar() {
        while (compra <= 0) {
            cantidad = parseInt(prompt("Ingrese el monto a gastar en USD"));
            if (cantidad > saldoUsd) {
                alert(`No tienes saldo suficiente, ingresa un monto menor a ${saldoUsd}`);
                compra = 0;
            } else if (Number.isNaN(cantidad)) {
                alert("Por favor ingresa un valor numérico")
                compra = 0;
            }
            else {
                alert(`Genial, gastarás: ${cantidad} USD`);
                compra = 1;
                saldoUsd -= cantidad;
            }
        }
    }
    comprar();

    moneda = parseInt(prompt("Ingresa el número de la criptomoneda que deseas comprar\n\n1.- BTC\n2.- ETH\n3.- USDC"));


    // Esta es la funcion que hace la conversion de monedas según el tipo de cambio. 

    /* Tipo de cambio referencial para las operaciones
    BTC: 20067.80 USD
    ETH: 1487.74 USD
    USDC: 1 USD

    Este dato se extrae desde la constante "PRECIOS", primero fue filtrado desde el array "CURRENCIES"

    */

    function convertir(cantidad, moneda) {
        
        switch (moneda) {
            case 1:
                return cantidad / precios[1] + " BTC";

            case 2:
                return cantidad / precios[2] + " ETH";

            case 3:
                return cantidad + " USDC";

            default:
                return "Moneda inválida"
        }

    }

    let saldoCrypto = convertir(cantidad, moneda);

    
    //Entrega el resultado de la operación de compra. 
    function resumen() {
        if (moneda <= 3) {
            alert(`Has comprado exitosamente ${saldoCrypto}`);
            alert(`RESUMEN:\nSaldo abonado: ${saldoUsd + cantidad}\nCriptos compradas: ${saldoCrypto}\nSaldo disponible en USD: ${saldoUsd}\n`);
        } else {
            alert("Opción inválida");
            alert(`RESUMEN:\nSaldo abonado: ${saldoUsd + cantidad}\nCriptos compradas: ${0}\nSaldo disponible en USD: ${saldoUsd + cantidad}\n`);
        }
        saldoUsdCifra.innerHTML = saldoUsd; //Esto vuelve a modificar el HTML, modificando en la cabecera el valor "Saldo Disponible"
    }
    resumen();
}

//Deteccion de eventos para actvar la función simulador
const btnComprar = document.getElementById("btnComprar");
btnComprar.addEventListener("click", simulador); 
