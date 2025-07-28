import { Router } from 'express';
import { AuthRoutes } from '../modules/shared/auth/routes/auth.routes';
import { DepartmentRoutes } from '../modules/generic/department/routes/department.routes';
import { UserRoutes } from '../modules/global/user/routes/user.routes';
import { StudentRoutes } from '../modules/generic/student/routes/student.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/department',
    route: DepartmentRoutes,
  },
  {
    path: '/student',
    route: StudentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
