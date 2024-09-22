import axiosInstance from '../utils/axiosInstance';
import { LoginCredentials, LoginResponse } from '../types/auth';

export const login = async (
  credentials: LoginCredentials,
): Promise<LoginResponse> => {
  const response = await axiosInstance.post('/login', credentials, {});

  console.log('Response headers:', response.headers);
  //   console.log('Response data:', response.data);

  // JWT 토큰은 Authorization 헤더에서 추출
  const authorizationHeader = response.headers['authorization'];
  const token = authorizationHeader?.split(' ')[1]; // Bearer 토큰
  console.log('authorizationHeader: ', response.headers.Authorization);
  //   console.log('token: ', token);
  // Refresh 토큰은 Set-Cookie에서 추출
  const setCookieHeader = response.headers['set-cookie'];
  const refreshToken = setCookieHeader
    ?.find((cookie: string) => cookie.startsWith('refresh-token='))
    ?.split('=')[1]; // refresh-token 추출

  if (token && refreshToken) {
    return { token, refreshToken }; // 토큰들을 반환
  } else {
    throw new Error('로그인 중 문제가 발생했습니다.'); // 에러 발생 시 처리
  }
};
