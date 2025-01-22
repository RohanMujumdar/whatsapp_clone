import React from "react"
import { Fingerprint } from 'lucide-react';
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth ,db} from "../../firebase.config";
import {doc,setDoc} from "firebase/firestore"


async function createUser(authData)
{
    const objectData=authData.user
    // const uid=objectData.uid
    // const photoURL=objectData.photoURL
    // const name=objectData.displayName
    // const email=objectData.email

    const {uid, photoURL, displayName, email} = objectData;
    console.log("Here are the Details:= ", uid," ",photoURL," ",displayName," ",email)
    const date=new Date()
    const timeStamp=date.toLocaleString("en-US",{
      hour:"numeric",
      minute:"numeric",
      hour12:true,
    })

    await setDoc(doc(db,"users",uid),{
        email: email,
        profile: photoURL,
        name: displayName,
        lastSeen: timeStamp
    })
    console.log("User data is added successfully")
}

function Login()
{
    const navigate=useNavigate()
    const handleLogin = async()=>{
        //auth-step-4
        const result = await signInWithPopup(auth, new GoogleAuthProvider)
        console.log("Result is here",result)
        await createUser(result)
        navigate("/")
    }

    return ( 
    <>
        <div className="h-[220px] bg-primary">
            <div className="flex ml-[200px] pt-10 items-center gap-[0px]">
                <img src="../images/logo.jpg" alt="Logo" className="h-12" />
                <div className="text-white font-semibold">WHATSAPP</div>
            </div>
        </div> 
        <div className="flex justify-center items-center bg-gray-100 h-[calc(100vh-220px)] relative">
            <div className="bg-white w-[50%] h-[80%] shadow-2xl flex flex-col justify-center items-center gap-4 absolute -top-[93px]">
                <Fingerprint className="h-20 w-20 text-[#10c8a0]" strokeWidth={1.5}/>
                <div className="font-bold text-2xl leading-8">Sign In</div>
                <div className="text-gray-500 font-bold">Sign In with Google account to get started</div>
                <button className="flex gap-2 items-center bg-primary p-3 mt-7 text-white rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-primary-dense focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50" 
                    onClick={handleLogin}>
                        Sign In with Google <LogIn />
                </button>
            </div>
        </div>
    </>
    )
}


export default Login