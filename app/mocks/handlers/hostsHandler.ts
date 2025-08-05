import { http, HttpResponse } from 'msw';
import hostMockData from '../mockHosts.json';

const hostsHandlers = [
  http.get('/api/web/v2/host/:hostId', ({ params }) => {
    const { hostId } = params;
    const id = parseInt(hostId as string, 10);

    const hostDetail = hostMockData.hosts.find((host) => host.id === id);

    return HttpResponse.json({
      isSuccess: true,
      code: 1000,
      message: '요청에 성공하였습니다.',
      result: {
        ...hostDetail,
      },
    });
  }),
];

export default hostsHandlers;
