import { useState } from "react";


export function useCreateThread() {
    const [open, setOpen] = useState(false);
    return {
        open,
        setOpen,
        openDialog: () => setOpen(true),
        closeDialog: () => setOpen(false)
    }

}