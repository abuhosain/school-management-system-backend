import { z } from 'zod';
import { Types } from 'mongoose';

const objectId = z.instanceof(Types.ObjectId);

const superAdminZodSchema = z.object({
  body: z.object({
    user: objectId,
    organization: objectId,
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
    phone: z.number().int().min(1, 'Phone number is required'),
    ephone: z.number().int().min(1, 'Emergency phone number is required'),
    profilePicture: z.string().optional(),
    join_date: z.date().optional(),
  }),
});

export const createSuperAdminZodSchema = superAdminZodSchema;
export const updateSuperAdminZodSchema = z.object({
  body: superAdminZodSchema.shape.body.partial(),
});

// Types
export type SuperAdminInput = z.infer<typeof superAdminZodSchema>;
export type CreateSuperAdminInput = z.infer<typeof createSuperAdminZodSchema>;
export type UpdateSuperAdminInput = z.infer<typeof updateSuperAdminZodSchema>;

