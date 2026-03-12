import { NAV_MENU_ITEMS } from "@/constants";
import { Link, useLocation } from "react-router-dom";
import NavItem from "./nav.item";


export default function NavMenu({ iconSize = 22, onCreateClick, user }) {
    const { pathname } = useLocation();

    return (
        <>
            {NAV_MENU_ITEMS.map((menuItem, index) => {
                const { Icon, isCreate } = menuItem;

                let url = menuItem.url;

                if (menuItem.url === "/profile") {
                    url = user?.user_id ? `/profile/${user.user_id}` : "/login";
                }

                const active = url === "/"
                    ? pathname === "/"
                    : pathname.startsWith(url);


                return (
                    <Link
                        to={isCreate ? "#" : url}
                        key={index}
                        className={`${isCreate && 'bg-gray-200 hover:bg-gray-200'} group hover:bg-gray-200 rounded-lg px-3.5 py-2 md:px-5 md:py-3 transition-colors duration-100 cursor-pointer w-full md:w-fit flex justify-center items-center`}
                        onClick={isCreate ? (e) => { e.preventDefault(); onCreateClick(); } : undefined}
                    >
                        <NavItem Icon={Icon} active={isCreate || active} size={iconSize} />
                    </Link>
                );
            })}
        </>
    );
}