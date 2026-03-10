import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: { "Content-Type": "application/json" },
  timeout: 10000, // prevent hanging requests
});

// Attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Global response handling
api.interceptors.response.use(
  (res) => res,
  (error) => {
    // Network / timeout errors
    if (!error.response) {
      return Promise.reject({
        status: null,
        message: "Network error. Check your connection.",
      });
    }

    const { status, data } = error.response;

    // Auto logout on auth failure
    if (status === 401) {
      localStorage.removeItem("token");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    // Return structured error
    return Promise.reject({
      status,
      message: data?.error || data?.message || "Something went wrong",
    });
  },
);

export default api;