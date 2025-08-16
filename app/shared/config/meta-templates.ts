import type { MetaDescriptor } from 'react-router';

// 템플릿 함수의 타입을 정의하는 유틸리티 타입
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TemplateFunction = (...args: any[]) => MetaDescriptor[];

// templates 객체의 타입 정의
type TemplatesType = Record<string, TemplateFunction>;

export const metaTemplates = {
  root: () => {
    return [
      { title: 'BE:BEAM 모임 커뮤니티' },
      {
        name: 'description',
        content: 'BE:BEAM 모임 커뮤니티에 오신 것을 환영합니다.',
      },
    ];
  },

  // 메인 페이지
  home: ({ title }: { title?: string } = {}) => {
    return [
      { title: title || 'BE:BEAM 모임 커뮤니티' },
      {
        name: 'description',
        content:
          '지역 기반 모임 플랫폼 비빔에서 다양한 모임을 발견하고 참여해보세요. 취미, 스터디, 소셜 다이닝 등 원하는 모임을 쉽게 찾을 수 있습니다.',
      },
    ];
  },

  // 로그인 페이지
  login: () => {
    return [
      { title: '로그인 | 비빔' },
      {
        name: 'description',
        content: '비빔에 로그인하여 다양한 모임에 참여해보세요.',
      },
    ];
  },

  // 전체 검색 페이지
  search: ({ query }: { query?: string } = {}) => {
    return [
      { title: query ? `'${query}' 검색 결과 | 비빔` : '검색 | 비빔' },
      {
        name: 'description',
        content: '원하는 모임, 가이드북, 호스트를 검색해보세요.',
      },
    ];
  },

  // 모임 관련 페이지
  meetings: ({ filter }: { filter?: string } = {}) => {
    return [
      { title: '모임 찾기 | 비빔' },
      {
        name: 'description',
        content: filter
          ? `${filter} 모임을 찾아보세요. 정기모임, 소모임 등 원하는 형태의 모임에 참여할 수 있습니다.`
          : '다양한 토픽의 모임을 찾아보세요. 정기모임, 소모임 등 원하는 형태의 모임에 참여할 수 있습니다.',
      },
    ];
  },

  meetingDetail: ({
    meetingTitle,
    meetingDescription,
  }: { meetingTitle?: string; meetingDescription?: string } = {}) => {
    return [
      { title: meetingTitle ? `${meetingTitle} | 비빔` : '모임 상세 | 비빔' },
      {
        name: 'description',
        content:
          meetingDescription || '모임의 상세 정보와 참여자 후기를 확인하세요.',
      },
    ];
  },

  // 리뷰 관련 페이지
  reviews: () => {
    return [
      { title: '모임 후기 | 비빔' },
      {
        name: 'description',
        content:
          '다른 사용자들이 작성한 모임 후기를 확인하고 모임 선택에 도움을 받아보세요.',
      },
    ];
  },

  // 가이드북 관련 페이지
  guideBooks: () => {
    return [
      { title: '가이드북 | 비빔' },
      {
        name: 'description',
        content: '모임 운영에 도움이 되는 다양한 가이드북을 확인해보세요.',
      },
    ];
  },

  guideBookDetail: ({
    guideBookTitle,
    guideBookDescription,
  }: { guideBookTitle?: string; guideBookDescription?: string } = {}) => {
    return [
      {
        title: guideBookTitle
          ? `${guideBookTitle} | 가이드북`
          : '가이드북 상세 | 비빔',
      },
      {
        name: 'description',
        content:
          guideBookDescription ||
          '가이드북의 상세 정보를 확인하고 다운로드하세요.',
      },
    ];
  },

  hostDetail: ({
    hostName,
    hostIntroduction,
  }: { hostName?: string; hostIntroduction?: string } = {}) => {
    return [
      {
        title: hostName
          ? `${hostName} | 호스트 프로필`
          : '호스트 프로필 | 비빔',
      },
      {
        name: 'description',
        content:
          hostIntroduction ||
          '호스트의 프로필과 운영하는 모임 정보를 확인하세요.',
      },
    ];
  },

  // 모임 생성 페이지
  createMeeting: () => {
    return [
      { title: '모임 생성 | 비빔' },
      {
        name: 'description',
        content: '내가 원하는 모임을 생성하세요.',
      },
    ];
  },

  // 마이페이지 관련
  myProfile: () => {
    return [
      { title: '프로필 수정 | 마이페이지' },
      {
        name: 'description',
        content: '나의 프로필 정보를 수정하고 관리하세요.',
      },
    ];
  },

  myInformation: () => {
    return [
      { title: '개인정보 수정 | 마이페이지' },
      {
        name: 'description',
        content: '개인정보를 안전하게 수정하고 관리하세요.',
      },
    ];
  },

  myFollowing: () => {
    return [
      { title: '팔로잉 리스트 | 마이페이지' },
      {
        name: 'description',
        content: '내가 팔로잉하는 호스트들을 확인하세요.',
      },
    ];
  },

  myNotifications: () => {
    return [
      { title: '나의 알림 | 마이페이지' },
      {
        name: 'description',
        content: '좋아요한 모임의 새소식과 알림을 확인하세요.',
      },
    ];
  },

  likes: () => {
    return [
      { title: '찜리스트 | 마이페이지' },
      {
        name: 'description',
        content: '내가 찜한 모임과 후기를 한눈에 확인하세요.',
      },
    ];
  },

  // 모임 참여/관리 관련
  participatedMeeting: () => {
    return [
      { title: '참여 모임 | 마이페이지' },
      {
        name: 'description',
        content: '내가 참여 중인 모임을 한눈에 확인하세요.',
      },
    ];
  },

  createdMeeting: () => {
    return [
      { title: '내가 개설한 모임 | 마이페이지' },
      {
        name: 'description',
        content: '내가 개설한 모임을 관리하고 확인하세요.',
      },
    ];
  },

  requestedMeeting: () => {
    return [
      { title: '신청 모임 | 마이페이지' },
      {
        name: 'description',
        content: '내가 신청한 모임의 승인 상태를 확인하세요.',
      },
    ];
  },

  // 모임 관리 상세 페이지
  createdMeetingDetailManage: ({
    meetingTitle,
  }: { meetingTitle?: string } = {}) => {
    return [
      {
        title: meetingTitle
          ? `${meetingTitle} 관리 | 마이페이지`
          : '모임 관리 | 마이페이지',
      },
      {
        name: 'description',
        content: '개설한 모임을 효율적으로 관리하세요.',
      },
    ];
  },

  createdMeetingDetailDetail: ({
    meetingTitle,
  }: { meetingTitle?: string } = {}) => {
    return [
      {
        title: meetingTitle
          ? `${meetingTitle} 상세 정보 | 마이페이지`
          : '모임 상세 정보 | 마이페이지',
      },
      {
        name: 'description',
        content: '개설한 모임의 상세 정보를 확인하세요.',
      },
    ];
  },

  createdMeetingDetailIntro: ({
    meetingTitle,
  }: { meetingTitle?: string } = {}) => {
    return [
      {
        title: meetingTitle
          ? `${meetingTitle} 소개 수정 | 마이페이지`
          : '모임 소개 수정 | 마이페이지',
      },
      {
        name: 'description',
        content: '개설한 모임의 소개 정보를 수정하세요.',
      },
    ];
  },

  // 좋아요/리뷰 관련
  reviewLikes: () => {
    return [
      { title: '좋아요한 후기 | 마이페이지' },
      {
        name: 'description',
        content: '좋아요 표시한 후기들을 확인하세요.',
      },
    ];
  },

  regularMeetingLikes: () => {
    return [
      { title: '좋아요한 정기모임 | 마이페이지' },
      {
        name: 'description',
        content: '좋아요 표시한 정기모임들을 확인하세요.',
      },
    ];
  },

  smallMeetingLikes: () => {
    return [
      { title: '좋아요한 소모임 | 마이페이지' },
      {
        name: 'description',
        content: '좋아요 표시한 소모임들을 확인하세요.',
      },
    ];
  },

  reviewableReviews: () => {
    return [
      { title: '후기 작성 가능한 모임 | 마이페이지' },
      {
        name: 'description',
        content: '참여 완료한 모임의 후기를 작성해보세요.',
      },
    ];
  },

  writtenReviews: () => {
    return [
      { title: '내가 작성한 후기 | 마이페이지' },
      {
        name: 'description',
        content: '내가 작성한 모임 후기를 확인하고 관리하세요.',
      },
    ];
  },

  // 콜백 페이지
  loginCallback: () => {
    return [
      { title: '로그인 처리 중... | 비빔' },
      {
        name: 'description',
        content: '로그인을 처리하고 있습니다. 잠시만 기다려주세요.',
      },
    ];
  },
} as const satisfies TemplatesType;
