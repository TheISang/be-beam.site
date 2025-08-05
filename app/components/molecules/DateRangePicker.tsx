'use client';

import * as React from 'react';
import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';

import { cn } from '@/lib/tailwind';
import { Calendar as CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../atoms/popover/Popover';
import { Button } from '../atoms/button/Button';
import { Calendar } from '../atoms/calendar/Calendar';

interface DateRangePickerProps {
  value?: { from: Date | null | undefined; to?: Date | null | undefined };
  onValueChange: (range?: {
    from: Date | null | undefined;
    to?: Date | null | undefined;
  }) => void;
  placeholder?: string;
  className?: string;
}

export function DateRangePicker({
  value,
  onValueChange,
  placeholder = 'YYYY.MM.DD - YYYY.MM.DD',
  className,
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<
    { from?: Date | null; to?: Date | null } | undefined
  >(value);

  React.useEffect(() => {
    setDate(value);
  }, [value]);

  const handleDateSelect = (selectedRange: DateRange | undefined) => {
    setDate(selectedRange);
    if (selectedRange?.from && selectedRange?.to) {
      onValueChange(selectedRange);
    } else {
      onValueChange(undefined);
    }
  };

  const displayDateText = React.useMemo(() => {
    if (date?.from) {
      if (date.to) {
        return `${format(date.from, 'yyyy.MM.dd')} - ${format(date.to, 'yyyy.MM.dd')}`;
      } else {
        return format(date.from, 'yyyy.MM.dd');
      }
    }
    return placeholder;
  }, [date, placeholder]);

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="tertiary"
            className={cn(
              'w-full justify-between border-gray-400 text-left text-t4',
              !date?.from ? 'text-gray-500' : 'text-black',
            )}
          >
            <span>{displayDateText}</span>
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            selected={{
              from: date?.from ?? undefined,
              to: date?.to ?? undefined,
            }}
            onSelect={handleDateSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
