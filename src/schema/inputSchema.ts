import { z } from 'zod';

export const userInputValidation = z.object({
  topic: z.string()
    .trim()
    .min(1, "Topic is required")
    .max(100, "Topic must be 100 characters or less"),
  submitterName: z.string()
    .trim()
    .min(1, "Name is required")
    .max(50, "Name must be 50 characters or less")
    .regex(/^[a-zA-Z\s]+$/, "Name must contain only alphabets and spaces")
});