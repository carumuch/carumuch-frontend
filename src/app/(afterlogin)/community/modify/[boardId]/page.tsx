'use client';

import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Textarea,
  Input,
} from '@chakra-ui/react';
import BottomNavBar from '@/components/bottomNavBar/BottomNavBar';
import Header from '@/components/header/Header'; // 기존 헤더 사용
import { useRouter } from 'next/navigation'; // useRouter 훅 사용

export default function ModifyPage({
  params,
}: {
  params: { boardId: string };
}) {
  const router = useRouter();

  const handleSubmit = () => {
    console.log(`게시글 ${params.boardId} 수정 완료`);
    // 수정 로직 추가 후 수정이 완료되면 다시 게시글 상세 페이지로 이동
    router.push(`/community/${params.boardId}`);
  };

  return (
    <Flex direction="column" alignItems="center" bg="gray.800" minH="100vh">
      {/* 헤더 */}
      <Header title="커뮤니티" />

      {/* 메인 콘텐츠 */}
      <Box w="100%" maxW="400px" p={4} rounded="md" bg="gray.800">
        <Stack spacing={6}>
          {/* 제목 수정 필드 */}
          <Box>
            <Input
              placeholder="이미 있는 제목수정가능"
              bg="gray.700"
              color="white"
              size="lg"
              variant="filled"
              _placeholder={{ color: 'gray.500' }}
            />
          </Box>

          {/* 내용 수정 필드 */}
          <Box>
            <Textarea
              placeholder="내용을 수정하는 곳"
              bg="gray.700"
              color="white"
              minHeight="300px"
              resize="none"
              variant="filled"
              _placeholder={{ color: 'gray.500' }}
            />
          </Box>

          {/* 수정 완료 버튼 */}
          <Button colorScheme="blue" size="lg" w="100%" onClick={handleSubmit}>
            수정
          </Button>
        </Stack>
      </Box>

      {/* 하단 네비게이션 */}
      <BottomNavBar />
    </Flex>
  );
}
