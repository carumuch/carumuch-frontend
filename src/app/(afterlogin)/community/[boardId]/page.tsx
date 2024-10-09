'use client';

import { Box, Flex, Stack, Text, Divider } from '@chakra-ui/react';
import BottomNavBar from '@/components/bottomNavBar/BottomNavBar';
import Header from '@/components/header/Header'; // 기존 헤더 사용
import { useState } from 'react';

// 댓글 타입 정의
interface CommentProps {
  author: string;
  content: string;
  date: string;
}

interface PostDetailsProps {
  author: string;
  date: string;
  title: string;
  content: string;
  comments: CommentProps[];
}

// 댓글 컴포넌트
function Comment({ author, content, date }: CommentProps) {
  return (
    <Box
      mb={4}
      p={4}
      bg="gray.700"
      borderRadius="md"
      borderWidth="1px"
      borderColor="gray.600"
    >
      <Text fontSize="sm" color="gray.400">
        {author}
      </Text>
      <Text fontSize="sm" color="gray.400" mb={2}>
        {date}
      </Text>
      <Text fontSize="md" color="white">
        {content}
      </Text>
    </Box>
  );
}

export default function PostDetailsPage() {
  const [post] = useState<PostDetailsProps>({
    author: '사용자 이름',
    date: '2024-10-07 13:01',
    title: '제목입니다.',
    content:
      '이 부분은 내용입니다. 내용이에요. 내용을 입력합니다. 이 부분은 내용입니다.내용입니다.',
    comments: [
      {
        author: '사용자 이름1',
        content:
          '댓글 내용입니다.댓글 내용입니다.댓글 내용입니다.댓글 내용입니다.',
        date: '2024-10-07 13:01',
      },
      {
        author: '사용자 이름2',
        content:
          '댓글 내용입니다.댓글 내용입니다.댓글 내용입니다.댓글 내용입니다.',
        date: '2024-10-07 13:01',
      },
      {
        author: '사용자 이름3',
        content:
          '댓글 내용입니다.댓글 내용입니다.댓글 내용입니다.댓글 내용입니다.',
        date: '2024-10-07 13:01',
      },
    ],
  });

  return (
    <Flex direction="column" alignItems="center" bg="gray.800" minH="100vh">
      {/* 헤더 */}
      <Header title="커뮤니티" />

      {/* 메인 콘텐츠 */}
      <Box w="100%" maxW="400px" p={4} rounded="md" bg="gray.800">
        <Stack spacing={6}>
          {/* 게시글 정보 */}
          <Box>
            <Text fontSize="sm" color="gray.400">
              {post.author}
            </Text>
            <Text fontSize="sm" color="gray.400" mb={4}>
              {post.date}
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color="white" mb={4}>
              {post.title}
            </Text>
            <Text fontSize="md" color="white">
              {post.content}
            </Text>
          </Box>

          <Divider borderColor="gray.600" />

          {/* 댓글 섹션 */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" color="white" mb={4}>
              댓글
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
        </Stack>
      </Box>

      {/* 하단 네비게이션 */}
      <BottomNavBar />
    </Flex>
  );
}
