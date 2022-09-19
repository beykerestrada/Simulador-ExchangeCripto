// Deteccion de eventos para mostrar y esconder el modal que tiene como función el abono a la billetera
const open = document.getElementById("open");
const close = document.getElementById("close");
const btnLogin = document.getElementById("btn__login");

open.addEventListener("click", (e) => {
  e.preventDefault();
  modalContainer.classList.add("show");
});

btnLogin.addEventListener("click", () => {
    
  // Guardar en sessionStorage el dato del usuario recogido por el formulario de logIn
  //obtener form desde el HTML
  let loginForm = document.getElementById("loginForm").elements;
  let userName = loginForm[0].value;
  let password = loginForm[1].value;
  if(userName && password){
    sessionStorage.setItem("usuario", userName);
  //Redirige a la página de la billetera
  location.href = "paginas/billetera.html";
  }else {
    alert("Por favor ingrese usuario y contraseña")
  }
  
});



