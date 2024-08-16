import React from "react"
import { Navigate, useNavigate } from "react-router-dom"

function Protected_Route(props){
    const isLoggedIn=props.isLoggedIn
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