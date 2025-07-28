import express from 'express';
import { StudentControllers } from '../controller/student.controller';

const router = express.Router();

router.get('/:id', StudentControllers.getSingleStuent);
router.get('/', StudentControllers.getAllStuent);

export const StudentRoutes = router;
