import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useModalStore } from '@/stores/useModalStore';
import usePagination from '@/hooks/ui/usePagination';
import {
  getParticipationMeetingList,
  type MyPageMeetingResult,
} from '@/api/mypage';

import type { MyParticipatedMeetingFilters } from '@/schemas/userFilters';
import GridGroup from './gridGroup/GridGroup';
import MeetingCard from './MeetingCard';
import MoreDropdownMenu from './MoreDropdownMenu';
import { DropdownMenuItem } from '../atoms/dropdown-menu/DropdownMenu';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../atoms/pagination/Pagination';
import toast from 'react-hot-toast';

interface ParticipatedMeetingWrapProps {
  filters: MyParticipatedMeetingFilters;
}

export default function ParticipatedMeetingWrap({
  filters,
}: ParticipatedMeetingWrapProps) {
  const navigate = useNavigate();
  const { open } = useModalStore();

  const { data: participatedMeetings } = useQuery({
    queryKey: ['participatedMeetings', filters],
    queryFn: () => getParticipationMeetingList(filters),
  });

  const pagination = usePagination({
    currentPage: filters.page,
    totalPages: participatedMeetings?.pageInfo?.totalPages || 1,
  });

  const handleUpdatePage = useCallback(
    (page: number) => {
      const currentFilters: MyParticipatedMeetingFilters = filters;
      const updatedFilters = { ...currentFilters, page: page };
      const newSearchParams = new URLSearchParams();

      for (const [key, value] of Object.entries(updatedFilters)) {
        if (value !== undefined && value !== null) {
          newSearchParams.set(key, value.toString());
        }
      }

      return newSearchParams.toString();
    },
    [filters],
  );

  return (
    <>
      <GridGroup columns={3} gap={5}>
        {participatedMeetings?.meetings?.map((meeting: MyPageMeetingResult) => (
          <MeetingCard
            key={meeting.id}
            image={meeting.thumbnailImage}
            recruitmentType={meeting.recruitmentType}
            userStatus={meeting.userStatus}
            name={meeting.name}
            meetingStartTime={meeting.meetingStartTime}
            address={meeting.address}
            onClick={() => navigate(`/meeting/${meeting.id}`)}
            isLikeBtn={false}
          >
            {filters.status === 'participating' &&
              meeting.userStatus !== '중도이탈신청중' && (
                <MoreDropdownMenu btnPosition="right-0 top-0 absolute">
                  <DropdownMenuItem
                    onSelect={() =>
                      open('CONFIRM_DIALOG', {
                        title: '참여 중인 모임을 중도 이탈할까요?',
                        handleClickCancel: () =>
                          toast('모임 중도 이탈 신청을 취소하였습니다.'),
                        handleClickAction: (
                          e: React.MouseEvent<HTMLButtonElement>,
                        ) => {
                          e.preventDefault();
                          open('CANCEL_MEETING_MODAL', {
                            meetingId: meeting.id,
                            statusType: filters.status,
                          });
                        },
                      })
                    }
                  >
                    모임 중도 이탈하기
                  </DropdownMenuItem>
                </MoreDropdownMenu>
              )}
          </MeetingCard>
        ))}
      </GridGroup>

      <Pagination className="mt-20">
        <PaginationContent>
          {pagination.hasPreviousPage && (
            <PaginationPrevious
              to={{
                search: handleUpdatePage(Number(pagination.currentPage) - 1),
              }}
            />
          )}
          {pagination.pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === Number(pagination.currentPage)}
                to={{
                  search: handleUpdatePage(page),
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          {pagination.hasNextPage && (
            <PaginationNext
              to={{
                search: handleUpdatePage(Number(pagination.currentPage) + 1),
              }}
            />
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
}
