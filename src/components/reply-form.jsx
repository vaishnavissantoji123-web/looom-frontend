import { useState } from "react";
import { createPost } from "@/services/posts.service";
import { getUser, isAuthenticated } from "@/services/auth.service";
import { Send } from "lucide-react";

export default function ReplyForm({ parentId, onReply }) {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const user = getUser();

    const handleReply = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        if (!isAuthenticated()) {
            window.location.href = "/login";
            return;
        }

        try {
            setLoading(true);

            const reply = await createPost({
                content,
                parent_id: parentId,
            });

            onReply(reply);
            setContent("");
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleReply}
            className="border-b border-black/10 px-5 py-4 flex gap-3 items-center"
        >
            <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-gray-400 shrink-0 text-white font-bold text-xl flex items-center justify-center overflow-hidden">
                    {user.username.charAt(0).toUpperCase()}
                </div>
                <div className="w-[2px] grow bg-black/10 rounded-full" />
            </div>

            <input
                type="text"
                placeholder="Reply..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-1 border-none outline-none text-sm"
            />

            <button
                disabled={loading || !content.trim()}
                className="text-sm font-semibold disabled:opacity-50 text-black/80 hover:bg-gray-100 p-2 rounded-full transition-all duration-150"
            >
                <Send size={20} className={`${content.trim() && "rotate-45"} transition-all duration-150`} />
            </button>
        </form>
    );
}