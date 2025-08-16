import { useNavigate } from 'react-router';
import { logoSizeStyles } from './Logo.styles';

import { cn } from '@/styles/tailwind';
import type { LogoProps } from '../../types/components';

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
      src="/images/logo3.png"
      alt="logo"
      className={cn('block cursor-pointer', logoSizeStyles[variant], className)}
      onClick={handleClick}
    />
  );
}
