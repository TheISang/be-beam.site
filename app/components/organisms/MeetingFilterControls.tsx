import type { MeetingListFilters } from '@/schemas/meetingFilters';
import DropdownMenuGroup from '../molecules/DropdownMenuGroup';
import SearchInput from '../molecules/SearchInput';
import TabsGroup from '../molecules/TabsGroup';

interface MeetingFilterControlsProps {
  topics: { label: string; value: string }[];
  meetingFilters: MeetingListFilters;
  setFilter: (newFilter: Partial<MeetingListFilters>) => void;
}

export default function MeetingFilterControls({
  topics,
  meetingFilters,
  setFilter,
}: MeetingFilterControlsProps) {
  const filters = [
    {
      label: 'recruitment-type',
      options: ['전체', '정기모임', '소모임'],
      values: ['all', 'regular', 'small'],
    },
    {
      label: 'recruitment-status',
      options: ['전체', '모집예정', '모집중', '모집종료', '모임중', '모임완료'],
      values: [
        'all',
        'upcoming',
        'recruiting',
        'closed',
        'in_progress',
        'completed',
      ],
    },
    {
      label: 'mode',
      options: ['전체', '오프라인', '온라인', '혼합'],
      values: ['all', 'offline', 'online', 'mix'],
    },
    {
      label: 'cost',
      options: ['전체', '무료', '유료'],
      values: ['all', 'free', 'cash'],
    },
    {
      label: 'sort',
      options: ['최신순', '좋아요순'],
      values: ['recent', 'likes'],
    },
  ];

  return (
    <div className="mt-12">
      <TabsGroup
        categories={topics}
        selectedCategory={meetingFilters.topic}
        onCategoryChange={(value) => setFilter({ topic: value })}
      />

      <div className="mt-8 flex w-full items-center justify-between">
        <DropdownMenuGroup
          datas={filters}
          selectedFilters={meetingFilters}
          onDropdownChange={setFilter}
        />
        <SearchInput
          placeHolder="입력해주세요"
          inputStyle="w-full max-w-[400px] px-4 py-3 border-1 border-gray-300 rounded-full"
          onSearchChange={setFilter}
          search={meetingFilters.search}
        />
      </div>
    </div>
  );
}
