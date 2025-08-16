import { type SVGProps } from 'react';
const LocationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M12 3C8.134 3 5 6.058 5 9.83c0 1.926.5 4.33 3 6.866l2.73 2.77a1.777 1.777 0 0 0 2.54 0l2.73-2.77c2.5-2.536 3-5.007 3-6.867C19 6.058 15.866 3 12 3Z"
    />
  </svg>
);

export default LocationIcon;
