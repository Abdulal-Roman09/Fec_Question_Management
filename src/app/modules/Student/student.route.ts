import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();


router.get(
    "/",
    StudentController.getAllFromDB
)

router.delete(
    "/:id",
    StudentController.deleteFromDB
)


export const StudentRoutes = router;