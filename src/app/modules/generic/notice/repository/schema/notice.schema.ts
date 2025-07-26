import { model, Schema } from 'mongoose';
import { INotice } from '../../interface/notice.interface';

const noticeSchema = new Schema<INotice>(
  {
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Notice = model<INotice>('Notice', noticeSchema);
