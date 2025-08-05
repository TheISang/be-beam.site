import type { TypographyVariant } from '../../../types/components';

export const variantStyles: Record<TypographyVariant, string> = {
  H0_Bold: 'text-[36px] font-bold leading-[140%]',
  H1_Bold: 'text-h1',
  H2_Semibold: 'text-h2',
  T1_Regular: 'text-t1',
  T2_Semibold: 'text-t2',
  T3_Semibold: 'text-t3',
  T4_Regular: 'text-t4',
  B1_Semibold: 'text-b1',
  B2_Medium: 'text-b2',
  B3_Regular: 'text-b3',
  C1_Semibold: 'text-c1',
  C2_Regular: 'text-c2',
  C3_Regular: 'text-c3',
};

export const colorStyles = {
  black: 'text-black',
  white: 'text-white',
  'gray-900': 'text-gray-900',
  'gray-800': 'text-gray-800',
  'gray-700': 'text-gray-700',
  'gray-600': 'text-gray-600',
  'gray-500': 'text-gray-500',
  'gray-400': 'text-gray-400',
  'gray-300': 'text-gray-300',
  'gray-200': 'text-gray-200',
  'gray-100': 'text-gray-100',
  brown: 'text-[#381F1F]',
  primary: 'text-[var(--color-primary)]',
};
