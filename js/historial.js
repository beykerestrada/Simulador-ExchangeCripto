
const contenedorHistorial = document.getElementById("contenedorHistorial");

// Uso del operador || para verificar si hay algo guardado en localStorage
const transactionHistory = JSON.parse(localStorage.getItem("transactionHistory")) ||[];

//Constructor para generar la transaccion nueva
class NewRecord {
    constructor(id, operacion, monedaOperada, cantidad, precio, fecha) {
        this.id = id;
        this.operacion = operacion;
        this.monedaOperada = monedaOperada;
        this.cantidad = cantidad;
        this.precio = precio;
        this.fecha = fecha;
    }
}
// Agrega la transacción al local storage
function addTransaction(id, operacion, monedaOperada, cantidad, precio){
    let newTransaction = new NewRecord(id, operacion, monedaOperada, cantidad, precio, new Date());
    transactionHistory.push(newTransaction);
    localStorage.setItem("transactionHistory", JSON.stringify(transactionHistory));
}


/* Rodrigo, esta era la parte que me estaba costando, para dibujar el historial
Me sirvió mucho el consejo que me diste, pero cuando recargaba la página, se borraba el historial del DOM
Entonces lo hice de esta manera y aproveché de usar el operador || para cumplir con la consigna del desafío
*/

//Dibuja el historial en el DOM
let transacciones = JSON.parse(localStorage.getItem("transactionHistory")) || [];
transacciones.forEach(item => {
    let estandarDolaresAmericanos = Intl.NumberFormat('en-US');
    let itemHistorial = document.createElement("tr");
    itemHistorial.innerHTML = `
    <td>${item.id}</td>
    <td>${item.operacion}</td>
    <td>${item.monedaOperada}</td>
    <td>$ ${estandarDolaresAmericanos.format(item.cantidad)}</td>
    <td>${item.precio}</td>
    `;
    contenedorHistorial.append(itemHistorial);
})


