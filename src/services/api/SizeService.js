import axiosInstance from '../../utils/axiosClient';

export const getAll = async () => {
    try {
        const temp = await axiosInstance.get("/sizes");
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}