import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"


var fireApp = null
var analytics = null
var auth = null

if (!fireApp) {
    console.log("CREATING FIREBASE")
    const firebaseConfig = {
        apiKey: "AIzaSyDhiWeDur77JcgK_pH_56zNEfESAfPNq7A",
        authDomain: "trade-51694.firebaseapp.com",
        projectId: "trade-51694",
        storageBucket: "trade-51694.appspot.com",
        messagingSenderId: "1079308575214",
        appId: "1:1079308575214:web:e44ebcf9082baf80c46eff",
        measurementId: "G-4V1S4FQ3EN"
      };
      
      // Initialize Firebase
      //const app = initializeApp(firebaseConfig);
        fireApp = firebase.initializeApp(firebaseConfig);
        analytics = getAnalytics(fireApp);
        auth = getAuth(fireApp);
      
} else {
    console.log("NOT CREATING FIREBASE")
}

export {fireApp, analytics, auth}