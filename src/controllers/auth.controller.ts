import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
    static async cadastrar(req: Request, res: Response) {
        const { nome, email, password } = req.body;
        const data = await new AuthService().cadastrar(nome, email, password);
        res.status(201).json({ data });
    }

    static async logar(req: Request, res: Response) {
        const { email, password } = req.body;
        const data = await new AuthService().logar(email, password);
        res.status(201).json({ data });
    }
}
