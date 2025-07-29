import express from 'express';
import auth from '../../../../middleware/auth';
import { USER_ROLE } from '../../../global/user/user.constance';
import validateRequest from '../../../../middleware/validateRequest';
import { AttendanceValidations } from '../validations';
import { AttendanceControllers } from '../controller/attendance.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.teacher, USER_ROLE.staff),
  validateRequest(AttendanceValidations.create),
  AttendanceControllers.createAttendance,
);

export const AttendanceRoutes = router;
