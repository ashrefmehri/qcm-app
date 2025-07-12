import { z } from "zod";

export const profileSchema = z.object({
  school: z.string().min(1, { message: "School is required" }),
  section: z.string().min(1, { message: "Section is required" }),
  isCompleted: z.boolean().optional(),
  role: z.enum(["student", "teacher"]).optional(), // Optional, default to "student"
});