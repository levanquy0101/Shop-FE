import axiosInstance from '../../utils/axiosClient';

export const getAll = async () => {
    try {
        const temp = await axiosInstance.get("/product-size-color");
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}

export const create = async (item) => {
    try {
        const temp = await axiosInstance.post("/product-size-color/create",item);
        return temp.data;
    } catch (e) {
        console.log(e)
        throw new Error("Không thể thêm mới!")
    }
}

export const getByCode = async (code) => {
    try {
        const temp = await axiosInstance.get(`/product-size-color/${code}`);
        return temp.data;
    } catch (e) {
        console.log(e)
        throw new Error("Không tìm thấy mã!")
    }
}   