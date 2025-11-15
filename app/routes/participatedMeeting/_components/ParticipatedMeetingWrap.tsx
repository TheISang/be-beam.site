import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useModalStore } from '@/shared/stores/useModalStore';
import usePagination from '@/shared/hooks/usePagination';
import { participatedMeetingsQueryOptions } from '@/features/meetings/hooks/useParticipatedMeetingsQuery';
import type { MyParticipatedMeetingFilters } from '@/features/mypage/schemas/userFilters';
import MoreDropdownMenu from '../../../shared/components/common/MoreDropdownMenu';
import { DropdownMenuItem } from '../../../shared/components/ui/DropdownMenu';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../../shared/components/ui/Pagination';
import toast from 'react-hot-toast';
import MeetingCardWithAddress from '@/features/meetings/components/MeetingCardWithAddress';

interface ParticipatedMeetingWrapProps {
  filters: MyParticipatedMeetingFilters;
}

export default function ParticipatedMeetingWrap({
  filters,
}: ParticipatedMeetingWrapProps) {
  const navigate = useNavigate();
  const { open } = useModalStore();

  const { data: participatedMeetings } = useQuery(
    participatedMeetingsQueryOptions(filters),
  );

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
      <div className="mx-auto grid w-full grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 md:gap-5">
        {participatedMeetings?.meetings?.map((meeting) => (
          <MeetingCardWithAddress
            key={meeting.id}
            id={meeting.id}
            thumbnailImage={meeting.thumbnailImage}
            recruitmentType={meeting.recruitmentType}
            recruitmentStatus={meeting.recruitmentStatus}
            userStatus={meeting.userStatus}
            name={meeting.name}
            meetingStartTime={meeting.meetingStartTime}
            address={meeting.address}
            onClick={() => navigate(`/meeting/${meeting.id}`)}
          >
            {filters.status === 'participating' &&
              meeting.userStatus !== '중도이탈신청중' && (
                <MoreDropdownMenu btnPosition="right-0 top-0 absolute bg-transparent">
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
          </MeetingCardWithAddress>
        ))}
      </div>

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
