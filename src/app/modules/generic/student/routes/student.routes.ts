import express from 'express';
import { StudentControllers } from '../controller/student.controller';

const router = express.Router();

router.get('/:id', StudentControllers.getSingleStuent);
router.get('/', StudentControllers.getAllStuent);
router.get('/organization/:id', StudentControllers.getAllStuentByOrganization);

export const StudentRoutes = router;
