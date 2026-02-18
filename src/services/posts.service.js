import api from "../api/axios";

export const createPost = async (data) => {
  try {
    const res = await api.post("/posts", data);
    return res.data;
  } catch (err) {
    throw err.message;
  }
};

export const getFeed = async (params) => {
  try {
    const res = await api.get("/posts/feed", { params });
    return res.data;
  } catch (err) {
    throw err.message;
  }
};

export const getReplies = async (postId, params) => {
  try {
    const res = await api.get(`/posts/${postId}/replies`, { params });
    return res.data;
  } catch (err) {
    throw err.message;
  }
};

export const getThread = async (postId, params) => {
  try {
    const res = await api.get(`/posts/${postId}`, { params });
    return res.data;
  } catch (err) {
    throw err.message;
  }
};

export const deletePost = async (postId) => {
  try {
    const res = await api.delete(`/posts/${postId}`);
    return res.data;
  } catch (err) {
    throw err.message;
  }
};