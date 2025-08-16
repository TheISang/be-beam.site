import { type SVGProps } from 'react';
const ArrowUpIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="m6 15 5.93-5.93a.1.1 0 0 1 .14 0L18 15"
    />
  </svg>
);
export default ArrowUpIcon;
