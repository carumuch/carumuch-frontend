'use client';

import { Box, Button, Center, Flex, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Images from '../../public/images';

export default function HomePage() {
  const router = useRouter();

  const onKakaoLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
  };

  const onNaverLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/naver';
  };

  const onGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  const handleRegularLogin = () => {
    router.push('/login');
  };

  return (
    <Center h="100vh" bg="gray.800">
      <Box p={8} rounded="md" w="100%" maxW="400px" textAlign="center">
        <Flex direction="column" align="center" mb={6}>
          <Text fontSize="2xl" fontWeight="bold" color="white" mb={2}>
            Car U Much?
          </Text>
          <Text color="gray.400" fontSize="sm">
            쉽고 빠른 AI 기반 견적 서비스 "카우머치"
          </Text>
        </Flex>

        <Flex justify="center" mb={6}>
          <Image
            src={Images.mainRepairIcon.src}
            width={Images.mainRepairIcon.width}
            height={Images.mainRepairIcon.height}
            alt="main repair icon"
          />
        </Flex>

        <Stack spacing={4} mb={6}>
          <Button colorScheme="blue" w="100%" onClick={handleRegularLogin}>
            일반 로그인
          </Button>
          <Button bg="#FEE500" w="100%" onClick={onKakaoLogin} _hover={{}}>
            카카오 로그인
          </Button>
          <Button bg="#03C75A" w="100%" onClick={onNaverLogin} _hover={{}}>
            네이버 로그인
          </Button>
          <Button bg="#EDF2F7" w="100%" onClick={onGoogleLogin} _hover={{}}>
            구글 로그인
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
