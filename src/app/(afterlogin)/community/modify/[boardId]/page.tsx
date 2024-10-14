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
              value="차량 덴트 해보신분 계신가요?"
              placeholder="제목 수정"
              bg="gray.700"
              color="white"
              size="lg"
              variant="filled"
              _placeholder={{ color: 'gray.500' }}
              _hover={{}}
            />
          </Box>

          {/* 내용 수정 필드 */}
          <Box>
            <Textarea
              value="셀프덴트라고 아시니요?? 제가 요즘 이용하고 있는 체험단에서 신청해서 선정되어 물건을 받고 사용 후기를 올리려고 합니다."
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
