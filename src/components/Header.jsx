import { MenuIcon } from 'lucide-react'
import React from 'react'
import LooomLogo from "../assets/looom-logo.svg";

const Header = () => {
  return (
    <>
        <div className="md:hidden bg-white sticky top-0 z-50">
            <div className="flex justify-between items-center w-full py-2.5 px-2">
                <div></div>
                <img src={LooomLogo} alt="logo" className="w-10 h-10 fill-black" />
                <MenuIcon size={20}/>

            </div>

        </div>
        
        <div className="flex md:hidden bg-white border-b border-black/10">
            <div className="flex justify-around px-10 font-medium text-gray-500 py-2.5 w-full">
                <button>For You</button>
                <button>Following</button>


            </div>

        </div>
    </>
  )
}

export default Header