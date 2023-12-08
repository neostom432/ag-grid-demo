import { z } from "zod";

export const APIErrorSchema = z.object({
  errorCode: z.string().nullable().optional(),
  errors: z.string().nullable().optional(),
  error: z.string().nullable().optional(),
  message: z.string().nullable().optional(),
  path: z.string(),
  status: z.number(),
  timestamp: z.string(),
});

declare global {
  type APIError = z.infer<typeof APIErrorSchema>;
}
