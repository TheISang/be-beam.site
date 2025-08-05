import { type SVGProps } from 'react';
const EditIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M20.886 3.12a3.828 3.828 0 0 0-5.414 0l-1.1 1.102a.996.996 0 0 0-.15.148L3.302 15.292a1 1 0 0 0-.274.51l-1.008 5a1 1 0 0 0 1.176 1.18l5.008-1a1 1 0 0 0 .51-.274L20.886 8.536a3.828 3.828 0 0 0 0-5.414M15.004 6.42l2.586 2.586L7.514 19.08l-3.236.648.65-3.232L15.004 6.42Zm4 1.172-2.586-2.588.468-.468a1.828 1.828 0 1 1 2.586 2.584l-.468.472Z"
    />
  </svg>
);
export default EditIcon;
