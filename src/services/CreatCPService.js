import axios from "axios";
let baseURL= import.meta.env.VITE_BASE_URL

export async function CreatComment(postId, commentData) {
  let data = await axios.post(
    `${baseURL}/posts/${postId}/comments`,commentData,
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );

  return data;
}

export async function CreatPost(postData) {
  let data = await axios.post(`${baseURL}/posts`,postData,
    {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );

  return data;
}

export async function myPosts() {
  let data = await axios.get(`${baseURL}/posts/feed?only=following&limit=10`,
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );

  return data;
}