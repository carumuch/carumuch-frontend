import axiosInstance from '@/api/axiosInstance';
import { ApiResponse, SignupData } from '@/types/d';

const signup = async (
  data: Omit<SignupData, 'confirmPassword'>,
): Promise<ApiResponse<number>> => {
  // interceptor가 적용되지 않는 로그인, 회원가입 API 의 경우 원본 response를 그대로 사용하기 위해 별도 분기 처리
  const response = await axiosInstance.post<ApiResponse<number>>(
    '/signup',
    data,
  );
  return response.data;
};

export default signup;
