import axios from 'axios';
import { useModalContext } from '@/components/modal/ModalContext';
import { useRouter } from 'next/navigation';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // 예시로 기본 URL을 설정합니다.
  timeout: 7000,
  withCredentials: true, // 쿠키 및 인증 정보를 포함하는 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // 추후 토큰을 헤더에 추가할 때 수정 가능
    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response, // 응답 처리
  (error) => {
    const status = error.response?.status;
    const router = useRouter();
    const { openModal } = useModalContext();

    if (status === 401) {
      openModal('로그인 필요', '다시 로그인 해주세요');

      setTimeout(() => {
        router.push('/main');
      }, 2000);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
