import express from 'express';
import { StudentControllers } from '../controller/student.controller';
import { multerUpload } from '../../../../../config/multer.config';
import { USER_ROLE } from '../../../global/user/user.constance';
import auth from '../../../../middleware/auth';
import validateRequest from '../../../../middleware/validateRequest';
import { StudentValidations } from '../validations';

const router = express.Router();

router.get('/:id', StudentControllers.getSingleStuent);
router.get('/', StudentControllers.getAllStuent);
router.get('/organization/:id', StudentControllers.getAllStuentByOrganization);
router.put(
  '/ ',
  multerUpload.single('file'),
  auth(USER_ROLE.teacher, USER_ROLE.admin, USER_ROLE.student),
  validateRequest(StudentValidations.update),
  StudentControllers.updateStuent,
);

export const StudentRoutes = router;
