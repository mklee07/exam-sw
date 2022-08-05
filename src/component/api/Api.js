import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.180.14:3000/calendar',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default api;
