import { colorStyles, variantStyles } from './Text.styles';
import type { TextProps } from '../../../types/components';
import { cn } from '@/lib/tailwind';

export default function Text({
  as: Component = 'p',
  variant = 'T4_Regular',
  color = 'black',
  className = '',
  children,
  onClick,
}: TextProps) {
  return (
    <Component
      className={cn(variantStyles[variant], colorStyles[color], className)}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}
