import axiosInstance from '@/utils/axiosInstance';

// 이미지 업로드 API 호출 함수
const uploadImage = async (image: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', image);

  try {
    const response = await axiosInstance.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.success) {
      console.log(response.data);
      return response.data.response; // 업로드된 이미지 URL 반환
    }
    console.log(response.data);
    throw new Error(response.data.message || '이미지 업로드 실패');
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || '이미지 업로드 중 문제가 발생했습니다.',
    );
  }
};

export default uploadImage;
