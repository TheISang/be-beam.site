import { useModalStore } from '@/shared/stores/useModalStore';
import ConfirmDialog from '../components/common/ConfirmDialog';
import MeetingCancelModal from '../../features/meetings/components/MeetingCancelModal';
import MeetingReviewEditModal from '../../features/reviews/components/MeetingReviewEditModal';
import ApplyMeetingModal from '../../features/meetings/components/ApplyMeetingModal';
import DeclareModal from '../../features/report/components/DeclareModal';
import GuideBooksFilterDialog from '../../features/guidebooks/components/GuideBooksFilterDialog';

const MODAL_COMPONENTS = {
  CONFIRM_DIALOG: ConfirmDialog,
  CANCEL_MEETING_MODAL: MeetingCancelModal,
  EDIT_MEETING_REVIEW_MODAL: MeetingReviewEditModal,
  APPLY_MEETING_MODAL: ApplyMeetingModal,
  DECLARE_MODAL: DeclareModal,
  GUIDEBOOK_FILTER_DIALOG: GuideBooksFilterDialog,
};

export default function ModalProvider() {
  const { modalType, modalProps, isOpen } = useModalStore();

  if (!isOpen || !modalType) {
    return null;
  }

  const ModalComponent = MODAL_COMPONENTS[modalType];

  return <ModalComponent {...modalProps} />;
}
