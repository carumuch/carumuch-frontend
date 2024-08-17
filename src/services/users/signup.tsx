import axiosInstance from '@/utils/axiosInstance';
import { SignupData } from '@/types/user';

const signup = async (signupData: SignupData): Promise<number> => {
  try {
    const response = await axiosInstance.post('/api/users/signup', signupData);
    return response.status;
  } catch (error: any) {
    if (error.response) {
      return error.response.status;
    }
    throw error;
  }
};

export default signup;
