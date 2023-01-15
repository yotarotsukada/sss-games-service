import { z } from 'zod';

export const create = {
  reqBody: z.object({
    ownerId: z.string(),
    name: z.string().trim().min(1),
    password: z.string().optional(),
  }),
};

export const readOne = {
  reqParams: z.object({
    id: z.string(),
  }),
};
