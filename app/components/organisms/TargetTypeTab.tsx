import type { FilterOption } from '@/types/components';
import { TabsList, TabsTrigger } from '../atoms/tabs/Tabs';
import { Button } from '../atoms/button/Button';

export default function GuideBooksFilterControls({
  openDialog,
  list,
}: {
  openDialog: () => void;
  list: FilterOption[];
}) {
  return (
    <div className="flex w-full items-center justify-between">
      <TabsList className="h-auto gap-4 before:h-0">
        {list.map((type, idx) => (
          <TabsTrigger
            key={idx}
            className="h-auto cursor-pointer rounded-full bg-gray-200 px-4 py-3 text-b1 transition-all duration-700 after:content-none data-[state=active]:bg-gray-900 data-[state=active]:text-white"
            value={type.value}
          >
            {type.text}
          </TabsTrigger>
        ))}
      </TabsList>

      <Button
        variant="tertiary"
        className="h-auto min-w-auto border-gray-300 text-b1 text-black"
        onClick={openDialog}
      >
        <img src="/images/icons/filter.svg" alt="filter_icon" />
        필터
      </Button>
    </div>
  );
}
