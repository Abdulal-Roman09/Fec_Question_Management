
import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post(
    "/create-admin",
    UserController.createAdmin
)

router.post(
    "/c",
    UserController.createAdmin
)

export const UserRoutes = router;