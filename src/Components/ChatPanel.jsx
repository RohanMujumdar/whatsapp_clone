import React, { useEffect } from 'react'
import { useState } from 'react';
import { db } from '../../firebase.config';
import { collection, getDocs } from 'firebase/firestore';
import { ArrowLeft, CircleFadingPlusIcon, MessageSquare, UserRoundIcon } from 'lucide-react';
import Profile from './Profile';
function ChatPanel() {

    const [isLoading, setLoading]=useState(true)
    const [users, setUser] = useState([]);
    const [profile, showProfile]=useState(false)

    

   
    const onBack=()=>{showProfile(false)}
    
    useEffect(()=>{
        const getUsers=async() =>{

            //data should be brought from which collection from firebase
            const data = await getDocs(collection(db, 'users'));
            console.log(data.docs.length)
            const arrayOfUser=data.docs.map((docs)=>{return {userData: docs.data(), id: docs.id} })
            console.log(arrayOfUser)

            // arrayOfUser.map(doc=>(
            //     console.log(doc.userData.profile)
            // ))
            
            setUser(arrayOfUser)
            setLoading(false)
        };

        getUsers()
    },[])
    
    if(isLoading)
    {
        return (
            <>
                <div>....Loading</div>
            </>
        )
    }

    if(profile == true)
    {
        return (
            <>
               <Profile onBack={onBack}/> 
            </>
        )
    }

    if(profile == false)
        {
        return (
            <>
                {/* //Top Bar */}
                <div className='bg-gray-300 py-2 px-4 border-r flex justify-between items-center gap-2'>
                    <button onClick={()=>{showProfile(true)}}>
                        <img 
                            src={users[0].userData.profile}
                            alt="profile picture"
                            className='w-10 h-10 rounded-full object cover'
                        />
                    </button>
                    <div className='flex item-end justify-center gap-6 mx-4'>
                        <CircleFadingPlusIcon className='w-6 h-6'/>
                        <MessageSquare className='w-6 h-6'/>
                        <UserRoundIcon className='w-6 h-6'/>
                    </div>
                </div>

                {/* Chat List */}
                {
                    isLoading ? <div>....Loading</div>: <div className='flex flex-col gap-3'> 
                                                            {users.map(userObject=>(
                                                                <div key={userObject.uid} className='flex gap-3 border-2'>
                                                                    <img src={userObject.userData.profile} className='rounded-full h-10 w-10'></img>
                                                                    <h2>{userObject.userData.name}</h2>
                                                                </div>
                                                            ))}
                                                        </div>
                }
                
                
            </>
        )
    }
}

export default ChatPanel
