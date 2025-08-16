import { cva } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMergeConfig = {
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'h1',
            'h2',
            't1',
            't2',
            't3',
            't4',
            'b1',
            'b2',
            'b3',
            'c1',
            'c2',
            'c3',
          ],
        },
      ],
    },
  },
};

const twMerge = extendTailwindMerge(twMergeConfig);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const focusVisibleRing = cva(
  'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-offset-0 focus-visible:ring-primary/50 ring-offset-white transition-shadow duration-200',
);

export const focusRing = cva(
  'focus:ring-3 focus:ring-offset-2 focus:ring-primary/50 ring-offset-white focus:outline-none transition-shadow duration-200',
);
