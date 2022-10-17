// Deteccion de eventos para mostrar y esconder el modal de LogIn
const open = document.getElementById("open");
const close = document.getElementById("close");
const btnLogin = document.getElementById("btn__login");
const btnLoginCancelar = document.getElementById("btn__loginCancelar")

open.addEventListener("click", (e) => {
  e.preventDefault();
  modalContainer.classList.add("show");
});

close.addEventListener("click", (e) => {
  e.preventDefault();
  modalContainer.classList.remove("show");
});

//Funcion que otorga acceso a la billtera si se ingresa usuario y contraseña
function logIn() {
  // Mensaje de ingreso exitoso
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  Toast.fire({
    icon: 'success',
    title: 'Ingreso exitoso'
  }).then(() => {
    location.href = "paginas/billetera.html";
  })
}

// Si no se ingresa usuario y contraseña, arroja un mensaje de error
function logInError() {
  Swal.fire({
    title: "Error!",
    text: "Por favor ingresa usuario y contraseña",
    icon: "error",
    confirmButtonText: "Volver a intentar",
  });
}
function validarLogIn(){
   // Guardar en sessionStorage el dato del usuario recogido por el formulario de logIn
    //obtener form desde el HTML
    let loginForm = document.getElementById("loginForm").elements;
    let userName = loginForm[0].value;
    let password = loginForm[1].value;
    sessionStorage.setItem("usuario", userName);
  
    // Uso de operador ternario para validar si se ingresó usuario y contraseña
    let accesoPermitido = userName && password ? true : false
    accesoPermitido ? logIn() : logInError();
}

  btnLogin.addEventListener("click", () => {
    validarLogIn();
})


let loginForm = document.getElementById("loginForm").elements;
let user = loginForm[0];
let pass = loginForm[1];

user.addEventListener("keyup", function(event){
    if (event.key === "Enter"){
        validarLogIn();
    }
});
pass.addEventListener("keyup", function(event){
  if (event.key === "Enter"){
      validarLogIn();
  }
});

