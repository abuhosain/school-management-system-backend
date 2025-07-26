import { z } from 'zod';
import { USER_ROLE } from '../user.constance';
 

export const userZodSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum([
      USER_ROLE.super_admin,
      USER_ROLE.admin,
      USER_ROLE.student,
      USER_ROLE.teacher,
      USER_ROLE.staf,
    ]).default(USER_ROLE.student),
    profile_image: z.string().url().optional(),
    phone: z
      .string()
      .min(7)
      .max(15)
      .regex(/^(\+\d{1,3})?\d{7,14}$/, 'Invalid phone number format'),
    emergency_number: z
      .string()
      .regex(/^(\+\d{1,3})?\d{7,14}$/, 'Invalid emergency number format'),
    is_deleted: z.boolean().optional().default(false),
    is_blocked: z.boolean().optional().default(false),
  }),
});
 
export const createUserZodSchema = userZodSchema.extend({
  body: userZodSchema.shape.body.omit({ is_deleted: true, is_blocked: true }),
});
 
export const updateUserZodSchema = z.object({
  body: userZodSchema.shape.body.partial(),
});

// Types
export type UserInput = z.infer<typeof userZodSchema>;
export type CreateUserInput = z.infer<typeof createUserZodSchema>;
export type UpdateUserInput = z.infer<typeof updateUserZodSchema>;
