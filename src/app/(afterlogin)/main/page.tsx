'use client';

import { Box, Flex, Stack, Text, Divider, VStack } from '@chakra-ui/react';
import BottomNavBar from '@/components/bottomNavBar/BottomNavBar';
import Header from '@/components/header/Header';
import { ArrowForwardIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';

export default function Main() {
  const router = useRouter();

  // const recentPosts = [
  //   { id: 1, title: '고양캠 자유게시판', description: '교통통제 인원' },
  //   { id: 2, title: '비밀게시판', description: '진지하게 고민있음' },
  //   {
  //     id: 3,
  //     title: '졸업생게시판',
  //     description: '비정규 신생 동아리 LOL 동아리...',
  //   },
  // ];
  // 임시 데이터: 커뮤니티 최근 글 리스트
  const recentPosts = [
    '차량 덴트 해보신분 계신가요?',
    '차대번호 관련 질문 있습니다.',
    '졸업할 수 있나요?',
    '중부대 세종관 근처 마후라 소음',
    '차량 사고 문의',
  ];

  return (
    <Flex direction="column" alignItems="center" bg="gray.800" minH="100vh">
      {/* 헤더 추가 */}
      <Header title="메인" />

      {/* 메인 콘텐츠 */}
      <Box w="100%" maxW="400px" p={4} rounded="md" bg="gray.800">
        <Stack spacing={6}>
          {/* 차량 미등록 섹션 */}
          <Flex
            bg="gray.700"
            p={4}
            rounded="md"
            justify="space-between"
            align="center"
          >
            <Box>
              <Text fontSize="md" fontWeight="bold" color="white">
                차량 미등록
              </Text>
              <Text fontSize="sm" color="gray.400">
                서비스를 이용을 위해 차량 등록이 필요합니다
              </Text>
            </Box>
            <InfoOutlineIcon color="gray.300" boxSize={6} />
          </Flex>

          {/* 외장수리 견적받기 섹션 */}
          <Flex
            bg="gray.700"
            p={4}
            rounded="md"
            justify="space-between"
            align="center"
          >
            <Box>
              <Text fontSize="md" fontWeight="bold" color="white">
                외장수리 견적받기
              </Text>
              <Text fontSize="sm" color="gray.400">
                외관 흠집, 찌그러짐을 새것처럼
              </Text>
            </Box>
            <ArrowForwardIcon color="gray.300" boxSize={6} />
          </Flex>

          {/* 커뮤니티 이동 & 공업사 등록 섹션 */}
          <Flex justify="space-between">
            <Box
              bg="gray.700"
              p={4}
              rounded="md"
              flex="1"
              mr={2}
              textAlign="center"
              onClick={() => router.push('/community')}
              cursor="pointer"
            >
              <Text fontSize="md" fontWeight="bold" color="white">
                커뮤니티 이동
              </Text>
              <Text fontSize="sm" color="gray.400">
                의견을 나눠보세요
              </Text>
            </Box>
            <Box
              bg="gray.700"
              p={4}
              rounded="md"
              flex="1"
              ml={2}
              textAlign="center"
              cursor="pointer"
            >
              <Text fontSize="md" fontWeight="bold" color="white">
                공업사 등록
              </Text>
              <Text fontSize="sm" color="gray.400">
                공업사 회원이신가요?
              </Text>
            </Box>
          </Flex>
          {/* <Box>
            <Flex justify="space-between" align="center" mb={2}>
              <Text fontSize="lg" fontWeight="bold" color="white">
                커뮤니티 최근 글
              </Text>
              <Text
                fontSize="sm"
                color="blue.400"
                cursor="pointer"
                onClick={() => router.push('/community')}
              >
                더 보기
              </Text>
            </Flex>
            <Stack spacing={2}>
              {recentPosts.map((post) => (
                <HStack
                  key={post.id}
                  bg="gray.700"
                  p={3}
                  rounded="md"
                  justify="space-between"
                >
                  <Box>
                    <Text fontSize="md" fontWeight="bold" color="white">
                      {post.title}
                    </Text>
                    <Text fontSize="sm" color="gray.400">
                      {post.description}
                    </Text>
                  </Box>
                  <ArrowForwardIcon color="gray.300" boxSize={4} />
                </HStack>
              ))}
            </Stack>
          </Box> */}
          {/* 커뮤니티 최근 글 섹션 */}
          <Box bg="gray.700" p={4} rounded="md">
            <Flex justify="space-between" align="center" mb={1}>
              <Text fontSize="lg" fontWeight="bold" color="white">
                커뮤니티 최근 글
              </Text>
              <Text
                fontSize="sm"
                color="blue.400"
                cursor="pointer"
                onClick={() => router.push('/community')}
              >
                더 보기
              </Text>
            </Flex>
            <Divider borderColor="gray.600" mb={2} />
            <VStack align="stretch" spacing={2}>
              {recentPosts.map((post) => (
                <Text key={0} fontSize="md" color="white">
                  • {post}
                </Text>
              ))}
            </VStack>
          </Box>
        </Stack>
      </Box>

      {/* 하단 네비게이션 */}
      <BottomNavBar />
    </Flex>
  );
}
