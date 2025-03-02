import axiosInstance from '../../utils/axiosClient';

export const resetSystem = async () => {
    try {
        const temp = await axiosInstance.post("/backup-recovery/reset");
        return temp.data;
    } catch (e) {
        console.log(e)
        throw new Error("Không thể thực hiện!")
    }
}