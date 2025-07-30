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
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    ephone: { type: Number, required: true, unique: true },
    profilePicture: { type: String, default: '' },
    designation: { type: String, required: true, trim: true },
    join_date: { type: Date, required: true, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Teacher = model<ITeacher>('Teacher', teacherSchema);
