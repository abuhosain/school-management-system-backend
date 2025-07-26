import { USER_ROLE } from '../user.constance';

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  profile_image?: string;
  phone: string;
  emergency_number: string;
  is_deleted: boolean;
  is_blocked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
