import { createReviewSchema } from '@/features/reviews/schemas/reviews';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

export default function useReviewForm() {
  const form = useForm<z.infer<typeof createReviewSchema>>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      rating: 0,
      content: '',
      images: [],
    },
  });

  return form;
}
