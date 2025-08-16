import useGuideBooksQuery from '@/features/guidebooks/hooks/useGuideBooksQuery';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/Select';
import { cn } from '@/styles/tailwind';
import type { GuidebookSummary } from '@/shared/types/entities';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';

interface GuideBookSelectProps {
  value?: number | null;
  onValueChange?: (value: number | undefined | null) => void;
  placeholder?: string;
}

export default function GuideBookSelect({
  value,
  onValueChange,
  placeholder = '가이드북을 선택해주세요',
}: GuideBookSelectProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  interface guideBooksParams {
    // search: '';
    type:
      | 'all'
      | 'communication'
      | 'engagement'
      | 'planning'
      | 'operation'
      | 'support';
    targetType: 'all' | 'planner' | 'member';
    // mode: 'all' | 'online' | 'offline' | 'mix';
    level: 'all' | 'before' | 'ongoing' | 'completed';
    time: 'all' | 'under30min' | 'under1hour' | 'over1hour';
  }

  const params: guideBooksParams = {
    // search: '',
    type: 'all',
    targetType: 'all',
    // mode: 'all',
    level: 'all',
    time: 'all',
  };
  const {
    data: guideBooks,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    // isLoading,
  } = useGuideBooksQuery(params);

  const allGuideBooks: GuidebookSummary[] = useMemo(() => {
    return guideBooks?.pages.flatMap((page) => page.guidebooks) || [];
  }, [guideBooks]);

  console.log(allGuideBooks);

  const handleScroll = useCallback(() => {
    const scrollElement = scrollContainerRef.current;
    if (!scrollElement || !hasNextPage || isFetchingNextPage) {
      return;
    }

    const SCROLL_THRESHOLD = 100;
    const { scrollTop, scrollHeight, clientHeight } = scrollElement;

    if (scrollHeight - scrollTop - clientHeight < SCROLL_THRESHOLD) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (isSelectOpen) {
      const currentScrollElement = scrollContainerRef.current;
      if (currentScrollElement) {
        currentScrollElement.addEventListener('scroll', handleScroll);
      }

      return () => {
        if (currentScrollElement) {
          currentScrollElement.removeEventListener('scroll', handleScroll);
        }
      };
    }
  }, [isSelectOpen, handleScroll]);

  const onSelectChange = (newValueString: string) => {
    const newId: number | undefined = newValueString
      ? Number(newValueString)
      : undefined;

    if (onValueChange) {
      onValueChange(newId);
    }
  };

  return (
    <Select
      value={value === undefined || value === null ? undefined : String(value)}
      onOpenChange={setIsSelectOpen}
      onValueChange={onSelectChange}
    >
      <SelectTrigger
        className={cn(
          'mt-5 h-auto w-full rounded-lg border-gray-500 bg-white py-3',
          !value && 'text-t4 text-gray-500',
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent ref={scrollContainerRef} className="bg-white">
        <SelectGroup>
          <SelectLabel>가이드북 목록</SelectLabel>
          {allGuideBooks.map((item) => (
            <SelectItem key={String(item.id)} value={String(item.id)}>
              <div className="flex w-full items-center gap-2">
                <img
                  src={item.thumbnailImage}
                  alt="thumbnail_image"
                  className="h-10 w-10 rounded-lg object-cover"
                />
                {item.title}
              </div>
            </SelectItem>
          ))}

          {isFetchingNextPage && (
            <LoadingSpinner loadingComment="더 많은 가이드북을 Loading..." />
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
