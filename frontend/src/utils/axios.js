import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`, // Replace with your backend's URL
});

export default axiosInstance;
