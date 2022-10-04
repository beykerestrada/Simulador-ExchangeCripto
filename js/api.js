

// Url pricipal de la API, el parametro [path] es lo que se debe actualizar según el dato requerido
const baseUrl = `https://www.buda.com/api/v2/[path].json`;

// Función que obtiene los datos de cada cripto: último precio y la fluctuacion de las últimas 24h

// Intercambia el par cripto/clp
const btcClp = "btc-clp";
const ethClp = "eth-clp";
const usdcClp = "usdc-clp";
const ltcClp = "ltc-clp";
const bchClp = "bch-clp";

//Declaracion de variables para ser usada en la funcion updatePrices
let precioBtc;
let variationBtc;
let precioEth;
let variationEth;
let precioUsdc;
let variationUsdc;
let precioLtc;
let variationLtc;
let precioBch;
let variationBch;

function updatePriceBtc() {
    fetch(`https://www.buda.com/api/v2/markets/btc-clp/ticker.json`)
        .then(response => response.json())
        .then(data => {
            precioBtc = parseFloat(data.ticker.last_price[0]);
            variationBtc = parseFloat(data.ticker.price_variation_24h);

            //Renderiza el precio actual y la variacion con respecto al precio de las últimas 24 horas
            let contenedor = document.getElementById("actualizarPrecioBtc");
            contenedor.innerHTML = "";
            let lista = document.createElement("p");
            lista.innerHTML = `$ ${estandarPesosChilenos.format(precioBtc)}<sup id="supBtc">  24h: ${variationBtc}%</sup>`
            contenedor.append(lista);

            //Colorea el texto de verde si la cripto subió de precio o de rojo si la cripto bajó de precio
            let priceVariation = document.getElementById("supBtc");
            if(variationBtc < 0){
                priceVariation.classList.add("priceVariation__negative");
            }else if(variationBtc >= 0){
                priceVariation.classList.add("priceVariation__positive");
            }

        }).catch(error => console.log(error));
}
updatePriceBtc();

function updatePriceEth() {
    fetch(`https://www.buda.com/api/v2/markets/eth-clp/ticker.json`)
        .then(response => response.json())
        .then(data => {
            precioEth = parseFloat(data.ticker.last_price[0]);
            variationEth = parseFloat(data.ticker.price_variation_24h);

            //Renderiza el precio actual y la variacion con respecto al precio de las últimas 24 horas
            let contenedor = document.getElementById("actualizarPrecioEth");
            contenedor.innerHTML = "";
            let lista = document.createElement("p");
        lista.innerHTML = `$ ${estandarPesosChilenos.format(precioEth)}<sup id= "supEth">  24h: ${variationEth}%</sup>`
            contenedor.append(lista);

            //Colorea el texto de verde si la cripto subió de precio o de rojo si la cripto bajó de precio
            let priceVariation = document.getElementById("supEth");
            if(variationEth < 0){
                priceVariation.classList.add("priceVariation__negative");
            }else if(variationEth >= 0){
                priceVariation.classList.add("priceVariation__positive");
            }

        }).catch(error => console.log(error));
}

updatePriceEth();

function updatePriceUsdc() {
    fetch(`https://www.buda.com/api/v2/markets/usdc-clp/ticker.json`)
        .then(response => response.json())
        .then(data => {
            precioUsdc = parseFloat(data.ticker.last_price[0]);
            variationUsdc = parseFloat(data.ticker.price_variation_24h);

            //Renderiza el precio actual y la variacion con respecto al precio de las últimas 24 horas
            let contenedor = document.getElementById("actualizarPrecioUsdc");
            contenedor.innerHTML = "";
            let lista = document.createElement("p");
            lista.innerHTML = `$ ${estandarPesosChilenos.format(precioUsdc)}<sup id="supUsdc">  24h: ${variationUsdc}%</sup>`
            contenedor.append(lista);

            //Colorea el texto de verde si la cripto subió de precio o de rojo si la cripto bajó de precio
            let priceVariation = document.getElementById("supUsdc");
            if(variationUsdc < 0){
                priceVariation.classList.add("priceVariation__negative");
            }else if(variationUsdc >= 0){
                priceVariation.classList.add("priceVariation__positive");
            }

        }).catch(error => console.log(error));
}

updatePriceUsdc();

function updatePriceLtc() {
    fetch(`https://www.buda.com/api/v2/markets/ltc-clp/ticker.json`)
        .then(response => response.json())
        .then(data => {
            precioLtc = parseFloat(data.ticker.last_price[0]);
            variationLtc = parseFloat(data.ticker.price_variation_24h);

            //Renderiza el precio actual y la variacion con respecto al precio de las últimas 24 horas
            let contenedor = document.getElementById("actualizarPrecioLtc");
            contenedor.innerHTML = "";
            let lista = document.createElement("p");
            lista.innerHTML = `$ ${estandarPesosChilenos.format(precioLtc)}<sup id="supLtc">  24h: ${variationLtc}%</sup>`
            contenedor.append(lista);

            //Colorea el texto de verde si la cripto subió de precio o de rojo si la cripto bajó de precio
            let priceVariation = document.getElementById("supLtc");
            if(variationLtc < 0){
                priceVariation.classList.add("priceVariation__negative");
            }else if(variationLtc >= 0){
                priceVariation.classList.add("priceVariation__positive");
            }

        }).catch(error => console.log(error));
}

updatePriceLtc();

function updatePriceBch() {
    fetch(`https://www.buda.com/api/v2/markets/bch-clp/ticker.json`)
        .then(response => response.json())
        .then(data => {
            precioBch = parseFloat(data.ticker.last_price[0]);
            variationBch = parseFloat(data.ticker.price_variation_24h);

            //Renderiza el precio actual y la variacion con respecto al precio de las últimas 24 horas
            let contenedor = document.getElementById("actualizarPrecioBch");
            contenedor.innerHTML = "";
            let lista = document.createElement("p");
            lista.innerHTML = `$ ${estandarPesosChilenos.format(precioBch)}<sup id="supBch">  24h: ${variationBch}%</sup>`
            contenedor.append(lista);

            //Colorea el texto de verde si la cripto subió de precio o de rojo si la cripto bajó de precio
            let priceVariation = document.getElementById("supBch");
            if(variationBch < 0){
                priceVariation.classList.add("priceVariation__negative");
            }else if(variationBch >= 0){
                priceVariation.classList.add("priceVariation__positive");
            }

        }).catch(error => console.log(error));
}

updatePriceBch();

// Determina cada cuanto tiempo se debe actualizar el precio de las cripto, en este caso, cada 5 minutos
let precioActualizado;
function llamadaApi(funcion) {
  precioActualizado = setInterval(funcion, 300000);
}
llamadaApi(updatePriceBtc);
llamadaApi(updatePriceEth);
llamadaApi(updatePriceUsdc);
llamadaApi(updatePriceLtc);
llamadaApi(updatePriceBch);





