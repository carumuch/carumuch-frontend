import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';

const useModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const openModal = (title: string, message: string) => {
    setModalTitle(title);
    setModalMessage(message);
    onOpen();
  };

  return {
    isOpen,
    onClose,
    modalMessage,
    modalTitle,
    openModal,
  };
};

export default useModal;
