import SidebarSubNavItem from './SidebarSubNavItem';
import type { SideBarSectionItems } from '@/shared/types/components';

export default function SidebarSection({
  title,
  isActive,
  items,
}: {
  title: string;
  isActive: boolean;
  items: SideBarSectionItems[];
}) {
  return (
    <div className="mb-3">
      <button
        className={`${isActive && 'text-primary'} flex w-full items-center gap-2 px-5 py-4 text-t3`}
      >
        {title}
      </button>

      {items.map((item, idx) => (
        <SidebarSubNavItem
          key={idx}
          to={item.to}
          title={item.title}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
}
