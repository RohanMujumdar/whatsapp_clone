
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Routing_app from './POC/Protected_Routing/Routing_app.jsx'
import User from './Components/useEffect/User.jsx'
import Login from './Components/Login.jsx'
import AuthWrapper from './Components/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <AuthWrapper>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthWrapper>
,)
