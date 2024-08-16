import { signOut } from 'firebase/auth'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../../firebase.config'

function Home(props) {
    const setIsLoggedIn=props.setIsLoggedIn
    const navigate=useNavigate()
    const handleLogout=async ()=>{

        await signOut(auth);
        setIsLoggedIn(false);
        navigate("/login")
    }
    return (
        <div>
            <h2>Home</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Home
