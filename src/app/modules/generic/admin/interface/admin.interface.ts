import { Types } from 'mongoose';

export interface IAdmin {
  user: Types.ObjectId;
  organization: Types.ObjectId;
  department: Types.ObjectId;
  name: string;
  email: string;
  phone: number;
  ephone: number;
  profilePicture?: string;
  join_date: Date;
}
