export type PlanType = 'monthly' | 'lifetime';
export type SubscriptionStatus = 'active' | 'expired';

export interface IOrganization {
  name: string;
  subdomain: string;
  customdomain: string;
  email: string;
  phone: number;
  address: string;
  plan_type: PlanType;
  subscription_status: SubscriptionStatus;
  createdAt?: Date;
  updatedAt?: Date;
  expire_at?: Date;
}
