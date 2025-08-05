import { type SVGProps } from 'react';
const InputDeleteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <circle cx={12} cy={12} r={8} fill="currentColor" />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m9.334 9.333 5.333 5.334M14.667 9.333l-5.333 5.334"
    />
  </svg>
);
export default InputDeleteIcon;
