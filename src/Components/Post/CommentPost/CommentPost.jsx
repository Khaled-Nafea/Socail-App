import { useState, useEffect } from 'react'
import { getPostComments } from '../../../services/postService';
import { CreatComment } from '../../../services/CreatCPService';
import CommentItem from '../../CommentItem/CommentItem';

export default function CommentPost({ post, formatDate }) {
    const [commentText, setCommentText] = useState('');
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
    const [showComments, setShowComments] = useState(false);
    const [visibleCount, setVisibleCount] = useState(2);
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const canComment = commentText.trim().length > 0 ;
    const [isCommenting, setIsCommenting] = useState(false);
    
 const fetchComments = async () => {
  try {
    setLoadingComments(true);
    const response = await getPostComments(post._id);
    setComments(response.data.data.comments);
    setShowComments(true);
  } catch (error) {
    console.log(error);
  } finally {
    setLoadingComments(false);
  }
};

useEffect(() => {
  if (showComments) {
    fetchComments();
  }
}, [showComments]);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleCommentToggle = () => {
  if (showComments === true) {
    setShowComments(false);
  } else {
    setShowComments(true);
    setVisibleCount(2);
  }
};

async function handleCommentSubmit(postId) {
  try {
    setIsCommenting(true);
    const formData = new FormData();
    formData.append('content', commentText);
    await CreatComment(postId, formData);
    await fetchComments(); 
    setCommentText('');
  } catch (error) {
    console.log(error);
  } finally {
    setIsCommenting(false);
  }
}

  return (
    <>
    {/* Action Buttons */}
      <div className="flex justify-around items-center p-2">
        <button onClick={handleLike} className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-500 transition-all ${liked ? 'text-blue-500' : 'text-gray-500'}`}>
          <svg className="w-5 h-5" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
          </svg>
          <span className="font-medium"> {likeCount} Like </span>
        </button>
        <button onClick={handleCommentToggle} className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-500 transition-all">
          {loadingComments ? (
            <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          ) : (
            <i className="fa-solid fa-message"></i>
          )}
          <span className="font-medium">{post.commentsCount} Comment</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-500 transition-all">
          <i className="fa-solid fa-share"></i>
          <span className="font-medium"> {post.sharesCount} Share</span>
        </button>
      </div>

     {/* Write Comment */}
        <div className="px-4 pb-4 pt-2">
          <div className="flex gap-2 items-center">
            <div className="flex-1 relative">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write your comment"
                className="w-full h-12  border border-blue-300 bg-white rounded-full px-4 py-2 pr-20 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-gray-200"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button onClick={()=> handleCommentSubmit(post._id)} disabled={!canComment || isCommenting} className={`${canComment && !isCommenting ? 'text-gray-300 hover:text-blue-500' : 'text-gray-500 cursor-not-allowed'} w-10 h-10 p-1.5 rounded-full transition-colors`}>
                {isCommenting ? (
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                ) : (
                  <i className="fa-solid fa-paper-plane"></i>
                )}
              </button>
                <button className="w-10 h-10 p-1.5 text-gray-300 hover:bg-gray-500 rounded-full transition-colors">
                  <i className="fa-solid fa-camera "></i>
                </button>
                <button className="w-10 h-10 p-1.5 text-gray-300 hover:bg-gray-500 rounded-full transition-colors">
                  <i className="fa-solid fa-face-smile"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

       {/* Comments Section */}
      {showComments==true && (
      <div>
        {/* Comments List */}
          <div className="px-4 py-3 space-y-3">
            {comments.slice(0, visibleCount).map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={post._id}
                formatDate={formatDate}
                onCommentUpdated={fetchComments}
              />
            ))}
          </div>

        {/* Load More Comments */}
        {post.commentsCount > visibleCount && showComments && !loadingComments && (
          <div className="text-center pb-3">
            <button 
              onClick={() => setVisibleCount(visibleCount + 2)}
              className="text-gray-600 text-sm font-medium hover:text-gray-800 flex items-center justify-center gap-1 mx-auto">
              Load more comments <i className="fa-solid fa-arrow-down"></i>
            </button>
          </div>
        )}
      </div>
      )}
    </>
  )
}
