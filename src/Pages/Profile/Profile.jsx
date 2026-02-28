import Imge from "../../assets/default-profile.png"
import { useContext } from 'react'
import { ProfileContext } from '../../Context/ProfileContext/ProfileContext'
import { useEffect,useState } from 'react'
import { myPosts } from '../../services/CreatCPService'
import ProfilePosts from '../../Components/ProfilePosts/ProfilePosts'
import {Button} from "@heroui/react";
import { useQuery } from '@tanstack/react-query';
import { getSavedPosts } from '../../services/postService';

export default function Profile() {
  document.title = "Profile | Social App";
  const { userProfile } = useContext(ProfileContext)
  const [postCount, setPostCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');

  console.log(userProfile);
  async function handleMyPosts() {
    const response = await myPosts();
    setPostCount(response.data.meta.pagination.total);
    setPosts(response.data.data.posts);
  }
  useEffect(() => {
    handleMyPosts();
  }, []);

  const { data: bookmarkedPosts } = useQuery({
  queryKey: ['savedPosts'],
  queryFn: getSavedPosts,
  select: (data) => data.data.data.bookmarks || []
});



  const formatDate = (dateString) => {
    const date = new Date(dateString).toLocaleString();
    return date;
  };



  return (
    <>
    <div className='mx-auto max-w-7xl mt-5'>
     <div className="overflow-hidden bg-white border border-blue-400 rounded-2xl mb-5">
                <div className="h-44 bg-linear-to-r from-[#0C1321] to-[#335470]"></div>
                <div className="relative mt-12 px-3 pb-5 sm:-mt-16 sm:px-8 sm:pb-6">
                <div className="rounded-2xl border border-blue-400 p-5 backdrop-blur-xl bg-white sm:p-7 ">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex items-end gap-4">
                <div className="size-28 bg-white rounded-full border-4 border-[#181A1B] shadow-lg object-cover object-center ">
                    <img src={userProfile?.profileImage || Imge} alt="User" className="size-full rounded-full" />
                </div>
                <div>
                  <h3 className="font-bold  text-2xl sm:text-4x">{userProfile?.name || ""}</h3>
                    <p className="text-gray-400 text-lg  sm:text-xl">{userProfile?.username || ""}</p>
                    <div className="inline-flex items-center mt-3 px-3 py-1 gap-2 text-xs rounded-full border border-blue-400 text-blue-500">
                        <i className="fa-solid fa-user-group"></i> Route Posts member
                    </div>
                </div>
                </div>
                <div className="grid grid-cols-3 gap-2 lg:w-[520px]">
                        <div className="text-center rounded-2xl border border-slate-400 p-3 sm:p-4"><p className="text-gray-600">Followers</p> <p className='text-2xl font-bold'>{userProfile?.followersCount ?? ""}</p> </div>
                        <div className="text-center rounded-2xl border border-slate-400 p-3 sm:p-4"><p className="text-gray-600">Following</p> <p className='text-2xl font-bold'>{userProfile?.followingCount ?? ""}</p> </div>
                        <div className="text-center rounded-2xl border border-slate-400 p-3 sm:p-4"><p className="text-gray-600">Bookmarks</p> <p className='text-2xl font-bold'>{userProfile?.bookmarksCount ?? ""}</p> </div>
                </div>
                </div>
                <div className="grid gap-4 mt-5 lg:grid-cols-[1.3fr_.7fr]">
                  <div className="rounded-2xl border border-slate-400 p-4 bg-slate-50 ">
                    <h3 className='text-black text-sm font-extrabold mb-3'>About</h3>
                    <p className='flex items-center gap-2 text-sm mb-2 text-gray-600'><i className="fa-regular fa-envelope"></i> {userProfile?.email || ""}</p>
                    <p className='flex items-center gap-2 text-sm text-gray-600'><i className="fa-solid fa-user-group"></i> Active on Route Posts</p>
                  </div>
                  <div className="grid gap-3 lg:grid-cols-1 sm:grid-cols-2">
                    <div className="rounded-2xl border border-blue-400 px-4 py-3 bg-slate-50">
                      <p className='text-blue-700 text-xs font-bold'>MY POSTS</p>
                      <p className='text-2xl font-bold mt-1'>{postCount ?? ""}</p>
                    </div>
                    <div className="rounded-2xl border border-blue-400 px-4 py-3 bg-slate-50">
                      <p className='text-blue-700 text-xs font-bold'>SAVED POSTS</p>
                      <p className='text-2xl font-bold mt-1'>{userProfile?.bookmarksCount ?? ""}</p>
                    </div>
                  </div>
                </div> 
                </div>
            </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-blue-400 p-3 shadow-sm">
        <div className="w-full grid grid-cols-2 gap-2 rounded-2xl bg-slate-200 p-2 sm:inline-flex sm:w-auto sm:gap-0">
          <Button  onPress={() => setActiveTab('posts')} className={`inline-flex items-center justify-center rounded-lg px-4 py-2 gap-2 text-sm font-bold bg-transparent text-gray-700 cursor-pointer hover:text-black ${activeTab === 'posts' ? 'text-blue-500 bg-white' : ''}`}><i className="fa-regular fa-file"></i> Posts</Button>
          <Button  onPress={() => setActiveTab('saved')} className={`inline-flex items-center justify-center rounded-lg px-4 py-2 gap-2 text-sm font-bold bg-transparent text-gray-700 cursor-pointer hover:text-black ${activeTab === 'saved' ? 'text-blue-500 bg-white' : ''}`}><i className="fa-regular fa-bookmark"></i> Saved Posts</Button>
        </div>
        {activeTab === "posts" && <span className="text-sm font-bold bg-blue-200 text-blue-500 rounded-full size-8 flex items-center justify-center">{postCount ?? 1}</span>} 
        {activeTab === "saved" && <span className="text-sm font-bold bg-blue-200 text-blue-500 rounded-full size-8 flex items-center justify-center">{userProfile?.bookmarksCount ?? 1}</span>}
      </div>

      {activeTab === "posts" && (
        <>
          {posts && posts.map((post) => (
            <ProfilePosts post={post} formatDate={formatDate} key={post._id} />
          ))}
          {posts && posts.length === 0 && (
            <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2 rounded-xl border border-blue-400 p-3 shadow-sm mt-4">
              <p className="text-gray-500">No posts yet.</p>
            </div>
          )}
        </>
      )}

      {activeTab === "saved" && (
        <>
          {bookmarkedPosts && bookmarkedPosts.length > 0 ? (
            bookmarkedPosts.map((post) => (
              <ProfilePosts post={post} formatDate={formatDate} key={post._id} />
            ))
          ) : (
            <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2 rounded-xl border border-blue-400 p-3 shadow-sm mt-4">
              <p className="text-gray-500">No saved posts yet.</p>
            </div>
          )}
        </>
      )}
    </>
  )
}
