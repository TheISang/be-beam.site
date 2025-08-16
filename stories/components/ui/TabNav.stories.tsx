import { TabNav, TabNavLink } from '@/shared/components/ui/TabNav';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';

const meta = {
  title: 'Components/UI/TabNav',
  component: TabNav,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/tab1']}>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TabNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TabNav className="w-96">
      <TabNavLink to="#tab1" isActive={true}>
        Tab 1
      </TabNavLink>
      <TabNavLink to="#tab2">Tab 2</TabNavLink>
      <TabNavLink to="#tab3">Tab 3</TabNavLink>
    </TabNav>
  ),
};

export const WithActiveStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">First Tab Active</h3>
        <TabNav className="w-96">
          <TabNavLink to="/home" isActive={true}>
            Home
          </TabNavLink>
          <TabNavLink to="/about">About</TabNavLink>
          <TabNavLink to="/contact">Contact</TabNavLink>
        </TabNav>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Second Tab Active</h3>
        <TabNav className="w-96">
          <TabNavLink to="/home">Home</TabNavLink>
          <TabNavLink to="/about" isActive={true}>
            About
          </TabNavLink>
          <TabNavLink to="/contact">Contact</TabNavLink>
        </TabNav>
      </div>
    </div>
  ),
};

export const ManyTabs: Story = {
  render: () => (
    <TabNav className="w-full max-w-2xl">
      <TabNavLink to="/overview" isActive={true}>
        Overview
      </TabNavLink>
      <TabNavLink to="/analytics">Analytics</TabNavLink>
      <TabNavLink to="/reports">Reports</TabNavLink>
      <TabNavLink to="/notifications">Notifications</TabNavLink>
      <TabNavLink to="/settings">Settings</TabNavLink>
      <TabNavLink to="/help">Help</TabNavLink>
    </TabNav>
  ),
};
