import { z } from "zod";

export const authSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.email("Invalid email"),
});

export type AuthFormData = z.infer<typeof authSchema>;

export type ErrorAuthState = {
  email: string | null;
  password: string | null;
  general: string | null;
};
