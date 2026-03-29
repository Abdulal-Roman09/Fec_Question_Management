
import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import { fileUploader } from '../../../halpers/multer';
import { userValidationSchema } from './user.validation';


const router = express.Router();

router.post(
    "/create-admin",
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = userValidationSchema.createAdmin.parse(JSON.parse(req.body.data))
        return UserController.createAdmin(req, res, next)
    }
)

router.post(
    "/create-student",
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = userValidationSchema.createStudent.parse(JSON.parse(req.body.data))
        return UserController.createAdmin(req, res, next)
    }
)


export const UserRoutes = router;