import React, { useEffect, useState } from 'react'

function User() {
    const [loading, setLoading]=useState(true)
    const [user, setUser]=useState(null)
    function cb(){
        // console.log("I am After render")
        (async function fetchUser(){
            const response=await fetch("https://jsonplaceholder.typicode.com/users/1")
            const userData=await response.json()
            console.log("userData",userData)
            setLoading(false)
            setUser(userData)
        })()

    }

    useEffect(cb,[])
    console.log("render")

    if(loading)
    {
        return (
            <>
                <div>
                User Component
                </div>
                <div>...Loading</div>
            </>
        )
    }
    if(loading==false)
        {
            return (
                <>
                    <div>
                    User Component
                    </div>
                    <div>User</div>
                </>
            )
        }

}

export default User
