function simulador() {

    let saldoUsd = 0;
    let cantidad = 0;
    let compra = 0;
    let moneda = 0;



    //Este bucle activa la acción de abonar a la billetera y guarda el valor en la variable saldoUsd
    function abonar() {
        while (saldoUsd <= 0) {
            saldoUsd = parseInt(prompt("Ingrese el monto a abonar en USD"));
            if (saldoUsd < 10) {
                alert(`El monto mínimo que puedes abonar son 10 USD`);
                saldoUsd = 0;
            } else if (Number.isNaN(saldoUsd)) {
                alert("Por favor ingresa un valor numérico")
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
    */

    function convertir(cantidad, moneda) {

        switch (moneda) {
            case 1:
                return cantidad / 20067.80 + " BTC"

            case 2:
                return cantidad / 1487.74 + " ETH";

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
