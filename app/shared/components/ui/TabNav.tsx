'use client';

import * as React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { Link } from 'react-router';

import { cn, focusVisibleRing } from '@/styles/tailwind';

function TabNav({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root>) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="tab-nav"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    >
      <NavigationMenuPrimitive.List
        data-slot="tab-nav-list"
        className={cn(
          'relative inline-flex w-fit items-start before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:bg-gray-300',
        )}
      >
        {props.children}
      </NavigationMenuPrimitive.List>
    </NavigationMenuPrimitive.Root>
  );
}

interface TabNavLinkProps extends React.ComponentProps<typeof Link> {
  isActive?: boolean;
}

function TabNavLink({ className, isActive, ...props }: TabNavLinkProps) {
  return (
    <NavigationMenuPrimitive.Item>
      <NavigationMenuPrimitive.Link asChild>
        <Link
          data-slot="tab-nav-link"
          className={cn(
            focusVisibleRing(),
            'after:content-[] relative inline-flex h-full cursor-pointer items-center justify-center gap-1.5 border-gray-300 p-4 text-t2 whitespace-nowrap text-black after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-transparent hover:text-primary',
            isActive && 'text-primary after:bg-primary',
            className,
          )}
          {...props}
        />
      </NavigationMenuPrimitive.Link>
    </NavigationMenuPrimitive.Item>
  );
}

export { TabNav, TabNavLink };
