import express from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { DepartmentRoutes } from '../modules/Department/department.route';


const router = express.Router();

const moduleRoutes = [
    {
        path: '/user',
        route: UserRoutes,
    },
    {
        path: '/department',
        route: DepartmentRoutes
    },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;