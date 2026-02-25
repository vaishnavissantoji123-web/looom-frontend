import PostCard from "@/components/post-card";
import { getFeed } from "@/services/posts.service";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadFeed = async () => {
    setLoading(true);
    try {
      setError("");
      const data = await getFeed();
      setPosts(data);
    } catch (err) {
      setError(err.message || "Failed to load feed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    // Fixed container to prevent the whole page from scrolling
    <div className="min-h-screen w-full flex flex-col items-center py-6 px-4">
      <h1 className="text-[15px] font-medium mb-4 shrink-0">Home</h1>

      <div className="w-full max-w-180 bg-white border border-black/10 rounded-4xl shadow-xs sticky z-10">
        {/* Feed content */}
        {loading && (
          <p className="text-gray-500 text-center text-sm py-10">Loading feed...</p>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center justify-center px-6 py-16 gap-3 text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-xl">
              ⚠️
            </div>
            <p className="font-semibold text-gray-900 text-[15px] tracking-tight">
              Something went wrong
            </p>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">{error}</p>
            <button
              onClick={loadFeed}
              className="mt-2 px-5 py-2 rounded-full bg-gray-950 text-white text-sm font-semibold hover:bg-gray-700 transition-all duration-150"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && !posts.length && (
          <div className="flex flex-col items-center justify-center px-6 py-16 gap-3 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl">
              🚀
            </div>
            <p className="font-semibold text-gray-900 text-[15px] tracking-tight">
              Nothing here yet
            </p>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Be the first to start a thread. Your posts will appear here.
            </p>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="animate-[fadeIn_0.3s_ease]">
            {posts.map((post) => (
              <>
                <PostCard key={post.post_id} post={post} />
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}