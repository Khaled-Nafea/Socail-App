import BodyPost from '../../Components/Post/BodyPost/BodyPost';
import CommentPost from '../../Components/Post/CommentPost/CommentPost';

export default function PostCard({post}) {

const formatDate = (dateString) => {
  
  const date = new Date(dateString).toLocaleString();
  return date;
};

  return (
    <>
    <div className="rounded-xl shadow-lg max-w-2xl mx-auto my-8 overflow-hidden border border-blue-400">
 
    <BodyPost post={post} formatDate={formatDate} />
    

    <CommentPost post={post} formatDate={formatDate} />
    </div>
    </>
  );
}