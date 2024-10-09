'use client';

import { Box, Button, Flex, Image, Stack, Text } from '@chakra-ui/react';
import BottomNavBar from '@/components/bottomNavBar/BottomNavBar';
import Header from '@/components/header/Header'; // 기존 헤더 사용
import { useState } from 'react';

export default function EstimateResultPage() {
  const [analysisImage, setAnalysisImage] = useState<string | null>(null); // AI 분석 이미지

  return (
    <Flex direction="column" alignItems="center" bg="gray.800" minH="100vh">
      {/* 헤더 */}
      <Header title="분석 결과" />

      {/* 메인 콘텐츠 */}
      <Box w="100%" maxW="400px" p={4} rounded="md" bg="gray.800">
        <Stack spacing={6}>
          {/* 파손 분석 섹션 */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
              파손 분석
            </Text>
            <Text fontSize="sm" color="gray.400">
              AI 기반 파손 분석 이미지입니다.
            </Text>
            <Box mt={4} bg="gray.700" p={4} rounded="md" textAlign="center">
              {analysisImage ? (
                <Image
                  src={analysisImage} // AI 분석에서 받아온 이미지
                  alt="AI 분석 이미지"
                  width={300}
                  height={200}
                />
              ) : (
                <Text color="gray.500">
                  AI 분석에 완료된 사진 (AI에서 보낸 파손 이미지)
                </Text>
              )}
            </Box>
          </Box>

          {/* 정비 예상 항목 */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
              정비 예상 항목
            </Text>
            <Text fontSize="sm" color="gray.400" mb={2}>
              정비가 예상되는 부품 목록입니다:
            </Text>
            <Box as="ul" pl={4} color="gray.400">
              <Box as="li">프론트 범퍼 커버</Box>
              <Box as="li">프론트 범퍼</Box>
              <Box as="li">브라켓-프론트 범퍼 사이드 마운팅 좌측</Box>
              <Box as="li">브라켓-프론트 범퍼 사이드 마운팅</Box>
            </Box>
          </Box>

          {/* 예상 금액 */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
              예상 금액
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color="white">
              2,100,000원
            </Text>
            <Text fontSize="sm" color="gray.400">
              위 견적은 AI 분석을 통해 자동으로 산출된 금액입니다.<br></br>
              실제 견적은 상황에 따라 변동이 있을 수 있습니다.
            </Text>
          </Box>

          {/* 견적 등록 버튼 */}
          <Button
            colorScheme="blue"
            size="lg"
            w="100%"
            onClick={() => console.log('견적 등록 버튼 클릭됨')}
          >
            견적 등록
          </Button>
        </Stack>
      </Box>

      {/* 하단 네비게이션 */}
      <BottomNavBar />
    </Flex>
  );
}
