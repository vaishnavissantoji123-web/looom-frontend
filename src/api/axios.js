import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (!error.response) {
      return Promise.reject({
        status: null,
        message: "Network Error!",
      });
    }
    const { status, data } = error.response;
    if (status === 401) {
      //TODO:handle.unauthorization
    }
    return Promise.reject({
      status,
      message: data?.error || data?.message || "Something went wrong",
    });
  },
);
export default api;