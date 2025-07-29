import express from 'express';
import { TeacherControllers } from '../controller/teacher.controller';

const router = express.Router();

router.get('/:id', TeacherControllers.getSingleTeacher);

router.get('/', TeacherControllers.getAllTeachers);

router.get('/organization/:id', TeacherControllers.getAllTeacherByOrganization);

export const TeacherRoutes = router;
