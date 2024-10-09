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

export default function WritePage() {
  const handleSubmit = () => {
    console.log('글 작성 완료');
    // 제출 로직 추가
  };

  return (
    <Flex direction="column" alignItems="center" bg="gray.800" minH="100vh">
      {/* 헤더 */}
      <Header title="커뮤니티" />

      {/* 메인 콘텐츠 */}
      <Box w="100%" maxW="400px" p={4} rounded="md" bg="gray.800">
        <Stack spacing={6}>
          {/* 제목 입력 필드 */}
          <Box>
            <Input
              placeholder="제목을 입력하는 곳"
              bg="gray.700"
              color="white"
              size="lg"
              variant="filled"
              _placeholder={{ color: 'gray.500' }}
            />
          </Box>

          {/* 내용 입력 필드 */}
          <Box>
            <Textarea
              placeholder="내용을 입력하는 곳"
              bg="gray.700"
              color="white"
              minHeight="300px"
              resize="none"
              variant="filled"
              _placeholder={{ color: 'gray.500' }}
            />
          </Box>

          {/* 완료 버튼 */}
          <Button colorScheme="blue" size="lg" w="100%" onClick={handleSubmit}>
            완료
          </Button>
        </Stack>
      </Box>

      {/* 하단 네비게이션 */}
      <BottomNavBar />
    </Flex>
  );
}
