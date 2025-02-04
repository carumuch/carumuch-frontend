import axiosInstance from '@/api/axiosInstance';

// 유저 정보 가져오기
const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get('/users');
    return response.data;
  } catch (error: any) {
    console.error(
      'Failed to fetch user info:',
      error.response?.data || error.message,
    );
    throw new Error(
      error.response?.data?.message || 'Failed to fetch user information.',
    );
  }
};

export default getUserInfo;
