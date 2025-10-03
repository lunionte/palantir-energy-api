import { Router } from "express";
import { authmiddleware } from "../middlewares/auth.middleware";
import { UserController } from "../controllers/user.controller";
import { celebrate, Segments } from "celebrate";
import { queryParamsSchema, updateUserSchema } from "../models/user.model";

export const userRoute = Router();

userRoute.get(
    "/",
    celebrate({ [Segments.QUERY]: queryParamsSchema }),
    authmiddleware,
    UserController.getAll
);
userRoute.get("/:id", authmiddleware, UserController.getById);
userRoute.patch(
    "/update/:id",
    celebrate({ [Segments.BODY]: updateUserSchema }),
    authmiddleware,
    UserController.update
);
