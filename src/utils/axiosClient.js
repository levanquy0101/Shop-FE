import axios from 'axios';
import { toast } from 'react-toastify';

const apiUrl = import.meta.env.VITE_API_URL;

const axiosClient = axios.create({
  baseURL: `${apiUrl}/api/auth`,
  withCredentials: true, // Đảm bảo gửi cookie cùng với yêu cầu
});

axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Lỗi 401: Unauthorized');
      toast.warning("Đã hết phiên đăng nhập");
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
    } else if (error.code === 'ERR_NETWORK') {
      toast.error("Máy chủ đang gặp sự cố !");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
