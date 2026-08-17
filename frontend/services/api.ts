import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // change to deployed backend later
});

// Automatically attach the token to every request if it exists
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("craftconnect_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
