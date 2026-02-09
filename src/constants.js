import {
    HeartIcon,
    HomeIcon,
    PlusIcon,
    SearchIcon,
    UserIcon,
} from "lucide-react";

export const NAV_MENU_ITEMS = [
    { Icon: HomeIcon, active: false,isCreate:false },
    { Icon: SearchIcon, active: false,isCreate:false },
    { Icon: PlusIcon, active: true,isCreate:true},
    { Icon: HeartIcon, active: false ,isCreate:false},
    { Icon: UserIcon, active: false,isCreate:false },
];