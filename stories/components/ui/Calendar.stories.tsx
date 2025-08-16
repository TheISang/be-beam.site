import { Calendar } from '@/shared/components/ui/Calendar';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const meta = {
  title: 'Components/UI/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'multiple', 'range'],
    },
    showOutsideDays: {
      control: 'boolean',
    },
    captionLayout: {
      control: 'select',
      options: ['label', 'dropdown'],
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<Date | undefined>(new Date());

    return (
      <Calendar
        {...args}
        mode="single"
        selected={selected}
        onSelect={setSelected}
      />
    );
  },
  args: {
    showOutsideDays: true,
  },
};

export const Multiple: Story = {
  render: (args) => {
    const [dates, setDates] = useState<Date[]>([]);

    return (
      <Calendar
        {...args}
        mode="multiple"
        defaultMonth={dates[0]}
        required
        selected={dates}
        onSelect={setDates}
        max={5}
      />
    );
  },
  args: {
    showOutsideDays: true,
  },
};

export const Range: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<
      { from: Date | undefined; to?: Date | undefined } | undefined
    >();

    return (
      <Calendar
        {...args}
        mode="range"
        selected={selected}
        onSelect={setSelected}
      />
    );
  },
  args: {
    showOutsideDays: true,
  },
};
