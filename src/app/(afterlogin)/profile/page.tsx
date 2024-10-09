'use client';

import { Box, Flex, Stack, Text, Divider, HStack } from '@chakra-ui/react';
import BottomNavBar from '@/components/bottomNavBar/BottomNavBar';
import Header from '@/components/header/Header'; // 기존 헤더 사용
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';

export default function MyPage() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <Flex direction="column" alignItems="center" bg="gray.800" minH="100vh">
      {/* 헤더 */}
      <Header title="내 정보" />

      {/* 메인 콘텐츠 */}
      <Box w="100%" maxW="400px" p={4} rounded="md" bg="gray.800">
        <Stack spacing={6}>
          {/* 프로필 섹션 */}
          <Flex alignItems="center" justify="space-between">
            <Flex alignItems="center">
              <Box w="60px" h="60px" bg="gray.600" rounded="full" mr={4}>
                {/* 이미지 영역 */}
                <Text color="gray.400" textAlign="center" lineHeight="60px">
                  프로필
                </Text>
              </Box>
              <Text fontSize="lg" fontWeight="bold" color="white">
                평화로운 리어카
              </Text>
            </Flex>
            <ChevronRightIcon boxSize={6} color="gray.400" />
          </Flex>

          <Divider borderColor="gray.600" />

          {/* 내 활동 섹션 */}
          {/* <Box>
            <Text fontSize="lg" fontWeight="bold" color="white" mb={4}>
              내 활동
            </Text>
            <HStack justifyContent="space-between">
              <Box textAlign="center">
                <Text fontSize="xl" color="white">
                  0
                </Text>
                <Text fontSize="sm" color="gray.400">
                  게시글
                </Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="xl" color="white">
                  0
                </Text>
                <Text fontSize="sm" color="gray.400">
                  댓글
                </Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="xl" color="white">
                  0
                </Text>
                <Text fontSize="sm" color="gray.400">
                  저장됨
                </Text>
              </Box>
            </HStack>
          </Box>

          <Divider borderColor="gray.600" /> */}

          {/* 메뉴 옵션 */}
          <Box>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              p={3}
              bg="gray.700"
              rounded="md"
              mb={2}
              onClick={() => handleNavigation('/mypage/notifications')}
            >
              <Text color="white" fontSize="md">
                내 알림
              </Text>
              <ChevronRightIcon boxSize={6} color="gray.400" />
            </Flex>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              p={3}
              bg="gray.700"
              rounded="md"
              mb={2}
              onClick={() => handleNavigation('/mypage/inquiries')}
            >
              <Text color="white" fontSize="md">
                견적문의의 목록
              </Text>
              <ChevronRightIcon boxSize={6} color="gray.400" />
            </Flex>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              p={3}
              bg="gray.700"
              rounded="md"
              mb={2}
              onClick={() => handleNavigation('/mypage/payment')}
            >
              <Text color="white" fontSize="md">
                결제 관리
              </Text>
              <ChevronRightIcon boxSize={6} color="gray.400" />
            </Flex>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              p={3}
              bg="gray.700"
              rounded="md"
              mb={2}
              onClick={() => handleNavigation('/mypage/blocked')}
            >
              <Text color="white" fontSize="md">
                차단 사용자 관리
              </Text>
              <ChevronRightIcon boxSize={6} color="gray.400" />
            </Flex>
          </Box>

          {/* <Divider borderColor="gray.600" /> */}

          {/* 내 설정 섹션 */}
          {/* <Box>
            <Text fontSize="lg" fontWeight="bold" color="white" mb={4}>
              내 설정
            </Text>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              p={3}
              bg="gray.700"
              rounded="md"
              mb={2}
              onClick={() => handleNavigation('/mypage/car')}
            >
              <Text color="white" fontSize="md">
                내 차 관리
              </Text>
              <ChevronRightIcon boxSize={6} color="gray.400" />
            </Flex>
            <Flex
              justify="space-between"
              align="center"
              p={3}
              bg="gray.700"
              rounded="md"
            >
              <Text fontSize="md" color="white">
                전화번호
              </Text>
              <Text fontSize="md" color="gray.400">
                01077631880
              </Text>
            </Flex>
          </Box> */}
        </Stack>
      </Box>

      {/* 하단 네비게이션 */}
      <BottomNavBar />
    </Flex>
  );
}
