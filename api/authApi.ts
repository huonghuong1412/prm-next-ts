import axiosClient from "./axiosClient"

interface Account {
    phone: string,
    password: string
}

interface User {
    name: string,
    phone: string,
    email: string,
    password: string,
}

const authApi = {
    login: (data: Account) => {
        return axiosClient({
            method: 'POST',
            url: '/login',
            data: data
        })
    },
    registerAccount: (data: User) => {
        return axiosClient({
            method: 'POST',
            url: '/dangky',
            data: data
        })
    },
    logout: () => {
        return axiosClient({
            method: 'GET',
            url: '/logout'
        })
    }
}

export default authApi;