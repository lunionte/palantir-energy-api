import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authmiddleware } from "../middlewares/auth.middleware";
import { celebrate, Segments } from "celebrate";
import { loginSchema, newPasswordSchema, newUserSchema } from "../models/user.model";

export const authRoute = Router();

authRoute.post(
    "/register",
    authmiddleware,
    celebrate({ [Segments.BODY]: newUserSchema }),
    AuthController.cadastrar
);
authRoute.post("/login", celebrate({ [Segments.BODY]: loginSchema }), AuthController.logar);
authRoute.post(
    "/update-password",
    celebrate({ [Segments.BODY]: newPasswordSchema }),
    authmiddleware,
    AuthController.updatePassword
);
