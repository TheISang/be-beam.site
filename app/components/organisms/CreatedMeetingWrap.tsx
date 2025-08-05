import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useDeleteMeetingMutation from '@/hooks/api/useDeleteMeetingMutation';
import { useModalStore } from '@/stores/useModalStore';
import usePagination from '@/hooks/ui/usePagination';
import { getOpeningMeetingList, type MyPageMeetingResult } from '@/api/mypage';

import type { MyCreatedMeetingFilters } from '@/schemas/userFilters';
import GridGroup from './gridGroup/GridGroup';
import MeetingCard from './MeetingCard';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../atoms/pagination/Pagination';
import { DropdownMenuItem } from '../atoms/dropdown-menu/DropdownMenu';
import MoreDropdownMenu from './MoreDropdownMenu';
import toast from 'react-hot-toast';

interface CreatedMeetingWrapProps {
  filters: MyCreatedMeetingFilters;
}

export default function CreatedMeetingWrap({
  filters,
}: CreatedMeetingWrapProps) {
  const navigate = useNavigate();
  const { open } = useModalStore();

  const { data: createdMeetings } = useQuery({
    queryKey: ['createdMeetings', filters],
    queryFn: () => getOpeningMeetingList(filters),
  });

  const pagination = usePagination({
    currentPage: filters.page,
    totalPages: createdMeetings?.pageInfo?.totalPages || 1,
  });

  const handleUpdatePage = useCallback(
    (page: number) => {
      const currentFilters: MyCreatedMeetingFilters = filters;
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

  const { mutate: deleteMeeting, isPending } = useDeleteMeetingMutation();

  return (
    <>
      <GridGroup columns={3} gap={5}>
        {createdMeetings?.meetings?.map((meeting: MyPageMeetingResult) => (
          <MeetingCard
            key={meeting.id}
            image={meeting.thumbnailImage}
            recruitmentType={meeting.recruitmentType}
            recruitmentStatus={meeting.recruitmentStatus}
            name={meeting.name}
            meetingStartTime={meeting.meetingStartTime}
            address={meeting.address}
            onClick={() => navigate(`/myPage/created/${meeting.id}/intro`)}
            isLikeBtn={false}
          >
            {meeting.recruitmentStatus !== '모집마감' &&
              meeting.recruitmentStatus !== '모임중' &&
              meeting.recruitmentStatus !== '모임완료' && (
                <MoreDropdownMenu btnPosition="right-0 top-0 absolute">
                  <DropdownMenuItem
                    onSelect={() => {
                      open('CONFIRM_DIALOG', {
                        title: `개설한 ${meeting?.recruitmentType}을 삭제할까요?`,
                        handleClickCancel: () =>
                          toast(
                            `${meeting?.recruitmentType} 삭제를 취소하였습니다.`,
                          ),
                        handleClickAction: () => {
                          if (isPending) return;
                          deleteMeeting(meeting.id);
                        },
                      });
                    }}
                  >
                    모임 삭제하기
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
