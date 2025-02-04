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
    const data = response.data;

    // 성공이 아닌 경우 에러 처리
    if (!data.success) {
      return Promise.reject(new Error(data.message));
    }

    // 로그인, 회원가입 API는 전체 응답 데이터 반환
    if (response.config.url === '/login' || response.config.url === '/signup') {
      return data; // response가 아닌 data 반환
    }

    // 나머지는 response 데이터만 반환
    return data.response;
  },
  (error) => {
    const message =
      error.response?.data?.message || '알 수 없는 오류가 발생하였습니다.';
    return Promise.reject(new Error(message));
  },
);

export default axiosInstance;
