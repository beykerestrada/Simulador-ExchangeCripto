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
  }else {
    Swal.fire({
      title: "Error!",
      text: "Por favor ingresa usuario y contraseña",
      icon: "error",
      confirmButtonText: "Volver a intentar",
    });
  }
})



