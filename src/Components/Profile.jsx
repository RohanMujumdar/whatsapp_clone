import React, { useState } from 'react'
import { ArrowLeft, CheckIcon, Edit2Icon, Loader2Icon } from 'lucide-react'
import { useAuth } from './AuthContext'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase.config'

function Profile(props) {
  const navigate=useNavigate()
  const {userData, updateName, updateStatus, updatePhoto, isUploading, error }=useAuth()

  const [name, setName]=useState(userData?.name || "")
  const [status, setStatus]=useState(userData?.status || "")
  
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
            <label className={`group relative cursor-pointer rounded-full overflow-hidden ${isUploading?"pointer-events-none":""}`}>
              <img src={userData?.profile || "default_profile_picture_url"} alt="profile picture" className='w-[160px] h-[160px] object-cover'></img>
              {isUploading?(
                <div className='absolute inset-0 flex items-center justify-center bg-black/10 z-10'>
                  <Loader2Icon className='w-6 h-6 text-primary-dense animate-spin z-10' />
                </div>
              ):(
                <div className='absolute inset-0 hidden group-hover:flex items-center justify-center bg-black/30 z-10'>
                  <Edit2Icon className='w-6 h-6 text-white'/>
                </div>
              )}

              <input
                type='file'
                accept='image/png, image/gif, image/jpeg'
                onChange={(e)=>{
                  if (e.target.files?.[0]) {
                    updatePhoto(e.target.files?.[0]);
                  }
                }}
                className='hidden' 
              />
            </label>
            
            {error && <h2 className='text-red-500 text-sm'>{error}</h2>}

            <div className='flex flex-col bg-white w-full py-4 px-8'>
              <label className='text-sm text-primary mb-2'>Your Name</label>
              <div className='flex items-center w-full'>
                <input
                  value={name || ""}
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
              <label className='text-sm text-primary mb-2'>Your Status</label>
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
