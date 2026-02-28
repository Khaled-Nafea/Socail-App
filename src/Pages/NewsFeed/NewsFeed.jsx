import PostCard from '../PostCard/PostCard';
import LeftSide from '../../Components/LeftBar/LeftSide';
import RightSide from '../../Components/RightSide/RightSide';
import { getAllPosts } from '../../services/postService';
import SkeletonPost from '../../Components/Skelatons/SkeletonPost/SkeletonPost';
import CreatPostCard from '../../Components/CreatPostCard/CreatPostCard';
import { useQuery } from '@tanstack/react-query'

export default function NewsFeed() {
 document.title = "Home | Social App";
const { data: posts, isLoading} = useQuery({
  queryKey: ['feedPosts'],
  queryFn: getAllPosts,
  select: (data) => data.data.data.posts || []
}) 
  return (
    <div className="container mx-auto px-5 py-8">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 ">
      <div className="col-span-3">
         <LeftSide />
      </div>
      <div className="col-span-6">
        <CreatPostCard />
        {isLoading ? [...Array(10)].map((_, index) => <SkeletonPost key={index} />) :<>
         {posts && posts.map((post) => <PostCard key={post._id} post={post} />)}  
        </>
        }
      </div>
      <div className="col-span-3" >
        <RightSide/>
      </div>
    </div>
   </div>
  );
}