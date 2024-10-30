// src/services/board.ts
import axiosInstance from '@/utils/axiosInstance';

interface PostResponse {
  id: number;
  boardTitle: string;
  boardContent: string;
  createBy: string;
  createDate: string;
  comments: any[];
}

export const fetchBoardPosts = async (page: number = 1, size: number = 10) => {
  try {
    const response = await axiosInstance.get(`/board/`, {
      params: { page, size },
    });
    return response.data.response.content as PostResponse[];
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        '게시글 목록을 불러오는 중 오류가 발생했습니다.',
    );
  }
};
