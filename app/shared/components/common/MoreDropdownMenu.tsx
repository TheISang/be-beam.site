import type React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/DropdownMenu';
import { Button } from '../ui/Button';

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
