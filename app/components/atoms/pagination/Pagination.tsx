import * as React from 'react';

import { cn } from '@/lib/tailwind';
import { cva } from 'class-variance-authority';
import { Link, type LinkProps } from 'react-router';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';

const paginationButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg disabled:pointer-events-none shrink-0 outline-none size-8',
  {
    variants: {
      variant: {
        active:
          'bg-gray-900 text-white hover:bg-gray-900/90 disabled:opacity-50 text-c1',
        inactive:
          'bg-transparent text-gray-900 hover:bg-gray-200 disabled:opacity-50 text-c2',
      },
    },
    defaultVariants: {
      variant: 'inactive',
    },
  },
);

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & LinkProps;

function PaginationLink({
  className,
  isActive,
  ...props
}: PaginationLinkProps) {
  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        paginationButtonVariants({
          variant: isActive ? 'active' : 'inactive',
        }),
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn(className)}
      {...props}
    >
      <ArrowLeftIcon className="size-5 text-gray-800" />
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn(className)}
      {...props}
    >
      <ArrowRightIcon className="size-5 text-gray-800" />
    </PaginationLink>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
};
