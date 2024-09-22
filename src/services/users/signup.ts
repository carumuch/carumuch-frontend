import axiosInstance from '@/utils/axiosInstance';
import { SignupData } from '@/types/user';

const signup = async (data: SignupData) => {
  try {
    const response = await axiosInstance.post('/users/signup', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.user_id; // 성공 시 반환되는 user_id 반환
  } catch (error: any) {
    if (error.response) {
      throw error.response; // API 호출 실패 시, 오류 응답을 그대로 던집니다.
    }
    throw error;
  }
};

export default signup;
