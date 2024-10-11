import axiosInstance from '@/utils/axiosInstance';

// AI 견적 API 호출 함수
export const classify = async (data: { manufacturer: string; url: string }) => {
  try {
    const response = await axiosInstance.post(
      'http://localhost:5000/classify',
      data,
    );
    if (response.data) {
      return response.data; // API 응답 데이터 반환
    } else {
      throw new Error('AI 견적 요청에 실패했습니다.');
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || '네트워크 오류가 발생했습니다.',
    );
  }
};
