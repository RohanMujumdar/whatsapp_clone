import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import { useState } from 'react'
import Protected_Route from './Protected_Route'
import Chat from './Chat'

function Routing_app() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <>
      <h1>Routing_App</h1>
      <Routes>

        <Route path="/" element={<Protected_Route isLoggedIn={isLoggedIn}>
            <Home setIsLoggedIn={setIsLoggedIn}></Home>
        </Protected_Route>}></Route>

        <Route path="/chat/:uniqueId" element={<Protected_Route isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
            <Chat setIsLoggedIn={setIsLoggedIn}></Chat>
        </Protected_Route>}></Route>

        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}></Login>}></Route>

      </Routes>
    </>
  )
}

// function Protected_Route(props){
//     const isLoggedIn=props.isLoggedIn
//     const children=props.children
//     if(isLoggedIn)
//     {
//         return children
//     }
//     else
//     {
//         return <Navigate to="/login"></Navigate>
//     }
// }

export default Routing_app
