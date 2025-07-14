import axios from "axios";

const BASE_URL = "https://api-notetools-node.vercel.app/";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
