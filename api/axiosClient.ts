import { getSession } from 'next-auth/react';
import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: "https://sukien.doppelherz.vn/api",
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: any) => {
    // Handle token here ...
    const session: any = await getSession();
    const token = session?.user?.access_token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response;
    }
    return response;
}, (error) => {
    // Handle errors
    if (error.response.status === 401) {
        // deleteCookie('auth_token');
        return;
    }
    throw error;
});
export default axiosClient;
