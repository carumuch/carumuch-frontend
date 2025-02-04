'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  Stack,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { AtSignIcon, EmailIcon, InfoIcon, LockIcon } from '@chakra-ui/icons';
import { useModalStore } from '@/components/modal/useModalStore';
import { SignupData, ApiResponse } from '@/types/d';
import { handleAsync } from '@/utils/handleAsync';
import { signup } from '@/services/users/index';

export default function SignupPage() {
  const openModal = useModalStore((state) => state.openModal);
  const [signupData, setSignupData] = useState<SignupData>({
    loginId: '',
    password: '',
    confirmPassword: '',
    email: '',
    name: '',
  });
  const [errors, setErrors] = useState({
    loginId: '',
    password: '',
    confirmPassword: '',
    email: '',
    name: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = (): boolean => {
    const newErrors = { ...errors };
    let isValid = true;

    const loginIdRegex = /^[a-z0-9]{4,20}$/;
    if (!loginIdRegex.test(signupData.loginId)) {
      newErrors.loginId =
        '아이디는 영어 소문자와 숫자만 사용하여 4~20자리여야 합니다.';
      isValid = false;
    }
    if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
      isValid = false;
    }
    if (!signupData.email.includes('@')) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
      isValid = false;
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    if (!passwordRegex.test(signupData.password)) {
      newErrors.password =
        '비밀번호는 8~16자리이며, 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.';
      isValid = false;
    }
    if (signupData.name.trim() === '') {
      newErrors.name = '이름을 입력해주세요.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      openModal('오류', '입력한 정보를 확인해주세요.');
      return;
    }

    const { confirmPassword, ...apiData } = signupData;
    setIsLoading(true);
    const [result, error] = await handleAsync<ApiResponse<number>>(
      signup(apiData),
    );
    setIsLoading(false);

    if (error) {
      // 에러가 발생하면 인터셉터에서 전달한 error.message를 사용
      openModal('오류', error.message || '회원가입 중 오류가 발생했습니다.');
      return;
    }

    // 백엔드 응답의 code와 message를 그대로 사용
    openModal(
      result?.code || '성공',
      result?.message || '회원가입이 완료되었습니다.',
    );
    setTimeout(() => {
      router.push('/login');
    }, 500);
  };

  return (
    <Center h="100vh" bg="gray.800">
      <Box p={8} rounded="md" w={['100%', '480px']} textAlign="center">
        <Text fontSize="lg" color="gray.100" mb={2}>
          Join Us
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="white" mb={6}>
          Car U Much
        </Text>
        <Stack spacing={3} mb={6} as="form" onSubmit={handleSubmit}>
          <FormControl isInvalid={!!errors.loginId}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.500">
                <AtSignIcon />
              </InputLeftElement>
              <Input
                variant="filled"
                placeholder="아이디"
                bg="gray.700"
                color="white"
                name="loginId"
                value={signupData.loginId}
                onChange={handleChange}
              />
            </InputGroup>
            <FormErrorMessage>{errors.loginId}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.email}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.500">
                <EmailIcon />
              </InputLeftElement>
              <Input
                type="email"
                variant="filled"
                placeholder="이메일"
                bg="gray.700"
                color="white"
                name="email"
                value={signupData.email}
                onChange={handleChange}
              />
            </InputGroup>
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
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
                name="password"
                value={signupData.password}
                onChange={handleChange}
              />
            </InputGroup>
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.confirmPassword}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.500">
                <LockIcon />
              </InputLeftElement>
              <Input
                type="password"
                variant="filled"
                placeholder="비밀번호 확인"
                bg="gray.700"
                color="white"
                name="confirmPassword"
                value={signupData.confirmPassword}
                onChange={handleChange}
              />
            </InputGroup>
            <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.name}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.500">
                <InfoIcon />
              </InputLeftElement>
              <Input
                variant="filled"
                placeholder="이름"
                bg="gray.700"
                color="white"
                name="name"
                value={signupData.name}
                onChange={handleChange}
              />
            </InputGroup>
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            colorScheme="purple"
            w="100%"
            disabled={isLoading}
          >
            {isLoading ? <Spinner size="sm" /> : '회원가입'}
          </Button>
        </Stack>
        <Text color="gray.400" mb={4}>
          이미 계정이 있으신가요? 로그인하세요.
        </Text>
        <Button
          variant="outline"
          w="100%"
          mb={4}
          borderColor="whiteAlpha.300"
          color="white"
        >
          로그인
        </Button>
      </Box>
    </Center>
  );
}
