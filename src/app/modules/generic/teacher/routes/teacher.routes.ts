import express from 'express';
import { TeacherControllers } from '../controller/teacher.controller';
import { multerUpload } from '../../../../../config/multer.config';
import auth from '../../../../middleware/auth';
import { USER_ROLE } from '../../../global/user/user.constance';
import validateRequest from '../../../../middleware/validateRequest';
import { TeacherValidations } from '../validations';

const router = express.Router();

router.get('/:id', TeacherControllers.getSingleTeacher);

router.get('/', TeacherControllers.getAllTeachers);

router.get('/organization/:id', TeacherControllers.getAllTeacherByOrganization);

router.put(
  '/ ',
  multerUpload.single('file'),
  auth(USER_ROLE.student),
  validateRequest(TeacherValidations.update),
  TeacherControllers.updateTeacher,
);

export const TeacherRoutes = router;
