import { useCallback, useEffect, useState } from 'react';

export interface FilterState {
  targetType: string;
  level: string;
  time: string;
}

const INITIAL_FILTER_STATE: FilterState = {
  targetType: 'all',
  level: 'all',
  time: 'all',
};

export default function useGuidBookFilterDialog(params: FilterState) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<FilterState>(INITIAL_FILTER_STATE);

  useEffect(() => {
    setFilter({
      targetType: params.targetType,
      level: params.level,
      time: params.time,
    });
  }, [params]);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const updateFilter = useCallback(
    (field: keyof FilterState, value: string) => {
      setFilter((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const resetFilter = () => setFilter(INITIAL_FILTER_STATE);

  return {
    isOpen,
    setIsOpen,
    filter,
    setFilter,
    openDialog,
    closeDialog,
    updateFilter,
    resetFilter,
  };
}
