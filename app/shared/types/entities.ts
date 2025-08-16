export type MeetingRecruitmentType = '정기모임' | '소모임';
export type MeetingRecruitmentStatus =
  | '모집예정'
  | '모집중'
  | '모집마감'
  | '모임중'
  | '모임완료';

export type ImageType = string;

export type LinkType = string;

export interface GuidebookSummary {
  id: number;
  title: string;
  thumbnailImage: ImageType;
  description: string;
}

export interface Guidebook {
  id: number;
  guidebookType: string;
  title: string;
  description: string;
  images: ImageType[];
  hashtags: string[];
  level: string;
  targetType: string;
  time: string;
  benefits: string[];
  file: string;
  recommendations: GuidebookRecommendation[];
}

export interface GuidebookRecommendation {
  id: number;
  title: string;
  thumbnailImage: string;
  description: string;
}

export interface Topic {
  id: number;
  topic: string;
}

export interface MeetingSchedule {
  meetingStartTime: string;
  meetingEndTime: string;
  address: string;
  addressDetail: string;
  content: string;
}

export interface Meeting {
  id: number;
  recruitmentStatus: MeetingRecruitmentStatus;
  recruitmentType: MeetingRecruitmentType;
  guidebook: GuidebookRecommendation;
  selectionType: string;
  name: string;
  topic: string;
  participantCount: number;
  minParticipants: number;
  maxParticipants: number;
  recruitingStartTime: string;
  recruitingEndTime: string;
  meetingMode: string;
  address: string;
  paymentAmount: number;
  introduction: string;
  schedules: MeetingSchedule[];
  hashtags: string[];
  meetingImages: ImageType[];
  info: string;
  hostId: number;
  hostName: string;
  hostImage: string;
  hostDescription: string;
  likesCount: number;
  /** 로그인한 사용자 정보 */
  liked: boolean;
  reviewable: boolean;
  userStatus: string;
  isHost: boolean;
}

export interface MeetingApplicants {
  applicantCount: number;
  applicants: Applicants[];
}

export interface Applicants {
  id: number;
  nickname: string;
  name: string;
  image: string;
  phoneNumber: string;
  joinReason: string;
  userStatus: string;
}

export interface MeetingParticipants {
  participantCount: number;
  participants: Participants[];
}

export interface Participants {
  id: number;
  authority: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  image: string;
  userStatus: string;
}

export interface MeetingAttendance {
  attendanceStatus: MeetingAttendanceSchedule[];
}

export interface MeetingAttendanceSchedule {
  scheduleId: number;
  round: number;
  checkedCount: number;
  totalCount: number;
  scheduleParticipants: AttendanceScheduleParticipants[];
  attendanceCheckAvailable: boolean;
}

export interface AttendanceScheduleParticipants {
  id: number;
  nickname: string;
  name: string;
  image: string;
  isChecked: '참석' | '불참' | '지각';
}

export interface EditMeetingSchedule {
  id: null | number;
  meetingDate: string;
  meetingStartTime: string;
  meetingEndTime: string;
  address: string;
  addressDetail: string;
}

export interface Host {
  id: number;
  hostName: string;
  hostImage: ImageType;
  hostInstruction: string;
  followCount: number;
  openingMeetingCount: number;
  openingMeetings: {
    id: number;
    meetingName: string;
    meetingImage: string;
    topic: string;
  }[];
  /** 로그인한 사용자 정보 */
  followed: boolean;
}

export interface UserInformation {
  name: string | null;
  phoneNumber: string | null;
  email: string;
  birthday: string | null;
  gender: '여성' | '남성' | null;
  /** 약관 동의 여부 */
  terms: boolean;
  userTerms: boolean;
  marketingTerms: boolean;
}

export interface UserProfile {
  nickname: string;
  introduction: string;
  profileImage: string;
  role: '일반 참가자' | '정기모임 호스트' | '소모임 호스트' | '관리자';
}

export interface MeetingSummary {
  id?: number;
  name: string;
  recruitmentType: string;
  recruitmentStatus?: string;
  image: ImageType;
  meetingStartTime: string;
  address: string;
  liked?: boolean;
}

export interface MyPageMeetingSummary {
  id: number;
  name: string;
  recruitmentType: string;
  recruitmentStatus: string;
  thumbnailImage: string;
  meetingStartTime: string;
  address: string;
  userStatus: string;
}

export interface Review {
  reviewId: number;
  profileImg: string;
  nickname: string;
  rating: number;
  text: string;
  images: ImageType[];
  createdAt: string;
  likesCount: number;
  /** 로그인한 사용자 정보 */
  liked: boolean;
  myReview: boolean;
  meeting: {
    id: number;
    name: string;
    recruitmentType: string;
    image: string;
  };
}

export interface Banner {
  bannerId: number;
  bannerImage: string;
  bannerUrl: string;
}

export type NotificationType = 'MEETING' | 'REVIEW' | 'HOST';

export interface Notification {
  id: number;
  type: NotificationType;
  message: string;
  timestamp: string;
  redirectUrl: string;
  isRead: boolean;
}

export interface Participant {
  id: number;
  name: string;
  image: ImageType;
  authority: string; // "관리자" | "참가자" TODO: 이거 어떻게 되는지 확인해야함
  status: string; // "참여중" | "요청중" TODO: 이거 어떻게 되는지 확인해야함
}

export interface MeetingAttendanceParticipant {
  id: number;
  nickname: string;
  name: string;
  image: ImageType;
  isChecked: boolean;
}

export interface MeetingAttendance {
  scheduleId: number;
  round: number; // 회차 번호
  checkedCount: number; // 총 출석자 수
  totalCount: number; // 총 참여자 수
  scheduleParticipants: MeetingAttendanceParticipant[]; // 참여자 출석 목록
}
