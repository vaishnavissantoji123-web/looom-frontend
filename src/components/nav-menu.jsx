import { NAV_MENU_ITEMS } from '@/constants';
import React from 'react'
import NavItem from './nav.item';
import { Link, useLocation } from 'react-router-dom';

const NavMenu = ({ iconSize = 22, onCreateClick }) => {
    const { pathname } = useLocation();
    return (
        <>
            {NAV_MENU_ITEMS.map((menuItem, index) => {
                const { Icon, isCreate, url } = menuItem;
                const active = url === "/" ? pathname === "/" : pathname.startsWith(url);
                return (

                    <Link to={isCreate ? "#" : url}
                        key={index}
                        className={`${isCreate && "bg-gray-200 hover:bg-gray-200"} group px-3.5  py-2 md:px-5 md:py-5 rounded-lg hover:bg-gray-200 trasition-all duration-150 cursor-pointer w-full md:w-full flex justify-center items-center`}
                        onClick={isCreate ? ((e) => {
                            e.preventDefault();
                            onCreateClick();
                        }) : undefined}
                    >
                        <NavItem Icon={Icon} active={active||isCreate} size={iconSize} />
                    </Link>
                );
            })}
        </>
    );
};

export default NavMenu