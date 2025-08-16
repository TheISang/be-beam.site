import { z } from 'zod';

export const GuideBookListFilterSchema = z.object({
  // search: z.string().default(''),
  type: z
    .enum([
      'all',
      'communication',
      'engagement',
      'planning',
      'operation',
      'support',
    ])
    .default('all'),
  targetType: z.enum(['all', 'planner', 'member']).default('all'),
  // mode: z.enum(['all', 'offline', 'online', 'mix']).default('all'),
  level: z.enum(['all', 'before', 'ongoing', 'completed']).default('all'),
  time: z.enum(['all', 'under30min', 'under1hour', 'over1hour']).default('all'),
});

export type GuideBookListFilters = z.infer<typeof GuideBookListFilterSchema>;
