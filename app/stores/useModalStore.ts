import { create } from 'zustand';

// 앞으로 추가될 모든 모달의 타입을 여기에 정의.
export type ModalType =
  | 'CONFIRM_DIALOG'
  | 'CANCEL_MEETING_MODAL'
  | 'EDIT_MEETING_REVIEW_MODAL'
  | 'APPLY_MEETING_MODAL'
  | 'DECLARE_MODAL'
  | 'CREATE_MEETING_MODAL';

interface ModalProps {
  [key: string]: unknown;
}

interface ModalState {
  modalType: ModalType | null;
  modalProps: ModalProps;
  isOpen: boolean;
  open: <T extends ModalProps>(modalType: ModalType, modalProps?: T) => void;
  close: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modalType: null,
  modalProps: {},
  isOpen: false,
  open: <T extends ModalProps>(modalType: ModalType, modalProps?: T) =>
    set({ isOpen: true, modalType, modalProps: modalProps || {} }),
  close: () => set({ isOpen: false, modalType: null, modalProps: {} }),
}));
