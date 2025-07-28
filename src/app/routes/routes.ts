import { Router } from 'express';
import { AuthRoutes } from '../modules/shared/auth/routes/auth.routes';
import { DepartmentRoutes } from '../modules/generic/department/routes/department.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/department',
    route: DepartmentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
