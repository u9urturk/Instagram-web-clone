import { initializeApp } from "firebase/app";
import { getAuth , signInWithEmailAndPassword } from "firebase/auth";
import { toast, Toast } from "react-hot-toast";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBht3A85bs_nJ_2LKXUkukeJ6vGi1YDynM",
  authDomain: "tomris-instagram-clone.firebaseapp.com",
  projectId: "tomris-instagram-clone",
  storageBucket: "tomris-instagram-clone.appspot.com",
  messagingSenderId: "786569525333",
  appId: "1:786569525333:web:4418056ff9c1ec93017cdc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const login = async (email,password)=>{
    try {
     const response =    await signInWithEmailAndPassword(auth,email,password)
     console.log(response.user)
    } catch (error) {
        toast.error(error.code)
    }
}
