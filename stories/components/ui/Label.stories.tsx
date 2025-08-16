import { Label } from '@/shared/components/ui/Label';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Label',
  },
};

export const Required: Story = {
  args: {
    children: (
      <>
        Required Field
        <span className="text-error">*</span>
      </>
    ),
  },
};
