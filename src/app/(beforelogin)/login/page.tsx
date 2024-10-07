'use client';

import {
  Box,
  Button,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from '@chakra-ui/react';
import { AtSignIcon, LockIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // useRouter 훅
import { useLoginStore } from '@/stores/useLoginStore'; // Zustand 상태
import useModal from '@/hooks/useModal';

function LoginPage() {
  const [loginId, setLoginId] = useState(''); // 로그인 ID 상태
  const [password, setPassword] = useState(''); // 비밀번호 상태
  const { login, isLoading, error } = useLoginStore(); // Zustand 로그인 상태 사용
  const router = useRouter(); // 리디렉션을 위한 useRouter
  const { openModal } = useModal(); // 전역 모달 훅

  const handleSubmit = async () => {
    try {
      const success = await login({ loginId, password }); // 로그인 요청
      if (success) {
        router.push('/main'); // 로그인 성공 시 /main으로 이동
      } else if (error) {
        openModal('로그인 실패', error); // 실패 시 백엔드 메시지로 모달 표시
      }
    } catch (e: any) {
      openModal('오류', e.message || '알 수 없는 오류가 발생했습니다.');
    }
  };

  return (
    <Center h="100vh" bg="gray.800">
      <Box p={8} rounded="md" w={['100%', '400px']} textAlign="center">
        <Text fontSize="lg" color="gray.100" mb={2}>
          Welcome
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="white" mb={6}>
          Car U Much
        </Text>

        <Stack spacing={3} mb={6}>
          {/* 로그인 아이디 입력 */}
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="gray.500">
              <AtSignIcon />
            </InputLeftElement>
            <Input
              variant="filled"
              placeholder="아이디"
              bg="gray.700"
              color="white"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
          </InputGroup>

          {/* 비밀번호 입력 */}
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="gray.500">
              <LockIcon />
            </InputLeftElement>
            <Input
              type="password"
              variant="filled"
              placeholder="비밀번호"
              bg="gray.700"
              color="white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>

          {/* 에러 메시지 출력 */}
          {error && <Text color="red.500">{error}</Text>}

          {/* 로그인 버튼 */}
          <Button
            colorScheme="purple"
            w="100%"
            mt={4}
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            로그인
          </Button>

          {/* 회원가입 버튼 */}
          <Button
            variant="outline"
            w="100%"
            mb={4}
            borderColor="whiteAlpha.300"
            color="white"
          >
            회원가입
          </Button>
        </Stack>

        <Text color="gray.400" mb={4}>
          아이디 / 비밀번호 찾기
        </Text>
      </Box>
    </Center>
  );
}

export default LoginPage;
