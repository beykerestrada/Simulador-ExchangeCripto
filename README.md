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

<img width="1191" alt="Captura de Pantalla 2022-10-17 a la(s) 16 54 52" src="https://user-images.githubusercontent.com/96588336/196270551-42c6e889-dec3-41b7-bc92-94a8290741d8.png">

### Abonar

Consiste en un formulario sencillo donde se ingresa la cantidad en CLP que se desea abonar. Mediante una función se valida que se ingrese una cantidad válida y tambien hay una cantidad mínima que se permite abonar. Esto luego guarda la operacion en localStorage para ser renderizada en el historial y se actualiza el saldo disponible en la billetera, también haciendo uso de localStorage para sumarlo al saldo anterior. 

<img width="870" alt="Captura de Pantalla 2022-10-17 a la(s) 16 59 40" src="https://user-images.githubusercontent.com/96588336/196271451-af25b4ab-ffa9-401b-8976-670fbe5c98ae.png">

### Retirar

Igual que en abonar, hay una cantidad mínima que se puede retirar. De igual manera se almacena la operacion en localStorage y se actualiza el saldo en CLP, en este caso, restandolo del saldo actual. Tambien se valida que el usuario tenga suficiente saldo para retirar la cantidad que desea

<img width="864" alt="Captura de Pantalla 2022-10-17 a la(s) 17 01 16" src="https://user-images.githubusercontent.com/96588336/196271744-d8fd29c6-583c-4905-ae3d-781ad0ae75f2.png">

### Comprar/Vender

Tiene un formulario de compra y uno de venta los cuales tienen una lista con las opciones de criptomonedas que hay disponibles y se muestra el saldo disponible de la moneda que se desee intercambiar para que el usuario tenga una idea del monto que puede ingresar. Se valida que se ingrese una cantidad valida y que esta sea mayor que el monto mínimo permitido y menor que el saldo disponible

<img width="835" alt="Captura de Pantalla 2022-10-17 a la(s) 17 09 03" src="https://user-images.githubusercontent.com/96588336/196273225-658aa02a-faec-4290-a1e5-465ba04aae39.png">

<img width="801" alt="Captura de Pantalla 2022-10-17 a la(s) 17 09 20" src="https://user-images.githubusercontent.com/96588336/196273276-72324815-1412-48ce-8f39-405f98842c5a.png">

### Historial

En esta sección se muestra el registro de todas las operaciones (Abono, Retiro, Compra, Venta) que realiza el usuario. Se hace uso de localStorage para almacenar esta información

<img width="870" alt="Captura de Pantalla 2022-10-17 a la(s) 17 11 28" src="https://user-images.githubusercontent.com/96588336/196273695-096f6ca1-eb84-4c9e-b323-ac44d5ce5099.png">

### Actualización de precios
Se utiliza un archivo JSON para guardar la informacion relevante de las criptomonedas (Moneda, PrecioActua, Variacion).
Se simula una llamada a una API haciendo un fecth de este archivo JSON para mostrar los datos en la billetera
Se configuró un intervalo para que esta llamada se ejecute cada 5 minutos
Mediante una función, tambien se altera la variacion cada 5 minutos y este cifra se multiplica que por el precio de las criptomonedas para alterar le precio. 
Esto da la ilusión de que es una API real a la cual se estan realizando peticiones cada 5 minutos para traer el precio "en tiempo real".
Esto simula el movimiento del mercado
Tambien se colorea la varation de verde si es un valor positivo y de rojo si es negativo

<img width="799" alt="Captura de Pantalla 2022-10-17 a la(s) 17 17 46" src="https://user-images.githubusercontent.com/96588336/196274869-b5e37e75-9ace-4094-82f2-5932ae7c8bed.png">

### Librería

Se utiliza SweetAlert para mostrar los mensajes de éxito o error según las acciones que realice el usuario en la plataforma

<img width="497" alt="Captura de Pantalla 2022-10-17 a la(s) 17 19 18" src="https://user-images.githubusercontent.com/96588336/196275147-3d6fc99e-8235-4b4c-9115-a03ff6bd8af8.png">

![Captura de Pantalla 2022-10-17 a la(s) 17 20 19](https://user-images.githubusercontent.com/96588336/196280336-a5c38473-f727-4fa7-8c02-43a21b238baf.png)



