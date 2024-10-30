// app/(afterlogin)/community/[boardId]/page.tsx

'use client';

import {
  Box,
  Flex,
  Stack,
  Text,
  Divider,
  Button,
  Input,
  IconButton,
} from '@chakra-ui/react';
import BottomNavBar from '@/components/bottomNavBar/BottomNavBar';
import Header from '@/components/header/Header';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchPostDetails } from '@/services/board';
import { writeComment } from '@/services/comment';
import Comment from '@/components/community/Comment';
import { formatDate } from '@/utils/dateUtils';
import { AddIcon } from '@chakra-ui/icons';

interface PostDetails {
  author: string;
  date: string;
  title: string;
  content: string;
  comments: { author: string; content: string; date: string }[];
}

export default function PostDetailsPage() {
  const router = useRouter();
  const { boardId } = useParams();
  const [post, setPost] = useState<PostDetails | null>(null);
  const [newComment, setNewComment] = useState<string>(''); // 새로운 댓글 입력 상태
  const [isSubmitting, setIsSubmitting] = useState(false); // 댓글 작성 중 로딩 상태

  useEffect(() => {
    const loadPostDetails = async () => {
      try {
        const data = await fetchPostDetails(Number(boardId));
        setPost({
          author: data.board.createBy,
          date: formatDate(data.board.createDate),
          title: data.board.boardTitle,
          content: data.board.boardContent,
          comments: data.board.comments.map((comment: any) => ({
            author: comment.createBy,
            content: comment.commentContent,
            date: formatDate(comment.createDate),
          })),
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadPostDetails();
  }, [boardId]);

  const handleEdit = () => {
    router.push(`/community/modify/${boardId}`);
  };

  const handleDelete = () => {
    alert('삭제하시겠습니까?');
    // 삭제 처리 로직 추가
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return; // 빈 댓글 작성 방지

    setIsSubmitting(true);
    try {
      const response = await writeComment(Number(boardId), newComment);
      const newCommentData = {
        author: '본인', // 실제 작성자의 이름으로 변경 가능
        content: newComment,
        date: formatDate(new Date().toISOString()),
      };

      // 새 댓글을 기존 댓글 목록에 추가
      setPost((prevPost) => {
        if (!prevPost) return prevPost;
        return {
          ...prevPost,
          comments: [...prevPost.comments, newCommentData],
        };
      });

      setNewComment(''); // 입력 필드 초기화
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!post) return <Text>Loading...</Text>;

  return (
    <Flex direction="column" alignItems="center" bg="gray.800" minH="100vh">
      <Header title="커뮤니티" />
      <Box w="100%" maxW="400px" p={4} rounded="md" bg="gray.800" mb={20}>
        <Stack spacing={6}>
          <Box>
            <Flex justifyContent="space-between" mb={2}>
              <Box>
                <Text fontSize="sm" color="gray.400">
                  {post.author}
                </Text>
                <Text fontSize="sm" color="gray.400" mb={4}>
                  {post.date}
                </Text>
              </Box>
              <Box>
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={handleEdit}
                  mr={2}
                >
                  수정
                </Button>
                <Button size="sm" colorScheme="red" onClick={handleDelete}>
                  삭제
                </Button>
              </Box>
            </Flex>
            <Text fontSize="2xl" fontWeight="bold" color="white" mb={4}>
              {post.title}
            </Text>
            <Text fontSize="md" color="white">
              {post.content}
            </Text>
          </Box>
          <Divider borderColor="gray.600" />
          <Box>
            <Text fontSize="lg" fontWeight="bold" color="white" mb={4}>
              댓글 {post.comments.length}개
            </Text>
            {post.comments.map((comment, index) => (
              <Comment
                key={index}
                author={comment.author}
                content={comment.content}
                date={comment.date}
              />
            ))}
          </Box>

          {/* 댓글 입력 필드 */}
          <Box>
            <Flex align="center">
              <Input
                placeholder="댓글을 입력하세요..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                bg="gray.700"
                color="white"
                mr={2}
              />
              <IconButton
                icon={<AddIcon />}
                colorScheme="blue"
                onClick={handleCommentSubmit}
                isLoading={isSubmitting}
                aria-label="댓글 작성"
              />
            </Flex>
          </Box>
        </Stack>
      </Box>
      <BottomNavBar />
    </Flex>
  );
}
