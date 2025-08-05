import { cn } from '@/lib/tailwind';

interface BadgeProps {
  text: string;
  variant?: 'primary' | 'purple' | 'gray' | 'tertiary' | 'red' | 'green';
  className?: string;
}

const Badge = ({
  text,
  variant = 'primary',
  className = 'px-3 py-1 text-sm font-semibold',
}: BadgeProps) => {
  const variantStyles = {
    primary: 'border-1 border-primary bg-[#FFFAF0] text-primary',
    purple: 'bg-[#E9EAFF] text-[#3940E4]',
    red: 'bg-error/10 text-error',
    green: 'bg-success/10 text-success',
    gray: 'bg-gray-200 text-gray-600',
    tertiary: 'text-black bg-gray-200',
  };

  return (
    <div
      className={cn('box-border rounded-md', variantStyles[variant], className)}
    >
      {text}
    </div>
  );
};

export default Badge;
