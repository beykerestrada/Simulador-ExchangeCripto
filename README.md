# Simulador-ExchangeCripto
Se trata de una aplicacion que simula las opciones disponibles en un exchange de criptomonedas
## Consigna
Presentar una página web interactiva en JavaScript la cual debe simular distintos procesos. El simulador debe seleccionar ciertas tareas, y proporcionar al usuario información de valor, de forma coherente y prolija. Utilizar AJAX y JSON para obtener datos y diversas herramientas de JS como librerías, promises y asincronía para controlar eventos en la interfaz y producir animaciones en respuesta.

## Resultado
Se crea un simulador de un exchange de criptomonedas. Se simulan los procesos de login abono, retiro, compra, venta e historial. 
Se usa Ajax y JSON y promises para obtener los valores de las criptomonedas simulando una llamada a una API.
Se usa la librería de sweetAlert para mostrar los mensajes de éxito y error al realizar determinadas acciones

### LogIn

Tiene un formulario de logIn simple que solicta nombre de usuario y contraseña para poder ingresar. El dato ingresado en el campo de usuario luego es almacenado en sessionStorage para mostrarlo en el header una vez dentro de la billetera

![Captura de Pantalla 2022-10-17 a la(s) 16 38 57](https://user-images.githubusercontent.com/96588336/196267234-0f74b03d-298e-46da-858f-861a9911cfad.png)

### Billetera (Vision General)

Una vez en la billetera tenemos diferentes opciones para el usuario. 
Este puede Abonar CLP, Retirar CLP, Comprar o Vender varias criptomonedas
Estas opciones se pueden ver en el menu de navegación en la parte izquierda. Y como Seccion principal esta la Billetera que entrega un resumen o visión general de los saldos disponibles en cada moneda y el precio actual de las Criptomonedas y la variacion en las últimas 24 horas. Además tiene botones de acceso directo a los diferentes flujos (Abonar, Retirar, Comprar, Vender). 


