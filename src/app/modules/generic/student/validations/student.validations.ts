import { z } from 'zod';
import { Types } from 'mongoose';

const objectId = z.instanceof(Types.ObjectId);

export const studentZodSchema = z.object({
  body: z.object({
    user: objectId,
    organization: objectId,
    department: objectId,
    roll_no: z.number(),
    reg_no: z.number(),
    class: z.number(),
    group: z.string().min(1, 'Group is required'),
    session: z.number(),
    gender: z.enum(['Male', 'Female']),
    dob: z.date().min(1, 'Date of birth is required'),  
    blood_group: z.string().min(1, 'Blood group is required'),
  }),
});

export const createStudentZodSchema = studentZodSchema;

export const updateStudentZodSchema = z.object({
  body: studentZodSchema.shape.body.partial(),
});

// Types
export type StudentInput = z.infer<typeof studentZodSchema>;
export type CreateStudentInput = z.infer<typeof createStudentZodSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentZodSchema>;
