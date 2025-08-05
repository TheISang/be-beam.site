import type React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../atoms/dropdown-menu/DropdownMenu';
import { Button } from '../atoms/button/Button';

export default function MoreDropdownMenu({
  btnPosition,
  children,
}: {
  btnPosition?: string;
  children: React.ReactNode;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="tertiary"
          className={`min-w-auto border-none ${btnPosition}`}
        >
          <img src="/images/icons/3dot.svg" alt="more_icon" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>{children}</DropdownMenuContent>
    </DropdownMenu>
  );
}
