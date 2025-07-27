import { model, Schema } from 'mongoose';
import { IOrganization } from '../../interface/organization.interface';

const planTypes = ['monthly', 'lifetime'] as const;
const subscriptionStatuses = ['active', 'expired'] as const;

const organizationSchema = new Schema<IOrganization>(
  {
    name: { type: String, required: true, trim: true },
    subdomain: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    customdomain: {
      type: String,
      required: false,
      lowercase: true,
      trim: true,
    },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true, trim: true },
    plan_type: { type: String, enum: planTypes, required: true },
    subscription_status: {
      type: String,
      enum: subscriptionStatuses,
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
    expire_at: { type: Date, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Organization = model<IOrganization>(
  'Organization',
  organizationSchema,
);
