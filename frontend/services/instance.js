import axios from 'axios';
import { useAuthStore } from '../store/authStore';

export const instance = axios.create({
    baseURL: "https://fairylike-harlee-unsurvived.ngrok-free.dev",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
    },
})
instance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;

    if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});