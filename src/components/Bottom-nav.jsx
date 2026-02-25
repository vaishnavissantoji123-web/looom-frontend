import NavMenu from "./nav-menu"



const BottomNav = ( {onCreateClick}) => {
    return (
        <nav className="md:hidden fixed z-50 bottom-0 w-full flex gap-2 items-center justify-between py-2. px-1.2 bg-white backdrop-blur-xl border-t border-black/10">
            <NavMenu onCreateClick={onCreateClick}/>

        </nav>
    )
}

export default BottomNav