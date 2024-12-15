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
    const [loading, setLoading]=useState(true)
    useEffect(()=>{

      //Checking if we have logged in before
      //Importance of onAuth: any change, it will directly be affected in firebase


      // The image problem, image not visible sometimes. Because it is too costly for firbase, hence we must unsubscribe onAuthStateChanged first
      const unsubscribe=onAuthStateChanged(auth, async(currentUser)=>{
        setLoading(true)
        if(currentUser){
          const docRef=doc(db,'users',currentUser?.uid)
          const docSnap=await getDoc(docRef)
          
          if(docSnap.exists()){
            
            const{ profile, name, email}=docSnap.data()
            console.log("User Details",docSnap.data())
            setUserData({
              id:currentUser.uid,
              profile:profile,
              email:email,
              name:name
            })
            
          }
          setIsLoggedIn(true)
        }
        else{
          setIsLoggedIn(false)
        }
        setLoading(false)
      })

      return ()=>{
        unsubscribe()
      }
    }, [])
  return (
    <AuthContext.Provider value={{setUserData,userData,setIsLoggedIn,isLoggedIn, loading}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthWrapper
