import { signOut } from 'firebase/auth'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase.config'
import { storage } from '../../firebase.config'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import ChatPanel from './ChatPanel'

function Home(props) {
    const setIsLoggedIn=props.setIsLoggedIn
    const navigate=useNavigate()
    const handleLogout=async ()=>{

        await signOut(auth);
        setIsLoggedIn(false);
        navigate("/login")
    }

    console.log("change event")


    // const handleChange=(e)=>{
    //   const img=e.target.files[0]

    //   //address [must be unique]
    //   const storageRef=ref(storage,"/profile"+Math.random())

    //   //storage task
    //   const uploadTask=uploadBytesResumable(storageRef, img)

    //   console.log("Upload task")
    //   //developer
    //   uploadTask.on("state_changed", progressCB, errorCB, finishedCB);

    //   //upload
    //   function progressCB(data){
    //     console.log("data",data)
    //   }

    //   //if error
    //   function errorCB(err){
    //     console.log("err",err)
    //   }

    //   function finishedCB(){
    //     console.log("successfully file uploaded")
    //     getDownloadURL(uploadTask.snapshot.ref).then(function (url){
    //       console.log("url: ",url)
    //     })
    //   }

    // }
    return (
      <>
        <div>
            <h2>Home</h2>
            {/* <input type="file" accept="image/png image/jpeg image/webp" onChange={handleChange}></input>
            <button onClick={handleLogout}>Logout</button> */}
        </div>

        <ChatPanel/>
        {/* <div>Chat Panel</div>
        <div>Empty Chat</div>
        <div>Individual Chat</div> */}
        </>
    )
}

export default Home
