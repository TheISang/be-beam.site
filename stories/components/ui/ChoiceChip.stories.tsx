import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChoiceChip, ChoiceChipItem } from '@/shared/components/ui/ChoiceChip';

const meta = {
  title: 'Components/UI/ChoiceChip',
  component: ChoiceChip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'ChoiceChip 컴포넌트는 사용자에게 하나 또는 여러 개의 항목을 선택할 수 있도록 합니다. `alwaysSelected` 속성을 사용하면 최소 하나의 값이 선택되도록 기능을 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    type: 'single',
  },
} satisfies Meta<typeof ChoiceChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <ChoiceChip type="single">
      <ChoiceChipItem value="option1">Option 1</ChoiceChipItem>
      <ChoiceChipItem value="option2">Option 2</ChoiceChipItem>
      <ChoiceChipItem value="option3">Option 3</ChoiceChipItem>
    </ChoiceChip>
  ),
};

export const AlwaysSelected: Story = {
  render: () => (
    <ChoiceChip type="single" alwaysSelected defaultValue="option1">
      <ChoiceChipItem value="option1">Option 1</ChoiceChipItem>
      <ChoiceChipItem value="option2">Option 2</ChoiceChipItem>
      <ChoiceChipItem value="option3">Option 3</ChoiceChipItem>
    </ChoiceChip>
  ),
};

export const MultipleSelection: Story = {
  render: () => (
    <ChoiceChip type="multiple" alwaysSelected defaultValue={['option1']}>
      <ChoiceChipItem value="option1">Option 1</ChoiceChipItem>
      <ChoiceChipItem value="option2">Option 2</ChoiceChipItem>
      <ChoiceChipItem value="option3">Option 3</ChoiceChipItem>
      <ChoiceChipItem value="option4">Option 4</ChoiceChipItem>
    </ChoiceChip>
  ),
};
