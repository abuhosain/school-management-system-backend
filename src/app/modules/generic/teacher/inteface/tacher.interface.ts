import { Types } from "mongoose";

export interface ITeacher {
  user: Types.ObjectId;
  organization: Types.ObjectId;
  department: Types.ObjectId;
  designation: string;
  join_date: Date;
}
