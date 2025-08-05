import { type SVGProps } from 'react';
const HeartIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M19.182 7.197c-1.649-1.596-4.321-1.596-5.97 0l-.915.887a.115.115 0 0 1-.159 0l-.916-.887c-1.648-1.596-4.32-1.596-5.97 0-1.648 1.597-1.691 5.255 0 7.461 1.582 2.062 5.945 4.36 6.509 4.652.04.021.076.048.112.076a.575.575 0 0 0 .665.017c.053-.037.104-.072.165-.096.634-.245 4.481-1.82 6.479-4.649 2.181-3.089 1.648-5.864 0-7.46Z"
      clipRule="evenodd"
    />
  </svg>
);
export default HeartIcon;
