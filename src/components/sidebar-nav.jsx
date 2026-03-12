import { getUser } from "@/services/auth.service";
import LooomLogo from "../assets/looom-logo.svg";
import NavMenu from "./nav-menu";
import UserMenu from "./user-menu";

const SidebarNav = ({ onCreateClick }) => {
  const currentUser = getUser();
  return (
    <nav className="hidden fixed left-0 top-0 h-full w-fit md:flex flex-col items-center justify-between pt-4 pb-6 px-2">
      <a href="/" className="cursor-pointer">
        <img src={LooomLogo} alt="logo" className="w-10 h-10 fill-black" />
      </a>
      <div className="flex flex-col gap-3.5">
        <NavMenu
          onCreateClick={onCreateClick}
          iconSize={26}
          user={currentUser}
        />
      </div>
      <div className="py-3">
        <UserMenu
          size={26}
          className="text-gray-400 hover:text-black transition-colors"
        />
      </div>
    </nav>
  );
};

export default SidebarNav;