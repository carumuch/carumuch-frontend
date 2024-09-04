import axiosInstance from '@/utils/axiosInstance';
import { SignupData } from '@/types/user';

const signup = async (data: SignupData) => {
  try {
    console.log('Sending signup data:', data); // 전송할 데이터 로그 출력
    const response = await axiosInstance.post('/users/signup', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Signup success:', response.data); // 성공 응답 로그 출력
    return response.data.user_id;  // 성공 시 반환되는 user_id 반환
  } catch (error: any) {
    console.error('Signup error:', error); // 오류 응답 로그 출력
    if (error.response) {
      console.error('Error response data:', error.response.data); // 오류 응답 데이터 출력
      throw error.response;  // API 호출 실패 시, 오류 응답을 그대로 던집니다.
    }
    throw error;
  }
};

export default signup;
