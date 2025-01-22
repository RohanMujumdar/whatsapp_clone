import React, { useEffect } from 'react'
import ChatPanel from './ChatPanel'
import ChatWindow from './ChatWindow'
import { useNavigate } from 'react-router-dom'

function Home() {
   
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
    //     getDownloadURL(uploadTask.snapshot.ref).then(function(url){
    //       console.log("url: ",url)
    //     })
    //   }

    // }

    
    return (
      <main className='relative w-full h-screen bg-[#E3E1DB] '>

        <div className='absolute top-0 h-[130px] bg-primary w-full' />
            <div className='h-screen absolute w-full p-5'>
                <div className='bg-backGround w-full h-full shadow-md flex '>
                    {/* <input type="file" accept="image/png image/jpeg image/webp" onChange={handleChange}></input> */}
                    {/* <button onClick={handleLogout}>Logout</button>  */}
                    <ChatPanel/>

                    {/* Empty Chat or Individual </Chat> */}
                    <ChatWindow />
                </div>
            </div>
        </main>
    )
}

export default Home
