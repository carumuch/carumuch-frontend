'use client';

import { ReactNode } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  body: ReactNode;
  footer?: ReactNode;
}

function CustomModal({
  isOpen,
  onClose,
  title,
  body,
  footer,
}: CustomModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>
        <ModalFooter>
          {footer || (
            <Button colorScheme="blud" onClick={onClose}>
              닫기
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

CustomModal.defaultProps = {
  footer: null,
};

export default CustomModal;
