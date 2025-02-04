import axiosInstance from '@/api/axiosInstance';
import { TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants';

const logout = async (): Promise<string> => {
  const response = await axiosInstance.post('/logout');

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);

  return response.data.message;
};

export default logout;
