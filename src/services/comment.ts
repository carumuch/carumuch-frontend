import axiosInstance from '@/utils/axiosInstance';

// 댓글 작성
export const writeComment = async (boardId: number, commentContent: string) => {
  try {
    const response = await axiosInstance.post('/comment/write', {
      commentContent,
      boardId,
    });
    return response.data;
  } catch (error: any) {
    console.error('댓글 작성 오류:', error);
    throw new Error(
      error.response?.data?.message || '댓글 작성 중 문제가 발생했습니다.',
    );
  }
};

// 댓글 삭제
export const deleteComment = async (commentId: number) => {
  try {
    const response = await axiosInstance.delete(`/comment/${commentId}/delete`);
    return response.data;
  } catch (error: any) {
    console.error(
      'Delete comment error:',
      error.response?.data || error.message,
    );
    throw new Error(
      error.response?.data?.message || '댓글 삭제 중 문제가 발생했습니다.',
    );
  }
};
