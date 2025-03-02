// authService.js
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

class AuthService {
  login(username, password) {
    return axios.post(`${apiUrl}/auth/login`, { username, password }, { withCredentials: true })
      .then((response) => {
        if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
    // Thêm một yêu cầu để server xóa cookie (nếu cần)
    return axios.post(`${apiUrl}/auth/logout`, {}, { withCredentials: true });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  // Hàm để kiểm tra xác thực token (có thể tùy chỉnh)
  isAuthenticated() {
    const user = this.getCurrentUser();
    return user !== null;
  }
}

export default new AuthService();
