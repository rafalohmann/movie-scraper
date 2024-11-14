import axios from 'axios';
import applyInterceptors from '@/utils/httpInterceptor';

const baseURL = import.meta.env.VITE_API_URL;

const instance = axios.create({
    baseURL,
    headers: {
        'Content-type': 'application/json',
    },
});

// Apply the interceptors to the Axios instance
applyInterceptors(instance);

export default instance;
