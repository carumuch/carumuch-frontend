'use client';

import { Box, Button, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import Images from '../../public/images';

export default function Home() {
  const onKakaoLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
  };

  const onNaverLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/naver';
  };

  const onGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <div className="container">
      <Box>
        <Flex
          direction="column"
          align="center"
          justify="center"
          height="26vh"
          mt="14"
        >
          <Flex direction="row" align="center">
            <Text fontSize="5xl" fontWeight="bold">
              Car U Much?
            </Text>
          </Flex>
          <Text mt="2" fontSize="s" fontWeight="bold">
            쉽고 빠른 AI 기반 견적 서비스 &quot;카우머치&quot;
          </Text>
        </Flex>
      </Box>
      <Box>
        <Flex align="center" justify="center">
          <Image
            src={Images.mainRepairIcon.src}
            width={Images.mainRepairIcon.width}
            height={Images.mainRepairIcon.height}
            sizes="60%"
            alt="main repair icon"
          />
        </Flex>
      </Box>
      <Box mt="4">
        <Flex direction="column" gap="2">
          <Button bg="#0064FF" colorScheme="white">
            <Link href="/login">일반 로그인</Link>
          </Button>
          <Button bg="#FEE500" _hover={{}} onClick={onKakaoLogin}>
            카카오 로그인
          </Button>
          <Button bg="#03C75A" _hover={{}} onClick={onNaverLogin}>
            네이버 로그인
          </Button>
          <Button bg="#EDF2F7" _hover={{}} onClick={onGoogleLogin}>
            구글 로그인
          </Button>
        </Flex>
      </Box>
    </div>
  );
}
