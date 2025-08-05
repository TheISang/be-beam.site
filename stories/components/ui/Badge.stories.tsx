import Badge from '@/components/atoms/badge/Badge';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'purple', 'gray', 'tertiary', 'red', 'green'],
    },
    text: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: 'Primary Badge',
    variant: 'primary',
  },
};

export const Purple: Story = {
  args: {
    text: 'Purple Badge',
    variant: 'purple',
  },
};

export const Gray: Story = {
  args: {
    text: 'Gray Badge',
    variant: 'gray',
  },
};

export const Tertiary: Story = {
  args: {
    text: 'Tertiary Badge',
    variant: 'tertiary',
  },
};

export const Red: Story = {
  args: {
    text: 'Red Badge',
    variant: 'red',
  },
};

export const Green: Story = {
  args: {
    text: 'Green Badge',
    variant: 'green',
  },
};
