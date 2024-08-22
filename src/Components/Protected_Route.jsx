import React from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext"

function Protected_Route(props){
    const {isLoggedIn}=useAuth()
    const children=props.children
    
    if(isLoggedIn)
    {
        return children
    }
    else
    {
        // return <Navigate to="/login"></Navigate>
        return <Navigate to="/login"></Navigate>
    }
}

export default Protected_Route