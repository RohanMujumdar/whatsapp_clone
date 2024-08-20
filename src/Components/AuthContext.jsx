import React from 'react'
import { useContext } from 'react'
import { useState } from 'react';
const AuthContext=React.createContext();
//hook

export function useAuth() {
    return useContext(AuthContext)
}

function AuthWrapper({children}) {
    const [userData, setUserData]=useState(null)
  return (
    <AuthContext.Provider value={{setUserData,userData}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthWrapper
