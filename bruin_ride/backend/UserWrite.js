import { ref, set } from "firebase/database";
import database from './server.js';

export function writeUserData(userId, name, email) {
    set(ref(database, 'users/' + userId), {
      username: name,
      email: email,
    });
  }
  
  


  writeUserData("Bulenty", "Bulent", "bulenty@ucla.edu")