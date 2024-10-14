'use client';

import { Box, Flex, Stack, Text, Divider, Button } from '@chakra-ui/react';
import BottomNavBar from '@/components/bottomNavBar/BottomNavBar';
import Header from '@/components/header/Header'; // 기존 헤더 사용
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// 댓글 타입 정의
interface CommentProps {
  author: string;
  content: string;
  date: string;
}

// 게시글 타입 정의
interface PostDetailsProps {
  author: string;
  date: string;
  title: string;
  content: string;
  comments: CommentProps[];
}

// 댓글 컴포넌트 분리
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
  const router = useRouter();
  const [post] = useState<PostDetailsProps>({
    author: '차량사고엔차박고',
    date: '2024-10-10 13:01',
    title: '차량 덴트 해보신분 계신가요?',
    content:
      '셀프덴트라고 아시니요?? 제가 요즘 이용하고 있는 체험단에서 신청해서 선정되어 물건을 받고 사용 후기를 올리려고 합니다.',
    comments: [
      {
        author: '방금사고남',
        content:
          '판금과 덴트는 사고를 부분적으로 수리하는 대표적인 방법입니다. ',
        date: '2024-10-11 14:28',
      },
      {
        author: '팔랑귀',
        content: '관심있습니다! 어디로 연락할까요?',
        date: '2024-10-12 16:01',
      },
      // {
      //   author: '사용자 이름3',
      //   content:
      //     '댓글 내용입니다.댓글 내용입니다.댓글 내용입니다.댓글 내용입니다.',
      //   date: '2024-10-10 13:01',
      // },
    ],
  });

  const handleEdit = () => {
    router.push(`/community/modify/1`);
    // 수정 페이지로 이동하는 로직 추가
  };

  const handleDelete = () => {
    alert('삭제하시겠습니까?');
    // 삭제 처리 로직 추가
  };

  return (
    <Flex direction="column" alignItems="center" bg="gray.800" minH="100vh">
      {/* 헤더 */}
      <Header title="커뮤니티" />

      {/* 메인 콘텐츠 */}
      <Box w="100%" maxW="400px" p={4} rounded="md" bg="gray.800">
        <Stack spacing={6}>
          {/* 게시글 정보 */}
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

              {/* 수정, 삭제 버튼 */}
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

          {/* 댓글 섹션 */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" color="white" mb={4}>
              댓글 2개
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
