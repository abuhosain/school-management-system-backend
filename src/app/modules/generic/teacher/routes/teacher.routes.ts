import express from 'express';
import { TeacherControllers } from '../controller/teacher.controller';

const router = express.Router();

router.get('/:id', TeacherControllers.getSingleTeacher);

export const TeacherRoutes = router;
