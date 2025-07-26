import { createOrganizationZodSchema } from './organization.validatioins';

export const organizationValidations = {
  create: createOrganizationZodSchema,
  update: createOrganizationZodSchema,
};
