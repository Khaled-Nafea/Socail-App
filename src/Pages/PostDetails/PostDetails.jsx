import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getPostById } from '../../services/postService';
import BodyPost from '../../Components/Post/BodyPost/BodyPost';
import CommentPost from '../../Components/Post/CommentPost/CommentPost';


export default function PostDetails() {
  document.title = "Post Details | Social App";
  const [post, setPost] = useState(null);

  const{postId} = useParams();

  useEffect(() => {
    async function fetchPost() {
  
      const response = await getPostById(postId);
      setPost(response.data.data.post);
      console.log(response);
  }
  fetchPost(postId);
  }, [postId]);

  const formatDate = (dateString) => {
  const date = new Date(dateString).toLocaleString();
  return date;
};

  if (!post) {
  return <div className="text-center mt-10">Loading...</div>;
}
  return (
    <div className="mx-auto max-w-4xl space-y-4">
    <NavLink to="/" className="">
      <button className="mt-4 flex items-center  text-gray-600 hover:text-gray-800 cursor-pointer bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 gap-2">
        <i className="fa-solid fa-arrow-left text-sm"></i> Back
      </button>
    </NavLink>

     <div className="bg-white rounded-xl shadow-lg max-w-4xl mx-auto my-8 overflow-hidden border border-blue-300">
    <BodyPost post={post} formatDate={formatDate}  showViewButton={false}  />
    <CommentPost post={post} formatDate={formatDate} />
    </div>
    </div>
  )
}
