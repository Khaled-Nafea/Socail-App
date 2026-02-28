import { useState, useRef, useEffect, useContext } from 'react'
import { ProfileContext } from '../../Context/ProfileContext/ProfileContext'
import { editComment, deleteComment } from '../../services/Edit&Delelte';
import Swal from 'sweetalert2';

export default function CommentItem({ comment, postId, formatDate, onCommentUpdated }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [onEdit, setOnEdit] = useState(false)
  const [editedContent, setEditedContent] = useState(comment.content)
  const [isLoading, setIsLoading] = useState(false)
  const menuRef = useRef(null)
  const { userProfile } = useContext(ProfileContext)

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function handleEdit() {
    try {
      setIsLoading(true)
      const formData = new FormData()
      formData.append('content', editedContent)
      await editComment(postId, comment._id, formData)
      setOnEdit(false)
      onCommentUpdated() 
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete() {
    try {
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
            await deleteComment(postId, comment._id)
            onCommentUpdated() 
          }
    } catch (error) {
      console.log(error)
    }
  }

  const isOwner = userProfile._id === comment.commentCreator?._id

  return (
    <div className="flex gap-3">
      <img src={comment.commentCreator?.photo || "/default-avatar.png"} alt={comment.commentCreator?.name} className="w-10 h-10 rounded-full shrink-0" />
      <div className="flex-1">
        {onEdit ? (
          <div className="space-y-2">
            <input
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full border border-blue-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2">
              <button onClick={() => setOnEdit(false)} className="px-3 py-1 bg-gray-300 rounded-lg text-sm hover:bg-gray-400">Cancel</button>
              <button onClick={handleEdit} disabled={isLoading} className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 rounded-2xl px-4 py-2 inline-block">
            <p className="font-semibold text-sm text-gray-900">{comment.commentCreator?.name}</p>
            <p className="text-gray-800 text-sm">{comment.content}</p>
          </div>
        )}
        <p className="text-xs text-gray-500 mt-1 ml-4">{formatDate(comment.createdAt)}</p>
      </div>

      {isOwner && (
        <div className="relative" ref={menuRef}>
          <button onClick={() => setMenuOpen(prev => !prev)} className="text-gray-500 text-xl px-1 py-1 hover:text-blue-700 hover:bg-gray-200 rounded-full">
            <i className="fa-solid fa-ellipsis"></i>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl z-50 py-1 overflow-hidden border border-gray-200">
              <button onClick={() => { setMenuOpen(false); setOnEdit(true) }} className="flex items-center gap-3 w-full px-3 py-2 text-gray-600 hover:bg-gray-200 text-sm">
                <i className="fa-solid fa-pen"></i> Edit comment
              </button>
              <button onClick={() => { setMenuOpen(false); handleDelete() }} className="flex items-center gap-3 w-full px-3 py-2 text-red-600 hover:bg-red-200 text-sm">
                <i className="fa-solid fa-trash"></i> Delete comment
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}