import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"
import { toast } from "react-hot-toast";
import { userHendle } from "./utils";

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
const db = getFirestore(app);



onAuthStateChanged(auth, async user => {
  if (user) {
    const getUser = await getDoc(doc(db,"users",user.uid))

    let data = {
      uid:user.uid,
      fullName:user.displayName,
      email:user.email,
      emailVerified:user.emailVerified,

      ...getUser.data()


    }
    
    userHendle(data)
  } else {
    userHendle(false)
  }


})




export const login = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password)

    return response;

  } catch (error) {
    toast.error(error.code)
  }
}

export const getUserInfo = async uname=>{
  const username = await getDoc(doc(db,"usernames",uname))
  if(username.exists()){
    const user = (await getDoc(doc(db,"users",username.data().user_id))).data()
    //console.log(user)
    return user;
  }else{
    toast.error('kullanıcı bulumamadı')
    throw new Error('kullanıcı bulunamadı')
  }
}

export const register = async ({ email, password, full_name, username }) => {

  try {
    const user = await getDoc(doc(db, "usernames", username))
    if (user.exists()) {
      toast.error(`${username} kullanıcı adı başkası tarafından kullanılmakta`)
    }else{
      const response = await createUserWithEmailAndPassword(auth, email, password)
      if (response.user) {



        await setDoc(doc(db, "usernames", username), {
          user_id: response.user.uid
        })
  
        await setDoc(doc(db, "users", response.user.uid), {
          full_name,
          username,
          followers:[],
          following:[],
          natifications:[],
          website:'',
          bio:'',
          phoneNumber:'',
          gender:'',
          posts:0
  
        })
  
        await updateProfile(auth.currentUser, {
          displayName: full_name
        })
        return response.user
        //response.user
      }
    }
    

   
  }
  catch (error) {
    toast.error(error.code)
  }
}


export const logout = async () => {
  try {
    await signOut(auth)
  } catch (err) {
    toast.error(err.code);
  }
}
