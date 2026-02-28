import axios from "axios";
let baseURL= import.meta.env.VITE_BASE_URL

export async function getAllPosts() {
    let data = await axios.get(`${baseURL}/posts`,{
        headers: {
            token: localStorage.getItem("userToken")
        },
    });
    return data;
}

export async function getPostComments(postId, page = 1, limit = 10) {
  let data = await axios.get(
    `${baseURL}/posts/${postId}/comments?page=${page}&limit=${limit}`,
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );

  return data;
}

export async function getPostById(postId) {
  let data = await axios.get(`${baseURL}/posts/${postId}`,
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );

  return data;
}

export async function getSavedPosts() {
  return await axios.get(`${baseURL}/users/bookmarks`, {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
}
