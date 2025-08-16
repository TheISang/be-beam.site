import { z } from 'zod';

export const MeetingListFilterSchema = z.object({
  search: z.string().default(''),
  topic: z.string().default('all'),
  'recruitment-type': z.enum(['all', 'regular', 'small']).default('all'),
  'recruitment-status': z
    .enum([
      'all',
      'upcoming',
      'recruiting',
      'closed',
      'in_progress',
      'completed',
    ])
    .default('all'),
  mode: z.enum(['all', 'offline', 'online', 'mix']).default('all'),
  cost: z.enum(['all', 'free', 'cash']).default('all'),
  sort: z.enum(['likes', 'recent']).default('recent'),
});

export type MeetingListFilters = z.infer<typeof MeetingListFilterSchema>;
