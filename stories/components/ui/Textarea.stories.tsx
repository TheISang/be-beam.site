import { Textarea } from '@/shared/components/ui/Textarea';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/UI/Textarea',
  component: Textarea,
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
    maxLength: {
      control: 'number',
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    className: 'w-[400px]',
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter your description...',
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Comments',
    placeholder: 'Enter your comments...',
    description: 'Please provide detailed feedback',
  },
};

export const WithError: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
    error: 'This field is required',
  },
};

export const WithMaxLength: Story = {
  args: {
    label: 'Limited Text',
    placeholder: 'Type something...',
    maxLength: 100,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Textarea',
    placeholder: 'Cannot edit this...',
    disabled: true,
  },
};
