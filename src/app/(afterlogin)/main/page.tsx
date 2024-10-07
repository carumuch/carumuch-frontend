'use client';

import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react';
import BottomNavBar from '@/components/bottomNavBar/BottomNavBar';
import Header from '@/components/header/Header';
import { ArrowForwardIcon, InfoOutlineIcon } from '@chakra-ui/icons';

export default function Main() {
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
            >
              <Text fontSize="md" fontWeight="bold" color="white">
                커뮤니티 이동
              </Text>
              <Text fontSize="sm" color="gray.400">
                자주들과 의견을 나눠보세요
              </Text>
            </Box>
            <Box
              bg="gray.700"
              p={4}
              rounded="md"
              flex="1"
              ml={2}
              textAlign="center"
            >
              <Text fontSize="md" fontWeight="bold" color="white">
                공업사 등록
              </Text>
              <Text fontSize="sm" color="gray.400">
                공업사 회원이신가요?
              </Text>
            </Box>
          </Flex>
        </Stack>
      </Box>

      {/* 하단 네비게이션 */}
      <BottomNavBar />
    </Flex>
  );
}
