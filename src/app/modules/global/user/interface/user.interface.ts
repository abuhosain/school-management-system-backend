import { Model } from 'mongoose';
import { USER_ROLE } from '../user.constance';

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export interface IUser {
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

export interface UserModel extends Model<IUser> {
  isUserExistsByEmail(email: string): Promise<IUser>;

  isUserPasswordMatch(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}