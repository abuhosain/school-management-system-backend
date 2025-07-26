import { model, Schema } from 'mongoose';
import { ITeacher } from '../../inteface/tacher.interface';

const teacherSchema = new Schema<ITeacher>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Department',
    },
    designation: { type: String, required: true, trim: true },
    join_date: { type: Date, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Teacher = model<ITeacher>('Teacher', teacherSchema);
