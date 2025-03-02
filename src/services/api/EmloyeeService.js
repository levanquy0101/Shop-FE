import axiosInstance from '../../utils/axiosClient';

export const getAllEmployee = async () => {
    try {
        const temp = await axiosInstance.get("/employee");
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}

export const getEmployeeById = async (id) => {
    try {
        const temp = await axiosInstance.get(`/employee/${id}`);
        return temp.data;
    } catch (e) {
        console.log(e)
        return null;
    }
}

export const removeEmployee= async (id) => {
    try {
        const temp = await axiosInstance.delete(`employee/${id}`);
        return temp.data;
    } catch (e) {
        throw new Error("Không thể xóa đối tượng!")
    }
}

export const putEmployee = async (id,item) => {
    try {
        const temp = await axiosInstance.put(`/employee/${id}`, item);
        return temp.data;
    } catch (e) {
        throw new Error("Không thể cập nhật đối tượng!")
    }

}