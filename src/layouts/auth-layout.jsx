import { Outlet } from "react-router-dom";
import LooomLogo from "../assets/looom-logo.svg";

export default function AuthLayout() {
    return (

        <div className="min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Art */}
            <div className="hidden md:flex absolute -top-20 left-0 w-full z-0 pointer-events-none">
                <img
                    src="/hero-bg.png"
                    alt="Background Art"
                    className="w-full h-full object-cover object-top opacity-100"
                />
            </div>

            {/* Main Content Area */}
            <main className="grow flex items-center justify-center w-full relative z-10 px-4 pt-32 pb-20 md:pb-0">
                <div className="w-full max-w-[370px]">
                    <div className="md:hidden flex justify-center items-center mb-6">
                        <a href="/" className="cursor-pointer">
                            <img src={LooomLogo} alt="logo" className="w-12 h-12 fill-black" />
                        </a>
                    </div>
                    <Outlet />
                </div>
            </main>

            {/* Footer Links */}
            <footer className="w-full py-6 relative z-10 text-[12px] text-black/80 flex flex-col items-center justify-center space-y-3 md:space-y-0 md:flex-row md:space-x-6">
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                    <span>&copy; {new Date().getFullYear()}</span>
                    <a href="#" className="hover:underline">Threads Terms</a>
                    <a href="#" className="hover:underline">Privacy Policy</a>
                    <a href="#" className="hover:underline">Cookies Policy</a>
                    <a href="#" className="hover:underline">Report a problem</a>
                </div>
            </footer>

            {/* QR Code Floating Widget (Bottom Right) */}
            <div className="fixed bottom-6 right-6 z-50 hidden md:block group">
                <div className="text-[12px] text-black/80 mb-2 text-center opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    Scan to get the app
                </div>
                <div className="bg-gray-50 p-3 w-30 h-30 rounded-2xl border border-black/60 transform transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex justify-center items-center">
                    <img src={LooomLogo} alt="logo" className="w-16 h-16 fill-black" />
                </div>
            </div>
        </div>
    );
}