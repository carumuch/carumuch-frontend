import { create } from 'zustand';
import { login } from '../services/auth'; // 수정된 login 함수 임포트
import { LoginCredentials } from '../types/auth';

interface LoginState {
  token: string | null;
  refreshToken: string | null;
  error: string | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>; // 성공 여부 반환
}

export const useLoginStore = create<LoginState>((set) => ({
  token: null,
  refreshToken: null,
  error: null,
  isLoading: false,
  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });

    try {
      // auth.ts의 login 함수를 호출하여 토큰 가져옴
      const { token, refreshToken } = await login(credentials);

      set({ token, refreshToken, isLoading: false });

      // localStorage에 JWT 토큰 및 Refresh 토큰 저장
      localStorage.setItem('token', token);
      localStorage.setItem('refresh-token', refreshToken);

      return true; // 로그인 성공 시 true 반환
    } catch (error: any) {
      console.log('Error response:', error.response?.data);
      const errorMessage =
        error.response?.data?.message || '로그인 중 문제가 발생했습니다.';
      set({ error: errorMessage, isLoading: false });
      return false; // 실패 시 false 반환
    }
  },
}));
