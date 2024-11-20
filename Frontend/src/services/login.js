import {auth} from "./firebase.js"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider  } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const btn_login = document.getElementById("btn_login")

btn_login.addEventListener('click',e=>{
    e.preventDefault()
    const txt_email = document.querySelector("#txt_email")
    const txt_password = document.querySelector("#txt_password")

    signInWithEmailAndPassword(auth, txt_email.value, txt_password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
        console.log("credenciales validas")
        console.log(user)
        window.location.href = 'public/templates/biblioteca.html'
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      // ..
    });

})

const btn_loginGoogle = document.getElementById("btn_loginGoogle")
btn_loginGoogle.addEventListener("click",e=>{
  e.preventDefault()
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)

  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    document.location.href="public/templates/biblioteca.html"
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
})