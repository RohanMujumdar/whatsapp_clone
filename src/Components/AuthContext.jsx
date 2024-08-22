import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react';
import { auth, db } from '../../firebase.config';
import { doc, getDoc } from 'firebase/firestore';


const AuthContext=React.createContext();
//hook

export function useAuth() {
    return useContext(AuthContext)
}

function AuthWrapper({children}) {
    const [userData, setUserData]=useState(null)
    const [isLoggedIn, setIsLoggedIn]=useState(false)

    useEffect(()=>{

      //Checking if we have logged in before
      //Importance of onAuth: any change, it will directly be affected in firebase
      onAuthStateChanged(auth, async(currentUser)=>{
        if(currentUser){
          const docRef=doc(db,'users',currentUser?.uid)
          const docSnap=await getDoc(docRef)
          if(docSnap.exists()){
            const{uid, profile, displayName, email}=docSnap.data()
            setUserData({
              id:uid,
              profile:profile,
              email:email,
              name:displayName
            })
            console.log("user data")
          }
        }
      })
    }, [])
  return (
    <AuthContext.Provider value={{setUserData,userData,setIsLoggedIn,isLoggedIn}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthWrapper
