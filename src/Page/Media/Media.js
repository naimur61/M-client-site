import React from 'react';
import { useQuery } from 'react-query';
import PostCard from './PostCard';

const Media = () => {
   const { data: posts = [], isLoading, refetch } = useQuery({
      queryKey: 'posts',
      queryFn: async () => {
         const res = await fetch('http://localhost:5000/posts');
         const data = await res.json();
         return data;
      }
   });
   refetch();
   return (
      <div className=' my-10 px-5'>
         {/* Post Card  */}
         {posts.map((post, i) => <PostCard key={i} post={post} />)}
      </div>
   );
};

export default Media;