// /community/page.tsx
'use client';

import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import BottomNavBar from '@/components/bottomNavBar/BottomNavBar';
import Header from '@/components/header/Header';
import PostPreview from '@/components/community/PostPreview';
import { fetchBoardPosts } from '@/services/board';
import { useEffect, useState } from 'react';
import { useModalContext } from '@/components/modal/ModalContext';

interface PostProps {
  id: number;
  boardTitle: string;
  boardContent: string;
  createBy: string;
  createDate: string;
  comments: any[];
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { openModal } = useModalContext();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchBoardPosts();
        setPosts(data);
      } catch (error: any) {
        openModal(
          '오류',
          error.message || '게시글 목록을 불러오는 중 오류가 발생했습니다.',
        );
      }
    };

    loadPosts();
  }, []);

  return (
    <Flex
      direction="column"
      alignItems="center"
      bg="gray.800"
      minH="100vh"
      // mb={28}
    >
      <Header title="커뮤니티" />

      <Box w="100%" maxW="400px" p={4} rounded="md" bg="gray.800" mb={20}>
        <Stack spacing={2}>
          {posts.map((post) => (
            <PostPreview
              key={post.id}
              id={post.id}
              title={post.boardTitle}
              content={post.boardContent}
              commentsCount={post.comments.length}
              date={post.createDate}
              author={post.createBy}
            />
          ))}
        </Stack>
      </Box>

      <BottomNavBar />
    </Flex>
  );
}
