import express from 'express';
import auth from '../../../../middleware/auth';
import { USER_ROLE } from '../../../global/user/user.constance';
import { ResultController } from '../controller/result.controller';
import validateRequest from '../../../../middleware/validateRequest';
import { ResultValidatoin } from '../validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.staff, USER_ROLE.teacher),
  validateRequest(ResultValidatoin.create),
  ResultController.creteResult,
);

router.get('/organization/:id', ResultController.getAllResultByOrganization);

router.get('/student', ResultController.getResultByStudent);
router.get('/public', ResultController.getPublicResult);

export const ResultRoutes = router;
