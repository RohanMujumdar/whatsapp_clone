import { useEffect, useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import Login from './Components/Login'
import Profile from './Components/Profile'
import ChatWindow from './Components/ChatWindow'
import Home from './Components/Home'
import PageNotFound from './Components/PageNotFound'
import Protected_Route from './Components/Protected_Route'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Protected_Route>
            <Home></Home>
        </Protected_Route>}></Route>

        <Route path="/:chatId" element={<Protected_Route>
            <Home></Home>
        </Protected_Route>}></Route>

        <Route path="/login" element={<Login></Login>}></Route>

        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
    </>
  )
}

export default App
