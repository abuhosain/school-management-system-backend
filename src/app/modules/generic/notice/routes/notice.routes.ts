import express from 'express';
import auth from '../../../../middleware/auth';
import { USER_ROLE } from '../../../global/user/user.constance';
import validateRequest from '../../../../middleware/validateRequest';
import { NoticeController } from '../controller/notice.controller';
import { NoticeValidations } from '../validations';
const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.teacher, USER_ROLE.staff),
  validateRequest(NoticeValidations.create),
  NoticeController.createNotice,
);

router.get('/:id', NoticeController.getSingleNotice);

router.get('/organization/:id', NoticeController.getNoticeByOrgnization);

router.put(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.teacher, USER_ROLE.staff),
  validateRequest(NoticeValidations.update),
  NoticeController.updateNotice,
);

export const noticeRoutes = router;
