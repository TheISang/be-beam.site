import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import type { MyApplicatedMeetingFilters } from '@/features/mypage/schemas/userFilters';
import { useModalStore } from '@/shared/stores/useModalStore';
import usePagination from '@/shared/hooks/usePagination';
import { axiosInstance } from '@/shared/api/axios';
import { API_V2_BASE_URL } from '@/shared/constants/api';

import type { MyPageMeetingSummary } from '@/shared/types/entities';
import GridGroup from '../../../shared/components/ui/GridGroup';
import MeetingCard from '../../../features/meetings/components/MeetingCard';
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

interface RequestedMeetingWrapProps {
  filters: MyApplicatedMeetingFilters;
}

export default function RequestedMeetingWrap({
  filters,
}: RequestedMeetingWrapProps) {
  const navigate = useNavigate();
  const { open } = useModalStore();

  const { data: requestMeetings } = useQuery({
    queryKey: ['requestMeetings', filters],
    queryFn: async () => {
      const res = await axiosInstance({
        method: 'GET',
        baseURL: API_V2_BASE_URL,
        url: `/users/meetings/application?status=${filters.status}&size=9&page=${filters.page}`,
      });
      const data = res.data;
      return data.result;
    },
  });

  const pagination = usePagination({
    currentPage: filters.page,
    totalPages: requestMeetings?.pageInfo?.totalPages || 1,
  });

  const handleUpdatePage = useCallback(
    (page: number) => {
      const currentFilters: MyApplicatedMeetingFilters = filters;
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
        {requestMeetings?.meetings?.map((meeting: MyPageMeetingSummary) => (
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
            {requestMeetings?.status !== 'rejected' &&
              meeting.userStatus !== '신청취소중' && (
                <MoreDropdownMenu btnPosition="right-0 top-0 absolute">
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
