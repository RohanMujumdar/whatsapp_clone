import React from "react"

function Login()
{
    return ( 
    <>
        <div className="h-[220px] bg-[#11d1a7]">
            <div className="flex ml-[200px] pt-10 items-center gap-[0px]">
                <img src="../images/logo.jpg" alt="Logo" className="h-12" />
                <div className="text-white font-semibold">WHATSAPP</div>
            </div>
        </div> 
        <div className="flex justify-center items-center bg-gray-100 h-[calc(100vh-220px)] relative">
            <div className="bg-white w-[50%] h-[80%] shadow-2xl flex flex-col justify-center items-center gap-4 absolute -top-[93px]">
                <div>Sign In</div>
                <div>Sign In with Google account to get started</div>
                <button>Sign In with Google</button>
            </div>
        </div>
    </>
    )
}


export default Login