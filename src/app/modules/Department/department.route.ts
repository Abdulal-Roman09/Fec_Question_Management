
import express, { NextFunction, Request, Response } from 'express';
import { fileUploader } from '../../../halpers/multer';
import { DepartmentValidationSchema } from './department.validation';
import { DepartmentController } from './department.controller';


const router = express.Router();

router.post(
    "/create-department",
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = DepartmentValidationSchema.createDepartment.parse(JSON.parse(req.body.data))
        return DepartmentController.createDepartment(req, res, next)
    }
)

router.get(
    "/",
    DepartmentController.getAllFromDB
)

router.delete(
    "/:id",
    DepartmentController.deleteFromDB
)


export const DepartmentRoutes = router;