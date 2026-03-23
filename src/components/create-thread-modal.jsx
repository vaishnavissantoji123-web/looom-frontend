import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import ThreadForm from './thread-form';
import { useCreateThread } from '@/hooks/use.create thread';

const CreateThreadModal = () => {
    const thread = useCreateThread();

    return (
        <Dialog
            open
            onOpenChange={(isOpen) => {
                if (!isOpen) thread.closeDialog();
            }}
            className="z-100"
        >
            <DialogContent
                className="sm:max-w-lg p-0 bg-transparent border-none shadow-none gap-0"
                showCloseButton={false}
            >
                <DialogHeader className="px-5 py-4 border-b border-black/10 bg-white rounded-t-2xl">
                    <div className="flex items-center justify-between w-full">
                        <button
                            onClick={thread.closeDialog}
                            className="text-sm text-gray-800 hover:text-black cursor-pointer"
                        >
                            Cancel
                        </button>
                        <DialogTitle className="text-sm font-bold">
                            New thread
                        </DialogTitle>
                        <DialogDescription className="sr-only">
                            New thread form
                        </DialogDescription>
                        <div className="w-12" />
                    </div>
                </DialogHeader>

                <ThreadForm />
            </DialogContent>
        </Dialog>
    )
}

export default CreateThreadModal