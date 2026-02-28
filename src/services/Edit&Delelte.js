import axios from "axios";
let baseURL= import.meta.env.VITE_BASE_URL

export async function editPost(postId, postData) {
    let data = await axios.put(`${baseURL}/posts/${postId}`, postData, {
        headers: {
            token: localStorage.getItem("userToken")
        },
    });
    return data;
}

export async function deletePost(postId) {
    let data = await axios.delete(`${baseURL}/posts/${postId}`, {
        headers: {
            token: localStorage.getItem("userToken")
        },
    });
    return data;
}

export async function bookmarkPost(postId) {
    let data = await axios.put(`${baseURL}/posts/${postId}/bookmark`, 
        {},
        {
        headers: {
            token: localStorage.getItem("userToken")
        },
    });
    return data;
}

export async function editComment(postId, commentId, commentData) {
    let data = await axios.put(`${baseURL}/posts/${postId}/comments/${commentId}`, commentData, {
        headers: {
            token: localStorage.getItem("userToken")
        },
    });
    return data;
}

export async function deleteComment(postId, commentId) {
    let data = await axios.delete(`${baseURL}/posts/${postId}/comments/${commentId}`, {
        headers: {
            token: localStorage.getItem("userToken")
        },
    });
    return data;
}

