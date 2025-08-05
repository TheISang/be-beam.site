import type { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outlineGray' | 'outlineBlack' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
}

export interface TextProps {
  children: React.ReactNode;
  as?: 'p' | 'span' | 'h1' | 'h2' | 'div';
  color?:
    | 'black'
    | 'white'
    | 'gray-900'
    | 'gray-800'
    | 'gray-700'
    | 'gray-600'
    | 'gray-500'
    | 'gray-400'
    | 'gray-300'
    | 'gray-200'
    | 'gray-100'
    | 'brown'
    | 'primary';
  variant: TypographyVariant;
  className?: string;
}

export type TypographyVariant =
  | 'H0_Bold'
  | 'H1_Bold'
  | 'H2_Semibold'
  | 'T1_Regular'
  | 'T2_Semibold'
  | 'T3_Semibold'
  | 'T4_Regular'
  | 'B1_Semibold'
  | 'B2_Medium'
  | 'B3_Regular'
  | 'C1_Semibold'
  | 'C2_Regular'
  | 'C3_Regular';

export interface LogoProps {
  variant?: 'header' | 'auth' | 'footer';
  clickable?: boolean;
  className?: string;
}

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export interface GridGroupProps {
  children: React.ReactNode;
  columns: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 11 | 12;
  maxWidth?: string;
  className?: string;
}

export interface SideBarSectionItems {
  to: string;
  title: string;
  onClick: () => void;
}
