import { http, HttpResponse } from 'msw';

import usersMockData from '../mockUsers.json';

const userHandlers = [
  // 유저 참여 모임 리스트 GET 요청
  http.get('/api/web/v2/users/participation-meetings', ({ request }) => {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    // 필요한 queryParam을 추출
    const status = searchParams.get('status') ?? 'participating';
    const page = parseInt(searchParams.get('page') || '1');
    const size = parseInt(searchParams.get('size') || '9');

    // 필터링
    let filteredUsersParticipatedMeetings = usersMockData.participatedMeetings;
    filteredUsersParticipatedMeetings =
      filteredUsersParticipatedMeetings.filter((m) => m.status === status);

    const paginatedUsersParticipatedMeetings =
      filteredUsersParticipatedMeetings.slice((page - 1) * size, size * page);

    return HttpResponse.json({
      isSuccess: true,
      code: 1000,
      message: '요청에 성공하였습니다.',
      result: {
        nickname: '비빔 관리자',
        profileImage:
          'https://i.pinimg.com/736x/83/1a/0b/831a0b369f389fdd93d072203287043e.jpg',
        pageInfo: {
          page: page,
          size: size,
          totalElements: filteredUsersParticipatedMeetings.length,
          totalPages: Math.ceil(
            filteredUsersParticipatedMeetings.length / size,
          ),
          hasNext:
            page < Math.ceil(filteredUsersParticipatedMeetings.length / size),
        },
        meetings: paginatedUsersParticipatedMeetings,
      },
    });
  }),

  // 유저 신청 모임 리스트 GET 요청
  http.get('/api/web/v1/mypage/meetings/applications', ({ request }) => {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    // 필요한 queryParam을 추출
    const status = searchParams.get('status') ?? 'pending';
    const page = parseInt(searchParams.get('page') || '1');
    const size = parseInt(searchParams.get('size') || '9');

    // 필터링
    let filteredUserRequestMeetings = usersMockData.requestMeetings;
    filteredUserRequestMeetings = filteredUserRequestMeetings.filter(
      (m) => m.status === status,
    );

    const paginatedUserRequestMeetings = filteredUserRequestMeetings.slice(
      (page - 1) * size,
      size * page,
    );

    return HttpResponse.json({
      isSuccess: true,
      code: 1000,
      message: '요청에 성공하였습니다.',
      result: {
        status: status,
        pageInfo: {
          page: page,
          size: size,
          totalElements: filteredUserRequestMeetings.length,
          totalPages: Math.ceil(filteredUserRequestMeetings.length / size),
          hasNext: page < Math.ceil(filteredUserRequestMeetings.length / size),
        },
        meetings: paginatedUserRequestMeetings,
      },
    });
  }),

  // 유저가 개설한 모임 리스트 GET 요청
  http.get('/api/web/v2/users/opening-meetings', ({ request }) => {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    // 필요한 queryParam을 추출
    const type = searchParams.get('type') ?? 'regular';
    const page = parseInt(searchParams.get('page') || '1');
    const size = parseInt(searchParams.get('size') || '9');

    // 필터링
    let filteredUserOpeningMeetings = usersMockData.openingMeetings;
    filteredUserOpeningMeetings = filteredUserOpeningMeetings.filter(
      (m) => m.recruitmentTypeEng === type,
    );

    const paginatedUserOpeningMeetings = filteredUserOpeningMeetings.slice(
      (page - 1) * size,
      size * page,
    );

    return HttpResponse.json({
      isSuccess: true,
      code: 1000,
      message: '요청에 성공하였습니다.',
      result: {
        nickname: '비빔 관리자',
        profileImage:
          'https://i.pinimg.com/736x/83/1a/0b/831a0b369f389fdd93d072203287043e.jpg',
        pageInfo: {
          page: page,
          size: size,
          totalElements: filteredUserOpeningMeetings.length,
          totalPages: Math.ceil(filteredUserOpeningMeetings.length / size),
          hasNext: page < Math.ceil(filteredUserOpeningMeetings.length / size),
        },
        meetings: paginatedUserOpeningMeetings,
      },
    });
  }),

  // 유저가 개설한 모임 상세 정보 GET 요청
  http.get('/api/web/v1/meetings/:meetingId/mypage', ({ params }) => {
    const { meetingId } = params;
    const id = parseInt(meetingId as string, 10);

    const openingMeetingDetail = usersMockData.openingMeetingDetail.find(
      (m) => m.id === id,
    );

    if (!openingMeetingDetail) {
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 4004,
          message: `ID ${id}번 모임을 찾을 수 없습니다.`,
        },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      isSuccess: true,
      code: 1000,
      message: '요청에 성공하였습니다.',
      result: openingMeetingDetail,
    });
  }),
];

export default userHandlers;
