import axios from "axios";
import { router } from "../scripts/router";
import { renderHeader } from "../components/Header";

export const api = axios.create({
    baseURL: 'https://mis-api.kreosoft.space/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }
)

api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            if (error.response.status == 401) {
                localStorage.clear();
                renderHeader()
                router.navigate('/login')
            }
        }
    }
)
