import { model, Schema } from 'mongoose';
import { IStaff } from '../../interface/staff.interface';

const staffSchema = new Schema<IStaff>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
    designation: { type: String, required: true, trim: true },
    join_date: { type: Date, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Staff = model<IStaff>('Staff', staffSchema);
