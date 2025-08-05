import { http, HttpResponse } from 'msw';

import meetingsMockData from '../mockMeetings.json';

const meetingHandlers = [
  // 모임 리스트 GET 요청
  http.get('/api/web/v2/meetings', ({ request }) => {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    // 필요한 queryParam을 추출
    const search = searchParams.get('search') ?? '';
    const topic = searchParams.get('topic') ?? 'all';
    const recruitmentType = searchParams.get('recruitment-type') ?? 'all';
    const recruitmentStatus = searchParams.get('recruitment-status') ?? 'all';
    const mode = searchParams.get('mode') ?? 'all';
    const cost = searchParams.get('cost') ?? 'all';
    const sort = searchParams.get('sort') ?? 'recent';
    const cursor = parseInt(searchParams.get('cursor') || '0');
    const size = parseInt(searchParams.get('size') || '12');

    // 필터링
    let filteredMeetings = meetingsMockData.meetings;

    if (search) {
      filteredMeetings = filteredMeetings.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (topic !== 'all') {
      filteredMeetings = filteredMeetings.filter((m) => m.topic === topic);
    }

    if (recruitmentType !== 'all') {
      filteredMeetings = filteredMeetings.filter(
        (m) => m.meetingType[1] === recruitmentType,
      );
    }

    if (recruitmentStatus !== 'all') {
      filteredMeetings = filteredMeetings.filter(
        (m) => m.recruitmentType[1] === recruitmentStatus,
      );
    }

    if (mode !== 'all') {
      filteredMeetings = filteredMeetings.filter((m) => m.mode === mode);
    }

    if (cost !== 'all') {
      filteredMeetings = filteredMeetings.filter((m) => m.cost[0] === cost);
    }

    // 정렬
    if (sort === 'recent') {
      filteredMeetings = filteredMeetings.sort((a, b) => b.edit - a.edit);
    } else if (sort === 'likes') {
      filteredMeetings = filteredMeetings.sort((a, b) => b.like - a.like);
    }

    const paginatedMeetings = filteredMeetings.slice(cursor, cursor + size);

    return HttpResponse.json({
      isSuccess: true,
      code: 1000,
      message: '요청에 성공하였습니다.',
      result: {
        pageInfo: {
          nextCursor: cursor + size,
          size,
          hasNext: cursor + size < filteredMeetings.length,
        },
        meetings: paginatedMeetings,
      },
    });
  }),

  // 모임 상세페이지 GET 요청
  http.get('/api/web/v2/meetings/:meetingId', ({ params }) => {
    const { meetingId } = params;
    const id = parseInt(meetingId as string, 10);

    const meetingDetail = meetingsMockData.meetingDetail.find(
      (m) => m.id === id,
    );

    if (!meetingDetail) {
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
      result: meetingDetail,
    });
  }),

  // 모임 후기 GET 요청
  http.get('/api/web/v2/meetings/:meetingId/reviews', ({ request, params }) => {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const { meetingId } = params;
    const id = parseInt(meetingId as string, 10);

    const meetingreviews = meetingsMockData.reviews.filter(
      (m) => m.meetingId === id,
    );

    // 필요한 queryParam을 추출
    const sort = searchParams.get('sort') ?? 'recent';
    const type = searchParams.get('type') ?? 'text';
    const rating = searchParams.get('rating') ?? 'all';
    const recruitmentType = searchParams.get('recruitment-type') ?? 'all';
    const cursor = parseInt(searchParams.get('cursor') || '0');
    const size = parseInt(searchParams.get('size') || '12');

    // 필터링
    let filteredMeetingReviews = meetingreviews;

    if (recruitmentType !== 'all') {
      filteredMeetingReviews = filteredMeetingReviews.filter(
        (m) => m.recruitmentType === recruitmentType,
      );
    }

    if (type !== 'text') {
      filteredMeetingReviews = filteredMeetingReviews.filter(
        (m) => m.images.length > 0,
      );
    }

    if (rating !== 'all') {
      const numRating = parseInt(rating, 10);
      filteredMeetingReviews = filteredMeetingReviews.filter(
        (m) => m.rating === numRating,
      );
    }

    // 정렬
    if (sort === 'recent') {
      filteredMeetingReviews = filteredMeetingReviews.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    } else if (sort === 'likes') {
      filteredMeetingReviews = filteredMeetingReviews.sort(
        (a, b) => b.likesCount - a.likesCount,
      );
    }

    const paginatedMeetingReviews = filteredMeetingReviews.slice(
      cursor,
      cursor + size,
    );

    return HttpResponse.json({
      isSuccess: true,
      code: 1000,
      message: '요청에 성공하였습니다.',
      result: {
        pageInfo: {
          nextCursor: cursor + size,
          size,
          hasNext: cursor + size < filteredMeetingReviews.length,
        },
        reviews: paginatedMeetingReviews,
      },
    });
  }),
];

export default meetingHandlers;
