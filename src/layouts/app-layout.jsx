import { Outlet } from "react-router-dom";
import { PlusIcon } from "lucide-react";
import BottomNav from "@/components/bottom-nav";
import Header from "@/components/header";
import SidebarNav from "@/components/sidebar-nav";
import { useCreateThread } from "@/hooks/use.create thread";


const AppLayout = () => {
  const thread = useCreateThread();

  return (
    <div className="app">
      <main>
        <SidebarNav onCreateClick={thread.openDialog} />
        <Header />
        <div className="bg-white/70 min-h-screen">
          <div className="w-full max-w-160 mx-auto">
            <Outlet />
          </div>
        </div>
        <BottomNav onCreateClick={thread.openDialog} />


      </main>
      {/* Floating Action Button (Optional) */}
      <div className="hidden md:inline-flex fixed bottom-8 right-8">
        <button
          onClick={thread.openDialog}
          className="bg-white border border-gray-400 px-6 py-4 rounded-lg hover:shadow-md cursor-pointer group transition-all duration-150"
        >
          <PlusIcon
            className="text-gray-700 group-hover:text-black transition-colors duration-100"
            size={24}
          />
        </button>
      </div>
    </div>
  );
};

export default AppLayout;