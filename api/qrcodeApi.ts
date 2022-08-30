import axiosClient from "./axiosClient";

interface GiftInfo {
    promotion_id: number,
    product_id: number,
    special_code: string
}

const qrcodeApi = {
    getAll: () => {
        return axiosClient.get("/qrcode");
    },

    getInfoExchangeGift: (data: GiftInfo) => {
        return axiosClient({
            method: 'GET',
            url: `/tichdiem/${data.promotion_id}/${data.product_id}/${data.special_code}`
        })
    }
}

export default qrcodeApi;