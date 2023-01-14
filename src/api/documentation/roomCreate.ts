import { z } from 'zod';

export const roomCreateReqBody = z.object({
  ownerId: z.string(),
  name: z.string().trim().min(1),
  password: z.string().optional(),
});
