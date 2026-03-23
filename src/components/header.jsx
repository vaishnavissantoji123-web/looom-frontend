import { useNavigate, useLocation, matchPath } from "react-router-dom";
import LooomLogo from "../assets/looom-logo.svg";
import UserMenu from "./user-menu";
import { ArrowLeft } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isPostDetail = matchPath("/post/:id", pathname);

  return (
    <div className="md:hidden bg-white/70 sticky top-0 z-50 backdrop-blur-lg shadow-none">
      <div className="flex justify-between items-center w-full py-2.5 px-4">

        {isPostDetail ? (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center rounded-full hover:bg-black/5 transition-all duration-200 animate-slideIn"
          >
            <ArrowLeft size={24} className="text-gray-800" />
          </button>
        ) : (
          <div className="w-6 h-6" />
        )}

        <img src={LooomLogo} alt="logo" className="w-8 h-8" />

        <UserMenu size={24} align="end" />

      </div>
    </div>
  );
};

export default Header;