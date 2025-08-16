import { TextField, ClearButton } from '@/shared/components/ui/TextField';
import SearchIcon from '@/shared/components/icons/SearchIcon';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/UI/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    error: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Name',
    placeholder: 'Enter your name...',
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email...',
    description: 'We will never share your email',
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password...',
    error: 'Password must be at least 8 characters',
  },
};

export const WithRightSection: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    rightSection: <SearchIcon className="size-5 text-gray-500" />,
  },
};

export const WithClearButton: Story = {
  args: {
    label: 'Clearable Input',
    placeholder: 'Type something...',
    rightSection: <ClearButton />,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    placeholder: 'Cannot edit...',
    disabled: true,
  },
};
