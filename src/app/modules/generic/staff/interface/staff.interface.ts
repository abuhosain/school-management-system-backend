import { Types } from "mongoose";

export interface IStaff {
  user: Types.ObjectId;
  organization: Types.ObjectId;
  designation: string;
  join_date: Date;
}
