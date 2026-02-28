import { NavLink } from 'react-router-dom'
import { useState } from 'react'

export default function ProfilePosts({post, formatDate}) {
    const [likeCount, setLikeCount] = useState(0);
    

    return (
        <>
        <div className="rounded-xl max-w-7xl  px-3 py-1 mx-auto  my-8 overflow-hidden border border-blue-400">
        {/* Header */ }
        <div className = "flex items-center p-4" >
        <img src={post?.user.photo} alt="user" className="w-12 h-12 rounded-full mr-3 ring-2 ring-blue-400" />
        <div>
          <p className="font-semibold text-black">{post?.user.name}</p>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <NavLink to={`/post-details/${post?._id}`} className="px-4 py-2 text-blue-500 hover:text-blue-700">
            View Post
          </NavLink>
         </div>
         </div>

       {/* Content */}
      <p className="px-4 py-3 text-gray-900 leading-relaxed">{post?.body}</p>

      {/* Post Image */}
     
      {post?.image && (
        <img src={post.image} alt="post" className="w-full object-cover max-h-96"/>
      )} 

      {/* Action Buttons */}
      <div className="mt-4 flex justify-between items-center">
      <div className="flex justify-start items-center p-2 gap-4">
        <span className="text-gray-500 flex items-center gap-1 text-sm">
          <i className="fa-solid fa-thumbs-up text-blue-500"></i>
          <span className="font-medium"> {likeCount} Like </span>
        </span>
        <span className="text-gray-500 flex items-center gap-1 text-sm">
            <i className="fa-solid fa-comment text-blue-500"></i> 
          <span className="font-medium">{post?.commentsCount} Comment</span>
        </span>
        <span className="text-gray-500 flex items-center gap-1 text-sm">
          <i className="fa-solid fa-retweet text-blue-500"></i>
          <span className="font-medium"> {post?.sharesCount} Share</span>
        </span>
      </div>
      <p className="text-sm text-gray-500">{formatDate(post?.createdAt)}</p>
      </div>
        </div>
        </>
    )
}
