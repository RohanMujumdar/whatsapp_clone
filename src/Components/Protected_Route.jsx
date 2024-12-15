import React from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext"
import { Loader2Icon } from "lucide-react"

function Protected_Route(props){
    const {isLoggedIn, loading}=useAuth()
    const children=props.children
    
    if(loading)
    {
        return <div className="w-screen h-screen flex items-center justify-center bg-gray-200">
            <Loader2Icon className="w-8 h-8 animate-spin"/>
        </div>
    }
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