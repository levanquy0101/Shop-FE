import axiosInstance from '../../utils/axiosClient';

export const getProfile = async (username) => {
    try {
        const temp = await axiosInstance.get(`/user/${username}`);
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}

export const createEmployee = async (item) => {
    try {
        const temp = await axiosInstance.post("/user/create",item);
        return temp.data;
    } catch (e) {
        console.log(e)
        throw new Error("Không thể thêm mới!")
    }
}

export const changePassWord = async (id, data) => {
    try {
        const temp = await axiosInstance.put(`/user/${id}/change-password`, data);
        return temp.data;
    } catch (e) {
        console.log(e)
        throw new Error("Không thể cập nhật!")
    }
}

export const getCodeAutoAndRoles = async () => {
    try {
        const temp = await axiosInstance.get("/user/code-auto");
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}