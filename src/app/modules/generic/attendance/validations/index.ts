import {
  createAttendanceZodSchema,
  updateAttendanceZodSchema,
} from './attendance.validations';

export const AttendanceValidations = {
  create: createAttendanceZodSchema,
  update: updateAttendanceZodSchema,
};
