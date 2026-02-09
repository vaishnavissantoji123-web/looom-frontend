import {
    MenuIcon,
} from "lucide-react";

import LooomLogo from "../assets/looom-logo.svg";
import NavMenu from "./nav-menu";




const SidebarNav = ({onCreateClick}) => {
    return (
        <nav className="hidden fixed left-0 top-0 bg-white h-full w-20 md:flex flex-col items-center justify-between pt-6 pb-8">
            <a href="/" className="cursor-pointer">
                <img src={LooomLogo} alt="logo" className="w-10 h-10 fill-black" />
            </a>
            <div className="flex flex-col gap-2">
                <NavMenu iconSize={24} onCreateClick={onCreateClick}/>
            </div>
            <div className=" hover:bg-gray-200 px-4 py-2.5 rounded-lg transition-all duration-150 cursor-pointer group">
                <MenuIcon
                    className="text-gray-400 group-hover:text-black transition-colors duration-100"
                    size={20}
                />
            </div>
        </nav>
    )
}

export default SidebarNav