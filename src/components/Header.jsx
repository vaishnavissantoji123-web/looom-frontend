import { MenuIcon } from 'lucide-react'
import React from 'react'
import LooomLogo from "../assets/looom-logo.svg";

const Header = () => {
    return (
        <>
            <div className="md:hidden bg-white/70  sticky top-0 z-50 blackdrop-blue-lg">
                <div className="flex justify-between items-center w-full py-2.5 px-2">
                    <div></div>
                    <img src={LooomLogo} alt="logo" className="w-10 h-10 fill-black" />
                    <MenuIcon size={20} />

                </div>

            </div>
        </>
    )
}

export default Header