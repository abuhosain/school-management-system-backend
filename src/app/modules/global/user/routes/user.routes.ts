import expres from 'express';
import { multerUpload } from '../../../../../config/multer.config';
import auth from '../../../../middleware/auth';
import { USER_ROLE } from '../user.constance';
import { UserController } from '../controller/user.controller';

const router = expres.Router();

router.post(
  '/create-student',
  multerUpload.single('file'),
  auth(USER_ROLE.teacher, USER_ROLE.admin),
  UserController.createStudent,
);

export const UserRoutes = router;
