import { getUser, isAuthenticated } from "@/services/auth.service";
import { createPost } from "@/services/posts.service";
import React, { useState } from "react";

const ReplyForm = ({ parentId, onReply }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const user = getUser();
  
  const handleReply = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    if (!isAuthenticated()) {
      window.location.href = "/login";
      return;
    }
    try {
      const reply = await createPost({ content, parent_id: parentId });
      onReply(reply);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleReply} className="flex gap-3 items-center">
      <div className="flex flex-col items-center">
        <div className="w-9 h-9 rounded-full bg-gray-400 shrink-0 text-white font-bold text-xl flex items-center justify-center overflow-hidden">
          {user.username.charAt(0).toUpperCase()}
        </div>
      </div>
      <input
        className="flex-1 text-sm outline-none"
        type="text"
        placeholder="Reply......."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        disable={loading || !content.trim()}
        className="text-sm font-semibold text-blue-500 disabled:opacity-50"
      >
        Reply
      </button>
    </form>
  );
};

export default ReplyForm;