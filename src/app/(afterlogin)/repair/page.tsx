'use client';

import { Box, Button, Flex, Image, Stack, Text } from '@chakra-ui/react';
import BottomNavBar from '@/components/bottomNavBar/BottomNavBar';
import Header from '@/components/header/Header'; // 기존 헤더 사용
import helpImg1 from '/public/images/help_img_1.jpg'; // 첫 번째 예시 이미지
import helpImg2 from '/public/images/help_img_2.jpg'; // 두 번째 예시 이미지

export default function RepairPage() {
  return (
    <Flex direction="column" alignItems="center" bg="gray.800" minH="100vh">
      {/* 헤더 */}
      <Header title="입찰 안내" />

      {/* 메인 콘텐츠 */}
      <Box w="100%" maxW="400px" p={4} rounded="md" bg="gray.800">
        <Stack spacing={6}>
          {/* 안내 섹션 */}
          <Box>
            <Text
              fontSize="xl"
              fontWeight="bold"
              color="white"
              textAlign="center"
            >
              정확한 견적을 받기 위해
            </Text>
            <Text fontSize="md" color="gray.400" textAlign="center">
              아래 가이드를 따라주세요
            </Text>
          </Box>

          {/* 파손 부위 먼 거리에서 촬영 */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" color="white">
              밝은 곳에서 파손 부위 촬영
            </Text>
            <Text fontSize="sm" color="gray.400">
              밝은 곳에서 차량 파손 부위를 촬영해주세요
            </Text>
            <Box mt={4}>
              <Image
                src={helpImg1.src}
                alt="예시 사진 1"
                width={helpImg1.width}
                height={helpImg1.height}
                rounded="md"
              />
            </Box>
          </Box>

          {/* 파손 부위 가까이에서 촬영 */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" color="white">
              파손 부위를 가까이에서 촬영
            </Text>
            <Text fontSize="sm" color="gray.400">
              파손 부위를 가까이에서 촬영해주세요
            </Text>
            <Box mt={4}>
              <Image
                src={helpImg2.src}
                alt="예시 사진 2"
                width={helpImg2.width}
                height={helpImg2.height}
                rounded="md"
              />
              {/* 사진 첨부하기 버튼 */}
              <Button
                colorScheme="blue"
                size="lg"
                w="100%"
                mt={6}
                onClick={() => console.log('사진/동영상 첨부하기 클릭됨')}
              >
                사진/동영상 첨부하기
              </Button>
            </Box>
          </Box>
        </Stack>
      </Box>
      {/* 하단 네비게이션 */}
      <BottomNavBar />
    </Flex>
  );
}
