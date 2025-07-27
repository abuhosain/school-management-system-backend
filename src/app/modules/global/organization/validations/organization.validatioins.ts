import { z } from 'zod';

export const planTypeEnum = z.enum(['monthly', 'lifetime']);
export const subscriptionStatusEnum = z.enum(['active', 'expired']);

export const organizationZodSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    subdomain: z
      .string()
      .min(3, 'Subdomain must be at least 3 characters')
      .regex(
        /^[a-z0-9-]+$/,
        'Subdomain can only contain lowercase letters, numbers and hyphens',
      ),
    customdomain: z.string().url().optional(),
    email: z.string().email('Invalid email format'),
    phone: z
      .number()
      .int('Phone number must be an integer')
      .min(1000000000, 'Phone number must be at least 10 digits'),
    address: z.string().min(1, 'Address is required'),
    plan_type: planTypeEnum,
    subscription_status: subscriptionStatusEnum,
    createdAt: z.date().optional(),
    expire_at: z.date().optional(),
  }),
});

export const createOrganizationZodSchema = organizationZodSchema.extend({
  body: organizationZodSchema.shape.body.omit({ createdAt: true }),
});

export const updateOrganizationZodSchema = z.object({
  body: organizationZodSchema.shape.body.partial(),
});

// Types
export type OrganizationInput = z.infer<typeof organizationZodSchema>;
export type CreateOrganizationInput = z.infer<
  typeof createOrganizationZodSchema
>;
export type UpdateOrganizationInput = z.infer<
  typeof updateOrganizationZodSchema
>;
