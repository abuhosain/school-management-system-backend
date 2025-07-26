import { createNoticeZodSchema, updateNoticeZodSchema } from "./notice.validations";

export const NoticeValidations = {
  create: createNoticeZodSchema,
  update: updateNoticeZodSchema,
};