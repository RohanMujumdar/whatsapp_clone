import { doc, getDoc } from 'firebase/firestore'
import { EllipsisVertical, MessageSquare, MessageSquareText, Mic, Mic2Icon, PhoneCall, PhoneCallIcon, PlusIcon, SendIcon, VideoIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase.config'
function ChatWindow(){

  const params=useParams()
  const [input, setInput]=useState("")
  const [currentUser, setCurrentUser]=useState(null)
    
  const handleMessage=()=>{
    setInput("")
  }


  useEffect(()=>{
    const fetchUserDetails=async()=>{
      if(params.chatId)
      {
        const uId=params.chatId
        const userDocRef = doc(db, 'users', uId); // Reference to the user's document.
        const userDocSnap = await getDoc(userDocRef); // Fetch the user's document.
        console.log("UserDocSnapData", userDocSnap.data())
        if(userDocSnap.exists())
        {
          setCurrentUser(userDocSnap.data())
        }
        else
        {
          console.log("No user Found")  
        }
      }
    }
    fetchUserDetails()
  }, [params.chatId])


  if(!params.chatId)
  {
    return(
      <section className='w-[70%] h-full flex flex-col gap-4 items-center justify-center'>
        <MessageSquareText
          className='w-28 h-28 text-gray-600'
          strokeWidth={1.2}
        />

        <p className='text-sm text-center text-gray-700'>
          Select any context to
          <br />
          Start a chat with.
        </p>
      </section>
    )
  }

  return <section className='w-[70%] h-full flex-col gap-4 items-center justify-center'>
    <div className='h-full w-full bg-chat-bg flex flex-col'>
      {/* topbar */}
      <div className='bg-backGround py-2 px-4 flex items-center gap-2 shadow-sm'>
          <img 
            src={currentUser?.profile}
            alt="profile picture"
            className='w-9 h-9 rounded-full object cover'
          />
          <h2>{currentUser?.name}</h2>

        <div className='ml-auto flex justify-center items-center gap-3 cursor-pointer'>
          <PhoneCallIcon />
          <VideoIcon />
          <EllipsisVertical/>
        </div>
      </div>

      {/* Message box */}
      <div className='flex grow flex flex-col gap-12 bg-chat-bg'></div>

      {/* chat input */}
      <div className='bg-backGround py-2 px-4 flex items-center gap-2 shadow-sm'>
        <PlusIcon/>
        <div className='bg-white flex w-full items-center px-3 py-2 rounded-full'>
          <input 
            type="text" 
            placeholder="Type a message..." 
            className="flex-grow text-gray-700 outline-none bg-transparent"
            value={input} 
            onChange={(e)=>setInput(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key==="Enter"){
                handleMessage()
              }
            }}
          />

          <div className='ml-auto flex justify-center items-center gap-2 cursor-pointer'>
            <SendIcon onClick={handleMessage}/>
            <Mic/>
          </div>
        </div>
      </div>
    </div>
  </section>
}    

    


export default ChatWindow
