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

// 전체 게시글 조회
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

// 게시글 상세 조회
export const fetchPostDetails = async (boardId: number) => {
  try {
    const response = await axiosInstance.get(`/board/${boardId}`);
    return response.data.response;
  } catch (error: any) {
    console.error('게시글 상세 조회 오류:', error);
    throw new Error(
      error.response?.data?.message || '게시글 조회 중 문제가 발생했습니다.',
    );
  }
};
