'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Input,
  Select,
} from '@chakra-ui/react';
import BottomNavBar from '@/components/bottomNavBar/BottomNavBar';
import Header from '@/components/header/Header';
import { useModalContext } from '@/components/modal/ModalContext';
import { registerVehicle } from '@/services/vehicle';
import { useRouter } from 'next/navigation';

export default function VehicleRegisterPage() {
  const { openModal } = useModalContext(); // 공용 모달 사용
  const router = useRouter(); // 리디렉션 사용
  const [licenseNumber, setLicenseNumber] = useState('');
  const [type, setType] = useState('');
  const [brand, setBrand] = useState('');
  const [modelYear, setModelYear] = useState('');
  const [modelName, setModelName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    // 필드 검증
    if (
      !licenseNumber ||
      !type ||
      !brand ||
      !modelYear ||
      !modelName ||
      !ownerName
    ) {
      openModal('오류', '모든 필드를 입력해주세요.');
      return;
    }

    setIsLoading(true); // 로딩 상태 시작
    try {
      const vehicleData = {
        licenseNumber,
        type,
        brand,
        modelYear: parseInt(modelYear, 10), // 숫자 변환
        modelName,
        ownerName,
      };

      // API 호출
      const response = await registerVehicle(vehicleData);
      openModal('성공', response.message); // 성공 시 모달 출력
      router.push('/profile'); // 성공 후 /profile로 리디렉션
    } catch (error: any) {
      openModal('오류', error.message); // 에러 시 모달 출력
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
  };

  return (
    <Flex direction="column" alignItems="center" bg="gray.800" minH="100vh">
      {/* 헤더 */}
      <Header title="차량 등록" />

      {/* 메인 콘텐츠 */}
      <Box w="100%" maxW="400px" p={4} rounded="md" bg="gray.800">
        <Stack spacing={6}>
          {/* 차량 번호 입력 */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
              차량 번호
            </Text>
            <Input
              placeholder="차량 번호"
              bg="gray.700"
              color="white"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              variant="filled"
              _hover={{}}
            />
          </Box>

          {/* 차량 타입 선택 */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
              차량 타입
            </Text>
            <Select
              placeholder="선택해주세요"
              bg="gray.700"
              color="white"
              value={type}
              onChange={(e) => setType(e.target.value)}
              variant="filled"
              _hover={{}}
            >
              <option value="개인">개인</option>
              <option value="법인/리스">법인/리스</option>
            </Select>
          </Box>

          {/* 차량 브랜드 선택 */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
              차량 브랜드
            </Text>
            <Select
              placeholder="선택해주세요"
              bg="gray.700"
              color="white"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              variant="filled"
            >
              <option value="kia">기아</option>
              <option value="hyundai">현대</option>
            </Select>
          </Box>

          {/* 출시 연도 입력 */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
              출시 연도
            </Text>
            <Input
              placeholder="출시 연도 (예: 2020)"
              bg="gray.700"
              color="white"
              value={modelYear}
              onChange={(e) => setModelYear(e.target.value)}
              variant="filled"
              _hover={{}}
            />
          </Box>

          {/* 모델 이름 입력 */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
              모델 이름
            </Text>
            <Input
              placeholder="모델 이름"
              bg="gray.700"
              color="white"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              variant="filled"
              _hover={{}}
            />
          </Box>

          {/* 차주 이름 입력 */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
              차주 이름
            </Text>
            <Input
              placeholder="차주 이름"
              bg="gray.700"
              color="white"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              variant="filled"
              _hover={{}}
            />
          </Box>

          {/* 등록 버튼 */}
          <Button
            colorScheme="blue"
            size="lg"
            w="100%"
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            차량 등록
          </Button>
        </Stack>
      </Box>

      {/* 하단 네비게이션 */}
      <BottomNavBar />
    </Flex>
  );
}
