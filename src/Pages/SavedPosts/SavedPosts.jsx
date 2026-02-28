import CreatPostCard from '../../Components/CreatPostCard/CreatPostCard'
import LeftSide from '../../Components/LeftBar/LeftSide'
import RightSide from '../../Components/RightSide/RightSide'
import PostCard from '../../Pages/PostCard/PostCard';
import SkeletonPost from '../../Components/Skelatons/SkeletonPost/SkeletonPost';
import { useQuery } from '@tanstack/react-query';
import { getSavedPosts } from '../../services/postService';
export default function SavedPosts() {

  document.title = "Saved Posts | Social App";

const { data: posts, isLoading, isError } = useQuery({
  queryKey: ['savedPosts'],
  queryFn: getSavedPosts,
  select: (data) => data.data.data.bookmarks || []
});

console.log(posts);


  return (
    <>  
    <div className="container mx-auto px-5 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        <div className="col-span-3">
          <LeftSide />
        </div>

        <div className="col-span-6">
          <CreatPostCard />
          {isLoading && [...Array(5)].map((_, index) => <SkeletonPost key={index} />)}
          {isError && <p className="text-center text-red-500">Something went wrong</p>}

          {posts && posts.length === 0 && <p className="text-center text-gray-500 py-10">No saved posts yet</p>}
          {posts && posts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>

        <div className="col-span-3">
          <RightSide/>
        </div>

      </div>
    </div>
    </>
  );
}