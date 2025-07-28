import express from 'express';
import { AuthController } from '../controller/auth.controller';
import auth from '../../../../middleware/auth';
import { USER_ROLE } from '../../../global/user/user.constance';

const router = express.Router();

router.post(
  '/create-organization',
  auth(USER_ROLE.super_admin),
  AuthController.createOrganization,
);

router.post('/login', AuthController.loginUser);

router.post(
  '/change-password',
  auth(
    USER_ROLE.super_admin,
    USER_ROLE.admin,
    USER_ROLE.staff,
    USER_ROLE.student,
    USER_ROLE.teacher,
  ),
  AuthController.changePassword,
);

router.post(
  '/refresh-token',
  AuthController.refreshToken,
);

export const AuthRoutes = router;
