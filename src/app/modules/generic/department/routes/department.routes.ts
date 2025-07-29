import express from 'express';
import { DepartmentController } from '../controller/department.controller';
import auth from '../../../../middleware/auth';
import { USER_ROLE } from '../../../global/user/user.constance';
import validateRequest from '../../../../middleware/validateRequest';
import { DepartmentValidations } from '../validations';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(DepartmentValidations.create),
  auth(USER_ROLE.admin, USER_ROLE.teacher),
  DepartmentController.createDepartment,
);

router.get(
  'all-department/:id',
  DepartmentController.getAllDepartmentByOrganizationId,
);

router.get(
  '/all-department',
  auth(USER_ROLE.admin, USER_ROLE.teacher),
  DepartmentController.getAllDepartment,
);

router.get('/:id', DepartmentController.getSingleDepartment);

router.put(
  '/:id',
  validateRequest(DepartmentValidations.update),
  auth(USER_ROLE.admin, USER_ROLE.teacher),
  DepartmentController.updateDepartment,
);

export const DepartmentRoutes = router;
