import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, MenuIcon } from "lucide-react";
import { isAuthenticated, logoutUser } from "@/services/auth.service";
import { Link } from "react-router-dom";

const UserMenu = ({ size = 24, className = "", align = "start" }) => {
  const handleLogout = () => {
        logoutUser();
        window.location.href = "/";
    };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className={`outline-none cursor-pointer ${className}`}>
          <MenuIcon size={size} />
        </button>
      </PopoverTrigger>
      <PopoverContent align={align} className="w-48 p-2">
        {isAuthenticated() ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors hover:no-underline"
          >
            Login
          </Link>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default UserMenu;