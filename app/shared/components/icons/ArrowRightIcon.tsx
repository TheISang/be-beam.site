import { type SVGProps } from 'react';
const ArrowRightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="m9 6 5.93 5.93a.1.1 0 0 1 0 .14L9 18"
    />
  </svg>
);
export default ArrowRightIcon;
