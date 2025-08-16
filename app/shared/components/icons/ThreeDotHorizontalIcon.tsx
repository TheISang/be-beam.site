import { type SVGProps } from 'react';
const ThreeDotHorizontalIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <circle cx={5.669} cy={12} r={2} fill="currentColor" />
    <circle cx={12.168} cy={12} r={1.999} fill="currentColor" />
    <circle cx={18.668} cy={12.001} r={2} fill="currentColor" />
  </svg>
);
export default ThreeDotHorizontalIcon;
