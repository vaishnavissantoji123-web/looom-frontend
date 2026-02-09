import React from 'react'

const NAV_ICON_ACTIVE = " text-gray-800 group-hover:text-black ";
const NAV_ICON_INACTIVE = "text-gray-400 group-hover:text-black";
const NavItem = ({ Icon, active, size = 22 }) => {
    return (
        <Icon size={size} className={`${active ? NAV_ICON_ACTIVE : NAV_ICON_INACTIVE}`} />
    )
}

export default NavItem