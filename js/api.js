//Declaracion de variables para ser usada en la funcion updatePrice[crypto]
let basePrecioBtc;
let precioBtc;
let variationBtc;
let basePrecioEth;
let precioEth;
let variationEth;
let basePrecioUsdc;
let precioUsdc;
let variationUsdc;
let basePrecioLtc;
let precioLtc;
let variationLtc;
let basePrecioBch;
let precioBch;
let variationBch;

//Declaracion de variables para ser usada en la funcion updateVariation[...]
let variation1;
let variation2;
let variation3;
let variation4;
let variation5;

/* Funcion updateVariation[...] genera un número aleatorio entre -1 y 1 que luego es usado en la funcion
 updatePrice[...] para modificar el precio de las criptos
Simula el movimiento del mercado, donde el precio de las criptos varía según las órdenes que se ejecutan.
*/

// Controla el intervalo para actualizar el precio de la moneda "en tiempo real"
let refreshData;
function refresh(funcion) {
    refreshData = setInterval(funcion, 300000);
}

function updateVariationBtc() {
    let variationMin = -1;
    let variationMax = 1;
    let variationX = Math.random() * (variationMax - variationMin) + variationMin;
    variation1 = parseFloat(variationX.toFixed(3));
}
updateVariationBtc();

function updateVariationEth() {
    let variationMin = -1;
    let variationMax = 1;
    let variationX = Math.random() * (variationMax - variationMin) + variationMin;
    variation2 = parseFloat(variationX.toFixed(3));
}
updateVariationEth();

function updateVariationUsdc() {
    let variationMin = -1;
    let variationMax = 1;
    let variationX = Math.random() * (variationMax - variationMin) + variationMin;
    variation3 = parseFloat(variationX.toFixed(3));
}
updateVariationUsdc();

function updateVariationLtc() {
    let variationMin = -1;
    let variationMax = 1;
    let variationX = Math.random() * (variationMax - variationMin) + variationMin;
    variation4 = parseFloat(variationX.toFixed(3));
}
updateVariationLtc();

function updateVariationBch() {
    let variationMin = -1;
    let variationMax = 1;
    let variationX = Math.random() * (variationMax - variationMin) + variationMin;
    variation5 = parseFloat(variationX.toFixed(3));
}
updateVariationBch();

refresh(updateVariationBtc);
refresh(updateVariationEth);
refresh(updateVariationUsdc);
refresh(updateVariationLtc);
refresh(updateVariationBch);

/* Función updatePrice[...] extrae datos mediante fecth el archivo currencies.json 
luego hace operaciones matemáticas para actualizar el precio según la variación que la extrae de 
la función updateVariation[...]. Finalmente renderiza el resultado en el DOM
*/

function updatePriceBtc() {
    fetch(`../currencies.json`)
        .then(response => response.json())
        .then(data => {
            let dataBtc
            dataBtc = data.filter((item) => item.market_id === "BTC-CLP");
            basePrecioBtc = parseFloat(dataBtc[0].base_price);
            variationBtc = parseFloat(variation1);
            precioBtc = basePrecioBtc - (basePrecioBtc * variationBtc / 100);
            precioBtc = precioBtc.toFixed(2);
            localStorage.setItem("precioBtc", JSON.stringify(precioBtc));

            //Renderiza el precio actual y la variacion con respecto al precio de las últimas 24 horas
            let contenedor = document.getElementById("actualizarPrecioBtc");
            contenedor.innerHTML = "";
            contenedor.innerHTML = `$ ${estandarPesosChilenos.format(precioBtc)}`;
            let variacion = document.getElementById("variationBtc");
            variacion.innerHTML = "";
            variacion.innerHTML = `24h: ${variationBtc}%`

            //Colorea el texto de verde si la cripto subió de precio o de rojo si la cripto bajó de precio
            let priceVariation = document.getElementById("variationBtc");
            if (variationBtc < 0) {
                priceVariation.classList.add("priceVariation__negative");
            } else if (variationBtc >= 0) {
                priceVariation.classList.add("priceVariation__positive");
            }
        }).catch(error => console.log(error));

}
updatePriceBtc();

function updatePriceEth() {
    fetch(`../currencies.json`)
        .then(response => response.json())
        .then(data => {
            let dataEth
            dataEth = data.filter((item) => item.market_id === "ETH-CLP");
            basePrecioEth = parseFloat(dataEth[0].base_price);
            variationEth = parseFloat(variation2);
            precioEth = basePrecioEth - (basePrecioEth * variationEth / 100);
            precioEth = precioEth.toFixed(2);
            localStorage.setItem("precioEth", JSON.stringify(precioEth));

            //Renderiza el precio actual y la variacion con respecto al precio de las últimas 24 horas
            let contenedor = document.getElementById("actualizarPrecioEth");
            contenedor.innerHTML = "";
            contenedor.innerHTML = `$ ${estandarPesosChilenos.format(precioEth)}`;
            let variacion = document.getElementById("variationEth");
            variacion.innerHTML = "";
            variacion.innerHTML = `24h: ${variationEth}%`

            //Colorea el texto de verde si la cripto subió de precio o de rojo si la cripto bajó de precio
            let priceVariation = document.getElementById("variationEth");
            if (variationEth < 0) {
                priceVariation.classList.add("priceVariation__negative");
            } else if (variationEth >= 0) {
                priceVariation.classList.add("priceVariation__positive");
            }
        }).catch(error => console.log(error));
}
updatePriceEth();

