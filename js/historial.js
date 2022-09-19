
const contenedorHistorial = document.getElementById("contenedorHistorial");
/*
Rodigo, aqui estoy teniendo problemas. Quiero guardar el historial en el local storage, pero
solo me guarda hasta que recardo, la página. Descubrí que es por declarar el array vacío en primer lugar

Pero si no lo declaro, no me permite hacerle el push y por ende, no lo guarda. 

Tendrás algún consejo
*/
transactionHistory = [];

class NewRecord {
    constructor(id, monedaAbonada, cantidad, precio) {
        this.id = id;
        this.monedaAbonada = monedaAbonada;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}

function addTransaction(){
    let newTransaction = new NewRecord(id + 1, monedaAbonada, saldoUsd, "");
    transactionHistory.push(newTransaction);
    localStorage.setItem("transactionHistory", JSON.stringify(transactionHistory));
}







/*
Esta parte tambien me está costando, no he podido hacer que me apareczcan las transacciones en 
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

