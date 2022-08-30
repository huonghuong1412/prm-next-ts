import axiosClient from "./axiosClient";

interface User {
    name: string,
    phone: string,
    email: string,
    address: string,
}

const customerApi = {
    getInfoCustomer: () => {
        return axiosClient({
            method: 'GET',
            url: `/user`
        })
    },

    getHistoryExchanges: () => {
        return axiosClient({
            method: 'GET',
            url: `/history-gift-exchange`
        })
    },

    getHistoryScans: () => {
        return axiosClient({
            method: 'GET',
            url: `/history`
        })
    },

    getByID: (id: number) => {
        return axiosClient({
            method: 'GET',
            url: `/nguoidung/${id}`
        });
    },

    updateCustomet: (id: any, data: User) => {
        // return axiosClient.post(`/change-info`, data);
        return axiosClient({
            method: 'POST',
            url: '/change-info',
            data
        });
    }
}

export default customerApi;