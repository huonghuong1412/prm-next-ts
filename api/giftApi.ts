import axiosClient from "./axiosClient";

interface UserChangeInfo {
    customer_id: number,
    gift_id: number,
    name: string,
    phone: string,
    email: string,
    address: string,
}

interface Gift {
    customer_id: number,
    gift_id: number
}

const giftApi = {
    getAll: () => {
        return axiosClient.get("/thongtinquatang")
    },

    getAllProduct: () => {
        return axiosClient.get("/thongtinsanpham")
    },

    claimGift: (req: Gift) => {
        var data = {
            customer_id: req.customer_id,
            gift_id: req.gift_id,
            type: "confirmed",
        }
        return axiosClient({
            method: 'POST',
            url: '/doiqua',
            data
        })
    },

    claimGiftChangeInfo: (req: UserChangeInfo) => {
        var data = {
            customer_id: req.customer_id,
            gift_id: req.gift_id,
            type: "edit",
            address: req.address,
            phone: req.phone,
            name: req.name
        }
        return axiosClient.post("/doiqua", data)
    }
}
export default giftApi;