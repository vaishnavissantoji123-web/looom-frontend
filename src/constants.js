import {
    HeartIcon,
    HomeIcon,
    PlusIcon,
    SearchIcon,
    UserIcon,
} from "lucide-react";

export const NAV_MENU_ITEMS = [
    { Icon: HomeIcon, isCreate: false, url: "/" },
    { Icon: SearchIcon, isCreate: false, url: "/search" },
    { Icon: PlusIcon, isCreate: true, url: "/create" },
    { Icon: HeartIcon, isCreate: false, url: "/" },
    { Icon: UserIcon, isCreate: false, url: "/" },
];