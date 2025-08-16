import { type SVGProps } from 'react';
const XIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="m7.379 7.622 9.192 9.192M16.622 7.622 7.43 16.814"
    />
  </svg>
);
export default XIcon;
