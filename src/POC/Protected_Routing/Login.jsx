import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

//auth-step-3
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { auth } from '../../../firebase.config';



function Login(props) {

    const isLoggedIn=props.isLoggedIn
    const setIsLoggedIn=props.setIsLoggedIn
    const navigate=useNavigate()

    if(isLoggedIn)
    {
      navigate("/")
      return
    }
    const handleLogin = async()=>{

        //auth-step-4
        const result = await signInWithPopup(auth, new GoogleAuthProvider)
        console.log(result)
        setIsLoggedIn(true);
        navigate("/")
    }
  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login
