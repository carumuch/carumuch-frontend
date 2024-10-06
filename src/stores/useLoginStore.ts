import { create } from 'zustand';
import axiosInstance from '../utils/axiosInstance';
import { LoginCredentials } from '../types/auth';

interface LoginState {
  token: string | null;
  refreshToken: string | null;
  error: string | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
}

export const useLoginStore = create<LoginState>((set) => ({
  token: null,
  refreshToken: null,
  error: null,
  isLoading: false,
  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.post('/login', credentials);

      // JWT 토큰을 Authorization 헤더에서 추출
      const authorizationHeader = response.headers['authorization'];
      if (authorizationHeader) {
        const token = authorizationHeader.split(' ')[1]; // Bearer 뒤의 실제 토큰
        set({ token, isLoading: false });
        localStorage.setItem('token', token); // JWT 토큰을 localStorage에 저장
        // 여기서 /main으로 리디렉트
        window.location.href = '/main';
      } else {
        throw new Error('Authorization 헤더에 토큰이 없습니다.');
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || '로그인 중 문제가 발생했습니다.';
      set({ error: errorMessage, isLoading: false });
    }
  },
}));
