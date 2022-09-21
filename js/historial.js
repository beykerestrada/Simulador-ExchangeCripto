
const contenedorHistorial = document.getElementById("contenedorHistorial");
const transactionHistory = JSON.parse(localStorage.getItem("transactionHistory")) ||[];

class NewRecord {
    constructor(id, operacion, monedaOperada, cantidad, precio) {
        this.id = id;
        this.operacion = operacion;
        this.monedaOperada = monedaOperada;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}

function addTransaction(id, operacion, monedaOperada, cantidad, precio){
    let newTransaction = new NewRecord(id, operacion, monedaOperada, cantidad, precio);
    transactionHistory.push(newTransaction);
    localStorage.setItem("transactionHistory", JSON.stringify(transactionHistory));
}







/*
Esta parte me está costando, no he podido hacer que me aparezcan las transacciones en 
el DOM. Como lo puedo hacer? 
*/


function dibujarHistorial (){
    contenedorHistorial.innerHTML = ""
    localStorage.getItem("transactionHistory");
    transactionHistory.forEach(elemento => {
        let renglonesHistorial = document.createElement("tr");
        renglonesHistorial.innerHTML = `
        <td>${elemento.newTransaction.id}</td>
        <td>${elemento.newTransaction.monedaAbonada}</td>
        <td>${elemento.newTransaction.cantidad}</td>
        <td>${elemento.newTransaction.precio}</td>
        `;
        contenedorHistorial.append(renglonesHistorial);
    });
    
    
}

