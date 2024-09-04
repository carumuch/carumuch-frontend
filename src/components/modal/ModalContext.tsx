"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

type ModalContextType = {
  isOpen: boolean;
  modalMessage: string;
  modalTitle: string;
  isSignupSuccess: boolean;  // 회원가입 성공 여부 상태 추가
  setIsSignupSuccess: (value: boolean) => void;  // 상태 변경 함수 추가
  openModal: (title: string, message: string) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);  // 상태 추가

  const openModal = (title: string, message: string) => {
    setModalTitle(title);
    setModalMessage(message);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalTitle('');
    setModalMessage('');
    setIsSignupSuccess(false);  // 모달이 닫힐 때 상태 초기화
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        modalMessage,
        modalTitle,
        isSignupSuccess,
        setIsSignupSuccess,  // 상태 변경 함수 제공
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};
