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

// 게시글 삭제
export const deletePost = async (postId: number): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`/board/${postId}/delete`);
    if (response.status === 200) {
      console.log(response.data.message); // 성공 메시지 로그
    }
  } catch (error: any) {
    console.error(
      '글 삭제 오류:',
      error.response?.data?.message || error.message,
    );
    throw new Error(
      error.response?.data?.message || '글 삭제 중 문제가 발생했습니다.',
    );
  }
};

// 게시글 수정
export const modifyPost = async (
  boardId: number,
  title: string,
  content: string,
) => {
  const response = await axiosInstance.put(`/board/${boardId}/modify`, {
    boardTitle: title,
    boardContent: content,
  });
  return response.data;
};
