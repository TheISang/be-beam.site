import { type SVGProps } from 'react';

const ArrowDownFillIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={props.width || '24'}
    height={props.height || '24'}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.0607 15.9393L17.4393 11.5607C18.3843 10.6157 17.715 9 16.3787 9L7.62132 9C6.28496 9 5.61571 10.6157 6.56066 11.5607L10.9393 15.9393C11.5251 16.5251 12.4749 16.5251 13.0607 15.9393Z"
      fill="currentColor"
    />
  </svg>
);

export default ArrowDownFillIcon;
