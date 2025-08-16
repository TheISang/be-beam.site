import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/Tabs';
import type { FilterOption } from '@/shared/types/components';

interface GuideBooksFilterTabGroupProps {
  value: string;
  list: FilterOption[];
  onValueChange: (value: string) => void;
}

export default function GuideBooksFilterTabGroup({
  value,
  list,
  onValueChange,
}: GuideBooksFilterTabGroupProps) {
  return (
    <Tabs
      defaultValue="all"
      className="text-b1"
      value={value}
      onValueChange={onValueChange}
    >
      <TabsList className="h-auto gap-3 before:h-0">
        {list.map((data, idx) => (
          <TabsTrigger
            key={idx}
            className="cursor-pointer rounded-lg border-1 border-gray-300 px-5 py-3 text-b1 transition-all duration-700 after:content-none data-[state=active]:bg-gray-900 data-[state=active]:text-white"
            value={data.value}
          >
            {data.text}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
