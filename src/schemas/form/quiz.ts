import { z } from "zod";

export const quizCreationSchema = z.object({
  topic: z
    .string()
    .min(3, { message: "Topic must be at least 3 characters long!" })
    .max(20, {
      message: "Topic must be at most 20 characters long",
    }),
  type: z.enum(["mcq", "open-ended"]),
  amount: z.number().min(1).max(10),
});
