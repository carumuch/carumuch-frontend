'use client';

import { Box, Flex, Stack, Text, Icon, HStack } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import BottomNavBar from '@/components/bottomNavBar/BottomNavBar';
import Header from '@/components/header/Header';
import { useState } from 'react';

interface PostPreviewProps {
  title: string;
  content: string;
  comments: number;
  date: string;
  author: string;
}

function PostPreview({
  title,
  content,
  comments,
  date,
  author,
}: PostPreviewProps) {
  return (
    <Box
      bg="gray.700"
      p={4}
      rounded="md"
      borderWidth="1px"
      borderColor="gray.600"
      mb={4}
    >
      {/* 제목 */}
      <Text fontSize="lg" fontWeight="bold" color="white" isTruncated>
        {title}
      </Text>
      {/* 내용 */}
      <Text fontSize="sm" color="gray.400" noOfLines={2} mt={2}>
        {content}
      </Text>
      {/* 댓글, 날짜, 작성자 */}
      <HStack justify="space-between" mt={4}>
        <HStack spacing={2}>
          <Text fontSize="sm" color="gray.400">
            {date}
          </Text>
          <Text fontSize="sm" color="gray.400">
            | {author}
          </Text>
        </HStack>
        <HStack spacing={1}>
          <Icon as={ChatIcon} color="gray.400" />
          <Text fontSize="sm" color="gray.400">
            {comments}
          </Text>
        </HStack>
      </HStack>
    </Box>
  );
}

export default function CommunityPage() {
  const [posts] = useState<PostPreviewProps[]>([
    {
      title: '제목입니다. 이 위치는 제목입니다.',
      content:
        '내요 미리보기입니다. 두 줄까지만 표시되며 넘어가는 내용들은 표시되지 않고 ...으로 표시됩니다.내요 미리보기입니다. 두 줄까지만 표시되며 넘어가는 내용들은 표시되지 않고 ...으로 표시됩니다.내요 미리보기입니다. 두 줄까지만 표시되며 넘어가는 내용들은 표시되지 않고 ...으로 표시됩니다.내요 미리보기입니다. 두 줄까지만 표시되며 넘어가는 내용들은 표시되지 않고 ...으로 표시됩니다.',
      comments: 3,
      date: '2024-10-07',
      author: '작성자이름',
    },
    // 반복될 다른 글 미리보기 추가 가능
  ]);

  return (
    <Flex direction="column" alignItems="center" bg="gray.800" minH="100vh">
      {/* 헤더 */}
      <Header title="커뮤니티" />

      {/* 메인 콘텐츠 */}
      <Box w="100%" maxW="400px" p={4} rounded="md" bg="gray.800">
        <Stack spacing={6}>
          {/* 게시물 미리보기 렌더링 */}
          {posts.map((post, index) => (
            <PostPreview
              key={index}
              title={post.title}
              content={post.content}
              comments={post.comments}
              date={post.date}
              author={post.author}
            />
          ))}
        </Stack>
      </Box>

      {/* 하단 네비게이션 */}
      <BottomNavBar />
    </Flex>
  );
}
