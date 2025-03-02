import axiosInstance from '../../utils/axiosClient';

export const getCodeAuto = async () => {
    try {
        const temp = await axiosInstance.get("/product/code-auto");
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}