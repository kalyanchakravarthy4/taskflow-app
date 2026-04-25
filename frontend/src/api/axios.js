import axios from "axios";

const instance = axios.create({
  baseURL: "https://taskflow-app-0tt.onrender.com/api", // 🔥 your backend URL
});

// OPTIONAL: attach token automatically
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }

  return config;
});

export default instance;
