import { NavLink } from 'react-router';

export default function NavMenu() {
  const navItems = [
    {
      to: '/meetings',
      label: '모임',
    },
    {
      to: '/reviews',
      label: '모임 후기',
    },
    {
      to: '/guideBooks',
      label: '가이드북',
    },
  ];

  return (
    <nav className="flex flex-1 gap-16 text-[1.125rem]">
      {navItems.map((item, idx) => (
        <NavLink
          key={idx}
          to={item.to}
          style={({ isActive, isPending }) => ({
            color: isActive
              ? 'var(--color-primary)'
              : isPending
                ? 'blue'
                : 'var(--color-gray-700)',
            fontSize: 'var(--text-t2)',
            fontWeight: 'var(--text-t2--font-weight)',
            lineHeight: 'var(--text-t2--line-height)',
          })}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
