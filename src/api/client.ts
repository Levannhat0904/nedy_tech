import axios from 'axios'
import { BASE_URL_USER_LOGIN } from '../constants'
import { getAccessToken } from '../utils'
const accessToken = getAccessToken()
const client = axios.create({
  baseURL: BASE_URL_USER_LOGIN, // Thay bằng base URL API của bạn
  headers: {
    // 'Content-Type': 'multipart/form-data',
    'Custom-Header': 'application/json',
    // "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${accessToken}`
  }
})
client.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Xử lý trường hợp không có token (chẳng hạn chuyển hướng người dùng đến trang đăng nhập)
      // console.error('No access token found');
      // redirectToLogin(); // Có thể sử dụng nếu cần chuyển hướng
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default client
