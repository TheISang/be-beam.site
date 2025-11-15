import { useState } from 'react';
import type { MeetingListFilters } from '@/features/meetings/schemas/meetingFilters';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../ui/DropdownMenu';
import type { FiltersType } from '@/shared/types/components';
import ArrowDownIcon from '../icons/ArrowDownIcon';

interface DropdownMenuGroupProps {
  datas: FiltersType[];
  selectedFilters: Record<string, string | number>;
  onDropdownChange: (newFilter: Partial<MeetingListFilters>) => void;
}

export default function DropdownMenuGroup({
  datas,
  selectedFilters,
  onDropdownChange,
}: DropdownMenuGroupProps) {
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {},
  );
  return (
    <div className="flex w-full gap-3 overflow-x-auto">
      {datas.map((item) => {
        const selectedValue = selectedFilters[item.label];

        const triggerLabel =
          selectedValue === item.defaultOption
            ? item.defaultLabel
            : item.options[item.values.indexOf(String(selectedValue))];
        return (
          <DropdownMenu
            key={item.label}
            className="flex-shrink-0"
            open={openDropdowns[item.label] || false}
            onOpenChange={(open) =>
              setOpenDropdowns((prev) => ({ ...prev, [item.label]: open }))
            }
          >
            <DropdownMenuTrigger
              className="flex cursor-pointer items-center gap-1 rounded-xl border-2 border-[#e5e5e5] px-3 py-[6px] text-b1 font-medium whitespace-nowrap text-black outline-none"
              onPointerDown={(e) => e.preventDefault()}
              onClick={() =>
                setOpenDropdowns((prev) => ({
                  ...prev,
                  [item.label]: !prev[item.label],
                }))
              }
            >
              {triggerLabel}
              <ArrowDownIcon className="text-[#a1a1a1]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-24">
              {item.options.map((option, idx) => (
                <DropdownMenuItem
                  className="cursor-pointer"
                  key={option}
                  onSelect={() =>
                    onDropdownChange({ [item.label]: item.values[idx] })
                  }
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      })}
    </div>
  );
}
