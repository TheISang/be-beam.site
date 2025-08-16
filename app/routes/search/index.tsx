import ArrowRightIcon from '@/shared/components/icons/ArrowRightIcon';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/Tabs';
import Text from '@/shared/components/ui/Text';
import HostCard from '@/features/users/components/HostCard';
import MeetingCard from '@/features/meetings/components/MeetingCard';
import useSearchGuidebooksQuery from '@/features/search/hooks/useSearchGuidebooksQuery';
import useSearchHostsQuery from '@/features/search/hooks/useSearchHostsQuery';
import useSearchMeetingsQuery from '@/features/search/hooks/useSearchMeetingsQuery';
import useSearchTotalQuery from '@/features/search/hooks/useSearchTotalQuery';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { metaTemplates } from '@/shared/config/meta-templates';
import useLikeMeetingMutation from '@/features/meetings/hooks/useLikeMeetingMutation';
import useUserSession from '@/features/users/hooks/useUserSession';
import type { Route } from '.react-router/types/app/routes/search/+types';

export function meta({ data }: Route.MetaArgs) {
  return metaTemplates.search({ query: data?.query || undefined });
}

export function loader(args: Route.LoaderArgs) {
  const searchParams = new URL(args.request.url).searchParams;
  const query = searchParams.get('q');
  return {
    query: query || undefined,
  };
}

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const tab = searchParams.get('tab') || 'all';
  return (
    <div className="mx-auto w-full pt-25 pb-16">
      <Tabs
        defaultValue={tab}
        value={tab}
        onValueChange={(value) =>
          setSearchParams((searchParams) => {
            searchParams.set('tab', value);
            return searchParams;
          })
        }
      >
        <div className="mx-auto flex w-full justify-center bg-gray-100">
          <TabsList className="w-full max-w-[1480px]">
            <TabsTrigger value="all">통합 검색</TabsTrigger>
            <TabsTrigger value="meeting">모임</TabsTrigger>
            <TabsTrigger value="guide">가이드북</TabsTrigger>
            <TabsTrigger value="host">호스트</TabsTrigger>
          </TabsList>
        </div>
        <div className="mx-auto flex w-full max-w-[1480px] justify-center">
          <TabsContent value="all" className="mt-20 flex flex-col gap-20">
            <AllSearchResults query={query} />
          </TabsContent>
          <TabsContent value="meeting" className="mt-20 flex flex-col gap-20">
            <MeetingSearchResults query={query} />
          </TabsContent>
          <TabsContent value="guide" className="mt-20 flex flex-col gap-20">
            <GuidebookSearchResults query={query} />
          </TabsContent>
          <TabsContent value="host" className="mt-20 flex flex-col gap-20">
            <HostsSearchResults query={query} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

function AllSearchResults({ query }: { query: string }) {
  const [, setSearchParams] = useSearchParams();
  const { data } = useSearchTotalQuery({ search: query });
  const { mutate: likeMeeting, isPending } = useLikeMeetingMutation('meetings');
  const { user } = useUserSession();
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-h2">모임</h2>
            <span className="text-b2">N건</span>
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
          <div className="mt-6 grid grid-cols-4 gap-5">
            {data?.meetings.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                image={meeting.image}
                name={meeting.name}
                meetingStartTime={meeting.meetingStartTime}
                recruitmentType={meeting.recruitmentType}
                recruitmentStatus={meeting.recruitmentStatus}
                address={meeting.address}
                liked={meeting.liked}
                isLikeBtn={user ? true : false}
                onClick={() => navigate(`/meeting/${meeting.id}`)}
                onLikeClick={() => {
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
            <span className="text-b2">N건</span>
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
          <div className="mt-6 grid grid-cols-4 gap-5">
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
            <span className="text-b2">N건</span>
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
          <div className="mt-6 grid grid-cols-4 gap-5">
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

function MeetingSearchResults({ query }: { query: string }) {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchMeetingsQuery({ search: query, size: 20 });

  const allMeetings = data?.pages.flatMap((page) => page.meetings) || [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <div>
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-h2">모임</h2>
          <span className="text-b2">N건</span>
        </div>
      </div>
      {allMeetings.length ? (
        <div className="mt-6 grid grid-cols-4 gap-5">
          {allMeetings?.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              image={meeting.image}
              recruitmentType={meeting.recruitmentType}
              recruitmentStatus={meeting.recruitmentStatus}
              name={meeting.name}
              meetingStartTime={meeting.meetingStartTime}
              address={meeting.address}
              onClick={() => {}}
            />
          ))}
          {allMeetings?.length > 0 && (
            <div ref={ref}>
              {isFetchingNextPage && <p>더 많은 모임을 가져오는 중</p>}
            </div>
          )}
        </div>
      ) : (
        <div className="mt-6 flex h-[200px] items-center justify-center">
          <p className="text-t3 text-gray-600">모임이 없습니다.</p>
        </div>
      )}
    </div>
  );
}

function GuidebookSearchResults({ query }: { query: string }) {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchGuidebooksQuery({ search: query, size: 20 });

  const allGuidebooks = data?.pages.flatMap((page) => page.guidebooks) || [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <div>
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-h2">가이드북</h2>
          <span className="text-b2">N건</span>
        </div>
      </div>
      {allGuidebooks.length ? (
        <div className="mt-6 grid grid-cols-4 gap-5">
          {allGuidebooks?.map((guidebook) => (
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
          {allGuidebooks?.length > 0 && (
            <div ref={ref}>
              {isFetchingNextPage && <p>더 많은 가이드북을 가져오는 중</p>}
            </div>
          )}
        </div>
      ) : (
        <div className="mt-6 flex h-[200px] items-center justify-center">
          <p className="text-t3 text-gray-600">가이드북이 없습니다.</p>
        </div>
      )}
    </div>
  );
}

function HostsSearchResults({ query }: { query: string }) {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchHostsQuery({ search: query, size: 20 });

  const allHosts = data?.pages.flatMap((page) => page.hosts) || [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <div>
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-h2">호스트</h2>
          <span className="text-b2">N건</span>
        </div>
      </div>
      {allHosts.length ? (
        <div className="mt-6 grid grid-cols-4 gap-5">
          {allHosts?.map((host) => <HostCard key={host.id} host={host} />)}
          {allHosts?.length > 0 && (
            <div ref={ref}>
              {isFetchingNextPage && <p>더 많은 호스트를 가져오는 중</p>}
            </div>
          )}
        </div>
      ) : (
        <div className="mt-6 flex h-[200px] items-center justify-center">
          <p className="text-t3 text-gray-600">호스트가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
