import { Router } from "express";
import { authmiddleware } from "../middlewares/auth.middleware";
import { UserController } from "../controllers/user.controller";

export const userRoute = Router();

userRoute.get("/", authmiddleware, UserController.getAll);
userRoute.get("/:id", authmiddleware, UserController.getById);
