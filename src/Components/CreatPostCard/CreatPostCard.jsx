import {useState, useEffect,useRef , useContext} from 'react'
import Imge from "../../assets/default-profile.png"
import EmojiPicker from 'emoji-picker-react'
import { toast } from 'react-toastify';
import { CreatPost } from '../../services/CreatCPService';
import { ProfileContext } from '../../Context/ProfileContext/ProfileContext';
import { useQueryClient } from '@tanstack/react-query'

export default function CreatPostCard() {
  const [isLading, setIsLading] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [sentPhoto,setSentPhoto] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef();
  const emojiPickerRef = useRef();
  const {userProfile} = useContext(ProfileContext);
  const queryClient = useQueryClient();


  const canPost = text.trim().length > 0 || image !== null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setSentPhoto(file);
    }
  };

  const handleEmojiClick = (emojiData) => {
  const chosenEmoji = emojiData.emoji;     
  const currentText = text;                  
  const newText = currentText + chosenEmoji; 
  setText(newText);                          
};

useEffect(() => {
    const handleClickOutside = (e) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handelFetchPost() {
    try {
    setIsLading(true);
    const formData = new FormData();
    if (text.trim().length > 0) {
      formData.append("body", text);
    }
   if (sentPhoto) {
      formData.append("image", sentPhoto);
    }
    await CreatPost(formData);  
    queryClient.invalidateQueries({ queryKey: ['posts'] });
    setText("");
    setImage(null);
    setSentPhoto("");
    } catch (error) {
      toast.error("Post Not Created");
    }
    finally{
      setIsLading(false);
    }
  }

  return (
    <>
    <div className="bg-white rounded-xl shadow-lg max-w-2xl mx-auto my-8 overflow-hidden border border-blue-400 p-4">
      <div className="flex items-center mb-3 border-gray-100">
        <img src={userProfile?.photo||Imge} alt="user" className="w-12 h-12 rounded-full mr-3 ring-2 ring-blue-400" />
        <div>
          <p className="font-semibold text-gray-500">{userProfile?.name||"user"}</p>
          <div className="text-xs text-gray-500 mt-1 inline-flex items-center gap-2 rounded-full px-2 py-0.5 bg-gray-200">
            <i className="fas fa-globe"></i>
            <select name="privacy" id="privacy" className="text-xs">
              <option value="public">Public</option>
              <option value="friends">Followers</option>
              <option value="private">Only Me</option>
            </select>
          </div>
        </div>
      </div>

      <textarea
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full py-3 px-4 border border-blue-300 bg-white rounded-xl leading-relaxed text-gray-500 outline-none transition focus:border-blue-400 focus:bg-gray-200"
        placeholder="What's on your mind?"
      />

      {/* Image */}
      {image && (
        <div className="relative mt-2 w-fit">
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            className="max-h-48 rounded-lg object-cover border border-slate-200"
          />
          <button
            onClick={() => {setImage(null); fileInputRef.current.value = "";}}
            className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-black/70 cursor-pointer">
            ✕
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between mt-3  border-border pt-3">
        <div className="relative flex items-center gap-2">

          {/* file input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current.click()}
            className="text-gray-700 px-3 py-2 text-sm font-semibold rounded-lg hover:bg-green-100 hover:text-green-600 transition-colors cursor-pointer">
            <i className="fas fa-image text-green-400"></i> Add Photo
          </button>

          
         <div className="relative" ref={emojiPickerRef}>
            <button onClick={() => setShowEmojiPicker(prev => !prev)}
              className="text-gray-700 px-3 py-2 text-sm font-semibold rounded-lg hover:bg-yellow-100 hover:text-yellow-600 transition-colors cursor-pointer">
              <i className="fa-regular fa-face-smile text-yellow-400"></i> Feeling/Activity
            </button>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-12 left-0 z-50 shadow-xl rounded-xl overflow-hidden">
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  skinTonesDisabled
                  searchDisabled={false}
                  height={380}
                  width={320}
                />
              </div>
            )}
          </div>
        </div>
        

        <button
          disabled={!canPost}
          onClick={() => {handelFetchPost()}}
          className={`flex items-center gap-2 px-5 py-1 rounded-lg text-white transition-colors
            ${canPost ? "bg-blue-500 hover:bg-blue-600 cursor-pointer": "bg-blue-300 cursor-not-allowed opacity-60"}`}>
         
         {isLading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-paper-plane text-xs"></i>} Post
        </button>
      </div>
      </div>
    </>
  )
}
