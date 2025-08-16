import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/components/ui/Pagination';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router';

const meta = {
  title: 'Components/UI/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious to="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink to="#" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink to="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink to="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext to="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

export const WithMorePages: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious to="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink to="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink to="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink to="#" isActive>
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink to="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink to="#">5</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext to="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

export const FirstPage: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious to="#" aria-disabled />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink to="#" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink to="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink to="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext to="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

export const LastPage: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious to="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink to="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink to="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink to="#" isActive>
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext to="#" aria-disabled />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};
