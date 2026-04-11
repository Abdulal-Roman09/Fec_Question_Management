
import express, { NextFunction, Request, Response } from 'express';
import { fileUploader } from '../../../halpers/multer';
import { QuestionValidationSchema } from './question.validation';
import { QuestionController } from './question.controller';


const router = express.Router();

router.post(
    "/create-Question",
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = QuestionValidationSchema.createQuestion.parse(JSON.parse(req.body.data))
        return QuestionController.createQuestion(req, res, next)
    }
)

router.get(
    "/",
    QuestionController.getAllFromDB
)

router.delete(
    "/:id",
    QuestionController.deleteFromDB
)


export const QuestionRoutes = router;