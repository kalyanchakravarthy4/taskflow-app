import axios from "axios";


export default axios.create({
  baseURL: "https://taskflow-app-offt.onrender.com/api"
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }

  return config;
});

export default instance;
