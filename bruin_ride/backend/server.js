// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnYQ5G59of8KxraVKEPYQ0EXbAS4iP18s",
  authDomain: "bruinride-41c8c.firebaseapp.com",
  projectId: "bruinride-41c8c",
  storageBucket: "bruinride-41c8c.appspot.com",
  messagingSenderId: "667677751852",
  appId: "1:667677751852:web:16a4993a6541a5edeb6f89",
  measurementId: "G-FXNPFB06WZ",
  databaseURL: "https://bruinride-41c8c-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

/*function writeUserData(userId, name, email) {
  set(ref(database, 'users/' + userId), {
    username: name,
    email: email,
  });
}


writeUserData("Bulenty", "Bulent", "bulenty@ucla.edu")
*/
