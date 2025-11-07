import MeetingCardWithAddress from '@/features/meetings/components/MeetingCardWithAddress';
import useLikeMeetingMutation from '@/features/meetings/hooks/useLikeMeetingMutation';
import useSearchTotalQuery from '@/features/search/hooks/useSearchTotalQuery';
import HostCard from '@/features/users/components/HostCard';
import useUserSession from '@/features/users/hooks/useUserSession';
import ArrowRightIcon from '@/shared/components/icons/ArrowRightIcon';
import Text from '@/shared/components/ui/Text';
import { Link, useNavigate, useSearchParams } from 'react-router';

export default function AllSearchResults({ query }: { query: string }) {
  const [, setSearchParams] = useSearchParams();
  const { data } = useSearchTotalQuery({ search: query });
  const { mutate: likeMeeting, isPending } = useLikeMeetingMutation();
  const { user } = useUserSession();
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-h2">모임</h2>
            <span className="text-b2">{data?.meetingsCount || 0}건</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              className="text-t3 text-gray-600"
              onClick={() =>
                setSearchParams((searchParams) => {
                  searchParams.set('tab', 'meeting');
                  return searchParams;
                })
              }
            >
              전체보기
            </button>
            <ArrowRightIcon className="size-6 text-gray-600" />
          </div>
        </div>
        {data?.meetings.length ? (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {data?.meetings.map((meeting) => (
              <MeetingCardWithAddress
                key={meeting.id}
                id={meeting.id}
                thumbnailImage={meeting.image}
                name={meeting.name}
                meetingStartTime={meeting.meetingStartTime}
                recruitmentType={meeting.recruitmentType}
                recruitmentStatus={meeting.recruitmentStatus}
                address={meeting.address}
                liked={meeting.liked}
                onClick={() => navigate(`/meeting/${meeting.id}`)}
                onLikeClick={() => {
                  if (!user) return alert('로그인 후 이용해주세요.');
                  if (isPending) return;
                  if (meeting) {
                    likeMeeting(meeting as { id: number; liked: boolean });
                  }
                }}
              />
            ))}
          </div>
        ) : (
          <div className="mt-6 flex h-[200px] items-center justify-center">
            <p className="text-t3 text-gray-600">모임이 없습니다.</p>
          </div>
        )}
      </div>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-h2">가이드북</h2>
            <span className="text-b2">{data?.guidebooksCount || 0}건</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              className="text-t3 text-gray-600"
              onClick={() =>
                setSearchParams((searchParams) => {
                  searchParams.set('tab', 'guide');
                  return searchParams;
                })
              }
            >
              전체보기
            </button>
            <ArrowRightIcon className="size-6 text-gray-600" />
          </div>
        </div>
        {data?.guidebooks.length ? (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {data?.guidebooks.map((guidebook) => (
              <Link
                className="w-full cursor-pointer overflow-hidden rounded-3xl border-1 border-gray-300"
                key={guidebook.id}
                to={`/guideBook/${guidebook.id}`}
              >
                <img
                  className="h-[240px] w-full object-cover"
                  src={guidebook.thumbnailImage}
                  alt="guidBook_thumbnail"
                />
                <div className="box-border w-full border-t-1 border-gray-300 px-7 py-8">
                  <Text variant="T2_Semibold" className="truncate">
                    {guidebook.title}
                  </Text>
                  <Text
                    variant="T4_Regular"
                    color="gray-700"
                    className="mt-3 truncate"
                  >
                    {guidebook.description}
                  </Text>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-6 flex h-[200px] items-center justify-center">
            <p className="text-t3 text-gray-600">가이드북이 없습니다.</p>
          </div>
        )}
      </div>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-h2">호스트</h2>
            <span className="text-b2">{data?.hostsCount || 0}건</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              className="text-t3 text-gray-600"
              onClick={() =>
                setSearchParams((searchParams) => {
                  searchParams.set('tab', 'host');
                  return searchParams;
                })
              }
            >
              전체보기
            </button>
            <ArrowRightIcon className="size-6 text-gray-600" />
          </div>
        </div>
        {data?.hosts.length ? (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {data?.hosts.map((host) => <HostCard key={host.id} host={host} />)}
          </div>
        ) : (
          <div className="mt-6 flex h-[200px] items-center justify-center">
            <p className="text-t3 text-gray-600">호스트가 없습니다.</p>
          </div>
        )}
      </div>
    </>
  );
}
