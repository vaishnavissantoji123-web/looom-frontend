import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getThread } from "@/services/posts.service";
import PostCard from "@/components/post-card";
import ReplyForm from "@/components/reply-form";
import { ArrowLeft, MoreHorizontal } from "lucide-react";

const LIMIT = 10;

export default function Thread() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [replies, setReplies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [repliesLoading, setRepliesLoading] = useState(false);
    const [error, setError] = useState("");
    const [repliesError, setRepliesError] = useState("");

    const sentinelRef = useRef(null);
    const offsetRef = useRef(0);
    const hasMoreRef = useRef(true);
    const loadingRef = useRef(false);

    // Load the main post once
    const loadPost = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await getThread(id, { limit: LIMIT, offset: 0 });
            setPost(data.post);
            setReplies(data.replies);
            offsetRef.current = data.replies.length;
            hasMoreRef.current = data.replies.length === LIMIT;
        } catch (err) {
            setError(err?.message || "Failed to load thread");
        } finally {
            setLoading(false);
        }
    };

    // Load more replies (infinite scroll)
    const loadMoreReplies = async () => {
        if (loadingRef.current || !hasMoreRef.current) return;
        loadingRef.current = true;
        setRepliesLoading(true);
        setRepliesError("");

        try {
            const data = await getThread(id, { limit: LIMIT, offset: offsetRef.current });
            setReplies((prev) => [...prev, ...data.replies]);
            offsetRef.current += data.replies.length;
            hasMoreRef.current = data.replies.length === LIMIT;
        } catch (err) {
            setRepliesError(err?.message || "Failed to load replies");
        } finally {
            setRepliesLoading(false);
            loadingRef.current = false;
        }
    };

    useEffect(() => {
        offsetRef.current = 0;
        hasMoreRef.current = true;
        setReplies([]);
        loadPost();
    }, [id]);

    useEffect(() => {
        if (!hasMoreRef.current || loadingRef.current) return;

        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const rect = sentinel.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            loadMoreReplies();
        }
    }, [replies]);

    useEffect(() => {
        const handleScroll = () => {
            if (!hasMoreRef.current || loadingRef.current) return;

            const sentinel = sentinelRef.current;
            if (!sentinel) return;

            const rect = sentinel.getBoundingClientRect();
            if (rect.top < window.innerHeight + 100) {
                loadMoreReplies(); // or loadFeed()
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const addReply = (reply) => {
        setReplies((prev) => [...prev, reply]);
    };

    if (loading)
        return (
            <div className="min-h-screen w-full flex items-center justify-center">
                <p className="text-gray-500 text-sm">Loading thread...</p>
            </div>
        );

    if (error)
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center gap-3 text-center px-6">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-xl">⚠️</div>
                <p className="font-semibold text-gray-900 text-[15px] tracking-tight">Something went wrong</p>
                <p className="text-sm text-gray-400 leading-relaxed max-w-xs">{error}</p>
                <button
                    onClick={loadPost}
                    className="mt-2 px-5 py-2 rounded-full bg-gray-950 text-white text-sm font-semibold hover:bg-gray-700 transition-all duration-150"
                >
                    Try again
                </button>
            </div>
        );

    return (
        <div className="min-h-screen w-full flex flex-col items-center py-6">
            <div className="relative w-full hidden md:flex items-center mb-4 shrink-0">
                <button
                    onClick={() => navigate(-1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-all duration-150"
                >
                    <ArrowLeft size={18} className="text-gray-800" />
                </button>
                <h1 className="text-[15px] font-medium flex-1 text-center pr-8">Thread</h1>
                <button className="absolute right-4.5 top-[50%] -translate-y-1/2 w-6 h-6 p-1 flex items-center justify-center transition-all duration-150 bg-white border border-black/10 rounded-full hover:scale-105 hover:shadow-sm">
                    <MoreHorizontal size={18} className="text-gray-800" />
                </button>
            </div>

            <div className="w-full md:bg-white md:border md:border-black/10 md:rounded-3xl md:shadow-xs">
                <PostCard post={post} viewPost onDelete={()=>navigate(-1)} />

                <div className="mx-5 border-t border-black/10" />

                <div className="px-1">
                    <ReplyForm parentId={id} onReply={addReply} />
                </div>

                {replies.length > 0 && (
                    <>
                        <div className="mx-5 border-t border-black/10" />
                        <div className="animate-[fadeIn_0.3s_ease]">
                            {replies.map((reply, index) => (
                                <div key={reply.post_id}>
                                    <PostCard post={reply} isReply  onDelete={(id)=>setReplies(prev=>prev.filter(p=> p.post_id !==id))}/>
                                    {index < replies.length - 1 && (
                                        <div className="mx-5 border-t border-black/10" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {replies.length === 0 && !repliesLoading && (
                    <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
                        <p className="text-sm text-gray-400">No replies yet. Be the first to reply!</p>
                    </div>
                )}

                {/* Sentinel */}
                <div ref={sentinelRef} className="py-4 flex justify-center">
                    {repliesLoading && (
                        <span className="text-sm text-gray-400">Loading more...</span>
                    )}
                    {!repliesLoading && !hasMoreRef.current && replies.length > 0 && (
                        <span className="text-sm text-gray-300">All replies loaded</span>
                    )}
                    {repliesError && (
                        <button
                            onClick={loadMoreReplies}
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