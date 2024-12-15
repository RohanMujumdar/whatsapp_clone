import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useAuth } from './AuthContext'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase.config'

function Profile(props) {
  const navigate=useNavigate()
  const {userData}=useAuth()

  console.log(userData.uid)
  const handleLogout=async ()=>{
      await signOut(auth)
      navigate("/login")
  }
  return (
    <div className='bg-white w-[30vw]'>
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

        <button onClick={handleLogout} className='text-white px-4 py-3 rounded bg-primary'>Logout</button>
    </div>
  )
}

export default Profile
