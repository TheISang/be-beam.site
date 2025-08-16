'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn, focusVisibleRing } from '@/styles/tailwind';

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'relative inline-flex w-fit items-start before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:bg-gray-300',
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        focusVisibleRing(),
        'after:content-[] relative inline-flex h-full cursor-pointer items-center justify-center gap-1.5 border-gray-300 p-4 text-t2 whitespace-nowrap text-black after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-transparent hover:text-primary disabled:cursor-default disabled:border-gray-300 disabled:text-gray-500 data-[state=active]:text-primary data-[state=active]:after:bg-primary',
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
