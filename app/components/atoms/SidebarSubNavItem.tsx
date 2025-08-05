import { NavLink } from 'react-router';
import type { SideBarSectionItems } from '@/types/components';
import clsx from 'clsx';

export default function SidebarSubNavItem({
  to,
  title,
  onClick,
}: SideBarSectionItems) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          'flex w-full items-center gap-2 px-5 py-3 text-b3',
          isActive
            ? 'bg-primary-light text-primary'
            : 'hover:bg-primary-light hover:text-primary',
        )
      }
      onClick={onClick}
    >
      {title}
    </NavLink>
  );
}
