import { Types } from 'mongoose';
import { z } from 'zod';

const objectId = z.instanceof(Types.ObjectId);

export const staffZodSchema = z.object({
  body: z.object({
    user: objectId,
    organization: objectId,
    designation: z.string().min(1, 'Designation is required'),
    join_date: z.date(),
  }),
});

export const createStaffZodSchema = staffZodSchema;

export const updateStaffZodSchema = z.object({
  body: staffZodSchema.shape.body.partial(),
});

// Types
export type StaffInput = z.infer<typeof staffZodSchema>;
export type CreateStaffInput = z.infer<typeof createStaffZodSchema>;
export type UpdateStaffInput = z.infer<typeof updateStaffZodSchema>;
