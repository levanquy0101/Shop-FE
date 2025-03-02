import axiosInstance from '../../utils/axiosClient';

export const getAllCustomer = async () => {
    try {
        const temp = await axiosInstance.get("/customer");
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}

export const createCustomer = async (item) => {
    try {
        const temp = await axiosInstance.post("/customer/create",item);
        return temp.data;
    } catch (e) {
        console.log(e)
        throw new Error("Không thể thêm mới!")
    }
}
export const removeCustomer= async (id) => {
    try {
        const temp = await axiosInstance.delete(`customer/${id}`);
        return temp.data;
    } catch (e) {
        throw new Error("Không thể xóa đối tượng !")
    }
}

export const getCodeAuto = async () => {
    try {
        const temp = await axiosInstance.get("/customer/code-auto");
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}