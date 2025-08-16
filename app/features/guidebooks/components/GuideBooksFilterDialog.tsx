import {
  GuideBookListFilterSchema,
  type GuideBookListFilters,
} from '@/features/guidebooks/schemas/guideBooksFilters';
import { useModalStore } from '@/shared/stores/useModalStore';
import { useUrlFilters } from '@/shared/hooks/userUrlFilters';
import useGuidBookFilterDialog from '@/features/guidebooks/hooks/useGuideBookFilterDialog';

import type { FilterOption } from '@/shared/types/components';
import { Button } from '../../../shared/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../shared/components/ui/Dialog';
import Text from '../../../shared/components/ui/Text';
import GuideBooksFilterTabGroup from '@/features/guidebooks/components/GuideBooksFilterTabGroup';

export default function GuideBooksFilterDialog() {
  const { modalProps, isOpen, close } = useModalStore();
  const { initialFilters } = modalProps as {
    initialFilters: GuideBookListFilters;
  };

  const { filters, setFilter } = useUrlFilters(
    GuideBookListFilterSchema,
    initialFilters,
  );

  const {
    dialogFilter,
    updateDialogFilter,
    resetDialogFilterAll,
    resetDialogFilter,
    submitFilter,
  } = useGuidBookFilterDialog(filters, setFilter);

  const targetTypeList: FilterOption[] = [
    { text: '전체', value: 'all' },
    { text: '커뮤니티 기획자', value: 'planner' },
    { text: '참여자', value: 'member' },
  ];
  // const modeList: FilterOption[] = [
  //   { text: '전체', value: 'all' },
  //   { text: '오프라인', value: 'offline' },
  //   { text: '온라인', value: 'online' },
  //   { text: '혼합', value: 'mix' },
  // ];
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

  const handleDialogClose = () => {
    resetDialogFilter();
    close();
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
              value={dialogFilter.targetType}
              list={targetTypeList}
              onValueChange={(value) => updateDialogFilter('targetType', value)}
            />
          </div>

          {/* API 수정 완료시 활성화 */}
          {/* <div className="mb-9 flex w-full flex-col gap-3">
            <Text variant="T3_Semibold" className="mb-1">
              사용 유형
            </Text>
            <GuideBooksFilterTabGroup
              value={dialogFilter.mode}
              list={modeList}
              onValueChange={(value) => updateDialogFilter('mode', value)}
            />
          </div> */}

          <div className="mb-9 flex w-full flex-col gap-3">
            <Text variant="T3_Semibold" className="mb-1">
              필요 단계
            </Text>
            <GuideBooksFilterTabGroup
              value={dialogFilter.level}
              list={levelList}
              onValueChange={(value) => updateDialogFilter('level', value)}
            />
          </div>

          <div className="flex w-full flex-col gap-3">
            <Text variant="T3_Semibold" className="mb-1">
              예상 소요 시간
            </Text>
            <GuideBooksFilterTabGroup
              value={dialogFilter.time}
              list={timeList}
              onValueChange={(value) => updateDialogFilter('time', value)}
            />
          </div>
        </div>

        <DialogFooter className="mt-3 flex w-full justify-between">
          <Button
            className="h-12 min-w-auto px-10"
            onClick={resetDialogFilterAll}
          >
            초기화
          </Button>
          <Button
            className="h-12 flex-1"
            onClick={() => submitFilter(dialogFilter)}
          >
            적용하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
