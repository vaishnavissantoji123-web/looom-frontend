import {
  Heart,
  MessageCircle,
  Repeat2,
  MoreHorizontal,
  Link2,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { formatTimeAgo } from "@/lib/utils";
import { getUser, isAuthenticated } from "@/services/auth.service";
import { toggleLike } from "@/services/social.service.js";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { deletePost } from "@/services/posts.service";

export default function PostCard({
  post,
  isReply = false,
  viewPost = false,
  onDelete,
}) {
  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likes_count || 0);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const currentUser = getUser();
  const isOwner = isAuthenticated() && currentUser?.user_id === post.user_id;

  const avatarLetter = post.username?.charAt(0).toUpperCase();

  const handleLike = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!isAuthenticated()) {
      window.location.href = "/login";
      return;
    }

    const nextLiked = !liked;

    setLiked(nextLiked);
    setLikeCount((prev) => (nextLiked ? prev + 1 : prev - 1));
    setLoading(true);

    try {
      const res = await toggleLike(post.post_id, nextLiked ? "like" : "unlike");
      setLiked(res.liked);
      setLikeCount(res.likes_count);
    } catch (err) {
      setLiked(!nextLiked);
      setLikeCount((prev) => (nextLiked ? prev - 1 : prev + 1));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    try {
      await deletePost(post.post_id);
      onDelete?.(post.post_id);
    } catch (err) {
      console.error(err);
    }
  };
  const handleCopyLink = () => {
    const url = `${window.location.origin}/post/${post.post_id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const moreMenu = (
    <Popover>
      <PopoverTrigger asChild>
        <button className="p-2 rounded-full  text-gray-600 hover:bg-gray-100">
          <MoreHorizontal size={18} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-48 p-1">
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
        >
          <Link2 size={15} />
          {copied ? "Copied!" : "Copy Link"}
        </button>
        {isOwner && (
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
          >
            <Trash2 size={15} />
            Delete Post
          </button>
        )}
      </PopoverContent>
    </Popover>
  );

  const actions = (
    <div className="flex items-center gap-3 -ml-2 mt-1">
      {/* LIKE */}
      <button
        onClick={handleLike}
        disabled={loading}
        className={`flex items-center gap-1 p-2 rounded-full text-[13px] font-medium transition-all cursor-pointer ${
          liked
            ? "text-rose-500 hover:bg-rose-50"
            : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
        }`}
      >
        <Heart
          size={20}
          fill={liked ? "currentColor" : "none"}
          strokeWidth={liked ? 0 : 1.8}
        />
        {likeCount > 0 && <span>{likeCount}</span>}
      </button>

      {/* COMMENT */}
      <Link to={`/post/${post.post_id}`} className="no-underline">
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
  );

  return (
    <article className="group border-b border-gray-300 last:border-b-0 px-4 py-2.5 md:px-6 md:py-5">
      {viewPost ? (
        /* viewPost layout: avatar + header on one row, then body & actions indented below */
        <div className="flex-1 min-w-0">
          <div className="flex gap-3">
            {/* Avatar */}
            <div className="flex flex-col items-center shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-500 flex items-center justify-center text-white font-bold text-sm">
                {avatarLetter}
              </div>
              {isReply && (
                <div className="w-[2px] flex-1 mt-2 rounded-full bg-black/10" />
              )}
            </div>

            {/* Header */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1.5 min-w-0">
                <Link
                  to={`/profile/${post.user_id}`}
                  className="font-semibold text-gray-900"
                >
                  {post.username}
                </Link>
                <span className="text-gray-400 shrink-0 text-sm md:text-md">
                  {formatTimeAgo(post.created_at)}
                </span>
              </div>
              {moreMenu}
            </div>
          </div>

          <div className="px-2">
            <p className="block text-gray-700 whitespace-pre-wrap break-all my-2.5">
              {post.content}
            </p>
            {actions}
          </div>
        </div>
      ) : (
        /* Normal card layout: avatar + all content side by side */
        <div className="flex gap-3">
          {/* Avatar + connector line */}
          <div className="flex flex-col items-center shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-500 flex items-center justify-center text-white font-bold text-sm">
              {avatarLetter}
            </div>
            {isReply && (
              <div className="w-[2px] flex-1 mt-2 rounded-full bg-black/10" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-0.5">
              <div className="flex items-center gap-1.5 min-w-0">
                <Link
                  to={`/profile/${post.user_id}`}
                  className="font-semibold text-gray-900"
                >
                  {post.username}
                </Link>
                <span className="text-gray-400 shrink-0 text-sm md:text-md">
                  {formatTimeAgo(post.created_at)}
                </span>
              </div>
              {moreMenu}
            </div>

            {/* Body */}
            <div className="mt-2.5">
              <Link
                to={`/post/${post.post_id}`}
                className="block text-gray-700 whitespace-pre-wrap break-all mb-2.5 no-underline"
              >
                {post.content}
              </Link>

              {actions}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}