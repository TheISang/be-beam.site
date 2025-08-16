import { Controller, useForm } from 'react-hook-form';
import { Button } from '../../../shared/components/ui/Button';
import { Label } from '../../../shared/components/ui/Label';
import {
  REPORT_REASONS,
  REPORT_REASONS_VALUES,
} from '@/shared/constants/reports';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  RadioGroup,
  RadioGroupItem,
} from '../../../shared/components/ui/RadioGroup';
import { Textarea } from '../../../shared/components/ui/Textarea';

export const reviewReportFormSchema = z.object({
  reason: z.enum(REPORT_REASONS_VALUES),
  message: z.string(),
});

export type ReviewReportFormSchema = z.infer<typeof reviewReportFormSchema>;

export interface ReportFormProps {
  onSubmit?: (data: ReviewReportFormSchema) => void;
}

export default function ReportForm({ onSubmit }: ReportFormProps) {
  const reviewReportForm = useForm<ReviewReportFormSchema>({
    resolver: zodResolver(reviewReportFormSchema),
    defaultValues: {
      reason: REPORT_REASONS_VALUES[0],
      message: '',
    },
  });

  const handleReviewReportSubmit = (data: ReviewReportFormSchema) => {
    onSubmit?.(data);
    reviewReportForm.reset();
  };
  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={reviewReportForm.handleSubmit(handleReviewReportSubmit)}
    >
      <div>
        <Label className="text-t3" htmlFor="reason">
          신고 이유를 선택해 주세요
        </Label>
        <div className="mt-4">
          <Controller
            name="reason"
            control={reviewReportForm.control}
            render={({ field: { onChange, value, ...rest } }) => (
              <RadioGroup
                onValueChange={onChange}
                defaultValue={value}
                {...rest}
              >
                {REPORT_REASONS.map((reason) => (
                  <div key={reason.value} className="flex items-center gap-3">
                    <RadioGroupItem id={reason.value} value={reason.value} />
                    <Label htmlFor={reason.value}>{reason.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
        </div>
      </div>
      <div>
        <Textarea
          label="신고 이유를 자유롭게 작성해 주세요"
          labelClassName="text-t3"
          className="mt-3"
          id="message"
          {...reviewReportForm.register('message')}
        />
      </div>

      <Button size="lg" className="w-full">
        신고
      </Button>
    </form>
  );
}
