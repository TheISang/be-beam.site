import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import useAppliedMeetingsQuery from '@/features/meetings/hooks/useAppliedMeetingsQuery';
import usePagination from '@/shared/hooks/usePagination';

import type { MyAppliedMeetingFilters } from '@/features/mypage/schemas/userFilters';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../../shared/components/ui/Pagination';
import MeetingCardWithAddress from '@/features/meetings/components/MeetingCardWithAddress';

interface RequestedMeetingWrapProps {
  filters: MyAppliedMeetingFilters;
}

export default function RequestedMeetingWrap({
  filters,
}: RequestedMeetingWrapProps) {
  const navigate = useNavigate();

  const { data: requestMeetings } = useAppliedMeetingsQuery(filters);

  const pagination = usePagination({
    currentPage: filters.page,
    totalPages: requestMeetings?.pageInfo?.totalPages || 1,
  });

  const handleUpdatePage = useCallback(
    (page: number) => {
      const currentFilters: MyAppliedMeetingFilters = filters;
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
        {requestMeetings?.meetings?.map((meeting) => (
          <MeetingCardWithAddress
            key={meeting.id}
            id={meeting.id}
            thumbnailImage={meeting.thumbnailImage}
            recruitmentStatus={meeting.recruitmentStatus}
            recruitmentType={meeting.recruitmentType}
            userStatus={meeting.userStatus}
            name={meeting.name}
            meetingStartTime={meeting.meetingStartTime}
            address={meeting.address}
            onClick={() => navigate(`/meeting/${meeting.id}`)}
          >
            {/* TODO: requestMeetings?.status 값이 무엇인지 모르겠음 */}
            {/* {requestMeetings?.status !== 'rejected' &&
              meeting.userStatus !== '신청취소중' && (
                <MoreDropdownMenu btnPosition="right-0 top-0 absolute bg-transparent">
                  <DropdownMenuItem
                    onSelect={() =>
                      open('CONFIRM_DIALOG', {
                        title: '신청 중인 모임을 취소할까요?',
                        handleClickCancel: () =>
                          toast('모임 취소 신청을 취소하였습니다.'),
                        handleClickAction: (
                          e: React.MouseEvent<HTMLButtonElement>,
                        ) => {
                          e.preventDefault();
                          open('CANCEL_MEETING_MODAL', {
                            meetingId: meeting.id,
                            statusType: filters.status,
                            refetchKey: 'requestMeetings',
                          });
                        },
                      })
                    }
                  >
                    모임 취소하기
                  </DropdownMenuItem>
                </MoreDropdownMenu>
              )} */}
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
