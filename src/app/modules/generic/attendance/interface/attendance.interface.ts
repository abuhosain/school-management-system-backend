import { Types } from 'mongoose';

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'leave';

export interface IAttendance {
  organization: Types.ObjectId;
  student: Types.ObjectId;
  class: number;
  session: number;
  date: Date;
  status: AttendanceStatus;
  department: Types.ObjectId;
  group?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
