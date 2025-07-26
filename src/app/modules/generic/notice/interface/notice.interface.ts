import { Types } from 'mongoose';

export interface INotice {
  organization: Types.ObjectId;
  title: string;
  description: string;
  image: string;
}
