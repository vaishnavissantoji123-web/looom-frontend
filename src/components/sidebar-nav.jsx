import {
    MenuIcon,
} from "lucide-react";

import LooomLogo from "../assets/looom-logo.svg";
import NavMenu from "./nav-menu";
import UserMenu from "./user-menu";




const SidebarNav = ({onCreateClick}) => {
    return (
        <nav className="hidden fixed left-0 top-0 h-full w-20 md:flex flex-col items-center justify-between pt-6 pb-8">
            <a href="/" className="cursor-pointer">
                <img src={LooomLogo} alt="logo" className="w-10 h-10 fill-black" />
            </a>
            <div className="flex flex-col gap-2">
                <NavMenu iconSize={24} onCreateClick={onCreateClick}/>
            </div>
                <div className="py-3">
                    <UserMenu size={26} className="text-gray-400 hover:text-black transiction-colors"/>
                </div>
            
        </nav>
    )
}

export default SidebarNav