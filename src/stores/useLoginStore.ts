import { create } from 'zustand';
import { LoginCredentials, LoginResponse, LoginState } from '@/types/d';
import axiosInstance from '../utils/axiosInstance';

export const useLoginStore = create<LoginState>((set) => ({
  token: null,
  refreshToken: null,
  error: null,
  isLoading: false,

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.post<LoginResponse>(
        '/login',
        credentials,
      );

      // JWT 토큰을 Authorization 헤더에서 추출
      const authorizationHeader = response.headers.authorization;
      const refreshToken = response.headers['set-cookie']?.[0]?.split('=')[1];

      if (authorizationHeader) {
        const token = authorizationHeader.split(' ')[1]; // Bearer 뒤의 실제 토큰
        set({ token, refreshToken, isLoading: false });

        // 토큰 저장
        localStorage.setItem('token', token);
        if (refreshToken) localStorage.setItem('refreshToken', refreshToken);

        // 로그인 성공 후 메인 페이지로 리디렉션
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
