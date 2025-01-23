import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  modalTitle: string;
  modalMessage: string;
  openModal: (title: string, message: string) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  modalTitle: '',
  modalMessage: '',
  openModal: (title, message) =>
    set({
      isOpen: true,
      modalTitle: title,
      modalMessage: message,
    }),
  closeModal: () =>
    set({
      isOpen: false,
      modalTitle: '',
      modalMessage: '',
    }),
}));
