import axiosInstance from '@/utils/axiosInstance';
import { LoginCredentials, LoginResponse } from '../types/d';

export const login = async (
  credentials: LoginCredentials,
): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>(
      '/login',
      credentials,
    );

    const authorizationHeader = response.headers.authorization;
    const refreshToken = response.headers['set-cookie']?.[0]?.split('=')[1];

    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      localStorage.setItem('token', token);
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }

      return { token, refreshToken };
    }
    throw new Error('로그인 중 문제가 발생했습니다.');
  } catch (error: any) {
    console.error('Login error:', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || '로그인 요청 중 문제가 발생했습니다.',
    );
  }
};
