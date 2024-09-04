// 'use client';

// import { useState } from 'react';
// import { useMutation } from '@tanstack/react-query';
// import signup from '@/services/users/signup';
// import { Box, Button, FormControl, FormLabel, Input, FormErrorMessage, Spinner } from '@chakra-ui/react';
// import { useModalContext } from '@/components/modal/ModalContext';
// import { SignupData } from '@/types/user';

// export default function SignupPage() {
//   const { openModal, setIsSignupSuccess } = useModalContext();  // 상태 변경 함수 사용
//   const [signupData, setSignupData] = useState<SignupData>({
//     loginId: '',
//     password: '',
//     email: '',
//     name: '',
//   });

//   const [errors, setErrors] = useState({
//     loginId: '',
//     password: '',
//     email: '',
//     name: '',
//   });

//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setSignupData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     setErrors((prev) => ({
//       ...prev,
//       [name]: '',  // 입력값 변경 시 기존 오류 메시지 초기화
//     }));
//   };

//   const validate = (): boolean => {
//     const newErrors = { ...errors };
//     let isValid = true;
  
//     // 아이디 유효성 검사: 영어 소문자와 숫자만 사용, 4~20자리
//     const loginIdRegex = /^[a-z0-9]{4,20}$/;
//     if (!loginIdRegex.test(signupData.loginId)) {
//       newErrors.loginId = '아이디는 영어 소문자와 숫자만 사용하여 4~20자리여야 합니다.';
//       isValid = false;
//     }
  
//     // 이메일 유효성 검사: '@' 포함 여부로 간단히 체크
//     if (!signupData.email.includes('@')) {
//       newErrors.email = '올바른 이메일 형식을 입력해주세요.';
//       isValid = false;
//     }
  
//     // 비밀번호 유효성 검사: 8~16자리, 영문 대소문자, 숫자, 특수문자 포함
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
//     if (!passwordRegex.test(signupData.password)) {
//       newErrors.password = '비밀번호는 8~16자리이며, 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.';
//       isValid = false;
//     }
  
//     // 이름 유효성 검사: 입력 여부 체크
//     if (signupData.name.trim() === '') {
//       newErrors.name = '이름을 입력해주세요.';
//       isValid = false;
//     }
  
//     setErrors(newErrors);
//     return isValid;
//   };
  

//   const mutation = useMutation({
//     mutationFn: signup,
//     onMutate: () => setIsLoading(true),
//     onSuccess: () => {
//       setIsLoading(false);
//       setIsSignupSuccess(true);  // 회원가입 성공 시 상태 설정
//       openModal('성공', '회원가입이 성공적으로 완료되었습니다.');
//     },
//     onError: (error: any) => {
//       setIsLoading(false);
//       setIsSignupSuccess(false);  // 오류 발생 시 상태 초기화
      
//       if (error.response) {
//         const { status, data } = error.response;
  
//         if (status === 409) {
//           // 409 상태 코드 처리: 아이디 또는 이메일 중복
//           openModal('오류', data.message || '아이디 또는 이메일이 이미 사용 중입니다.');
//         } else if (status === 400 && data.errors) {
//           const fieldErrors = data.errors;
//           const newErrors = { ...errors };
  
//           // 필드별 오류 메시지 설정
//           Object.keys(fieldErrors).forEach((field) => {
//             newErrors[field as keyof SignupData] = fieldErrors[field];
//           });
  
