import React, { useEffect } from 'react'
import { useState } from 'react';
import { db } from '../../firebase.config';
import { collection, getDocs } from 'firebase/firestore';
import { ArrowLeft, CircleFadingPlusIcon, Loader2Icon, MessageSquare, SearchIcon, UserRoundIcon } from 'lucide-react';
import Profile from './Profile';
import UserCard from './userCard';
import { useAuth } from './AuthContext';
function ChatPanel() {

    const [isLoading, setLoading]=useState(true)
    const [users, setUser] = useState([]);
    const [profile, showProfile]=useState(false)
    const [searchQuery, setSearchQuery]=useState("")

    const {userData}=useAuth()

    let filterUsers=users
    if(searchQuery){
        filterUsers=users.filter((user)=>user.userData.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
    }
    const onBack=()=>{showProfile(false)}
    
    useEffect(()=>{
        const getUsers=async() =>{

            //data should be brought from which collection from firebase
            const snapShot = await getDocs(collection(db, 'users'));
            // console.log(snapShot.docs.length)
            const arrayOfUser=snapShot.docs.map((docs)=>{return {userData: docs.data(), id: docs.id} })
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

    const currentUser = users.find((user) => user.userData?.email === userData?.email);

        return (
            <div className='bg-white w-[30vw] min-w-[350px]'> 
                {/* //Top Bar */}
                <div className='bg-backGround py-2 px-4 border-r flex justify-between items-center gap-2'>
                    <button onClick={()=>{showProfile(true)}}>
                        {currentUser?.userData?.profile?(
                        <img 
                            src={currentUser.userData.profile}
                            alt="profile picture"
                            className='w-10 h-10 rounded-full object cover'
                        />):(
                            <div className="w-10 h-10 rounded-full bg-gray-200">No Image</div>
                        )}
                    </button>
                    <div className='flex item-end justify-center gap-6 mx-4'>
                        <CircleFadingPlusIcon className='w-6 h-6'/>
                        <MessageSquare className='w-6 h-6'/>
                        <UserRoundIcon className='w-6 h-6'/>
                    </div>
                </div>

                {/* Chat List */}
                {
                    isLoading ? <div className='h-full w-full flex justify-center items-center '><Loader2Icon className='w-10 h-10 animate-spin'/></div>: 
    
                        <div className='bg-white py-2 px-3'>
                            <div className='bg-backGround flex items-center gap-4 px-3 py-2 rounded-lg'>
                                <SearchIcon className='w-4 h-4'/>
                                <input
                                    className='bg-backGround focus-within:outline-none'
                                    placeholder='Search'
                                    value={searchQuery}
                                    onChange={(e)=>setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className='divide-y py-4 h-full max-h-[calc(100vh-152px)] overflow-y-auto'> 
                                {filterUsers.map(userObject=> <UserCard userObject={userObject} key={userObject.id}/>)}
                            </div>
                        </div>
                }
            </div>
        )
    }


export default ChatPanel
