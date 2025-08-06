import { useNavigate } from 'react-router';
import { logoSizeStyles } from './Logo.styles';
import type { LogoProps } from '../../../types/components';
import clsx from 'clsx';

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
      className={clsx(
        'block cursor-pointer',
        logoSizeStyles[variant],
        className,
      )}
      onClick={handleClick}
    />
  );
}
