import { Types } from 'mongoose';
import { z } from 'zod';

const objectId = z.instanceof(Types.ObjectId);

const adminZodSchema = z.object({
  body: z.object({
    user: objectId,
    organization: objectId,
    department: objectId,
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
    phone: z.number().int().min(1, 'Phone number is required'),
    ephone: z.number().int().min(1, 'Emergency phone number is required'),
    profilePicture: z.string().optional(),
    join_date: z.date().optional(),
  }),
});

export const createAdminZodSchema = adminZodSchema;
export const updateAdminZodSchema = z.object({
  body: adminZodSchema.shape.body.partial(),
});


// Types
export type AdminInput = z.infer<typeof adminZodSchema>;
export type CreateAdminInput = z.infer<typeof createAdminZodSchema>;
export type UpdateAdminInput = z.infer<typeof updateAdminZodSchema>;
