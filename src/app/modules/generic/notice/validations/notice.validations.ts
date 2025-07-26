import { z } from 'zod';
import { Types } from 'mongoose';

const objectId = z.instanceof(Types.ObjectId);

export const noticeZodSchema = z.object({
  body: z.object({
    organization: objectId,
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
  }),
});

export const createNoticeZodSchema = noticeZodSchema;

export const updateNoticeZodSchema = z.object({
  body: noticeZodSchema.shape.body.partial(),
});

// Types
export type NoticeInput = z.infer<typeof noticeZodSchema>;
export type CreateNoticeInput = z.infer<typeof createNoticeZodSchema>;
export type UpdateNoticeInput = z.infer<typeof updateNoticeZodSchema>;
