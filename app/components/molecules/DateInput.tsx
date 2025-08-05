'use client';

import React, { useMemo, useState } from 'react';
import { format, isValid, parseISO } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/atoms/button/Button';
import { cn } from '@/lib/tailwind';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../atoms/popover/Popover';
import { Calendar } from '../atoms/calendar/Calendar';

interface DateInputProps {
  value: string; // "YYYY-MM-DD" 형식의 문자열
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  placeholder = 'YYYY.MM.DD',
  disabled,
  className,
  id,
}) => {
  const [open, setOpen] = useState(false);

  // value prop을 Date 객체로 변환하여 Calendar 컴포넌트에 직접 전달
  const parsedValueDate = useMemo(() => {
    return value && isValid(parseISO(value)) ? parseISO(value) : undefined;
  }, [value]);

  const handleDateSelect = (date: Date | undefined) => {
    // 사용자가 날짜를 선택했을 때만 onChange 콜백 호출
    if (date && isValid(date)) {
      onChange(format(date, 'yyyy-MM-dd')); // YYYY-MM-DD 형식으로 포맷팅
    } else {
      onChange(''); // 날짜 선택이 취소되거나 유효하지 않으면 빈 문자열 반환
    }
    setOpen(false);
  };

  return (
    <div className={cn('flex', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="tertiary"
            id={id}
            className={cn(
              'h-12 w-full justify-between px-3 py-2 text-left font-normal',
              'rounded-md border border-gray-300 bg-white',
              !parsedValueDate && 'text-gray-500',
              'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none',
              'data-[placeholder]:text-gray-400',
              disabled && 'cursor-not-allowed opacity-50',
            )}
            disabled={disabled}
            type="button"
          >
            {parsedValueDate
              ? format(parsedValueDate, 'yyyy.MM.dd')
              : placeholder}
            <CalendarIcon className="ml-2 h-4 w-4 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="single"
            selected={parsedValueDate} // 👈 외부 value prop을 selected로 직접 연결
            onSelect={handleDateSelect} // 👈 사용자 선택 시 콜백
            initialFocus
            captionLayout="dropdown"
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
