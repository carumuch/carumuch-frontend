import axiosInstance from '@/api/axiosInstance';
import { ApiResponse, SignupData } from '@/types/d';

const signup = async (
  data: Omit<SignupData, 'confirmPassword'>,
): Promise<ApiResponse<number>> => {
  const response = await axiosInstance.post<ApiResponse<number>>(
    '/signup',
    data,
  );
  return response.data;
};

export default signup;
