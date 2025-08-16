import { axiosInstance } from '@/shared/api/axios';
import { API_V1_BASE_URL, API_V2_BASE_URL } from '@/shared/constants/api';
import type { APIResponse, CursorPaginationResult } from '@/shared/types/api';
import type {
  GuidebookRecommendation,
  ImageType,
  Meeting,
  MeetingAttendance,
  MeetingSchedule,
  Participant,
  Topic,
} from '@/shared/types/entities';
import type { MeetingListFilters } from '@/features/meetings/schemas/meetingFilters';

export type MeetingListResult = {
  pageInfo: CursorPaginationResult;
  meetings: {
    id: Meeting['id'];
    name: Meeting['name'];
    recruitmentStatus: Meeting['recruitmentStatus'];
    recruitmentType: Meeting['recruitmentType'];
    meetingStartTime: MeetingSchedule['meetingStartTime'];
    address: MeetingSchedule['address'];
    image: ImageType;
    applicantCount: number;
    participantCount: number;
  }[];
};

export const getMeetingList = async (
  filters: MeetingListFilters,
  pageParam: number = 0,
) => {
  const searchParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  const url = `/meetings?${searchParams.toString()}&cursor=${pageParam}&size=12`;
  console.log(url);

  const res = await axiosInstance({
    baseURL: API_V2_BASE_URL,
    url: url,
    method: 'GET',
  });

  return res.data.result;
};

export type MeetingDetailResult = {
  id: Meeting['id'];
  recruitingState: Meeting['recruitmentStatus'];
  recruitmentType: Meeting['recruitmentType'];
  guidebook: GuidebookRecommendation;
  selectionType: Meeting['selectionType'];
  name: Meeting['name'];
  topic: Meeting['topic'];
  participantCount: Meeting['participantCount'];
  minParticipants: Meeting['minParticipants'];
  maxParticipants: Meeting['maxParticipants'];
  recruitingStartTime: Meeting['recruitingStartTime'];
  recruitingEndTime: Meeting['recruitingEndTime'];
  meetingMode: Meeting['meetingMode'];
  address: Meeting['address'];
  paymentAmount: Meeting['paymentAmount'];
  introduction: Meeting['introduction'];
  schedules: Meeting['schedules'];
  hashtags: Meeting['hashtags'];
  meetingImages: Meeting['meetingImages'];
  info: Meeting['info'];
  hostId: Meeting['hostId'];
  hostName: Meeting['hostName'];
  hostImage: Meeting['hostImage'];
  hostDescription: Meeting['hostDescription'];
  likesCount: Meeting['likesCount'];
  /** 로그인한 사용자 정보 */
  liked: Meeting['liked'];
  reviewable: Meeting['reviewable'];
  userStatus: Meeting['userStatus'];
  isHost: Meeting['isHost'];
};

export const getMeetingDetail = async (id: number) => {
  const res = await axiosInstance({
    baseURL: API_V2_BASE_URL,
    url: `/meetings/${id}`,
    method: 'GET',
  });
  return res.data.result;
};

export const applyMeeting = async (
  id: number,
  data: { joinReason: string },
) => {
  return axiosInstance({
    baseURL: API_V1_BASE_URL,
    method: 'POST',
    url: `/meetings/${id}/join`,
    data,
  });
};

export const likeMeeting = async (meeting: { id: number; liked: boolean }) => {
  return axiosInstance({
    baseURL: API_V1_BASE_URL,
    method: meeting.liked ? 'DELETE' : 'POST',
    url: `/meetings/${meeting.id}/like`,
  });
};

export const cancelMeeting = (
  data: {
    cancellationReasonType: '개인일정' | '단순변심' | '위치' | '기타';
    cancelReason: string;
  },
  id: number,
  statusType: 'participating' | 'applied',
) => {
  return axiosInstance({
    baseURL: API_V1_BASE_URL,
    method: 'DELETE',
    url: `/meetings/${id}/cancellations/${statusType === 'participating' ? 'midway' : 'apply'}-cancel`,
    data,
  });
};

export const DeleteMeeting = (id: number) => {
  return axiosInstance({
    method: 'DELETE',
    baseURL: API_V1_BASE_URL,
    url: `/meetings/${id}`,
  });
};

export type TopicListResult = {
  id: Topic['id'];
  topic: Topic['topic'];
}[];

