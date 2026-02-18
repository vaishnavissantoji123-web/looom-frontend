import PostCard from '@/components/post-card';
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(" ");

  const loadingFeed = async () => {
    try {
      const data = await getFeed();
      setPosts(data);
    } catch (err) {
      setError(err.message || "Failed to load feed");
    } finally {
      setloading(false);
    }
  }
  useEffect(() => {
    loadingFeed();
  }, []);
  if (loading) {
    return <p className="p-6 text-center text-gray-500"></p>
  }
  if (error) {
    return <p className="p-6 text-center text-red-500"></p>
  }
  if (!posts.length) {
    return <p className="p-6 text-center text-gray-500">No posts yet,start a new thread</p>
  }

  return (
    <div className="flex-1 'h-[9999px]'flex justify-center">
      <div className="w-full max-w-155 px-4">
        {posts.map((post) =>(
          <PostCard key={post.post_id} post={post} />
        ))}


      </div>

    </div>
  )
}

export default Home