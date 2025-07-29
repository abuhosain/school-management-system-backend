import { z } from 'zod';
import { Types } from 'mongoose';

const objectId = z.instanceof(Types.ObjectId);
const statusEnum = z.enum(['present', 'absent', 'late', 'leave']);

export const attendanceZodSchema = z.object({
  body: z.object({
    organization: objectId,
    student: objectId,
    date: z.date(),
    status: statusEnum,
  }),
});

export const createAttendanceZodSchema = attendanceZodSchema;

export const updateAttendanceZodSchema = z.object({
  body: attendanceZodSchema.shape.body.partial(),
});

// Types
export type AttendanceInput = z.infer<typeof attendanceZodSchema>;
export type CreateAttendanceInput = z.infer<typeof createAttendanceZodSchema>;
export type UpdateAttendanceInput = z.infer<typeof updateAttendanceZodSchema>;
