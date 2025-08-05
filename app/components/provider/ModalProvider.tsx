import { useModalStore } from '@/stores/useModalStore';
import ConfirmDialog from '../organisms/ConfirmDialog';
import MeetingCancelModal from '../organisms/MeetingCancelModal';
import MeetingReviewEditModal from '../organisms/MeetingReviewEditModal';
import ApplyMeetingModal from '../organisms/ApplyMeetingModal';
import DeclareModal from '../organisms/DeclareModal';
import CreateMeetingModal from '../organisms/CreateMeetingModal';

const MODAL_COMPONENTS = {
  CONFIRM_DIALOG: ConfirmDialog,
  CANCEL_MEETING_MODAL: MeetingCancelModal,
  EDIT_MEETING_REVIEW_MODAL: MeetingReviewEditModal,
  APPLY_MEETING_MODAL: ApplyMeetingModal,
  DECLARE_MODAL: DeclareModal,
  CREATE_MEETING_MODAL: CreateMeetingModal,
};

export default function ModalProvider() {
  const { modalType, modalProps, isOpen } = useModalStore();

  if (!isOpen || !modalType) {
    return null;
  }

  const ModalComponent = MODAL_COMPONENTS[modalType];

  return <ModalComponent {...modalProps} />;
}
