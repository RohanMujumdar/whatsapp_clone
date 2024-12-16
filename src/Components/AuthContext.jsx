import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react';
import { auth, db } from '../../firebase.config';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';


const AuthContext=React.createContext();
//hook

export function useAuth() {
    return useContext(AuthContext)
}

function AuthWrapper({children}) {
    const [userData, setUserData]=useState(null)
    const [isLoggedIn, setIsLoggedIn]=useState(false)
    const [loading, setLoading]=useState(true)
    const [isUploading, setIsUploading]=useState(false)
    const [error, setError]=useState("")
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
            
            const{ profile, name, email, lastSeen, status}=docSnap.data()
            console.log("User Details",docSnap.data())
            await setLastSeen(currentUser)
            setUserData({
              id:currentUser.uid,
              profile:profile,
              email:email,
              name:name,
              lastSeen:lastSeen,
              status:status===""?"":status
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


    const setLastSeen=async(user)=>{
      const date=new Date()
      const timeStamp=date.toLocaleString("en-US",{
        hour:"numeric",
        minute:"numeric",
        hour12:true,
      })

      await updateDoc(doc(db,"users",user.uid),{
          lastSeen: timeStamp
      })
    }

    const updateName=async(newName)=>{
        await updateDoc(doc(db,"users",userData.id),{
          name: newName
      })
    }

    const updateStatus=async(status)=>{
        await updateDoc(doc(db,"users",userData.id),{
          status: status
      })
    }

  return (
    <AuthContext.Provider value={{setUserData,userData,setIsLoggedIn,isLoggedIn, loading, updateName, updateStatus}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthWrapper
