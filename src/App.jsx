import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import Login from './Components/Login'
import Profile from './Components/Profile'
import Chat from './Components/Chat'
import Home from './Components/Home'
import PageNotFound from './Components/PageNotFound'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>

        {/* In the URL after chat if there is anything rubbish or jibrish [CHAT ID] then this route will open the chat page */}
        <Route path="/chat/:uniqueId" element={<Chat></Chat>}></Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
    </>
  )
}

export default App
