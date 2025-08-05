import { http, HttpResponse } from 'msw';

interface Banner {
  bannerId: number;
  bannerImg: string;
  bannerUrl: string;
}

interface Meeting {
  id: number;
  name: string;
  recruitmentStatus: string;
  recruitmentType: string;
  meetingStartTime: string;
  address: string;
  image: string;
  liked: boolean;
}

interface MeetingCategory {
  all: Meeting[];
  regular: Meeting[];
  small: Meeting[];
  [key: string]: Meeting[];
}

interface HomeContent {
  banners: Banner[];
  recByLikesMeetings: MeetingCategory;
  randomMeetings: MeetingCategory;
  latestMeetings: MeetingCategory;
}

interface MockHomeJson {
  home: HomeContent;
}

import homeMockData from '../mockHome.json';
const typedHomeMockData: MockHomeJson = homeMockData as MockHomeJson;

const homeHandlers = [
  // 배너 요청
  http.get('/api/web/v2/home/banners', () => {
    const filteredHomeData = homeMockData.home.banners;

    return HttpResponse.json({
      isSuccess: true,
      code: 1000,
      message: '요청에 성공하였습니다.',
      result: {
        banners: filteredHomeData,
      },
    });
  }),

  // 좋아요 기반 추천 리스트 GET 요청
  http.get('/api/web/v2/home/recommendation/likes', ({ request }) => {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const type = (searchParams.get('type') ?? 'all') as keyof MeetingCategory;

    const filteredHomeData = typedHomeMockData.home;
    const filteredRecByLikesMeetings: Meeting[] =
      filteredHomeData.recByLikesMeetings[type];

    return HttpResponse.json({
      isSuccess: true,
      code: 1000,
      message: '요청에 성공하였습니다.',
      result: {
        recByLikesMeetings: filteredRecByLikesMeetings,
      },
    });
  }),

  // 랜덤 추천 리스트 GET 요청
  http.get('/api/web/v2/home/recommendation/random', ({ request }) => {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const type = (searchParams.get('type') ?? 'all') as keyof MeetingCategory;

    const filteredHomeData = typedHomeMockData.home;
    const filteredRandomMeetings: Meeting[] =
      filteredHomeData.randomMeetings[type];

    return HttpResponse.json({
      isSuccess: true,
      code: 1000,
      message: '요청에 성공하였습니다.',
      result: {
        randomMeetings: filteredRandomMeetings,
      },
    });
  }),

  // 최신 등록 모임 리스트 GET 요청
  http.get('/api/web/v2/home/recommendation/recent', ({ request }) => {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const type = (searchParams.get('type') ?? 'all') as keyof MeetingCategory;

    const filteredHomeData = typedHomeMockData.home;
    const filteredLatestMeetings: Meeting[] =
      filteredHomeData.latestMeetings[type];

    return HttpResponse.json({
      isSuccess: true,
      code: 1000,
      message: '요청에 성공하였습니다.',
      result: {
        latestMeetings: filteredLatestMeetings,
      },
    });
  }),
];

export default homeHandlers;
