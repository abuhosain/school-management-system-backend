import { z } from 'zod';

export const departmentZodSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Department name is required'),
    organization: z.string().min(1, 'Organization ID is required'), // should be ObjectId string
  }),
});

export const createDepartmentZodSchema = departmentZodSchema;

export const updateDepartmentZodSchema = z.object({
  body: departmentZodSchema.shape.body.partial(),
});

// Types
export type DepartmentInput = z.infer<typeof departmentZodSchema>;
export type CreateDepartmentInput = z.infer<typeof createDepartmentZodSchema>;
export type UpdateDepartmentInput = z.infer<typeof updateDepartmentZodSchema>;
