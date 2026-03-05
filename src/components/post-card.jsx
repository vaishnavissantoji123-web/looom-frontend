import { Heart, MessageCircle, Repeat2, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { formatTimeAgo } from "@/lib/utils";
import { isAuthenticated } from "@/services/auth.service";
import { toggleLike } from "@/services/social.services";

export default function PostCard({ post,isReply=false }) {
    const [liked, setLiked] = useState(post.liked);
    const [likeCount, setLikeCount] = useState(post.likes_count || 0);
    const [loading, setLoading] = useState(false);

    const avatarLetter = post.username?.charAt(0).toUpperCase();

    const handleLike = async (e) => {
        e.preventDefault();
        if (loading) return;

        if (!isAuthenticated()) {
            window.location.href = "/login";
            return;
        }

        const nextLiked = !liked;

        // optimistic update
        setLiked(nextLiked);
        setLikeCount((prev) => (nextLiked ? prev + 1 : prev - 1));
        setLoading(true);

        try {
            const res = await toggleLike(
                post.post_id,
                nextLiked ? "like" : "unlike"
            );

            // sync with server truth
            setLiked(res.liked);
            setLikeCount(res.likes_count);
        } catch (err) {
            // revert on failure
            setLiked(!nextLiked);
            setLikeCount((prev) => (nextLiked ? prev - 1 : prev + 1));
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <article className="group border-b border-gray-300 last:border-b-0 px-6 py-5">
            <div className="flex gap-3">

                {/* Avatar */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-500 flex items-center justify-center text-white font-bold text-sm">
                        {avatarLetter}
                    </div>
                    {(isReply) && 
                    <div className="w-[20px] flex-1 mt-2 rounded-full bg-black/10"/>}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-0.5">
                        <div className="flex items-center gap-1.5 min-w-0">
                            <span className="font-semibold text-gray-900 truncate">
                                {post.username}
                            </span>
                            <span className="text-gray-400 shrink-0">
                                {formatTimeAgo(post.created_at)}
                            </span>
                        </div>
                        <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
                            <MoreHorizontal size={18} />
                        </button>
                    </div>

                    {/* Body */}
                    <Link
                        to={`/post/${post.post_id}`}
                        className="block text-gray-700 whitespace-pre-wrap mb-2.5"
                    >
                        {post.content}
                    </Link>

                    {/* Actions */}
                    <div className="flex items-center gap-3 -ml-2 mt-1">

                        {/* LIKE */}
                        <button
                            onClick={handleLike}
                            disabled={loading}
                            className={`flex items-center gap-1 p-2 rounded-full text-[13px] font-medium transition-all cursor-pointer ${liked
                                ? "text-rose-500 hover:bg-rose-50"
                                : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"}`}
                        >
                            <Heart
                                size={20}
                                fill={liked ? "currentColor" : "none"}
                                strokeWidth={liked ? 0 : 1.8}
                            />
                            {likeCount > 0 && <span>{likeCount}</span>}
                        </button>

                        {/* COMMENT */}
                        <Link to={`/post/${post.post_id}`}>
                            <button className="flex items-center gap-1 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer">
                                <MessageCircle size={18} />
                                {post.replies_count > 0 && <span>{post.replies_count}</span>}
                            </button>
                        </Link>

                        {/* REPOST placeholder */}
                        <button className="flex items-center gap-1 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer">
                            <Repeat2 size={18} />
                        </button>

                    </div>
                </div>
            </div>
        </article>
    );
}