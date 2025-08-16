import { type SVGProps } from 'react';
const HeartFillIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M19.128 5.83a4.27 4.27 0 0 0-6.194 0l-.95.986a.113.113 0 0 1-.165 0l-.95-.986a4.27 4.27 0 0 0-6.194 0c-1.71 1.774-1.756 5.839 0 8.29 1.64 2.291 6.168 4.845 6.753 5.17.042.022.079.053.116.083.202.163.482.17.69.019.055-.04.108-.08.17-.106.659-.273 4.65-2.023 6.724-5.166 2.263-3.432 1.71-6.516 0-8.29Z"
      clipRule="evenodd"
    />
  </svg>
);
export default HeartFillIcon;
