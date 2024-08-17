'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import signup from '@/services/users/signup';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import CustomModal from '@/components/modal/CustomModal';
import { useModal } from '@/hooks/useModal';
import { SignupData } from '@/types/user';

export default function SignupPage() {
  const { isOpen, onClose, modalMessage, modalTitle, openModal } = useModal();
  const [signupData, setSignupData] = useState<SignupData>({
    loginId: '',
    password: '',
    email: '',
    name: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: (status) => {
      if (status === 201) {
        openModal('성공', '회원가입이 성공적으로 완료되었습니다.');
      }
    },
    onError: (status: number) => {
      if (status === 400) {
        openModal('오류', '잘못된 입력 데이터입니다.');
      } else if (status === 409) {
        openModal('오류', '아이디 또는 이메일이 중복되었습니다.');
      } else {
        openModal('오류', '알 수 없는 오류가 발생했습니다.');
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(signupData);
  };

  return (
    <div className="container">
      <Box maxW="md" mx="auto" mt="8">
        <form onSubmit={handleSubmit}>
          <FormControl mb="4">
            <FormLabel>아이디</FormLabel>
            <Input
              name="loginId"
              value={signupData.loginId}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>비밀번호</FormLabel>
            <Input
              name="password"
              type="password"
              value={signupData.password}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>이메일</FormLabel>
            <Input
              name="email"
              value={signupData.email}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>이름</FormLabel>
            <Input
              name="name"
              value={signupData.name}
              onChange={handleChange}
              required
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={mutation.isLoading}
          >
            회원가입
          </Button>
        </form>

        <CustomModal
          isOpen={isOpen}
          onClose={onClose}
          title={modalTitle}
          body={modalMessage}
        />
      </Box>
    </div>
  );
}
