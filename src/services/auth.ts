import axiosInstance from '../utils/axiosInstance';
import { LoginCredentials, LoginResponse } from '../types/d';

// 로그인 요청을 수행하는 함수
export const login = async (
  credentials: LoginCredentials,
): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>(
      '/login',
      credentials,
    );

    // JWT 토큰과 Refresh 토큰을 처리
    const authorizationHeader = response.headers['authorization'];
    const setCookieHeader = response.headers['set-cookie'];

    // Authorization 헤더에서 JWT 토큰 추출
    const token = authorizationHeader?.split(' ')[1];

    // Set-Cookie 헤더에서 Refresh 토큰 추출
    const refreshToken = setCookieHeader
      ?.find((cookie: string) => cookie.startsWith('refresh-token='))
      ?.split('=')[1];

    // 토큰이 모두 유효하면 반환
    if (token && refreshToken) {
      return { token, refreshToken };
    } else {
      throw new Error('로그인 중 문제가 발생했습니다.'); // 토큰이 없을 경우 에러 처리
    }
  } catch (error: any) {
    console.error('Login error:', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || '로그인 요청 중 문제가 발생했습니다.',
    );
  }
};
