import PostCard from "@/components/post-card";
import { getFeed } from "@/services/posts.service";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const LIMIT = 10;

export default function Home() {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const sentinelRef = useRef(null);

  // Keep mutable state in refs so the observer callback is never stale
  const offsetRef = useRef(0);
  const hasMoreRef = useRef(true);
  const loadingRef = useRef(false);

  const loadFeed = async (reset = false) => {
    if (loadingRef.current) return;
    if (!reset && !hasMoreRef.current) return;

    const currentOffset = reset ? 0 : offsetRef.current;

    loadingRef.current = true;
    setLoading(true);
    setError("");

    try {
      const data = await getFeed({ limit: LIMIT, offset: currentOffset });

      setPosts((prev) => (reset ? data : [...prev, ...data]));
      offsetRef.current = currentOffset + data.length;
      hasMoreRef.current = data.length === LIMIT;
    } catch (err) {
      setError(err?.message || "Failed to load feed");
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  };

  // Initial load
  useEffect(() => {
    loadFeed(true);
  }, []);

  useEffect(() => {
    if (!hasMoreRef.current || loadingRef.current) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const rect = sentinel.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      loadFeed();
    }
  }, [posts]);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasMoreRef.current || loadingRef.current) return;

      const sentinel = sentinelRef.current;
      if (!sentinel) return;

      const rect = sentinel.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100) {
        loadFeed(); // or loadFeed()
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Refresh after new post
  useEffect(() => {
    if (location.state?.refresh) {
      hasMoreRef.current = true;
      offsetRef.current = 0;
      loadFeed(true);
    }
  }, [location.state?.refresh]);

  const handleRetry = () => {
    hasMoreRef.current = true;
    offsetRef.current = 0;
    loadFeed(true);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-6">
      <h1 className="hidden md:inline-block text-[15px] font-medium mb-4 shrink-0">
        Home
      </h1>

      <div className="w-full md:bg-white md:border md:border-black/10 md:rounded-3xl md:shadow-xs">
        {loading && posts.length === 0 && (
          <p className="text-gray-500 text-center text-sm py-10">Loading feed...</p>
        )}

        {!loading && error && posts.length === 0 && (
          <div className="flex flex-col items-center justify-center px-6 py-16 gap-3 text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-xl">⚠️</div>
            <p className="font-semibold text-gray-900 text-[15px] tracking-tight">Something went wrong</p>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">{error}</p>
            <button
              onClick={handleRetry}
              className="mt-2 px-5 py-2 rounded-full bg-gray-950 text-white text-sm font-semibold hover:bg-gray-700 transition-all duration-150"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="flex flex-col items-center justify-center px-6 py-16 gap-3 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl">🚀</div>
            <p className="font-semibold text-gray-900 text-[15px] tracking-tight">Nothing here yet</p>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Be the first to start a thread. Your posts will appear here.
            </p>
          </div>
        )}

        {posts.length > 0 && (
          <div className="animate-[fadeIn_0.3s_ease]">
            {posts.map((post) => (
              <PostCard key={post.post_id} post={post} />
            ))}
          </div>
        )}

        <div ref={sentinelRef} className="py-4 flex justify-center">
          {loading && posts.length > 0 && (
            <span className="text-sm text-gray-400">Loading more...</span>
          )}
          {!loading && !hasMoreRef.current && posts.length > 0 && (
            <span className="text-sm text-gray-300">You're all caught up</span>
          )}
          {error && posts.length > 0 && (
            <button
              onClick={() => loadFeed()}
              className="text-sm text-gray-500 underline hover:text-gray-800"
            >
              Failed to load — retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
}