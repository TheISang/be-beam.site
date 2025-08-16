import type { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outlineGray' | 'outlineBlack' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
}

export interface TextProps {
  children: React.ReactNode;
  as?: 'p' | 'span' | 'h1' | 'h2' | 'div';
  color?:
    | 'black'
    | 'white'
    | 'gray-900'
    | 'gray-800'
    | 'gray-700'
    | 'gray-600'
    | 'gray-500'
    | 'gray-400'
    | 'gray-300'
    | 'gray-200'
    | 'gray-100'
    | 'purple'
    | 'brown'
    | 'primary';
  variant?: TypographyVariant;
  className?: string;
  onClick?: () => void;
}

export type TypographyVariant =
  | 'H0_Bold'
  | 'H1_Bold'
  | 'H2_Semibold'
  | 'T1_Regular'
  | 'T2_Semibold'
  | 'T3_Semibold'
  | 'T4_Regular'
  | 'B1_Semibold'
  | 'B2_Medium'
  | 'B3_Regular'
  | 'C1_Semibold'
  | 'C2_Regular'
  | 'C3_Regular';

export interface LogoProps {
  variant?: 'header' | 'auth' | 'footer';
  clickable?: boolean;
  className?: string;
}

export interface GridGroupProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 11 | 12;
  className?: string;
}

export interface SideBarSectionItems {
  to: string;
  title: string;
  onClick: () => void;
}

export interface FiltersType {
  label: string;
  options: string[];
  values: string[];
}

export interface FilterOption {
  text: string;
  value: string;
}

interface BaseCreateMeetingType {
  thumbnailImage: File | null;
  thumbnailImagePreview: string | '';
  name: string;
  selectionType: '선발형' | '선착순' | null;
  meetingMode: '온라인' | '오프라인' | '혼합' | null;
  topicId: number | null;
  hashtags: string[];
  introduction: string;
  images: File[];
  imagesPreview: string[];
  minParticipants: number;
  maxParticipants: number;
  hostDescription: string;
  recruitingStartTime: Date | null;
  recruitingEndTime: Date | null;
  paymentAmount: number;
  info: string;
  schedules: {
    meetingDate: string;
    meetingStartTime: string;
    meetingEndTime: string;
    address: string;
    addressDetail: string;
  }[];
}

// 정기모임 (recruitmentType: '정기모임')
export interface RegularMeetingType extends BaseCreateMeetingType {
  recruitmentType: '정기모임';
  isGuideBookRefer: 'false';
  guidebookReferenceId: null;
}

// 소모임 (recruitmentType: '소모임')
export interface SmallMeetingType extends BaseCreateMeetingType {
  recruitmentType: '소모임';
  isGuideBookRefer: 'false' | 'true';
  guidebookReferenceId: number | null;
}

// 초기 상태 (recruitmentType: undefined)
export interface InitialCreateMeetingType extends BaseCreateMeetingType {
  recruitmentType: undefined;
  isGuideBookRefer: 'false';
  guidebookReferenceId?: null;
}

// 최종 타입: 정기모임 또는 소모임
export type CreateMeeting =
  | RegularMeetingType
  | SmallMeetingType
  | InitialCreateMeetingType;

export interface EditCreateMeetingIntroType {
  thumbnailImage?: File;
  name: string;
  topicId: number | null;
  hashtags: { value: string }[];
  introduction: string;
  images: [] | { value: File }[] | null;
  hostDescription: string;
}

export interface EditMeetingDetailType {
  selectionType: '선발형' | '선착순';
  meetingMode: '온라인' | '오프라인' | '혼합';
  minParticipants: string | number;
  maxParticipants: string | number;
  paymentAmount: string | number;
  recruitingEndTime: string;
  info: string;
}
