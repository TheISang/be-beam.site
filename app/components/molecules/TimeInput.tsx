'use client';

import { useEffect, useState } from 'react';
import type React from 'react';
import { format, isValid, parse } from 'date-fns';

import { Clock as ClockIcon } from 'lucide-react';
import { Button } from '@/components/atoms/button/Button';
import { Input } from '@/components/atoms/input/Input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../atoms/popover/Popover';
import { cn } from '@/lib/tailwind';

interface TimeInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  format12Hour?: boolean;
}

export const TimeInput: React.FC<TimeInputProps> = ({
  value,
  onChange,
  placeholder = 'HH:MM AM/PM',
  disabled,
  className,
  id,
  format12Hour = true,
}) => {
  const [selectedTimeDate, setSelectedTimeDate] = useState<Date | undefined>(
    undefined,
  );

  const [internalInputTime, setInternalInputTime] = useState<string>('');

  useEffect(() => {
    let parsedDate: Date | undefined;
    if (value && value.startsWith('T') && value.length >= 9) {
      const timePart = value.substring(1);
      const tempDate = parse(timePart, 'HH:mm:ss', new Date());
      if (isValid(tempDate)) {
        parsedDate = tempDate;
      }
    } else if (value && value.length >= 5) {
      const tempDate = parse(value, 'HH:mm:ss', new Date());
      if (isValid(tempDate)) parsedDate = tempDate;
      else {
        const tempDateShort = parse(value, 'HH:mm', new Date());
        if (isValid(tempDateShort)) parsedDate = tempDateShort;
      }
    }

    if (parsedDate?.getTime() !== selectedTimeDate?.getTime()) {
      setSelectedTimeDate(parsedDate);
    }

    const newInternalTime = parsedDate ? format(parsedDate, 'HH:mm:ss') : '';
    if (newInternalTime !== internalInputTime) {
      setInternalInputTime(newInternalTime);
    }
  }, [value, selectedTimeDate, internalInputTime]);

  const handleTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawTime = e.target.value;

    setInternalInputTime(rawTime);

    let parsed: Date | undefined;
    if (rawTime.length >= 5) {
      parsed = isValid(parse(rawTime, 'HH:mm:ss', new Date()))
        ? parse(rawTime, 'HH:mm:ss', new Date())
        : isValid(parse(rawTime, 'HH:mm', new Date()))
          ? parse(rawTime, 'HH:mm', new Date())
          : undefined;
    }

    if (parsed && isValid(parsed)) {
      // T를 필요로 하면 "'T'HH:mm:ss"
      onChange(format(parsed, 'HH:mm:ss'));
      setSelectedTimeDate(parsed);
    } else if (rawTime === '') {
      onChange('');
      setSelectedTimeDate(undefined);
    }
  };

  const displayTime = selectedTimeDate
    ? format12Hour
      ? format(selectedTimeDate, 'hh:mm a')
      : format(selectedTimeDate, 'HH:mm')
    : '';

  return (
    <div className={cn('flex', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="tertiary"
            id={id}
            className={cn(
              'h-12 w-full justify-between px-3 py-2 text-left font-normal',
              'rounded-md border border-gray-300 bg-white',
              !displayTime && 'text-gray-500',
              'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none',
              'data-[placeholder]:text-gray-400',
              disabled && 'cursor-not-allowed opacity-50',
            )}
            disabled={disabled}
            type="button"
          >
            {displayTime || placeholder}
            <ClockIcon className="ml-2 h-4 w-4 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Input
            type="time"
            value={internalInputTime}
            onChange={handleTimeInputChange}
            step="1"
            className="w-[180px] bg-white p-3 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            disabled={disabled}
            autoFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
