import PostCard from "@/components/post-card";
import ReplyForm from "@/components/reply-form";
import { getThread } from "@/services/posts.service";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Thread = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadThread = async () => {
    try {
      const data = await getThread(id);
      setPost(data.post);
      setReplies(data.replies);
    } catch (err) {
      setError(err.message || "Failed to load message");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadThread();
  }, [id]);
  if (loading) {
    return (<div className="min-h-screen w-full flex items-center justify-center">
      <p className="p-6 text-center text-gray-500 text-sm">Loading post</p>
    </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16 gap-3 text-center">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-xl">
        
        </div>
        <p className="font-semibold text-gray-900 text-[15px] tracking-tight">
          Something went wrong
        </p>
        <p className="text-sm text-gray-400 leading-relaxed max-w-xs">{error}</p>
        <button
          onClick={loadThread}
          className="mt-2 px-5 py-2 rounded-full bg-gray-950 text-white text-sm font-semibold hover:bg-gray-700 transition-all duration-150"
        >
          Try again
        </button>
      </div>
    );
  }
  const addReply = (reply) => {
    setReplies((prev) => [...prev, reply]);
  }


  return (
    <div className="min-h-screen e-full flex-col items-center py-6 px-4">
      <div className="w-full max-180 flex items-center mb-4 strink-0">
        <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10 transition-all duration-150">
          <ArrowLeft size={18} text-gray-800 />
        </button>
        <h1 className="text-[15px] font-midum flex-1 text-center p-r-a">Thread</h1>
      </div>
      <div className="w-full max-w-180 bg-white border-black/10 rounded-4xl shadow-sm">
        <PostCard post={post} />
        <div className="max-5 border-t border-black/10" />{/*separator*/}
        <div className="px-1">
          <ReplyForm parentId={id} onReply={addReply} />
        </div>
        {replies.length > 0 && replies.map((reply, idx) => (
          <div key={replies.post_id}>
            <PostCard post={reply} isReply />
            {idx < replies.length - 1 && (
              <div className="mx-5 border-t border-black/10" />
            )}

          </div>

        ))}
        {replies.length == 0 && (
          <div className="flex-col item-center justify-center px-6 py-10 text-center">
            <p className="text-sm text-gray-400 text-leading-relaxed">No replies yet be the first to reply</p>
          </div>
        )}
      </div>
    </div>
  )
};

export default Thread;