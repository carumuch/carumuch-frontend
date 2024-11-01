import axiosInstance from '@/utils/axiosInstance';

// 차량 견적 등록 API
export const registerVehicleEstimate = async (
  vehicleId: number,
  estimateData: {
    imagePath: string;
    description: string;
    damageArea: string;
    preferredRepairSido: string;
    preferredRepairSigungu: string;
    isPickupRequired: boolean;
  },
) => {
  try {
    const response = await axiosInstance.post(
      `/estimates/register/vehicle/${vehicleId}`,
      estimateData,
    );
    console.log(response);
    if (response.data.success) {
      return response.data; // 성공 시 응답 데이터 반환
    }
    throw new Error(
      response.data.message || '차량 견적 등록 중 문제가 발생했습니다.',
    );
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message || '서버에서 문제가 발생했습니다.';
      throw new Error(errorMessage);
    } else {
      throw new Error('네트워크 오류가 발생했습니다.');
    }
  }
};
