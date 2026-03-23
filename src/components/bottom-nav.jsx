import { getUser } from "@/services/auth.service";
import NavMenu from "./nav-menu";

const BottomNav = ({ onCreateClick }) => {
  const currentUser = getUser();

  return (
    <nav className="md:hidden fixed z-50 bottom-0 w-full flex gap-2 items-cente justify-between py-2 px-1.5 bg-white backdrop-blur-xl border-t border-black/10">
      <NavMenu iconSize={22} onCreateClick={onCreateClick} user={currentUser} />
    </nav>
  );
};

export default BottomNav;