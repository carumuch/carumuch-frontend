import { create } from 'zustand';
import axiosInstance from '../utils/axiosInstance';
import { LoginCredentials, LoginResponse } from '../types/auth';

interface LoginState {
  token: string | null;
  error: string | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
}

export const useLoginStore = create<LoginState>((set) => ({
  token: null,
  error: null,
  isLoading: false,
  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.post<LoginResponse>(
        '/login',
        credentials,
      );
      set({ token: response.data.token, isLoading: false });
      localStorage.setItem('token', response.data.token); // JWT 토큰을 localStorage에 저장
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || '로그인 중 문제가 발생했습니다.';
      set({ error: errorMessage, isLoading: false });
    }
  },
}));
