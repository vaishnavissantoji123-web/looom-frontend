import { NAV_MENU_ITEMS } from '@/constants';
import React from 'react'
import NavItem from './nav.item';

const NavMenu = ({ iconSize = 22  ,onCreateClick}) => {
    return (
        <>
            {NAV_MENU_ITEMS.map((menuItem, index) => {
                const { Icon, active,isCreate } = menuItem;
                return (

                    <div
                        key={index}
                        className={`${active && "bg-gray-200"} group px-4 py-3.5 rounded-lg hover:bg-gray-200 trasition-all duration-150 cursor-pointer`}
                        onClick={isCreate ? onCreateClick:undefined}
                >       
                    <NavItem Icon={Icon} active={active} size={iconSize}/>
             </div>
            );
        })}
        </>
    );
};

export default NavMenu