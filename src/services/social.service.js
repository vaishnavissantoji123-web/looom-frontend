
import api from "../api/axios";

export const toggleLike = (postId, action) =>
  api.post(`/posts/${postId}/like`, { action }).then((r) => r.data);

export const toggleFollow = (userId, action) =>
  api.post(`/users/${userId}/follow`, { action }).then((r) => r.data);