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

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Center h="100vh" bg="gray.800">
      <Box p={8} rounded="md" w={['90%', '400px']} textAlign="center">
        <Text fontSize="lg" color="gray.100" mb={2}>
          Welcome
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="white" mb={6}>
          Car U Much
        </Text>

        <Stack spacing={4} mb={6}>
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="gray.500">
              <AtSignIcon />
            </InputLeftElement>
            <Input
              variant="filled"
              placeholder="아이디"
              bg="gray.700"
              color="white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputGroup>

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

          <Button colorScheme="purple" w="100%" mt={4}>
            로그인
          </Button>

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

        {/* <Stack spacing={4}>
          <Button w="100%" bg="green.500" color="white">
            네이버
          </Button>
          <Button w="100%" bg="yellow.400" color="black">
            카카오톡
          </Button>
          <Button w="100%" bg="blue.600" color="white">
            페이스북
          </Button>
        </Stack> */}
      </Box>
    </Center>
  );
}

export default LoginPage;
