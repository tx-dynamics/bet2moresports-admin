// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOkX805NXYIGra_01a_Tt9CEBJZLfLV0U",
  authDomain: "vet2chance-6a1eb.firebaseapp.com",
  projectId: "vet2chance-6a1eb",
  storageBucket: "vet2chance-6a1eb.appspot.com",
  messagingSenderId: "51331871310",
  appId: "1:51331871310:web:2f4a73b823a10f22ab891f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
