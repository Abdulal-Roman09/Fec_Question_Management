import express from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { DepartmentRoutes } from '../modules/Department/department.route';
import { QuestionRoutes } from '../modules/Question/question.route';
import { StudentRoutes } from '../modules/Student/student.route';


const router = express.Router();

const moduleRoutes = [
    {
        path: '/user',
        route: UserRoutes,
    },
    {
        path: '/student',
        route: StudentRoutes,
    },
    {
        path: '/department',
        route: DepartmentRoutes
    },
    {
        path: '/question',
        route: QuestionRoutes
    },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;