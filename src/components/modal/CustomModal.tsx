'use client';

import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useModalContext } from './ModalContext';

function CustomModal() {
  const { isOpen, modalMessage, modalTitle, isSignupSuccess, closeModal } =
    useModalContext();
  const router = useRouter();

  const handleCloseModal = () => {
    closeModal();
    if (isSignupSuccess) {
      router.push('/login'); // 회원가입 성공 시 /login 페이지로 이동
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalBody>{modalMessage}</ModalBody>
        <ModalFooter>
          <Button onClick={handleCloseModal}>닫기</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CustomModal;
