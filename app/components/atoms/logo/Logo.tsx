import { useNavigate } from 'react-router';
import { logoSizeStyles } from './Logo.styles';
import type { LogoProps } from '../../../types/components';
import { cn } from '@/lib/tailwind';

export default function Logo({
  variant = 'header',
  clickable = true,
  className,
}: LogoProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (clickable) {
      navigate('/');
    }
  };

  return (
    <img
      src="/images/logo.png"
      alt="logo"
      className={cn('block cursor-pointer', logoSizeStyles[variant], className)}
      onClick={handleClick}
    />
  );
}
