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
import Header from '@/components/header/Header'; // 기존 헤더 사용
import { useModalContext } from '@/components/modal/ModalContext'; // 공용 모달 훅
import helpImg1 from '/public/images/help_img_1.jpg'; // 첫 번째 예시 이미지
import helpImg2 from '/public/images/help_img_2.jpg'; // 두 번째 예시 이미지

export default function RepairEstimatePage() {
  const { openModal } = useModalContext(); // 공용 모달 사용
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [inquiry, setInquiry] = useState(''); // 문의 내용 상태
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedDamage, setSelectedDamage] = useState('');
  const [selectedRideOption, setSelectedRideOption] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file)); // 이미지 미리보기 설정
    }
  };

  const handleSubmit = () => {
    if (!inquiry) {
      openModal('오류', '문의 내용을 입력해주세요.');
      return;
    }

    // 선택 항목 미선택 시 모달 표시
    if (!selectedLocation) {
      openModal('오류', '공업사 선호 위치를 선택해주세요.');
      return;
    }
    if (!selectedDistrict) {
      openModal('오류', '공업사 선호 구를 선택해주세요.');
      return;
    }
    if (!selectedDamage) {
      openModal('오류', '예상 파손 부위를 선택해주세요.');
      return;
    }
    if (!selectedRideOption) {
      openModal('오류', '차량 탑승 여부를 선택해주세요.');
      return;
    }
    if (!selectedBrand) {
      openModal('오류', '차량 브랜드를 선택해주세요.');
      return;
    }

    // 첨부한 사진과 문의 내용 등을 서버로 보내는 로직 추가
    console.log('AI 견적 요청 제출');
  };

  return (
    <Flex direction="column" alignItems="center" bg="gray.800" minH="100vh">
      {/* 헤더 */}
      <Header title="수리 입찰" />

      {/* 메인 콘텐츠 */}
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
                  src={helpImg1.src}
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
              // color="white"
              minHeight="120px"
              resize="none"
              value={inquiry}
              onChange={(e) => setInquiry(e.target.value)}
              variant="filled"
              _hover={{}}
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
                color="white" // 글자가 하얀색이여서 expanded상태에서 잘 안보이는 문제 발생. 모바일에서는 괜찮음
                flex="1"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                variant="filled"
                _placeholder="filled"
                _hover={{}}
                _expanded={{ color: 'dark' }} // 드롭다운이 열렸을 때
              >
                <option value="seoul">서울시</option>
                <option value="busan">부산시</option>
              </Select>
              <Select
                placeholder="선택해주세요"
                bg="gray.700"
                color="white"
                flex="1"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                variant="filled"
                _placeholder="filled"
                _hover={{}}
              >
                <option value="songpa">송파구</option>
                <option value="gangnam">강남구</option>
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
              _placeholder="filled"
              _hover={{}}
            >
              <option value="bumper">범퍼</option>
              <option value="door">도어</option>
            </Select>
          </Box>

          <Box>
            <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
              차량 탑승 여부
            </Text>
            <Select
              placeholder="선택해주세요"
              bg="gray.700"
              color="white"
              value={selectedRideOption}
              onChange={(e) => setSelectedRideOption(e.target.value)}
              variant="filled"
              _placeholder="filled"
              _hover={{}}
            >
              <option value="yes">필요</option>
              <option value="no">불필요</option>
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
              _placeholder="filled"
              _hover={{}}
            >
              <option value="hyundai">현대</option>
              <option value="kia">기아</option>
            </Select>
          </Box>

          {/* 견적 받기 버튼 */}
          <Button colorScheme="blue" size="lg" w="100%" onClick={handleSubmit}>
            AI 견적 받기
          </Button>
        </Stack>
      </Box>

      {/* 하단 네비게이션 */}
      {/* <BottomNavBar /> */}
    </Flex>
  );
}
