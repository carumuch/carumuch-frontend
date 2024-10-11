'use client';

import { Box, Button, Flex, Image, Stack, Text } from '@chakra-ui/react';
import BottomNavBar from '@/components/bottomNavBar/BottomNavBar';
import Header from '@/components/header/Header';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // 쿼리 파라미터 사용
import { classify } from '@/services/ai'; // AI API 호출 함수

export default function EstimateResultPage() {
  const searchParams = useSearchParams(); // 쿼리 파라미터에서 값 가져오기
  const [analysisImage, setAnalysisImage] = useState<string | null>(null); // AI 분석 이미지
  const [repairList, setRepairList] = useState<string[]>([]); // 수리 목록
  const [totalCost, setTotalCost] = useState<number>(0); // 총 비용
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const manufacturer = searchParams.get('manufacturer');
        const imageUrl = searchParams.get('url');
        if (!manufacturer || !imageUrl) {
          throw new Error('잘못된 요청입니다.');
        }

        // AI API 호출
        const result = await classify({ manufacturer, url: imageUrl });

        // 응답 데이터 처리
        setRepairList(result.list_repair);
        setAnalysisImage(`data:image/png;base64,${result.segmented_image}`); // base64 이미지 처리
        setTotalCost(result.total_cost);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  return (
    <Flex direction="column" alignItems="center" bg="gray.800" minH="100vh">
      <Header title="분석 결과" />
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
              {isLoading ? (
                <Text color="gray.500">분석 중입니다...</Text>
              ) : analysisImage ? (
                <Image
                  src={analysisImage} // AI 분석에서 받아온 이미지
                  alt="AI 분석 이미지"
                  width={300}
                  height={200}
                />
              ) : (
                <Text color="gray.500">
                  AI 분석 이미지를 불러오지 못했습니다.
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
              {isLoading ? (
                <Text>수리 목록을 불러오는 중입니다...</Text>
              ) : repairList.length > 0 ? (
                repairList.map((item, index) => (
                  <Box as="li" key={index}>
                    {item}
                  </Box>
                ))
              ) : (
                <Text>수리 항목이 없습니다.</Text>
              )}
            </Box>
          </Box>

          {/* 예상 금액 */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
              예상 금액
            </Text>
            {isLoading ? (
              <Text fontSize="2xl" fontWeight="bold" color="white">
                금액 계산 중...
              </Text>
            ) : (
              <Text fontSize="2xl" fontWeight="bold" color="white">
                {totalCost ? totalCost.toLocaleString() : '0'}원
              </Text>
            )}
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

      <BottomNavBar />
    </Flex>
  );
}
