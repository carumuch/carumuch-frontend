import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // 예시로 기본 URL을 설정합니다.
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json', // JSON 형식으로 응답을 받을 것을 명시
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    // 추후 토큰에 헤더에 추가할 때 수정
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response from Axios Interceptor:', response);
    return response;
  },
  (error) => {
    // 에러 응답을 콘솔에 출력하여 확인
    console.error('Axios response error:', error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
