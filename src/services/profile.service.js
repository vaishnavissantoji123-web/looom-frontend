import api from "@/api/axios";

export const getUserPosts = async (userId) => {
    const res = await api.get(`/posts/user/${userId}`);
    return res.data;
}
 
export const getUserProfile = async (userId) => {
    const res = await api.get(`/users/${userId}`);
    return res.data;
}