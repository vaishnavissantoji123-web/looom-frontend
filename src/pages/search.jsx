
import {
  SearchIcon,
  SlidersHorizontal,
  SlidersHorizontalIcon,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard from "@/components/post-card";
import { Link } from "react-router-dom";
import { searchQuery } from "@/services/search.services";

const Search = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const debounceRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setUsers([]);
      setPosts([]);
      setError("");
      return;
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const data = await searchQuery(query.trim());
        console.log(data);
        setUsers(data.users ?? []);
        setPosts(data.posts ?? []);
      } catch (err) {
        setError(err || "Search failed");
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
    <div className="min-h-screen w-full flex flex-col items-center py-6 px-4">
      <h1 className="text-[15px] font-medium mb-4 shrink-0">Search</h1>

      <div className="w-full max-w-180 bg-white border border-black/10 rounded-4xl shadow-xs sticky z-10">
        <div className="px-4 py-3 border-b border-black/10">
          <div className="flex items-center gap-3.5 bg-gray-100 rounded-xl border border-black/20 px-5 py-3">
            <SearchIcon size={18} className="text-gray-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              autoFocus
              className="flex-1 text-[15px] text-gray-900 placeholder:text-gray-400 bg-transparent outline-none"
            />
            <button className="text-gray-400 hover:text-gray-600 transition-colors srink-0 cursor-pointer">
              <SlidersHorizontalIcon size={18} />
            </button>
          </div>
        </div>
        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-5 h-5 border-2 border-gray-200 border-t-gray-500 rounded-full animate-spin" />
          </div>
        )}

        {/* error */}
        {!loading && error && (
          <div className="flex items-center justify-center px-6 py-12 gap-2 text-center flex-col">
            <p className="font-semibold text-gray-900 text-[14px]">
              Something went wrong
            </p>
            <p className="text-sm text-gray-400">{error}</p>
          </div>
        )}

        {/* TODO:Empty Query */}
        {!loading && !error && !query.trim() && (
          <div className="flex items-center justify-center px-6 py-12">
            <p className="text-sm text-gray-400">Search for people or posts</p>
          </div>
        )}

        {/* TODO:No results */}
        {!loading && !error && query.trim() && !hasResults && (
          <div className="flex flex-col items-center justify-center px-6 py-12 gap-1 text-center">
            <p className="font-semibold text-gray-900 text-[14px]">
              No results for "{query}
            </p>
            <p className="text-sm text-gray-400">
              Try a different keyword or username
            </p>
          </div>
        )}

        {/* TODO:Results with Shandcn Tabs */}
        {!loading && !error && hasResults && (
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="w-full rounded-none border-b border-black/20 bg-transparent h-11 p-0 gap-0">
              <TabsTrigger
                value="users"
                className="h-full flex-1 rounded-none text-[13px] font-medium text-gray-400 bg-transparant shadow-none data-[state=active]:bg-transparant data-[state=active]:shadow-none data-[state=active]:text-gray-900 data-[state=active]:font-semibold relative
                after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-gray-900 after:scale-x-0 data[state=active]:after:scale-x-100 after:transparent-transform after:duration-200"
              >
                People
                <span>{users.length}</span>
              </TabsTrigger>

              <TabsTrigger
                value="posts"
                className="h-full flex-1 rounded-none text-[13px] font-medium text-gray-400 bg-transparant shadow-none data-[state=active]:bg-transparant data-[state=active]:shadow-none data-[state=active]:text-gray-900 data-[state=active]:font-semibold relative
                after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-gray-900 after:scale-x-0 data[state=active]:after:scale-x-100 after:transparent-transform after:duration-200"
              >
                Posts
                <span>{posts.length}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="mt-0">
              {users.length === 0 ? (
                <p className="text-center text-sm text-gray-400 py-10">
                  No People Found
                </p>
              ) : (
                users.map((user) => (
                  <Link
                    to={`/people/${user.username}`}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors border-b border-black/20 last:border-b-0"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {user.username?.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="text-[14px] font-semibold text-gray-900 truncate">
                        {user.username}
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </TabsContent>
            <TabsContent value="posts" className="mt-0">
              {posts.length === 0 ? (
                <p className="text-center text-sm text-gray-400 py-10 ">
                  NO Posts Found
                </p>
              ) : (
                posts.map((post) => <PostCard key={post.post_id} post={post} />)
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Search;