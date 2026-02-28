import CreatPostCard from '../../Components/CreatPostCard/CreatPostCard'
import LeftSide from '../../Components/LeftBar/LeftSide'
import RightSide from '../../Components/RightSide/RightSide'
import { myPosts } from '../../services/CreatCPService';
import PostCard from '../../Pages/PostCard/PostCard';
import SkeletonPost from '../../Components/Skelatons/SkeletonPost/SkeletonPost';
import { useQuery } from '@tanstack/react-query';


export default function UserPosts() {
  document.title = "User Posts | Social App";

  const { data: posts, isLoading} = useQuery({
  queryKey: ['userPosts'],
  queryFn: myPosts,
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
          {isLoading ? [...Array(10)].map((_, index) => <SkeletonPost key={index} />) : <>
            {posts && posts.map((post) => <PostCard key={post._id} post={post}  />)}
          </>
          }
        </div>
          <div className="col-span-3" >
            <RightSide/>
          </div>
        </div>
       </div>
   
  )
}
