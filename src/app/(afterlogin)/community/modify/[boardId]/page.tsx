// app/(afterlogin)/modify/[boardId]/page.tsx

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
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { fetchPostDetails, modifyPost } from '@/services/board';

export default function ModifyPage({
  params,
}: {
  params: { boardId: string };
}) {
  const router = useRouter();
  const { boardId } = useParams();
  const toast = useToast();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadPostDetails = async () => {
      try {
        const data = await fetchPostDetails(Number(boardId));
        setTitle(data.board.boardTitle);
        setContent(data.board.boardContent);
      } catch (error) {
        toast({
          title: '오류 발생',
          description: '게시글을 불러오는 중 오류가 발생했습니다.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    loadPostDetails();
  }, [boardId, toast]);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: '제목과 내용을 입력해주세요.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await modifyPost(Number(boardId), title, content);
      toast({
        title: '수정 완료',
        description: '게시글이 성공적으로 수정되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.push(`/community/${boardId}`);
    } catch (error) {
      toast({
        title: '오류 발생',
        description: '게시글 수정 중 오류가 발생했습니다.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push(`/community/${boardId}`);
  };

  return (
    <Flex direction="column" alignItems="center" bg="gray.800" minH="100vh">
      <Header title="커뮤니티" />
      <Box w="100%" maxW="400px" p={4} rounded="md" bg="gray.800">
        <Stack spacing={6}>
          <Box>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목 수정"
              bg="gray.700"
              color="white"
              size="lg"
              variant="filled"
              _placeholder={{ color: 'gray.500' }}
              _hover={{}}
            />
          </Box>
          <Box>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용 수정"
              bg="gray.700"
              color="white"
              minHeight="300px"
              resize="none"
              variant="filled"
              _placeholder={{ color: 'gray.500' }}
              _hover={{}}
            />
          </Box>
          <Button
            colorScheme="blue"
            size="lg"
            w="100%"
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            수정
          </Button>
          <Button colorScheme="red" size="lg" w="100%" onClick={handleCancel}>
            취소
          </Button>
        </Stack>
      </Box>
      <BottomNavBar />
    </Flex>
  );
}
