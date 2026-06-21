import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 or more characters"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 or more characters"),
  email: z.email("Invalid email"),
  message: z.string().min(10, "Message must be at least 10 or more characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export type ErrorContactState = {
  name: string | null;
  phone: string | null;
  email: string | null;
  message: string | null;
  general: string | null;
};
