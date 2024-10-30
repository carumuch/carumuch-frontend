// app/(afterlogin)/community/write/page.tsx

'use client';

import {
  Box,
  Button,
  Flex,
  Stack,
  Textarea,
  Input,
  useToast,
} from '@chakra-ui/react';
import BottomNavBar from '@/components/bottomNavBar/BottomNavBar';
import Header from '@/components/header/Header';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { writePost } from '@/services/board';

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async () => {
    if (!window.confirm('글을 작성하시겠습니까?')) return;

    try {
      const response = await writePost(title, content);
      if (response.success) {
        toast({
          title: '글 작성 완료',
          description: '게시글이 성공적으로 작성되었습니다.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        router.push('/community');
      }
    } catch (error) {
      toast({
        title: '오류',
        description: '글 작성 중 오류가 발생했습니다.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCancel = () => {
    if (window.confirm('작성을 취소하시겠습니까?')) {
      router.push('/community');
    }
  };

  return (
    <Flex direction="column" alignItems="center" bg="gray.800" minH="100vh">
      <Header title="커뮤니티" />

      <Box w="100%" maxW="400px" p={4} rounded="md" bg="gray.800">
        <Stack spacing={6}>
          <Box>
            <Input
              placeholder="제목을 입력하는 곳"
              bg="gray.700"
              color="white"
              size="lg"
              variant="filled"
              _placeholder={{ color: 'gray.500' }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>

          <Box>
            <Textarea
              placeholder="내용을 입력하는 곳"
              bg="gray.700"
              color="white"
              minHeight="300px"
              resize="none"
              variant="filled"
              _placeholder={{ color: 'gray.500' }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Box>

          <Button colorScheme="blue" size="lg" w="100%" onClick={handleSubmit}>
            완료
          </Button>
          <Button
            colorScheme="red"
            size="lg"
            w="100%"
            onClick={handleCancel}
            variant="outline"
          >
            취소
          </Button>
        </Stack>
      </Box>

      <BottomNavBar />
    </Flex>
  );
}
