import { arrayUnion, deleteDoc, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import { Delete, DeleteIcon, EllipsisVertical, EllipsisVerticalIcon, MessageSquare, MessageSquareText, Mic, Mic2Icon, PhoneCall, PhoneCallIcon, PlusIcon, SendIcon, VideoIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { unstable_HistoryRouter, useNavigate, useParams } from 'react-router-dom'
import { db, storage } from '../../firebase.config'
import { useAuth } from './AuthContext'
import { useRef } from 'react'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

function ChatWindow(){

  const {userData}=useAuth()   
  const params=useParams()
  const [input, setInput]=useState("")

  const [currentUser, setCurrentUser]=useState(null)
  const [msgList, setMsgList]=useState([])    
  const [showMenu, setShowMenu] = useState(false);

 
  const receiverId=params?.chatid

  const chatId=userData?.id>receiverId?
      `${userData.id}-${receiverId}`
    : `${receiverId}-${userData?.id}`


    // Inside your component
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const menuRef = useRef(null);

    // Close menu when clicking outside
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowMenu(false); // Close the menu if clicked outside
          }
        };
    
        if (showMenu) {
          document.addEventListener('click', handleClickOutside);
        } else {
          document.removeEventListener('click', handleClickOutside);
        }
    
        // Cleanup event listener on unmount
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [showMenu]); // Dependency on `showMenu`
    

    useEffect(() => {
      // Scroll to the bottom of the chat whenever messages change
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [msgList]); // Trigger when msgList changes


    const handleDeleteMessage = async (messageIndex) => {
      try {
        const chatDocRef = doc(db, 'user-chats', chatId);
        const chatDocSnap = await getDoc(chatDocRef);
    
        if (chatDocSnap.exists()) {
          const chatData = chatDocSnap.data();
          const updatedMessages = chatData.messages.filter((_, index) => index !== messageIndex);
    
          await updateDoc(chatDocRef, {
            messages: updatedMessages,
          });
    
          console.log('Message deleted successfully');
        } else {
          console.error('Chat not found');
        }
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    };

    const handleDeleteChat = async() => {
      try {
        const chatDocRef = doc(db, 'user-chats', chatId);
        const chatSnapshot = await getDoc(chatDocRef);
    
        // Check if the document exists
        if (!chatSnapshot.exists()) {
          console.log("Chat does not exist");
          setShowMenu(false);
          return;
        }
    
        // Delete the document
        await deleteDoc(chatDocRef);
        console.log("Chat successfully deleted");
    
        // Close the menu
        setShowMenu(false);
      } catch (error) {
        console.error("Error deleting chat:", error);
      }
    }

    const navigate = useNavigate();
     useEffect(() => {
              const handlePopState = () => {
                navigate('/'); // Redirect to homepage on back button press
              };
            
              window.addEventListener('popstate', handlePopState);
              return () => {
                window.removeEventListener('popstate', handlePopState); // Cleanup on unmount
              };
            }, []);
    
    
    const handleFileUpload = async (e) => {

      const file = e.target.files[0];
      if (!file) return;
      console.log(file)
    
      try {
        // Define file type and name
        const fileType = file.type.split('/')[0]; // e.g., "image", "audio", "video", etc.
        const fileName = `${Date.now()}_${file.name}`;
    
        // Upload file to Firebase Storage
        const storageRef = ref(storage, `uploads/${fileName}`);
        await uploadBytes(storageRef, file);
        const fileUrl = await getDownloadURL(storageRef);
    
        // Prepare message object
        const date = new Date();
        const timeStamp = date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
    
        const fileMessage = {
          sender: userData.id,
          receiver: receiverId,
          time: timeStamp,
          fileType,
          fileUrl,
          fileName,
        };
    
        await updateDoc(doc(db, 'user-chats', chatId), {
          chatId: chatId,
          messages: arrayUnion(fileMessage), // Add file message
        });
          
      } catch (error) {
        console.error("Error uploading file: ", error);
      }
    };
    

  const handleMessage = async ()=>{

    if(!input)
    {
      return; 
    }
    
    const date=new Date()
    const timeStamp=date.toLocaleString("en-US",{
      hour:"numeric",
      minute:"numeric",
      hour12:true,
    })

    if(msgList?.length===0)
    {
      await setDoc(doc(db, 'user-chats', chatId),{
        chatId: chatId,
        messages:[
          {
            text: input,
            time: timeStamp,
            sender: userData.id,
            receiver: receiverId
          }
        ]
      })
    }
    else{
        await updateDoc(doc(db, 'user-chats', chatId),{
          chatId: chatId,
          messages: arrayUnion({
            text: input,
            time: timeStamp,
            sender: userData.id,
            receiver: receiverId
          })
        })
      }      
    setInput("")
  }

  
  useEffect(()=>{
    const fetchUserDetails=async()=>{
        const userDocRef = doc(db, 'users', receiverId); // Reference to the user's document.
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
    fetchUserDetails()
    const msgUnsubscribe=onSnapshot(doc(db,'user-chats',chatId),(doc)=>{
      setMsgList(doc.data()?.messages || [])
    })

    return ()=>{
      msgUnsubscribe()
    }

  }, [receiverId])


  if(!receiverId)
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
            alt="profile pic"
            className='w-9 h-9 rounded-full object cover'
          />

          <div>
          <h2>{currentUser?.name}</h2>
          {currentUser?.lastSeen && (
            <p className='text-xs text-neutral-400'>
              last seen at {currentUser?.lastSeen}
            </p>
          )}
          </div>

          {/* Three dots menu for delete chat option */}
        <div className='ml-auto cursor-pointer relative'>
          <EllipsisVerticalIcon 
            className="text-gray-600" 
            size={20} 
            onClick={(e) => { e.stopPropagation(); // Prevent the click event from propagating to the document
                setShowMenu(!showMenu);}}
          />
          {showMenu && (
            <div ref={menuRef} className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 z-10">
              <button
                onClick={handleDeleteChat} // Add your delete function here
                className="text-red-600 hover:bg-gray-100 w-full text-left py-2 px-4 rounded-md transition-all duration-200"
              >
                Delete Chat
              </button>
            </div>
          )}
        </div>

        {/* <div className='ml-auto flex justify-center items-center gap-3 cursor-pointer'>
          <PhoneCallIcon />
          <VideoIcon />
          <EllipsisVertical/>
        </div> */}
      </div>

      {/* Message box */}
      {/* <div className='flex grow flex flex-col gap-12 bg-chat-bg'>
        {msgList?.map((m,index)=>{
          return(
          <div
            key={index}
            data-sender={m.sender === userData.id}
            className='bg-white w-fit rounded-md p-2 shadow-sm max-w-[400px] break-words data-[sender=true]:ml-auto data-[sender=true]:bg-primary-light'
        >
          <p>{m?.text}</p>
          <p className='text-xs text-neutral-500 text-end'>
            {m?.time}
          </p>
          </div>
          )
          })}

      </div> */}

      <div className='flex grow flex-col gap-12 bg-chat-bg px-4 py-2 overflow-y-scroll'>
            {msgList?.map((m, index) => {
              return (
                <div
                  key={index}
                  data-sender={m.sender === userData.id}
                  className='bg-white w-fit rounded-md p-2 shadow-sm max-w-[400px] break-words data-[sender=true]:ml-auto data-[sender=true]:bg-primary-light'
                >

                      {m?.fileType === 'image' ? (
                        <img src={m.fileUrl} alt={m.fileName} className='w-full h-auto rounded' />
                      ) : 
                      
                      m?.fileType === 'audio' ? (
                        <audio controls>
                          <source src={m.fileUrl} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      ) : 
                      
                      m?.fileType === 'video' ? (
                        <video controls 
                        style={{ width: '300px', height: '200px', objectFit: 'contain' }}
                        className="rounded">
                          <source src={m.fileUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : 
                      
                      m?.fileType === 'application' ? (
                        <a href={m.fileUrl} target="_blank" rel="noopener noreferrer" className='text-blue-500 underline'>
                          {m.fileName}
                        </a>
                      ) : 
                      
                      (
                          <p>{m?.text}</p>
                      )}

                  <p className='text-xs text-neutral-500 text-end'>
                    {m?.time}
                  </p>

                   {/* Delete Icon
                    {m.sender === userData.id && (
                      <button
                          onClick={() => handleDeleteMessage(index)}
                          className=" cursor-pointer absolute top-2 right-2 text-red-600 bg-white rounded-full p-1 shadow hover:bg-red-100"
                          title="Delete Message"
                        >
                      🗑️
                      <DeleteIcon/>
                    </button>
                    )} */}
                </div>
              );
            })}
         
        <div ref={messagesEndRef} />
      </div>

      {/* chat input */}
      <div className='bg-backGround py-2 px-4 flex items-center gap-2 shadow-sm'>
        <PlusIcon 
              className='cursor-pointer' 
              onClick={() => fileInputRef.current.click()} 
            />

        <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileUpload}
          />    

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

          </div>
        </div>
      </div>
    </div>
  </section>
}    


export default ChatWindow
