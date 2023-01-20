import { z } from 'zod';
import { tuple } from './tuple';

export const validate = <T>(target: any, zodSchema: z.ZodType<T>) => {
  const result = zodSchema.safeParse(target);
  if (!result.success) {
    return tuple(result.error.format(), undefined);
  }
  return tuple(undefined, result.data);
};
