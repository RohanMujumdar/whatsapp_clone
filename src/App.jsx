import { useEffect, useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import Login from './Components/Login'
import Profile from './Components/Profile'
import Chat from './Components/Chat'
import Home from './Components/Home'
import PageNotFound from './Components/PageNotFound'
import Protected_Route from './Components/Protected_Route'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  return (
    <>
      <Routes>

        <Route path="/" element={<Protected_Route isLoggedIn={isLoggedIn}>
            <Home setIsLoggedIn={setIsLoggedIn}></Home>
        </Protected_Route>}></Route>

        <Route path="/chat/:uniqueId" element={<Protected_Route isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
            <Chat setIsLoggedIn={setIsLoggedIn}></Chat>
        </Protected_Route>}></Route>

        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}></Login>}></Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
    </>
  )
}

export default App
