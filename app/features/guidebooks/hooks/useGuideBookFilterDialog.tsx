import type { GuideBookListFilters } from '@/features/guidebooks/schemas/guideBooksFilters';
import { useModalStore } from '@/shared/stores/useModalStore';
import { useCallback, useEffect, useState } from 'react';

export interface FilterState {
  targetType: 'all' | 'planner' | 'member';
  // mode: "online" | "offline" | "mix";
  level: 'all' | 'before' | 'ongoing' | 'completed';
  time: 'all' | 'under30min' | 'under1hour' | 'over1hour';
}

const INITIAL_FILTER_STATE: FilterState = {
  targetType: 'all',
  // mode: "all",
  level: 'all',
  time: 'all',
};

export default function useGuidBookFilterDialog(
  filters: GuideBookListFilters,
  setFilter: (newFilter: Partial<GuideBookListFilters>) => void,
) {
  const { targetType, level, time } = filters;

  const { close } = useModalStore();
  const [dialogFilter, setDialogFilter] =
    useState<FilterState>(INITIAL_FILTER_STATE);

  useEffect(() => {
    setDialogFilter({
      targetType,
      // mode,
      level,
      time,
    });
  }, [targetType, level, time]);

  const updateDialogFilter = useCallback(
    (field: keyof FilterState, value: string) => {
      setDialogFilter((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const resetDialogFilterAll = () => setDialogFilter(INITIAL_FILTER_STATE);

  // 최종 searchParams() 업데이트
  const submitFilter = (dialogFilter: FilterState) => {
    const { targetType, level, time } = dialogFilter;

    close();
    setFilter({ targetType, level, time });
    resetDialogFilter();
  };

  const resetDialogFilter = () => {
    setDialogFilter((prev) => ({ ...prev, targetType, level, time }));
  };

  return {
    dialogFilter,
    updateDialogFilter,
    resetDialogFilterAll,
    resetDialogFilter,
    submitFilter,
  };
}
