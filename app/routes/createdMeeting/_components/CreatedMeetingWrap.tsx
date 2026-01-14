import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useDeleteMeetingMutation from '@/features/meetings/hooks/useDeleteMeetingMutation';
import { createdMeetingsQueryOptions } from '@/features/meetings/hooks/useCreatedMeetingsQuery';
import { useModalStore } from '@/shared/stores/useModalStore';
import usePagination from '@/shared/hooks/usePagination';

import { type MyPageMeetingResult } from '@/shared/api/endpoints/mypage';
import type { MyCreatedMeetingFilters } from '@/features/mypage/schemas/userFilters';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../../shared/components/ui/Pagination';
import { DropdownMenuItem } from '../../../shared/components/ui/DropdownMenu';
import MoreDropdownMenu from '../../../shared/components/common/MoreDropdownMenu';
import toast from 'react-hot-toast';
import MeetingCardWithAddress from '@/features/meetings/components/MeetingCardWithAddress';

interface CreatedMeetingWrapProps {
  filters: MyCreatedMeetingFilters;
}

export default function CreatedMeetingWrap({
  filters,
}: CreatedMeetingWrapProps) {
  const navigate = useNavigate();
  const { open } = useModalStore();

  const { data: createdMeetings } = useQuery(
    createdMeetingsQueryOptions(filters),
  );

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
      <div className="mx-auto grid w-full grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 md:gap-5">
        {createdMeetings?.meetings?.map((meeting: MyPageMeetingResult) => (
          <MeetingCardWithAddress
            key={meeting.id}
            id={meeting.id}
            thumbnailImage={meeting.thumbnailImage}
            recruitmentType={meeting.recruitmentType}
            recruitmentStatus={meeting.recruitmentStatus}
            name={meeting.name}
            meetingStartTime={meeting.meetingStartTime}
            address={meeting.address}
            onClick={() => navigate(`/myPage/created/${meeting.id}/intro`)}
          >
            {meeting.recruitmentStatus !== '모집마감' &&
              meeting.recruitmentStatus !== '모임중' &&
              meeting.recruitmentStatus !== '모임완료' && (
                <MoreDropdownMenu btnPosition="right-0 top-0 absolute bg-transparent">
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
