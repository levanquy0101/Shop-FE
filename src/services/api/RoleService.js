import axiosInstance from '../../utils/axiosClient';

export const getAllNotIn = async () => {
    try {
        const temp = await axiosInstance.get("/role/not");
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}
