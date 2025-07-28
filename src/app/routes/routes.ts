import { Router } from 'express';
import { AuthRoutes } from '../modules/shared/auth/routes/auth.routes';
import { DepartmentRoutes } from '../modules/generic/department/routes/department.routes';
import { UserRoutes } from '../modules/global/user/routes/user.routes';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
