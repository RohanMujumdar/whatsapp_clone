import React from "react"
import { Fingerprint } from 'lucide-react';
import { LogIn } from "lucide-react";
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
                <Fingerprint className="h-20 w-20 text-[#10c8a0]" strokeWidth={1.5}/>
                <div className="font-bold text-2xl leading-8">Sign In</div>
                <div className="text-gray-500 font-bold">Sign In with Google account to get started</div>
                <button className="flex gap-2 item-center bg-[#11d1a7] p-3 mt-7 text-white rounded-lg">
                    Sign In with Google <LogIn />
                </button>

            </div>
        </div>
    </>
    )
}


export default Login