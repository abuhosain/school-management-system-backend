import { z } from 'zod';

export const teacherZodSchema = z.object({
  body: z.object({
    user: z.string().min(1, 'User ID is required'),
    organization: z.string().min(1, 'Organization ID is required'),
    department: z.string().min(1, 'Department is required'),
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
    phone: z.number().int().min(1, 'Phone number is required'),
    ephone: z.number().int().min(1, 'Emergency phone number is required'),
    profilePicture: z.string().optional(),
    designation: z.string().min(1, 'Designation is required'),
    join_date: z.date(),
  }),
});

export const createTeacherZodSchema = teacherZodSchema;

export const updateTeacherZodSchema = z.object({
  body: teacherZodSchema.shape.body.partial(),
});

// Types
export type TeacherInput = z.infer<typeof teacherZodSchema>;
export type CreateTeacherInput = z.infer<typeof createTeacherZodSchema>;
export type UpdateTeacherInput = z.infer<typeof updateTeacherZodSchema>;
