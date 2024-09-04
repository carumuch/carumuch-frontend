import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'localhost:8080',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  // 추후 토큰에 헤더에 추가할 때 수정
  (config) => {
    // config.headers.Authorization = `Bearer ${yourToken}`
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (reponse) => reponse,
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
