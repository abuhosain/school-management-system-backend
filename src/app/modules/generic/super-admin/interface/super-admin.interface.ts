import { Types } from "mongoose";

export interface ISuperAdmin {
  user: Types.ObjectId;
  organization: Types.ObjectId;
  name: string;
  email: string;
  phone: number;
  ephone: number;
  profilePicture?: string;
  join_date?: Date;
}