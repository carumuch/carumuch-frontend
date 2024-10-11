import axiosInstance from '@/utils/axiosInstance';

// 차량 정보 조회 API
export const fetchVehicleInfo = async () => {
  try {
    const response = await axiosInstance.get('/vehicles');

    if (response.data.success) {
      return response.data.response; // 성공 시 차량 정보를 반환
    } else {
      throw new Error(response.data.message); // 백엔드의 메시지를 활용한 오류 처리
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || '차량 정보 조회 중 오류가 발생했습니다.';
    throw new Error(errorMessage); // 프론트에서 모달로 보여줄 수 있는 에러 메시지를 던짐
  }
};

// 차량 등록
export const registerVehicle = async (vehicleData: {
  licenseNumber: string;
  type: string;
  brand: string;
  modelYear: number;
  modelName: string;
  ownerName: string;
}) => {
  try {
    const response = await axiosInstance.post('/vehicles', vehicleData);

    if (response.data.success) {
      return response.data; // 성공 시 응답 데이터 반환
    } else {
      throw new Error(
        response.data.message || '차량 등록 중 문제가 발생했습니다.',
      );
    }
  } catch (error: any) {
    if (error.response) {
      // 서버에서 받은 응답이 있는 경우 에러 처리
      const errorMessage =
        error.response.data?.message || '서버에서 문제가 발생했습니다.';
      throw new Error(errorMessage);
    } else {
      // 서버 응답이 없는 경우
      throw new Error('네트워크 오류가 발생했습니다.');
    }
  }
};