//           setErrors(newErrors);
//         } else if (status === 400) {
//           openModal('오류', data.message || '잘못된 요청입니다.');
//         } else {
//           openModal('오류', '회원가입 중 오류가 발생했습니다.');
//         }
//       } else {
//         openModal('오류', '회원가입 중 오류가 발생했습니다.');
//       }
//     },
//   });  

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validate()) {
//       mutation.mutate(signupData);
//     } else {
//       openModal('오류', '입력한 정보를 확인해주세요.');
//     }
//   };

//   return (
//     <>
//       <div className='container'>
//         <Box as="form" onSubmit={handleSubmit}>
//           <FormControl isInvalid={!!errors.loginId} mb={4}>
//             <FormLabel>아이디</FormLabel>
//             <Input type="text" name="loginId" value={signupData.loginId} onChange={handleChange} />
//             <FormErrorMessage>{errors.loginId}</FormErrorMessage>
//           </FormControl>

//           <FormControl isInvalid={!!errors.email} mb={4}>
//             <FormLabel>이메일</FormLabel>
//             <Input type="email" name="email" value={signupData.email} onChange={handleChange} />
//             <FormErrorMessage>{errors.email}</FormErrorMessage>
//           </FormControl>

//           <FormControl isInvalid={!!errors.password} mb={4}>
//             <FormLabel>비밀번호</FormLabel>
//             <Input type="password" name="password" value={signupData.password} onChange={handleChange} />
//             <FormErrorMessage>{errors.password}</FormErrorMessage>
//           </FormControl>

//           <FormControl isInvalid={!!errors.name} mb={4}>
//             <FormLabel>이름</FormLabel>
//             <Input type="text" name="name" value={signupData.name} onChange={handleChange} />
//             <FormErrorMessage>{errors.name}</FormErrorMessage>
//           </FormControl>

//           <Button type="submit" mt={4} disabled={isLoading}>
//             {isLoading ? <Spinner size="sm" /> : '회원가입'}
//           </Button>
//         </Box>
//       </div>
//     </>
//   );
// }

'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import signup from '@/services/users/signup';
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
import { AtSignIcon, LockIcon } from '@chakra-ui/icons';
import { useModalContext } from '@/components/modal/ModalContext';
import { SignupData } from '@/types/user';

export default function SignupPage() {
  const { openModal, setIsSignupSuccess } = useModalContext(); // 상태 변경 함수 사용
  const [signupData, setSignupData] = useState<SignupData>({
    loginId: '',
    password: '',
    email: '',
    name: '',
  });

  const [errors, setErrors] = useState({
    loginId: '',
    password: '',
    email: '',
    name: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '', // 입력값 변경 시 기존 오류 메시지 초기화
    }));
  };

  const validate = (): boolean => {
    const newErrors = { ...errors };
    let isValid = true;

    // 아이디 유효성 검사: 영어 소문자와 숫자만 사용, 4~20자리
    const loginIdRegex = /^[a-z0-9]{4,20}$/;
    if (!loginIdRegex.test(signupData.loginId)) {
      newErrors.loginId = '아이디는 영어 소문자와 숫자만 사용하여 4~20자리여야 합니다.';
      isValid = false;
    }

    // 이메일 유효성 검사: '@' 포함 여부로 간단히 체크
    if (!signupData.email.includes('@')) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
      isValid = false;
    }

    // 비밀번호 유효성 검사: 8~16자리, 영문 대소문자, 숫자, 특수문자 포함
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    if (!passwordRegex.test(signupData.password)) {
      newErrors.password = '비밀번호는 8~16자리이며, 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.';
      isValid = false;
    }

    // 이름 유효성 검사: 입력 여부 체크
    if (signupData.name.trim() === '') {
      newErrors.name = '이름을 입력해주세요.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const mutation = useMutation({
    mutationFn: signup,
    onMutate: () => setIsLoading(true),
    onSuccess: () => {
      setIsLoading(false);
      setIsSignupSuccess(true); // 회원가입 성공 시 상태 설정
      openModal('성공', '회원가입이 성공적으로 완료되었습니다.');
    },
    onError: (error: any) => {
      setIsLoading(false);
      setIsSignupSuccess(false); // 오류 발생 시 상태 초기화

      if (error.response) {
        const { status, data } = error.response;

        if (status === 409) {
          // 409 상태 코드 처리: 아이디 또는 이메일 중복
          openModal('오류', data.message || '아이디 또는 이메일이 이미 사용 중입니다.');
        } else if (status === 400 && data.errors) {
          const fieldErrors = data.errors;
          const newErrors = { ...errors };

          // 필드별 오류 메시지 설정
          Object.keys(fieldErrors).forEach((field) => {
            newErrors[field as keyof SignupData] = fieldErrors[field];
          });

          setErrors(newErrors);
        } else if (status === 400) {
          openModal('오류', data.message || '잘못된 요청입니다.');
        } else {
          openModal('오류', '회원가입 중 오류가 발생했습니다.');
        }
      } else {
        openModal('오류', '회원가입 중 오류가 발생했습니다.');
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      mutation.mutate(signupData);
    } else {
      openModal('오류', '입력한 정보를 확인해주세요.');
    }
  };

  return (
    <Center h="100vh" bg="gray.800">
      <Box p={8} rounded="md" w={['90%', '400px']} textAlign="center">
        <Text fontSize="lg" color="gray.100" mb={2}>
          Join Us
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="white" mb={6}>
          Car U Much
        </Text>

        <Stack spacing={4} mb={6} as="form" onSubmit={handleSubmit}>
          {/* 아이디 입력 필드 */}
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

          {/* 이메일 입력 필드 */}
          <FormControl isInvalid={!!errors.email}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.500">
                <AtSignIcon />
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

          {/* 비밀번호 입력 필드 */}
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

          {/* 이름 입력 필드 */}
          <FormControl isInvalid={!!errors.name}>
            <Input
              variant="filled"
              placeholder="이름"
              bg="gray.700"
              color="white"
              name="name"
              value={signupData.name}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="purple" w="100%" mt={4} disabled={isLoading}>
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
