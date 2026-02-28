import { NavLink } from 'react-router-dom'
import { useState, useRef , useEffect} from 'react'
import { useContext } from 'react'
import { ProfileContext } from '../../../Context/ProfileContext/ProfileContext'
import { editPost, deletePost, bookmarkPost } from '../../../services/Edit&Delelte'
import Swal from "sweetalert2";
import { useQueryClient } from '@tanstack/react-query';



export default function BodyPost({post, formatDate, showViewButton = true }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const {userProfile} = useContext(ProfileContext);
  const [onEdit, setOnEdit] = useState(false);
  const [editedBody, setEditedBody] = useState(post.body);
  const [isLading, setIsLading] = useState(false);
  const queryClient = useQueryClient();
  const [isBookmarked, setIsBookmarked] = useState(post.bookmarked);

  async function handleEdit(postId, body) {
  const formData = new FormData();
  formData.append("body", body);
  try {
    setIsLading(true);
    await editPost(postId, formData);
    setOnEdit(false);
    queryClient.invalidateQueries({ queryKey: ['feedPosts'] });
    queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    queryClient.invalidateQueries({ queryKey: ['savedPosts'] });
  } catch (error) {
    console.log(error);
  } finally {
    setIsLading(false);
  }
}

async function handleDelete(postId) {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    await deletePost(postId);
    Swal.fire("Deleted!", "Your post has been deleted.", "success");
    queryClient.invalidateQueries({ queryKey: ['feedPosts'] });
    queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    queryClient.invalidateQueries({ queryKey: ['savedPosts'] });
  }
}

async function handleBookmark(postId) {
    console.log("before toggle - isBookmarked:", isBookmarked);
  try {
    setIsBookmarked(prev => !prev);
    await bookmarkPost(postId);
    queryClient.invalidateQueries({ queryKey: ['feedPosts'] });
    queryClient.invalidateQueries({ queryKey: ['savedPosts'] });
  } catch (error) {
    setIsBookmarked(prev => !prev);
    console.log(error);
  }
}

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])




  return (
    <>
      {/* Header */}
      <div className="flex items-center p-4">
        <img src={post.user.photo} alt="user" className="w-12 h-12 rounded-full mr-3 ring-2 ring-blue-400" />
        <div>
          <p className="font-semibold text-black">{post.user.name}</p>
          <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          {showViewButton && (
          <NavLink to={`/post-details/${post._id}`} className="px-4 py-2 text-blue-500 hover:text-blue-700">
            View Post
          </NavLink>
        )}
         <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(prev => !prev)}
              className="text-gray-500 text-xl px-1 py-1 hover:text-blue-700 hover:bg-gray-200 rounded-full">
              <i className="fa-solid fa-ellipsis"></i>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl z-50 py-1 overflow-hidden border border-gray-200">
                {/* Save post */}
                <button
                  onClick={() => { setMenuOpen(false); handleBookmark(post._id) }}
                  className="flex items-center gap-3 w-full px-3 py-2 text-gray-600 hover:bg-gray-200 hover:text-black transition-colors text-sm"
                >
                  <i className={`fa-bookmark ${isBookmarked ? 'fa-solid' : 'fa-regular'}`}></i>
                  {isBookmarked ? 'Unsave post' : 'Save post'}
                </button>

                {/* Edit & Delete */}
                {userProfile._id === post.user._id && (
                  <>
                  {!onEdit && 
                    <button
                      onClick={() => { setMenuOpen(false); setOnEdit(true); }}
                      className="flex items-center gap-3 w-full px-3 py-2 text-gray-600 hover:bg-gray-200 hover:text-black transition-colors text-sm"
                    >
                      <i className="fa-solid fa-pen "></i>
                      Edit post
                    </button> 
                    }
                    <button
                      onClick={() => { setMenuOpen(false); handleDelete(post._id) }}
                      className="flex items-center gap-3 w-full px-3 py-2 text-red-600 hover:bg-red-200 transition text-sm"
                    >
                      <i className="fa-solid fa-trash"></i>
                      Delete post
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
     

      {/* Content */}
      {onEdit ? (
        <div className="px-4 py-3 space-y-3">
          <textarea
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex gap-3">
            <button
              onClick={() => setOnEdit(false)}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            
            <button
              onClick={() => handleEdit(post._id, editedBody)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              disabled={isLading}
            >
              {isLading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      ) : 
      (
        <p className="px-4 py-3 text-gray-900 leading-relaxed">
          {post.body}
        </p>
      )}

      {/* Post Image */}
     
      {post.image && (
        <img src={post.image} alt="post" className="w-full object-cover max-h-96"/>
      )}
    </>
  )
}
