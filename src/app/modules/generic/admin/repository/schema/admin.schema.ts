import { Schema } from "mongoose";
import { IAdmin } from "../../interface/admin.interface";

const adminSchema = new Schema<IAdmin>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  ephone: { type: Number, required: true, unique: true },
  profilePicture: { type: String, default: '' },
  join_date: { type: Date, required: true },
}, {
  timestamps: true,
  versionKey: false,
})