import HeartIcon from '@/shared/components/icons/HeartIcon';
import { IconButton } from '@/shared/components/ui/IconButton';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/UI/IconButton',
  component: IconButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    variant: {
      control: 'radio',
      options: ['default', 'outline', 'ghost'],
    },
    size: {
      control: 'radio',
      options: ['md', 'lg'],
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'default',
    size: 'md',
    children: <HeartIcon />,
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'md',
    children: <HeartIcon />,
  },
};
