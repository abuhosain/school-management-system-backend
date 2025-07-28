import expres from 'express';
import { multerUpload } from '../../../../../config/multer.config';
import auth from '../../../../middleware/auth';
import { USER_ROLE } from '../user.constance';
import { UserController } from '../controller/user.controller';
import validateRequest from '../../../../middleware/validateRequest';
import { StudentValidations } from '../../../generic/student/validations';

const router = expres.Router();

router.post(
  '/create-student',
  multerUpload.single('file'),
  auth(USER_ROLE.teacher, USER_ROLE.admin),
  validateRequest(StudentValidations.create),
  UserController.createStudent,
);

router.post(
  '/create-teacher',
  multerUpload.single('file'),
  auth(USER_ROLE.teacher, USER_ROLE.admin),
  validateRequest(StudentValidations.create),
  UserController.createTeacher,
);

export const UserRoutes = router;
