import axiosInstance from './axiosInstance';

// API 요청 래퍼 함수
export async function request<T>(
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  url: string,
  data?: any,
): Promise<T> {
  switch (method) {
    case 'get':
      return (await axiosInstance.get<T>(url)).data;
    case 'post':
      return (await axiosInstance.post<T>(url, data)).data;
    case 'put':
      return (await axiosInstance.put<T>(url, data)).data;
    case 'delete':
      return (await axiosInstance.delete<T>(url)).data;
    case 'patch':
      return (await axiosInstance.patch<T>(url, data)).data;
    default:
      throw new Error(`지원하지 않는 메서드: ${method}`);
  }
}
