import express from 'express';
import { DepartmentController } from '../controller/department.controller';
import auth from '../../../../middleware/auth';
import { USER_ROLE } from '../../../global/user/user.constance';

const router = express.Router();

router.post(
  '/create-department',
  auth(USER_ROLE.admin, USER_ROLE.teacher),
  DepartmentController.createDepartment,
);

router.get(
  'all-department/:id', 
  DepartmentController.getAllDepartmentByOrganizationId,
);

export const DepartmentRoutes = router;
