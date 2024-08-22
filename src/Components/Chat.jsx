import React from 'react'
import { useParams } from 'react-router-dom'
function Chat() {

  const params=useParams()
  console.log("Chat Params",params)
  
  if(params.chatId)
  {
    return (
      <div>
          <h1>Chat: ={params.chatId}</h1>
      </div>
    )
  }
  return(
    <>
    <h2>Empty Screen</h2>
    </>
  )
}

export default Chat
