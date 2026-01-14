import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';

interface ReviewSortProps {
  sort: string;
  onSortChange: (sort: string) => void;
}

export default function ReviewSort({ sort, onSortChange }: ReviewSortProps) {
  return (
    <RadioGroup
      defaultValue="recent"
      className="flex rounded-lg bg-gray-200 p-2"
      value={sort}
      onValueChange={onSortChange}
    >
      <RadioGroupItem
        value="recent"
        id="sort-recent"
        className="rounded-md px-3 py-2 text-b1 whitespace-nowrap text-gray-500 data-[state=checked]:bg-white data-[state=checked]:text-black data-[state=checked]:shadow-[0_0_1.7px_0_rgba(0,0,0,0.08)]"
      >
        최신순
      </RadioGroupItem>

      <RadioGroupItem
        value="likes"
        id="sort-like"
        className="rounded-md px-3 py-2 text-b1 whitespace-nowrap text-gray-500 data-[state=checked]:bg-white data-[state=checked]:text-black data-[state=checked]:shadow-[0_0_1.7px_0_rgba(0,0,0,0.08)]"
      >
        좋아요순
      </RadioGroupItem>
    </RadioGroup>
  );
}
