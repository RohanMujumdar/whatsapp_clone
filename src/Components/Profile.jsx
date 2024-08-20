import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useAuth } from './AuthContext'

function Profile(props) {
  const {userData}=useAuth()
  return (
    <>
       <div className='bg-[#10c8a0] text-white py-4 text-lg px-4 flex items-center gap-6'>
          <button onClick={props.onBack}>
            <ArrowLeft />
          </button>
          <h1>Profile</h1>
        </div>

        <div className='bg-gray-300'>
            <img src={userData.profile} className='rounded-full h-10 w-10'></img>
            <h2>{userData.name}</h2>
        </div>
    </>
  )
}

export default Profile
