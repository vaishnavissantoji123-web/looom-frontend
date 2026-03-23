import api from "@/api/axios";

export const getActivity = async (query) => {
  try {
    const res = await api.get("/activity", {
      params: { q: query },
    });
    return res.data;
  } catch (err) {
    throw err.message;
  }
};