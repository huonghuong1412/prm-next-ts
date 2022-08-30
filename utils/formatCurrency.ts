export const formatCurrency = (num: number) => {
    // num = parseInt(num);
    return num.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
    })
}