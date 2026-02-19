import BottomNav from "@/components/bottom-nav";
import Header from "@/components/header";
import SidebarNav from "@/components/sidebar-nav";
import { PlusIcon } from "lucide-react";
import { Outlet } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ThreadForm from "@/components/thread-form";
import { useCreateThread } from "@/hooks/use.create thread";

const AppLayout = () => {
  const thread = useCreateThread();
  return (
    <div className="app">
      <main>
        <SidebarNav onCreateClick={thread.openDialog} />
        <Header />
        <div className="bg-[#fafafa]">
          <div className="w-full md:max-w-180 mx-auto">
            <Outlet />
          </div>
        </div>
        <BottomNav onCreateClick={thread.openDialog} />
        <Dialog
          open={thread.open}
          onOpenChange={(isOpen) => {
            if (!isOpen) thread.closeDialog();
          }}
        >
          <DialogContent
            className="md:max-w-lg p-0 bg-transparent border-none shadow-none gap-0"
            showCloseButton={false}
          >
            <DialogHeader className="px-5 py-4 border-b border-black/10 bg-white rounded-t-2xl">
              <div className="w-full flex justify-between items-center">
                <button
                  className="text-sm text-gray-800 hover:text-black cursor-pointer"
                  onClick={thread.closeDialog}
                >
                  Cancel
                </button>
                <DialogTitle className="text-sm font-bold">
                  New Thread
                </DialogTitle>
                <DialogDescription className="sr-only"></DialogDescription>
                <div className="w-12" />
              </div>
            </DialogHeader>
            <ThreadForm />
          </DialogContent>
        </Dialog>
      </main>
      <div className="hidden md:flex fixed bottom-8 right-8">
        <button
          className="bg-white border border-gray-400 px-6 py-4 rounded-lg cursor-pointer hover:shadow-md group transition-colors duration-150"
          onClick={thread.openDialog}
        >
          <PlusIcon
            className="text-gray-700 group-hover:text-black"
            size={24}
          />
        </button>
      </div>
    </div>
  );
};

export default AppLayout;