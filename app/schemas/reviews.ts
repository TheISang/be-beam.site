import { z } from 'zod';

export const createReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  content: z.string().min(1).max(100),
  images: z.array(z.instanceof(File)).max(10),
});

export const updateReviewSchema = z
  .object({
    rating: z.number().min(1).max(5),
    content: z.string().min(1).max(100),
    existingImages: z.array(z.string()).max(10),
    newImages: z.array(z.instanceof(File)).max(10),
    id: z.number(),
  })
  .refine(
    (data) => data.existingImages.length + (data.newImages?.length || 0) <= 10,
    {
      message: '이미지는 최대 10장까지만 업로드 가능합니다.',
      path: ['newImages'],
    },
  );
