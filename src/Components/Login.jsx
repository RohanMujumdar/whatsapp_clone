import React from "react"
import { Fingerprint } from 'lucide-react';
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth ,db} from "../../firebase.config";
import {doc,setDoc} from "firebase/firestore"
import { useAuth } from "./AuthContext";

async function createUser(authData)
{
    const objectData=authData.user
    // const uid=objectData.uid
    // const photoURL=objectData.photoURL
    // const name=objectData.displayName
    // const email=objectData.email

    const {uid, photoURL, displayName, email} = objectData;
    console.log("Details:= ", uid," ",photoURL," ",displayName," ",email)

    await setDoc(doc(db,"users",uid),{
        email: email,
        profile: photoURL,
        name: displayName
    })
    console.log("User data is added successfully")
}

function Login(props)
{
    const { setUserData } = useAuth()
    const isLoggedIn=props.isLoggedIn
    const setIsLoggedIn=props.setIsLoggedIn
    const navigate=useNavigate()
    
    if(isLoggedIn)
    {
        navigate("/")
        return
    }

    const handleLogin = async()=>{
        //auth-step-4
        const result = await signInWithPopup(auth, new GoogleAuthProvider)
        console.log(result)
        await createUser(result)

        const userObject=result.user
        const {uid, photoURL, displayName, email} = userObject;
        
        setUserData({
            id:uid,
            profile:photoURL,
            email:email,
            name:displayName
        })
        setIsLoggedIn(true);
        navigate("/")
    }

    return ( 
    <>
        <div className="h-[220px] bg-[#11d1a7]">
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
                <button className="flex gap-2 items-center bg-[#11d1a7] p-3 mt-7 text-white rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-[#0a9d87] focus:outline-none focus:ring-2 focus:ring-[#11d1a7] focus:ring-opacity-50" 
                    onClick={handleLogin}>
                        Sign In with Google <LogIn />
                </button>
            </div>
        </div>
    </>
    )
}


export default Login