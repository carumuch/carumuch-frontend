import axios, { AxiosResponse } from 'axios';
import { ApiResponse } from '@/types/d';
import { TOKEN_KEY } from '@/constants';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_SERVER, // 예시로 기본 URL을 설정합니다.
  timeout: 10000,
  withCredentials: true, // 쿠키 및 인증 정보를 포함하는 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const updatedConfig = { ...config };
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      updatedConfig.headers.Authorization = `Bearer ${token}`;
    }
    return updatedConfig;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<any>>) => {
    // 로그인, 회원가입 API는 헤더를 살리기 위해 원본 응답 반환. 추후 분리 필요
    if (response.config.url === '/login' || response.config.url === '/signup') {
      return response;
    }
    const data = response.data;

    if (!data.success) {
      return Promise.reject(
        new Error(data.message || '알 수 없는 오류가 발생하였습니다.'),
      );
    }
    // 성공 케이스라면 원하는 데이터만 반환
    return data.response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
