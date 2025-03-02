import axiosInstance from '../../utils/axiosClient';

export const create = async (item) => {
    try {
        const temp = await axiosInstance.post("inventory/create",item);
        return temp.data;
    } catch (e) {
        console.log(e)
        throw new Error("Không thể thêm mới!")
    }
}