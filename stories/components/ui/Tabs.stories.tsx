import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/shared/components/ui/Tabs';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args} className="w-96">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="mt-4">
        <div className="rounded border p-4">
          Content for Tab 1. This is the first tab content.
        </div>
      </TabsContent>
      <TabsContent value="tab2" className="mt-4">
        <div className="rounded border p-4">
          Content for Tab 2. This is the second tab content.
        </div>
      </TabsContent>
      <TabsContent value="tab3" className="mt-4">
        <div className="rounded border p-4">
          Content for Tab 3. This is the third tab content.
        </div>
      </TabsContent>
    </Tabs>
  ),
  args: {
    defaultValue: 'tab1',
  },
};

export const DisabledTab: Story = {
  render: (args) => (
    <Tabs {...args} className="w-96">
      <TabsList>
        <TabsTrigger value="enabled">Enabled</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="another">Another</TabsTrigger>
      </TabsList>
      <TabsContent value="enabled" className="mt-4">
        <div className="rounded border p-4">
          This tab is enabled and active.
        </div>
      </TabsContent>
      <TabsContent value="another" className="mt-4">
        <div className="rounded border p-4">This is another enabled tab.</div>
      </TabsContent>
    </Tabs>
  ),
  args: {
    defaultValue: 'enabled',
  },
};
