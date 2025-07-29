import { Schema, model } from 'mongoose';
import { IAttendance } from '../../interface/attendance.interface';

const attendanceSchema = new Schema<IAttendance>(
  {
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    class: { type: Number, required: true },
    session: { type: Number, required: true },
    date: { type: Date, required: true, default : Date.now },
    status: {
      type: String,
      enum: ['present', 'absent', 'late', 'leave'],
      default: 'absent',
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    group: { type: String,   trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Attendance = model<IAttendance>('Attendance', attendanceSchema);
