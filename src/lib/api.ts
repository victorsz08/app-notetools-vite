import axios from "axios";
import { parseCookies, destroyCookie } from "nookies";

const BASE_URL = "https://api-notetools.onrender.com/";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});


api.interceptors.request.use(
    (config) => {
        const cookie = parseCookies(null);
        const token = cookie["nt.authtoken"];

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            destroyCookie(null, "nt.authtoken");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;