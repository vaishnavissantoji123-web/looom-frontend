import BottomNav from "@/components/bottom-nav";
import Header from "@/components/Header";
import SidebarNav from "@/components/sidebar-nav";



import { PlusIcon, Sidebar } from "lucide-react";
import React from "react";
import { Outlet } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useCreateThread } from "@/hooks/use.create thread";
import ThreadForm from "@/components/thread-item-form";

const AppLayout = () => {
  const thread = useCreateThread();
  return (
    <div className="app">
      <main>
        <SidebarNav  onCreateClick={thread.openDialog}/>
        <Header />
        <div className="w-full md:max-w-4xl mx-auto ">
          <Outlet />
        </div>
        <BottomNav SidebarNav  onCreateClick={thread.openDialog}/> 
        <Dialog open={thread.open} onOpenChange={thread.setOpen}>
          <DialogContent className="md:max-w-lg p-0 pg-trasparent border-none shadow-none gap-0" showCloseButton={false}>
            <DialogHeader className="px-5 py-4 border-b border-black/10 pg-white rounded-t-2xl ">
              <div className="w-full flex justify-between items-center">
                <button className="text-sm text-gray-800 on hober:text-black cursor-pointer" onClick={thread .closeDialog}> cancle</button>
                <DialogTitle className="text-sm font-bold">NewThread</DialogTitle>
                <DialogDescription className="sr-only">NewThread</DialogDescription>
                <div className="w-12"/>
              </div>
              
            </DialogHeader>
            <ThreadForm/>
          </DialogContent>
        </Dialog> 
      </main>
      <div className=" hidden md:flex fixed bottom-8 right-8 group">
        <button className= "bg-white border border-gray-400 px-6 py-4 rounded-lg cursor-pointer hover:shadow-md group transition-colors duration-150"onClick={thread.openDialog}>
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