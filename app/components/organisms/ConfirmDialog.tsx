import { useModalStore } from '@/stores/useModalStore';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../atoms/alert-dialog/AlertDialog';

export default function ConfirmDialog() {
  const { isOpen, modalProps, close } = useModalStore();

  return (
    <AlertDialog open={isOpen} onOpenChange={close}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left text-t2">
            {modalProps.title as string}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-5">
          <AlertDialogCancel
            onClick={modalProps.handleClickCancel as () => void}
          >
            아니요
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <button
              onClick={
                modalProps.handleClickAction as (
                  e: React.MouseEvent<HTMLButtonElement>,
                ) => void
              }
            >
              네
            </button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
