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

router.put(
  '/:id',
  auth(USER_ROLE.staff, USER_ROLE.teacher, USER_ROLE.teacher),
  validateRequest(AttendanceValidations.update),
  AttendanceControllers.updateAttendance,
);
  
export const AttendanceRoutes = router;
