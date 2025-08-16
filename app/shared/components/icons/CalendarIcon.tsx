import { type SVGProps } from 'react';
const CalendarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M16.5 2.75a.75.75 0 0 1 .75.75v1.75h1.25A2.75 2.75 0 0 1 21.25 8v11a2.75 2.75 0 0 1-2.75 2.75h-13A2.75 2.75 0 0 1 2.75 19V8A2.75 2.75 0 0 1 5.5 5.25h1.25V3.5a.75.75 0 0 1 1.5 0v1.75h7.5V3.5a.75.75 0 0 1 .75-.75ZM4.25 19c0 .69.56 1.25 1.25 1.25h13c.69 0 1.25-.56 1.25-1.25v-7.75H4.25V19ZM5.5 6.75c-.69 0-1.25.56-1.25 1.25v1.75h15.5V8c0-.69-.56-1.25-1.25-1.25h-13Z"
    />
    <circle cx={8} cy={15.5} r={1} fill="currentColor" />
    <circle cx={12} cy={15.5} r={1} fill="currentColor" />
    <circle cx={16} cy={15.5} r={1} fill="currentColor" />
  </svg>
);
export default CalendarIcon;
