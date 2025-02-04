import axiosInstance from '@/api/axiosInstance';
import { LoginCredentials, LoginResponse } from '@/types/d';
import { TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants';

const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    '/login',
    credentials,
  );

  const token = response.headers.authorization?.split(' ')[1];
  const refreshToken = response.headers['set-cookie']?.[0]?.split('=')[1];

  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    refreshToken && localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  return { token, refreshToken };
};

export default login;
