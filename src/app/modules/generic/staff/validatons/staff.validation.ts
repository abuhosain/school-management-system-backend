import { Types } from 'mongoose';
import { z } from 'zod';

const objectId = z.instanceof(Types.ObjectId);

export const staffZodSchema = z.object({
  body: z.object({
    user: objectId,
    organization: objectId,
    designation: z.string().min(1, 'Designation is required'),
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
    phone: z.number().int().min(1, 'Phone number is required'),
    ephone: z.number().int().min(1, 'Emergency phone number is required'),
    profilePicture: z.string().optional(),
    join_date: z.date().optional(),
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
