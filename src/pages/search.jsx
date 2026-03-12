import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import PostCard from '@/components/post-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { search } from '@/services/search.services';

const Search = () => {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const debounceRef = useRef(null);

    useEffect(() => {
        if (!query.trim()) {
            setUsers([]);
            setPosts([]);
            setError('');
            return;
        }

        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
            setLoading(true);
            setError('');
            try {
                const data = await search(query.trim());
                setUsers(data.users ?? []);
                setPosts(data.posts ?? []);
            } catch (err) {
                setError(err || 'Search failed');
                setUsers([]);
                setPosts([]);
            } finally {
                setLoading(false);
            }
        }, 350);

        return () => clearTimeout(debounceRef.current);
    }, [query]);

    const hasResults = users.length > 0 || posts.length > 0;

    return (
        <div className="min-h-screen w-full flex flex-col items-center py-6">
            <h1 className="hidden md:inline-block text-[15px] font-medium mb-4 shrink-0">Search</h1>

            <div className="w-full md:bg-white md:border md:border-black/10 md:rounded-3xl md:shadow-xs">

                {/* Search Input — pill style with gray bg */}
                <div className="px-4 py-3 mb-4">
                    <div className="flex items-center gap-3.5 bg-gray-100 rounded-xl border border-black/20 px-5 py-3">
                        <SearchIcon size={18} className="text-gray-400 shrink-0" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search"
                            className="flex-1 text-[15px] text-gray-900 placeholder:text-gray-400 bg-transparent outline-none"
                            autoFocus
                        />
                        {query ? (
                            <button
                                onClick={() => setQuery('')}
                                className="text-gray-400 hover:text-gray-600 transition-colors text-xs shrink-0"
                            >
                                ✕
                            </button>
                        ) : (
                            <button className="text-gray-400 hover:text-gray-600 transition-colors shrink-0 cursor-pointer">
                                <SlidersHorizontal size={18} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex items-center justify-center py-10">
                        <div className="w-5 h-5 border-2 border-gray-200 border-t-gray-500 rounded-full animate-spin" />
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="flex flex-col items-center justify-center px-6 py-12 gap-2 text-center">
                        <p className="font-semibold text-gray-900 text-[14px]">Something went wrong</p>
                        <p className="text-sm text-gray-400">{error}</p>
                    </div>
                )}

                {/* Empty query */}
                {!loading && !error && !query.trim() && (
                    <div className="flex items-center justify-center px-6 py-12">
                        <p className="text-sm text-gray-400">Search for people or posts.</p>
                    </div>
                )}

                {/* No results */}
                {!loading && !error && query.trim() && !hasResults && (
                    <div className="flex flex-col items-center justify-center px-6 py-12 gap-1 text-center">
                        <p className="font-semibold text-gray-900 text-[14px]">No results for "{query}"</p>
                        <p className="text-sm text-gray-400">Try a different keyword or username.</p>
                    </div>
                )}

                {/* Results with Shadcn Tabs */}
                {!loading && !error && hasResults && (
                    <Tabs defaultValue="users" className="w-full">
                        <TabsList className="m-0 w-full bg-transparent p-0 rounded-none gap-0">
                            <TabsTrigger
                                value="users"
                                className="flex-1 py-3 font-medium capitalize rounded-none text-black/40 bg-transparent shadow-none border-0 outline-none ring-0 border-b  border-b-black/20 data-[state=active]:text-black data-[state=active]:border-b-black data-[state=active]:bg-transparent data-[state=active]:!shadow-none transition-all duration-200"
                            >
                                People
                                <span className="ml-1.5 text-[11px] text-gray-300">{users.length}</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="posts"
                                className="flex-1 py-3 font-medium capitalize rounded-none text-black/40 bg-transparent shadow-none border-0 outline-none ring-0 border-b  border-b-black/20 data-[state=active]:text-black data-[state=active]:border-b-black data-[state=active]:bg-transparent data-[state=active]:!shadow-none transition-all duration-200"
                            >
                                Posts
                                <span className="ml-1.5 text-[11px] text-gray-300">{posts.length}</span>
                            </TabsTrigger>
                        </TabsList>

                        {/* People */}
                        <TabsContent value="users" className="mt-0">
                            {users.length === 0 ? (
                                <p className="text-center text-sm text-gray-400 py-10">No people found.</p>
                            ) : (
                                <ul>
                                    {users.map((user, index) => (
                                        <li key={user.user_id ?? index}>
                                            <Link
                                                to={`/profile/${user.username}`}
                                                className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors border-b border-black/[0.06] last:border-b-0"
                                            >
                                                {user.avatar_url ? (
                                                    <img
                                                        src={user.avatar_url}
                                                        alt={user.username}
                                                        className="w-10 h-10 rounded-full object-cover shrink-0"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                                        {user.username?.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                                <div className="flex flex-col min-w-0">
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-[14px] font-semibold text-gray-900 truncate">
                                                            {user.username}
                                                        </span>
                                                        {user.verified && (
                                                            <svg className="w-3.5 h-3.5 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    {user.display_name && (
                                                        <span className="text-[13px] text-gray-400 truncate">
                                                            {user.display_name}
                                                        </span>
                                                    )}
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </TabsContent>

                        {/* Posts */}
                        <TabsContent value="posts" className="mt-0">
                            {posts.length === 0 ? (
                                <p className="text-center text-sm text-gray-400 py-10">No posts found.</p>
                            ) : (
                                posts.map((post) => (
                                    <PostCard key={post.post_id} post={post} />
                                ))
                            )}
                        </TabsContent>
                    </Tabs>
                )}
            </div>
        </div>
    );
};

export default Search;