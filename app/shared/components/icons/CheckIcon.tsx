import { type SVGProps } from 'react';
const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="m9.55 15.15 8.475-8.475c.2-.2.434-.3.7-.3.267 0 .5.1.7.3.2.2.3.438.3.713a.97.97 0 0 1-.3.712l-9.175 9.2c-.2.2-.433.3-.7.3a.96.96 0 0 1-.7-.3L4.55 13a.932.932 0 0 1-.288-.712c.008-.275.113-.512.313-.713.2-.2.439-.3.713-.3.275 0 .512.1.712.3l3.55 3.575Z"
    />
  </svg>
);
export default CheckIcon;
