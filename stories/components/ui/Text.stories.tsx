import Text from '@/shared/components/ui/Text';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/UI/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'H0_Bold',
        'H1_Bold',
        'H2_Semibold',
        'T1_Regular',
        'T2_Semibold',
        'T3_Semibold',
        'T4_Regular',
        'B1_Semibold',
        'B2_Medium',
        'B3_Regular',
        'C1_Semibold',
        'C2_Regular',
        'C3_Regular',
      ],
    },
    color: {
      control: 'select',
      options: [
        'black',
        'white',
        'gray-900',
        'gray-800',
        'gray-700',
        'gray-600',
        'gray-500',
        'gray-400',
        'gray-300',
        'gray-200',
        'gray-100',
        'purple',
        'brown',
        'primary',
      ],
    },
    as: {
      control: 'select',
      options: ['p', 'span', 'h1', 'h2', 'div'],
    },
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading: Story = {
  args: {
    variant: 'H1_Bold',
    children: 'Heading Text',
    as: 'h1',
  },
};

export const Body: Story = {
  args: {
    variant: 'B1_Semibold',
    children: 'Body Text',
    as: 'p',
  },
};

export const Caption: Story = {
  args: {
    variant: 'C1_Semibold',
    children: 'Caption Text',
    as: 'span',
  },
};

export const Primary: Story = {
  args: {
    variant: 'T2_Semibold',
    color: 'primary',
    children: 'Primary Color Text',
  },
};

export const Purple: Story = {
  args: {
    variant: 'B2_Medium',
    color: 'purple',
    children: 'Purple Color Text',
  },
};
