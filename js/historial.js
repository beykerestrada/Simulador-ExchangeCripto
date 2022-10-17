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
function addFiatTransaction(id, operacion, monedaOperada, cantidad, precio){
    let newTransaction = new NewRecord(id, operacion, monedaOperada, cantidad, precio);
    transactionHistory.push(newTransaction);
    localStorage.setItem("transactionHistory", JSON.stringify(transactionHistory));
}

function addCryptoTransaction(id, operacion, monedaOperada, cantidad, precio){
    let newTransaction = new NewRecord(id, operacion, monedaOperada, parseFloat(cantidad).toFixed(8), precio);
    transactionHistory.push(newTransaction);
    localStorage.setItem("transactionHistory", JSON.stringify(transactionHistory));
}

//Dibuja el historial en el DOM
let transacciones = JSON.parse(localStorage.getItem("transactionHistory")) || [];
transacciones.forEach(item => {
    let itemHistorial = document.createElement("tr");
    itemHistorial.innerHTML = `
    <td>${item.id}</td>
    <td>${item.operacion}</td>
    <td>${item.monedaOperada}</td>
    <td>${item.cantidad}</td>
    <td>${item.precio}</td>
    `;
    contenedorHistorial.append(itemHistorial);
})

