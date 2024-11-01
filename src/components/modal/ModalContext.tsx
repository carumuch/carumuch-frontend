'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from 'react';

type ModalContextType = {
  isOpen: boolean;
  modalMessage: string;
  modalTitle: string;
  isSignupSuccess: boolean;
  setIsSignupSuccess: (value: boolean) => void;
  openModal: (title: string, message: string) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

  const openModal = (title: string, message: string) => {
    setModalTitle(title);
    setModalMessage(message);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalTitle('');
    setModalMessage('');
    setIsSignupSuccess(false);
  };

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      isOpen,
      modalMessage,
      modalTitle,
      isSignupSuccess,
      setIsSignupSuccess,
      openModal,
      closeModal,
    }),
    [isOpen, modalMessage, modalTitle, isSignupSuccess],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};
