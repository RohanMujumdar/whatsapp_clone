import React, { useState } from 'react'
import { ArrowLeft, CheckIcon } from 'lucide-react'
import { useAuth } from './AuthContext'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase.config'

function Profile(props) {
  const navigate=useNavigate()
  const {userData, updateName, updateStatus}=useAuth()

  const [name, setName]=useState(userData?.name || "")
  const [status, setStatus]=useState(userData?.status || "")

  console.log(userData.uid)
  
  const handleLogout=async ()=>{
      await signOut(auth)
      navigate("/login")
  }
  return (
    <div className='bg-background w-[30vw]'>
       <div className='bg-[#10c8a0] text-white py-4 text-lg px-4 flex items-center gap-6'>
          <button onClick={props.onBack}>
            <ArrowLeft />
          </button>
          <h1>Profile</h1>
        </div>

        <div className='flex flex-col items-center justify-center gap-8 mt-8'>
            <img src={userData.profile} className='rounded-full h-10 w-10'></img>
            <div className='flex flex-col bg-white w-full py-4 px-8'>
              <label className='text-sm text-primary mb-2'>Your Name</label>
              <div className='flex items-center w-full'>
                <input
                  value={name}
                  className='w-full bg-transparent'
                  placeholder='Update your name...'
                  onChange={(e)=>{
                    setName(e.target.value)
                  }}
                />
                <button onClick={()=>updateName(status)}>
                  <CheckIcon className='w-5 h-5'/>
                </button>
              </div>
            </div>

            <div className='flex flex-col bg-white w-full py-4 px-8'>
              <label className='text-sm text-primary mb-2'>Your Name</label>
              <div className='flex items-center w-full'>
                <input
                  value={status}
                  className='w-full bg-transparent'
                  placeholder='Update your status'
                  onChange={(e)=>{
                    setStatus(e.target.value)
                  }}
                />
                <button onClick={()=>updateStatus(status)}>
                  <CheckIcon className='w-5 h-5'/>
                </button>
              </div>
            </div>

            <button onClick={handleLogout} className='text-white px-4 py-3 rounded bg-primary'>Logout</button>
        </div>

        
    </div>
  )
}

export default Profile
