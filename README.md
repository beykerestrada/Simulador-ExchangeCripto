# CryptoExchange-Simulator

This is an application that simulates the options available in a cryptocurrency exchange.

## Instructions

Present an interactive web page in JavaScript that must simulate various processes. The simulator should select certain tasks and provide valuable information to the user in a coherent and neat manner. Use AJAX and JSON to fetch data, and various JS tools such as libraries, promises, and asynchronous operations to control events in the interface and produce animations in response.

## Outcome

A cryptocurrency exchange simulator is created. The processes of login, deposit, withdrawal, purchase, sale, and history are simulated. 
Ajax, JSON, and promises are used to obtain cryptocurrency values, simulating an API call.
The sweetAlert library is used to display success and error messages when performing certain actions.

### LogIn

It has a simple login form that requests a username and password to log in. The data entered in the username field is then stored in sessionStorage to display it in the header once inside the wallet.

![Captura de Pantalla 2022-10-17 a la(s) 16 38 57](https://user-images.githubusercontent.com/96588336/196267234-0f74b03d-298e-46da-858f-861a9911cfad.png)

### Wallet (Overview)

Once in the wallet, we have different options for the user. 
They can Deposit CLP, Withdraw CLP, Buy or Sell various cryptocurrencies. These options can be seen in the navigation menu on the left side. The main section is the Wallet, which provides a summary or overview of the available balances in each currency, the current price of the cryptocurrencies, and the variation in the last 24 hours. It also has shortcut buttons to the different flows (Deposit, Withdraw, Buy, Sell).

<img width="1191" alt="Captura de Pantalla 2022-10-17 a la(s) 16 54 52" src="https://user-images.githubusercontent.com/96588336/196270551-42c6e889-dec3-41b7-bc92-94a8290741d8.png">

### Deposit

It consists of a simple form where the amount in CLP to be deposited is entered. A function validates that a valid amount is entered, and there is also a minimum amount allowed for deposit. This then saves the operation in localStorage to be rendered in the history and updates the available balance in the wallet, also using localStorage to add it to the previous balance.

<img width="870" alt="Captura de Pantalla 2022-10-17 a la(s) 16 59 40" src="https://user-images.githubusercontent.com/96588336/196271451-af25b4ab-ffa9-401b-8976-670fbe5c98ae.png">

### Withdraw

Just like in Deposit, there is a minimum amount that can be withdrawn. Similarly, the operation is stored in localStorage, and the CLP balance is updated, in this case by subtracting it from the current balance. It also validates that the user has sufficient balance to withdraw the desired amount.

<img width="864" alt="Captura de Pantalla 2022-10-17 a la(s) 17 01 16" src="https://user-images.githubusercontent.com/96588336/196271744-d8fd29c6-583c-4905-ae3d-781ad0ae75f2.png">

### Buy/Sell

There are buy and sell forms, each containing a list of available cryptocurrencies. The available balance of the selected currency is displayed so that the user has an idea of the amount they can enter. It validates that a valid amount is entered, which must be greater than the minimum allowed amount and less than the available balance.
<img width="835" alt="Captura de Pantalla 2022-10-17 a la(s) 17 09 03" src="https://user-images.githubusercontent.com/96588336/196273225-658aa02a-faec-4290-a1e5-465ba04aae39.png">

<img width="801" alt="Captura de Pantalla 2022-10-17 a la(s) 17 09 20" src="https://user-images.githubusercontent.com/96588336/196273276-72324815-1412-48ce-8f39-405f98842c5a.png">

### History

This section displays the record of all operations (Deposit, Withdraw, Buy, Sell) performed by the user. localStorage is used to store this information.

<img width="870" alt="Captura de Pantalla 2022-10-17 a la(s) 17 11 28" src="https://user-images.githubusercontent.com/96588336/196273695-096f6ca1-eb84-4c9e-b323-ac44d5ce5099.png">

### Price Update

A JSON file is used to store relevant information about the cryptocurrencies (Currency, Current Price, Variation). 
A simulated API call is made by fetching this JSON file to display the data in the wallet. 
An interval is set up to execute this call every 5 minutes.
Through a function, the variation is also altered every 5 minutes, and this value is multiplied by the price of the cryptocurrencies to change the price. 
This gives the illusion of a real API to which requests are being made every 5 minutes to fetch the "real-time" price.
This simulates market movement.
Additionally, the variation is colored green if the value is positive and red if it is negative.

<img width="799" alt="Captura de Pantalla 2022-10-17 a la(s) 17 17 46" src="https://user-images.githubusercontent.com/96588336/196274869-b5e37e75-9ace-4094-82f2-5932ae7c8bed.png">

### Library

SweetAlert is used to display success or error messages based on the actions performed by the user on the platform.

<img width="497" alt="Captura de Pantalla 2022-10-17 a la(s) 17 19 18" src="https://user-images.githubusercontent.com/96588336/196275147-3d6fc99e-8235-4b4c-9115-a03ff6bd8af8.png">

![Captura de Pantalla 2022-10-17 a la(s) 17 20 19](https://user-images.githubusercontent.com/96588336/196280336-a5c38473-f727-4fa7-8c02-43a21b238baf.png)



