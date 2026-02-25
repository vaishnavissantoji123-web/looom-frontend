import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"
import { LogOut, MenuIcon } from 'lucide-react';
import { logoutUser } from '@/services/auth.service';

const handleLogout=()=>{
    logoutUser();
}
const UserMenu = ({ size = 24, className = "", algin = "start" }) => {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className={`outline-none cursor-pointer ${className} `} >
                    <MenuIcon size={size}/>
                </button>
            </PopoverTrigger>
            <PopoverContent  algin={algin} className={"w-48 p-2"}>
                <button onClick={handleLogout} className=" flex items-center gap-2 w-full px-3 py2 text-sm text-red-600 hover:bg-red-50 transition-clors ">
                    <LogOut size={16}/>
                    logout
                </button>
            </PopoverContent>
        </Popover>
    )
}

export default UserMenu