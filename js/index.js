function simulador() {

    let saldoUsd = 0;
    let cantidad = 0;
    let compra = 0;
    let moneda = 0;

// ARRAY QUE ALMACENA LAS DIFERENTES CRIPTOMONEDAS EN OFERTA COMO OBJETOS

    const currencies = [
        {nombre: "USDCoin", signo: "USDC", valor: 1},
        {nombre: "Bitcoin", signo: "BTC", valor: 20067.80},
        {nombre: "Ether", signo: "ETH", valor: 1487.74},
    ]

// SE CREA LA CONSTANTE PRECIOS PARA EXTRAER EL PRECIO DE LAS CRIPTOS DESDE EL ARRAY Y PODER USARLO PARA REALIZAR LA CONVERSION MÁS ADELANTE
    const precios = currencies.map(i => i.valor);
    console.log(precios);

    //Este bucle activa la acción de abonar a la billetera y guarda el valor en la variable saldoUsd
    function abonar() {
        nombreUsuario = prompt("Ingresa tu nombre");
        alert(`Bievenid@ ${nombreUsuario}`);
        while (saldoUsd <= 0) {
            saldoUsd = parseInt(prompt("Ingrese el monto a abonar en USD"));
            if (saldoUsd < 10) {
                alert(`El monto mínimo que puedes abonar son 10 USD`);
                saldoUsd = 0;
            } else if (Number.isNaN(saldoUsd)) {
                alert("Por favor ingresa un valor numérico");
                saldoUsd = 0;
            }
            else {
                alert(`Tu saldo disponible es: ${saldoUsd} USD`);
            }
        }
    }
    abonar();


    //Esta función primero valida que el monto a gastar no se mayor que el saldo disponible

    function comprar() {
        while (compra <= 0) {
            cantidad = parseInt(prompt("Ingrese el monto a gastar en USD"));
            if (cantidad > saldoUsd) {
                alert(`No tienes saldo suficiente, ingresa un monto menor a ${saldoUsd + 1}`);
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
    }
    resumen();

    
    


}
