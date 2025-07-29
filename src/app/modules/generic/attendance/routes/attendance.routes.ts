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

router.get('/student/:id', AttendanceControllers.getAttendanceByStudent);
router.get(
  '/organization/:id',
  AttendanceControllers.getAttendanceByOrganization,
);

export const AttendanceRoutes = router;
