// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAZ7L0pRgazaywVN2CvONZDknjfG8_gy4",
  authDomain: "app-firebas-1bfe2.firebaseapp.com",
  projectId: "app-firebas-1bfe2",
  storageBucket: "app-firebas-1bfe2.appspot.com",
  messagingSenderId: "34802720360",
  appId: "1:34802720360:web:bd7ce02fb462c7b08025dd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)