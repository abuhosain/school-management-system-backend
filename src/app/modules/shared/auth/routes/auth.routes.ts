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

export const AuthRoutes = router;
