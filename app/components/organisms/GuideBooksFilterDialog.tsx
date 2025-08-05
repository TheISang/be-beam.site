import type { FilterOption } from '@/types/components';
import type { FilterState } from '@/hooks/ui/useGuideBookFilterDialog';
import { Button } from '../atoms/button/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../atoms/dialog/Dialog';
import Text from '../atoms/text/Text';
import GuideBooksFilterTabGroup from '../molecules/GuideBooksFilterTabGroup';

interface GuideBooksFilterDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  params: FilterState;
  filter: FilterState;
  setFilter: (filter: FilterState) => void;
  updateFilter: (field: keyof FilterState, value: string) => void;
  resetFilter: () => void;
  handleApplyFilter: (filter: FilterState) => void;
}

export default function GuideBooksFilterDialog({
  isOpen,
  setIsOpen,
  params,
  filter,
  setFilter,
  updateFilter,
  resetFilter,
  handleApplyFilter,
}: GuideBooksFilterDialogProps) {
  const targetTypeList: FilterOption[] = [
    { text: '전체', value: 'all' },
    { text: '커뮤니티 기획자', value: 'planner' },
    { text: '참여자', value: 'participant' },
  ];
  const levelList: FilterOption[] = [
    { text: '전체', value: 'all' },
    { text: '시작 전', value: 'before' },
    { text: '진행 중', value: 'ongoing' },
    { text: '마무리', value: 'completed' },
  ];
  const timeList: FilterOption[] = [
    { text: '전체', value: 'all' },
    { text: '30분 미만', value: 'under30min' },
    { text: '1시간 내외', value: 'under1hour' },
    { text: '1시간 이상', value: 'over1hour' },
  ];

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setFilter({
        targetType: params.targetType,
        level: params.level,
        time: params.time,
      });
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="box-border w-full max-w-[480px] rounded-lg bg-white p-7 shadow-lg">
        <DialogHeader className="mb-3 flex w-full flex-row items-center justify-between">
          <DialogTitle className="text-t2">필터</DialogTitle>
        </DialogHeader>

        <div className="w-full">
          <div className="mb-9 flex w-full flex-col gap-3">
            <Text variant="T3_Semibold" className="mb-1">
              대상 유형
            </Text>
            <GuideBooksFilterTabGroup
              value={filter.targetType}
              list={targetTypeList}
              onValueChange={(value) => updateFilter('targetType', value)}
            />
          </div>

          <div className="mb-9 flex w-full flex-col gap-3">
            <Text variant="T3_Semibold" className="mb-1">
              필요 단계
            </Text>
            <GuideBooksFilterTabGroup
              value={filter.level}
              list={levelList}
              onValueChange={(value) => updateFilter('level', value)}
            />
          </div>

          <div className="flex w-full flex-col gap-3">
            <Text variant="T3_Semibold" className="mb-1">
              예상 소요 시간
            </Text>
            <GuideBooksFilterTabGroup
              value={filter.time}
              list={timeList}
              onValueChange={(value) => updateFilter('time', value)}
            />
          </div>
        </div>

        <DialogFooter className="mt-3 flex w-full justify-between">
          <Button className="h-12 min-w-auto px-10" onClick={resetFilter}>
            초기화
          </Button>
          <Button
            className="h-12 flex-1"
            onClick={() => handleApplyFilter(filter)}
          >
            적용하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
