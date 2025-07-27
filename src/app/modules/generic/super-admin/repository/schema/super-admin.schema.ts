import { model, Schema } from "mongoose";
import { ISuperAdmin } from "../../interface/super-admin.interface";

const superAdminSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  ephone: { type: Number, required: true, unique: true },
  profilePicture: { type: String, default: '' },
  join_date: { type: Date, default: Date.now },
}, {
  timestamps: true,
  versionKey: false,
});
 
export const SuperAdmin = model<ISuperAdmin>('SuperAdmin', superAdminSchema);
