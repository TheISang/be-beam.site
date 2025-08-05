import { type SVGProps } from 'react';
const ImageIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M5 21c-.55 0-1.02-.196-1.412-.587A1.93 1.93 0 0 1 3 19V5c0-.55.196-1.02.588-1.412A1.93 1.93 0 0 1 5 3h14c.55 0 1.021.196 1.413.588.392.392.588.863.587 1.412v14c0 .55-.196 1.021-.587 1.413A1.92 1.92 0 0 1 19 21H5Zm2-4h10c.2 0 .35-.092.45-.275a.44.44 0 0 0-.05-.525l-2.75-3.675a.475.475 0 0 0-.4-.2c-.167 0-.3.067-.4.2L11.25 16 9.4 13.525a.475.475 0 0 0-.4-.2c-.167 0-.3.067-.4.2l-2 2.675a.44.44 0 0 0-.05.525c.1.183.25.275.45.275Z"
    />
  </svg>
);
export default ImageIcon;
