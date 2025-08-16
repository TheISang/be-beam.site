import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/RadioGroup';
import { Label } from '@/shared/components/ui/Label';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/UI/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option1" id="r1" />
        <Label htmlFor="r1">Option 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option2" id="r2" />
        <Label htmlFor="r2">Option 2</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option3" id="r3" />
        <Label htmlFor="r3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
  args: {
    defaultValue: 'option1',
  },
};

export const Disabled: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option1" id="r1" disabled />
        <Label htmlFor="r1">Disabled Option 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option2" id="r2" disabled />
        <Label htmlFor="r2">Disabled Option 2</Label>
      </div>
    </RadioGroup>
  ),
  args: {},
};