export type MeetingIntroductionForHostResult = {
  id: Meeting['id'];
  name: Meeting['name'];
  introduction: Meeting['introduction'];
  topic: Meeting['topic'];
  hashtags: Meeting['hashtags'];
  meetingThumbnail: ImageType;
  meetingImages: Meeting['meetingImages'];
  meetingStatus: Meeting['recruitmentStatus'];
};

export const getMeetingIntroductionForHost = async (id: number) => {
  const res = await axiosInstance<
    APIResponse<MeetingIntroductionForHostResult>
  >({
    method: 'GET',
    url: `/meetings/${id}/mypage/introduction`,
    baseURL: API_V1_BASE_URL,
  });
  const data = res.data;
  return data.result;
};

export type MeetingDetailForHostResult = {
  selectionType: Meeting['selectionType'];
  meetingMode: Meeting['meetingMode'];
  recruitmentType: Meeting['recruitmentType'];
  minParticipants: Meeting['minParticipants'];
  maxParticipants: Meeting['maxParticipants'];
  recruitingEndTime: Meeting['recruitingEndTime'];
  paymentAmount: Meeting['paymentAmount'];
  info: Meeting['info'];
};

export const getMeetingDetailForHost = async (id: number) => {
  const res = await axiosInstance<APIResponse<MeetingDetailForHostResult>>({
    method: 'GET',
    url: `/meetings/${id}/mypage/detail`,
    baseURL: API_V1_BASE_URL,
  });
  const data = res.data;
  return data.result;
};

export type MeetingScheduleForHostResult = {
  meetingStartTime: MeetingSchedule['meetingStartTime'];
  meetingEndTime: MeetingSchedule['meetingEndTime'];
  address: MeetingSchedule['address'];
  addressDetail: MeetingSchedule['addressDetail'];
}[];

export const getMeetingScheduleForHost = async (id: number) => {
  const res = await axiosInstance<APIResponse<MeetingScheduleForHostResult>>({
    method: 'GET',
    url: `/meetings/${id}/mypage/schedules`,
    baseURL: API_V1_BASE_URL,
  });
  const data = res.data;
  return data.result;
};

export type MeetingParticipantsForHostResult = {
  participantCount: number;
  participants: {
    id: Participant['id'];
    name: Participant['name'];
    image: Participant['image'];
    authority: Participant['authority'];
    status: Participant['status'];
  }[];
};

export const getMeetingParticipantsForHost = async (id: number) => {
  const res = await axiosInstance<
    APIResponse<MeetingParticipantsForHostResult>
  >({
    method: 'GET',
    url: `/meetings/${id}/mypage/participants`,
    baseURL: API_V1_BASE_URL,
  });
  const data = res.data;
  return data.result;
};

export type MeetingApplicantsForHostResult = {
  applicantCount: number;
  applicants: {
    id: Participant['id'];
    name: Participant['name'];
    image: Participant['image'];
    status: Participant['status'];
  }[];
};

export const getMeetingApplicantsForHost = async (id: number) => {
  const res = await axiosInstance<APIResponse<MeetingApplicantsForHostResult>>({
    method: 'GET',
    url: `/meetings/${id}/mypage/applicants`,
    baseURL: API_V1_BASE_URL,
  });
  const data = res.data;
  return data.result;
};

export type MeetingAttendanceForHostResult = {
  attendanceStatus: MeetingAttendance[];
};

export const getMeetingAttendanceForHost = async (id: number) => {
  const res = await axiosInstance<APIResponse<MeetingAttendanceForHostResult>>({
    method: 'GET',
    url: `/meetings/${id}/mypage/attendance`,
    baseURL: API_V1_BASE_URL,
  });
  const data = res.data;
  return data.result;
};

export type MeetingHostDetailForHostResult = {
  hostDescription: Meeting['hostDescription'];
};

export const getMeetingHostDetailForHost = async (id: number) => {
  const res = await axiosInstance<APIResponse<MeetingHostDetailForHostResult>>({
    method: 'GET',
    url: `/meetings/${id}/mypage/host`,
    baseURL: API_V1_BASE_URL,
  });
  const data = res.data;
  return data.result;
};

export type JoinMeetingData = {
  reasonForJoining: string;
};

export type JoinMeetingResult = string;

export const joinMeeting = async (id: number, data: JoinMeetingData) => {
  const res = await axiosInstance<APIResponse<JoinMeetingResult>>({
    method: 'POST',
    url: `/meetings/${id}/join`,
    baseURL: API_V1_BASE_URL,
    data,
  });
  return res.data.result;
};

export type CancelMeetingData = {
  reasonType: string; // TODO: 이거 어떻게 되는지 확인해야함
  description: string;
};
