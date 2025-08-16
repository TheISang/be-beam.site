import { cn } from '@/styles/tailwind';
import { Input } from '../ui/Input';

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeHolder: string;
  inputStyle?: string;
  onSearchChange: (str: string) => void;
  search: string;
}

export default function SearchInput({
  placeHolder,
  inputStyle = 'border-1 border-gray-300',
  onSearchChange,
  search,
}: SearchInputProps) {
  return (
    <div className={cn('flex items-center justify-between', inputStyle)}>
      <Input
        placeholder={placeHolder}
        className="h-auto border-none bg-transparent py-0 shadow-none focus:border-none"
        onChange={(e) => onSearchChange(e.target.value)}
        value={search}
      />
      <img
        src="/images/icons/search.svg"
        alt="search_icon"
        className="cursor-pointer"
      />
    </div>
  );
}
