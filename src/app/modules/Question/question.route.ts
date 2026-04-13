import express, { NextFunction, Request, Response } from 'express';
import { fileUploader } from '../../../halpers/multer';
import { QuestionValidationSchema } from './question.validation';
import { QuestionController } from './question.controller';

const router = express.Router();

router.post(
    "/create-question",
    fileUploader.upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'file', maxCount: 1 }
    ]),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = QuestionValidationSchema.createQuestion.parse(JSON.parse(req.body.data))
        return QuestionController.insertInToDB(req, res, next)
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