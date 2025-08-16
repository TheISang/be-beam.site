// 후에 저장 고려

import {
  createMeetingFirstSchema,
  createMeetingFourthSchema,
  createMeetingSecondSchema,
} from '@/features/meetings/schemas/meeting';
import type { z } from 'zod';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type CreateMeetingFormState = z.infer<typeof createMeetingFirstSchema> &
  z.infer<typeof createMeetingSecondSchema> &
  z.infer<typeof createMeetingFourthSchema> & {
    // 탭 상태 (value: 0, 1, 2, 3)
    currentTab: number;
    // 모임 타입 (value: 'regular', 'small')
    meetingTypeTab: 'regular' | 'small' | '';
    // 가이드북 참고 여부 (value: 'true', 'false')
    isGuideBookRefer: 'true' | 'false';
    // 선택된 가이드북 ID (소모임일 경우만 해당)
    selectedGuideBookId?: number | null;
    thumbnailImagePreview: string;
    imagesPreview: string[];
  };

interface CreateMeetingStoreActions {
  updateFormData: (data: Partial<CreateMeetingFormState>) => void;
  setTab: (tab: number) => void;
  setMeetingTypeTab: (type: 'regular' | 'small' | '') => void;
  setIsGuideBookRefer: (value: 'true' | 'false') => void;
  setSelectedGuideBookId: (id: number | undefined) => void;
  resetFormState: () => void;
  setThumbnailImagePreview: (url: string) => void;
  setImagesPreview: (urls: string[]) => void;
}

const initialFormState: CreateMeetingFormState = {
  name: '',
  introduction: '',
  topicId: null,
  hashtags: [],
  thumbnailImage: null,
  images: [],
  hostDescription: '',

  // createMeetingSecondSchema (2단계)
  selectionType: null,
  meetingMode: null,
  minParticipants: 0,
  maxParticipants: 0,
  recruitingStartTime: null,
  recruitingEndTime: null,
  paymentAmount: 0,
  info: '',

  // createMeetingFourthSchema (4단계)
  schedules: [
    {
      meetingDate: '',
      meetingStartTime: '',
      meetingEndTime: '',
      address: '',
      addressDetail: '',
    },
  ],

  currentTab: 0,
  meetingTypeTab: '',
  isGuideBookRefer: 'false',
  selectedGuideBookId: null,
  thumbnailImagePreview: '',
  imagesPreview: [],
};

export const useCreateMeetingFormStore = create<
  CreateMeetingFormState & CreateMeetingStoreActions
>()(
  persist(
    (set) => ({
      ...initialFormState,

      updateFormData: (data) => set((state) => ({ ...state, ...data })),
      setTab: (tab) => set({ currentTab: tab }),
      setMeetingTypeTab: (type) => {
        set((state) => ({
          meetingTypeTab: type,
          isGuideBookRefer:
            type === 'regular' ? 'false' : state.isGuideBookRefer,
          selectedGuideBookId:
            type === 'regular' ? null : state.selectedGuideBookId,
        }));
      },
      setIsGuideBookRefer: (value) => set({ isGuideBookRefer: value }),
      setSelectedGuideBookId: (id) => set({ selectedGuideBookId: id }),
      resetFormState: () => set({ ...initialFormState }),
      setThumbnailImagePreview: (url) => set({ thumbnailImagePreview: url }),
      setImagesPreview: (urls) => set({ imagesPreview: urls }),
    }),
    {
      name: 'create-meeting-form-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
