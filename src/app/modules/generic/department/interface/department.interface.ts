import { Types } from 'mongoose';

export interface IDepartment {
  name: string;
  organization: Types.ObjectId;
}
