import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // 예시로 기본 URL을 설정합니다.
  timeout: 5000,
  withCredentials: true, // 쿠키 및 인증 정보를 포함하는 설정
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json', // JSON 형식으로 응답을 받을 것을 명시
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    // 추후 토큰을 헤더에 추가할 때 수정 가능
    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response, // 응답 처리
  (error) => {
    console.error('Axios response error:', error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
