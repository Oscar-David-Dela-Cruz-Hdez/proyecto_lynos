import{auth} from "./firebase.js"

import { createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
const btn_registrar=document.getElementById("btn_registrar")

btn_registrar.addEventListener('click',e=>{
    e.preventDefault()
    alert("resgistrado")
    //
    const txt_email=document.querySelector("#txt_email")
    const txt_password=document.querySelector("#txt_password")
    createUserWithEmailAndPassword(auth, txt_email.value, txt_password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("Cuenta registrada correctamente")
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    // ..
  });
})