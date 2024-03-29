import { data } from "autoprefixer";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection,  getDocs,  updateDoc, arrayUnion } from "firebase/firestore"
import { getDatabase,ref, set ,  child, push, onChildAdded, onChildChanged, onChildRemoved, update, get, onValue } from "firebase/database";
import { toast } from "react-hot-toast";
import { userHendle } from "./utils";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.go  ogle.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBht3A85bs_nJ_2LKXUkukeJ6vGi1YDynM",
  authDomain: "tomris-instagram-clone.firebaseapp.com",
  projectId: "tomris-instagram-clone",
  storageBucket: "tomris-instagram-clone.appspot.com",
  messagingSenderId: "786569525333",
  appId: "1:786569525333:web:4418056ff9c1ec93017cdc",
  databaseUrl:"https://tomris-instagram-clone-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const realtimeDb = getDatabase(app);






onAuthStateChanged(auth, async user => {
  if (user) {
    const getUser = await getDoc(doc(db, "users", user.uid))

    let data = {
      uid: user.uid,
      fullName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,

      ...getUser.data()


    }

    userHendle(data)
  } else {
    userHendle(false)
  }


})


//Realtime Database Test ! 


export const sendMessagesByMessageboxid  =async (message,owner,messageboxid)=>{
 
  const MListRef = ref(realtimeDb,`messages/${messageboxid}`);
  const nMRef = push(MListRef);
  set(nMRef,{
    owner:owner,
    message:message,
    time:new Date().toLocaleString()
  })

}



export const returntools=()=>{
  return realtimeDb;
}



export const testCreateBox = async (members=[],lastMessage="") =>{
  try {
    if (members) {
      //create messagebox 
      const xrandomId = randomId(20);
      set(ref(realtimeDb, 'messageboxes/' + xrandomId), {
        members,
        formationtime: new Date().toLocaleString(),
        lastMessage:lastMessage
      }).then(()=>{
        //create messagesubscriptions by user id

        members.forEach(elm=>{
          const dbRef=ref(realtimeDb)
          get(child(dbRef,`messagesubscriptions/${elm.userId}`)).then((snapshot)=>{
            if(snapshot.exists()){
              const newSet ={messageboxesid:[... snapshot.val().messageboxesid , xrandomId]};
              const updates = {};
              updates[`messagesubscriptions/${elm.userId}`]=newSet;
              return update(dbRef,updates);
               
            }else{
              set(ref(realtimeDb, `messagesubscriptions/${elm.userId}`), {
                messageboxesid: [xrandomId]
              }).then(()=>{
                //console.log("ok")
              }).catch((e)=>{
                console.log(e)
              })
            }
          })
        })




      }).catch((e)=>{
          toast.error(e);
      })
      

    }
  } catch (error) {
    //console.log(error.code)
    toast.error("Members not found ! ")
  }
}


// Register and Login Operations ! 

export const login = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password)

    return response;

  } catch (error) {
    toast.error(error.code)
  }
}


export const register = async ({ email, password, full_name, username }) => {

  try {
    const user = await getDoc(doc(db, "usernames", username))
    if (user.exists()) {
      toast.error(`${username} kullanıcı adı başkası tarafından kullanılmakta`)
    } else {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      if (response.user) {



        await setDoc(doc(db, "usernames", username), {
          user_id: response.user.uid
        })

        await setDoc(doc(db, "users", response.user.uid), {
          full_name,
          username,
          followers: [],
          following: [],
          natifications: [],
          website: '',
          bio: '',
          phoneNumber: '',
          gender: '',
          posts: 0,
          profileImage: ""

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


// User Operations ! 

export const getUserInfo = async uname => {
  const username = await getDoc(doc(db, "usernames", uname))
  //console.log(username.data())
  if (username.exists()) {
    const user = (await getDoc(doc(db, "users", username.data().user_id))).data()
    //console.log(user)
    return user;
  } else {
    toast.error('kullanıcı bulumamadı')
    throw new Error('kullanıcı bulunamadı')
  }
}

export const getUserUid = async uname => {
  try {
    const userId = await getDoc(doc(db, "usernames", uname))
    if (userId) {
      return userId.data();
    }
  } catch (error) {
    toast.error(error)
  }
}


export const getUserDetailByUid = async (uid)=>{
  const docRef = doc(db, "users", uid)
  const docSnap = await getDoc(docRef);

  try {
    if(docSnap.exists){
      //console.log(docSnap.data())
      return docSnap.data();
    }
   } catch (error) {
      toast.error(error.code)
   }
} 

export const getAllUsers = async () => {
  const result = await getDocs(collection(db, "users"))
  const users = []
  result.forEach((elt) => {
    let user = {
      username: elt.data().username,
      fullname: elt.data().full_name,
      profileImage: elt.data().profileImage
    }

    users.push(user)
  });

  //console.log(users)
  try {
    if (users) {
      return users;
    }
  } catch (error) {
    toast.error(error.code)
  }
}



//Message Operations !


export const test = async (messageBoxesId,owner,message) => {
  console.log(messageBoxesId,owner,message)
  const messageBoxRef = doc(db, "messageboxes", messageBoxesId)
  await updateDoc(messageBoxRef,{
    messages: arrayUnion (
     { message: message,
      owner: owner,
      time: new Date().toLocaleString()}
    )
  })

}


export const  getMessageboxByMessageSubscription =async (messagesubscription) =>{
  const docRef = doc(db, "messageboxes", messagesubscription)
  const docSnap = await getDoc(docRef);

  try {
    if(docSnap.exists){
      //console.log(docSnap.data())
      return docSnap.data();
    }
   } catch (error) {
      toast.error(error.code)
   }
}



export const getMessageSubscriptionsByUserId = async (userId) => {
  const docRef = doc(db, "messagesubscriptions", userId)
  const docSnap = await getDoc(docRef);

   try {
    if(docSnap.exists){
      return docSnap.data();
    }
   } catch (error) {
      toast.error(error.code)
   }

}



function randomId(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result.toString();
}


export const createMessageBox = async (members = []) => {
  // console.log(members)

  try {
    if (members) {
      const xrandomId = randomId(20);


      await setDoc(doc(db, "messageboxes", xrandomId), {

        members,
        formationtime: new Date().toLocaleString(),
        messages: [
         
        ]


      })
      const messagesubscriptionsRef = collection(db, "messagesubscriptions")
      members.forEach(elm => {

        const docRef = doc(db, "messagesubscriptions", elm.userId)
        const docSnap = getDoc(docRef);
        docSnap.then(data => {
          if (data.exists() === true) {
            try {
              updateDoc(docRef, {
                messageboxesid: arrayUnion(xrandomId)
              })

            } catch (error) {
              console.log(error.error.code)
              toast.error(error.code)
            }

          }

          else {
            setDoc(doc(messagesubscriptionsRef, elm.userId), {
              messageboxesid: [xrandomId]
            })
          }
        })
      });





    }
  } catch (error) {
    //console.log(error.code)
    toast.error(error.code)
  }
}

export const getMessageBoxes = async () => {
  const docRef = await getDocs(collection(db, "messageboxes"))
  const messageBoxes = []

  docRef.forEach((elt) => {
    let messageBox = {
      formationtime: elt.data().formationtime,
      members: elt.data().members,
      messages: elt.data().messages
    }

    messageBoxes.push(messageBox)
  });

  try {
    if (messageBoxes) {
      return messageBoxes
    }
  } catch (e) {
    toast.error(e.code)
  }

}







// Auth Clear ! 
export const logout = async () => {
  try {
    await signOut(auth)
  } catch (err) {
    toast.error(err.code);
  }
}
