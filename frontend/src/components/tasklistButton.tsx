import { memo, SVGProps } from 'react';

const TasklistButton = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 320 80' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M0 5C0 2.23858 2.23858 0 5 0H315C317.761 0 320 2.23858 320 5V75C320 77.7614 317.761 80 315 80H5C2.23858 80 0 77.7614 0 75V5Z'
      fill='#D9C4E3'
    />
  </svg>
);
const Memo = memo(TasklistButton);
export { Memo as TasklistButton };