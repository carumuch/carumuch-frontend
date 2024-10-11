'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Image,
  Stack,
  Text,
  Select,
  Textarea,
} from '@chakra-ui/react';
import BottomNavBar from '@/components/bottomNavBar/BottomNavBar';
import Header from '@/components/header/Header';
import { useModalContext } from '@/components/modal/ModalContext';
import { uploadImage } from '@/services/image';
import { registerVehicleEstimate } from '@/services/estimate'; // AI 견적 API 추가
import { useRouter } from 'next/navigation';

export default function RepairEstimatePage() {
  const { openModal } = useModalContext(); // 공용 모달 사용
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [inquiry, setInquiry] = useState(''); // 문의 내용 상태
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedDamage, setSelectedDamage] = useState('');
  const [selectedRideOption, setSelectedRideOption] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // 이미지 변경 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file)); // 이미지 미리보기 설정
    }
  };

  // 이미지 업로드 처리
  const handleUpload = async () => {
    if (!selectedImage) {
      openModal('오류', '이미지를 선택해주세요.');
      return;
    }

    try {
      const uploadedUrl = await uploadImage(selectedImage);
      setUploadedImageUrl(uploadedUrl);
      openModal('성공', '이미지가 성공적으로 업로드되었습니다.');
    } catch (error: any) {
      openModal('오류', error.message);
    }
  };

  // AI 견적 요청 제출 핸들러
  const handleSubmit = async () => {
    if (
      !inquiry ||
      !selectedLocation ||
      !selectedDistrict ||
      !selectedDamage ||
      !selectedRideOption ||
      !selectedBrand ||
      !uploadedImageUrl
    ) {
      openModal('오류', '모든 항목을 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      const vehicleId = 1; // vehicleId는 실제 API에서 받아와야 합니다
      const estimateData = {
        imagePath: uploadedImageUrl,
        description: inquiry,
        damageArea: selectedDamage,
        preferredRepairSido: selectedLocation,
        preferredRepairSigungu: selectedDistrict,
        isPickupRequired: selectedRideOption === 'true',
      };

      // 차량 견적 등록 API 호출
      const response = await registerVehicleEstimate(vehicleId, estimateData);
      openModal('성공', response.message);

      // 성공 시 쿼리 파라미터를 사용해 /estimate/result로 이동
      router.push(
        `/repair/estimate/result?url=${encodeURIComponent(uploadedImageUrl)}&manufacturer=${encodeURIComponent(selectedBrand)}`,
      );
    } catch (error: any) {
      openModal('오류', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex direction="column" alignItems="center" bg="gray.800" minH="100vh">
      <Header title="수리 입찰" />
      <Box w="100%" maxW="400px" p={4} rounded="md" bg="gray.800">
        <Stack spacing={6}>
          {/* 파손 사진 섹션 */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
              파손 사진 첨부
            </Text>
            <Text fontSize="sm" color="gray.400">
              파손 부위를 촬영해주세요
            </Text>
            <Box mt={4} bg="gray.700" p={4} rounded="md" textAlign="center">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="미리보기 이미지"
                  width={300}
                  height={200}
                />
              ) : (
                <Text color="gray.500">
                  촬영한 파손 사진 (AWS S3에 업로드 된 사진)
                </Text>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginTop: '10px' }}
              />
              <Button
                colorScheme="blue"
                size="sm"
                mt={2}
                onClick={handleUpload}
                isLoading={isLoading}
              >
                이미지 업로드
              </Button>
            </Box>
          </Box>

          {/* 문의 내용 섹션 */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
              문의 내용
            </Text>
            <Textarea
              placeholder="문의 내용을 입력해주세요."
              bg="gray.700"
              minHeight="120px"
              resize="none"
              value={inquiry}
              onChange={(e) => setInquiry(e.target.value)}
              variant="filled"
            />
          </Box>

          {/* 기타 옵션 섹션 */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
              공업사 선호 위치
            </Text>
            <Flex gap={4}>
              <Select
                placeholder="선택해주세요"
                bg="gray.700"
                color="white"
                flex="1"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                variant="filled"
              >
                <option value="서울시">서울시</option>
                <option value="고양시">고양시</option>
              </Select>
              <Select
                placeholder="선택해주세요"
                bg="gray.700"
                color="white"
                flex="1"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                variant="filled"
              >
                <option value="송파구">송파구</option>
                <option value="강남구">강남구</option>
              </Select>
            </Flex>
          </Box>

          <Box>
            <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
              예상 파손 부위
            </Text>
            <Select
              placeholder="선택해주세요"
              bg="gray.700"
              color="white"
              value={selectedDamage}
              onChange={(e) => setSelectedDamage(e.target.value)}
              variant="filled"
            >
              <option value="범퍼">범퍼</option>
              <option value="문">도어</option>
            </Select>
          </Box>

          <Box>
            <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
              차량 탁송 여부
            </Text>
            <Select
              placeholder="선택해주세요"
              bg="gray.700"
              color="white"
              value={selectedRideOption}
              onChange={(e) => setSelectedRideOption(e.target.value)}
              variant="filled"
            >
              <option value="true">필요</option>
              <option value="false">불필요</option>
            </Select>
          </Box>

          <Box>
            <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
              차량 브랜드
            </Text>
            <Select
              placeholder="선택해주세요"
              bg="gray.700"
              color="white"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              variant="filled"
            >
              <option value="hyundai">현대</option>
              <option value="kia">기아</option>
            </Select>
          </Box>

          {/* 견적 받기 버튼 */}
          <Button
            colorScheme="blue"
            size="lg"
            w="100%"
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            AI 견적 받기
          </Button>
        </Stack>
      </Box>

      <BottomNavBar />
    </Flex>
  );
}