function updatePriceUsdc() {
    fetch(`../currencies.json`)
        .then(response => response.json())
        .then(data => {
            let dataUsdc
            dataUsdc = data.filter((item) => item.market_id === "USDC-CLP");
            basePrecioUsdc = parseFloat(dataUsdc[0].base_price);
            variationUsdc = parseFloat(variation3);
            precioUsdc = basePrecioUsdc - (basePrecioUsdc * variationUsdc / 100);
            precioUsdc = precioUsdc.toFixed(2);
            localStorage.setItem("precioUsdc", JSON.stringify(precioUsdc));

            //Renderiza el precio actual y la variacion con respecto al precio de las últimas 24 horas
            let contenedor = document.getElementById("actualizarPrecioUsdc");
            contenedor.innerHTML = "";
            contenedor.innerHTML = `$ ${estandarPesosChilenos.format(precioUsdc)}`;
            let variacion = document.getElementById("variationUsdc");
            variacion.innerHTML = "";
            variacion.innerHTML = `24h: ${variationUsdc}%`

            //Colorea el texto de verde si la cripto subió de precio o de rojo si la cripto bajó de precio
            let priceVariation = document.getElementById("variationUsdc");
            if (variationUsdc < 0) {
                priceVariation.classList.add("priceVariation__negative");
            } else if (variationUsdc >= 0) {
                priceVariation.classList.add("priceVariation__positive");
            }
        }).catch(error => console.log(error));
}
updatePriceUsdc();

function updatePriceLtc() {
    fetch(`../currencies.json`)
        .then(response => response.json())
        .then(data => {
            let dataLtc
            dataLtc = data.filter((item) => item.market_id === "LTC-CLP");
            basePrecioLtc = parseFloat(dataLtc[0].base_price);
            variationLtc = parseFloat(variation4);
            precioLtc = basePrecioLtc - (basePrecioLtc * variationLtc / 100);
            precioLtc = precioLtc.toFixed(2);
            localStorage.setItem("precioLtc", JSON.stringify(precioLtc));

            //Renderiza el precio actual y la variacion con respecto al precio de las últimas 24 horas
            let contenedor = document.getElementById("actualizarPrecioLtc");
            contenedor.innerHTML = "";
            contenedor.innerHTML = `$ ${estandarPesosChilenos.format(precioLtc)}`;
            let variacion = document.getElementById("variationLtc");
            variacion.innerHTML = "";
            variacion.innerHTML = `24h: ${variationLtc}%`

            //Colorea el texto de verde si la cripto subió de precio o de rojo si la cripto bajó de precio
            let priceVariation = document.getElementById("variationLtc");
            if (variationLtc < 0) {
                priceVariation.classList.add("priceVariation__negative");
            } else if (variationLtc >= 0) {
                priceVariation.classList.add("priceVariation__positive");
            }
        }).catch(error => console.log(error));
}
updatePriceLtc();

function updatePriceBch() {
    fetch(`../currencies.json`)
        .then(response => response.json())
        .then(data => {
            let dataBch
            dataBch = data.filter((item) => item.market_id === "BCH-CLP");
            basePrecioBch = parseFloat(dataBch[0].base_price);
            variationBch = parseFloat(variation5);
            precioBch = basePrecioBch - (basePrecioBch * variationBch / 100);
            precioBch = precioBch.toFixed(2);
            localStorage.setItem("precioBch", JSON.stringify(precioBch));

            //Renderiza el precio actual y la variacion con respecto al precio de las últimas 24 horas
            let contenedor = document.getElementById("actualizarPrecioBch");
            contenedor.innerHTML = "";
            contenedor.innerHTML = `$ ${estandarPesosChilenos.format(precioBch)}`;
            let variacion = document.getElementById("variationBch");
            variacion.innerHTML = "";
            variacion.innerHTML = `24h: ${variationBch}%`

            //Colorea el texto de verde si la cripto subió de precio o de rojo si la cripto bajó de precio
            let priceVariation = document.getElementById("variationBch");
            if (variationBch < 0) {
                priceVariation.classList.add("priceVariation__negative");
            } else if (variationBch >= 0) {
                priceVariation.classList.add("priceVariation__positive");
            }
        }).catch(error => console.log(error));
}
updatePriceBch();

// Determina cada cuanto tiempo se debe actualizar el precio de las cripto, en este caso, cada 5 minutos
refresh(updatePriceBtc);
refresh(updatePriceEth);
refresh(updatePriceUsdc);
refresh(updatePriceLtc);
refresh(updatePriceBch);

let valorBtc;
let valorEth;
let valorUsdc;
let valorLtc;
let valorBch;

function updateValor() {
    valorBtc = parseFloat(JSON.parse(localStorage.getItem("precioBtc")));
    valorEth = parseFloat(JSON.parse(localStorage.getItem("precioEth")));
    valorUsdc = parseFloat(JSON.parse(localStorage.getItem("precioUsdc")));
    valorLtc = parseFloat(JSON.parse(localStorage.getItem("precioLtc")));
    valorBch = parseFloat(JSON.parse(localStorage.getItem("precioBch")));
}
updateValor();
refresh(updateValor);
