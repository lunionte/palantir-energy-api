import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserService } from "../services/user.service";

export const authmiddleware = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.url);

    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
        throw new Error("Token não fornecido");
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        // se não encontrar o usuário, o service já lança o erro
        const userData = await new UserService().getById(payload.id);

        req.user = {
            id: userData.id,
            nome: userData.nome,
            email: userData.email,
        };
    } catch (error) {
        console.error(error);
    }
    next();
};
