import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { StatusFuncionario } from "../models/user.model";

export class UserController {
    static async getAll(req: Request, res: Response) {
        const { status } = req.query;
        const data = await new UserService().getAll(status as StatusFuncionario);
        res.json({ data });
    }
    static async getById(req: Request, res: Response) {
        const { id } = req.params;
        const data = await new UserService().getById(id);
        res.json({ data });
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params;
        const { nome, email, status } = req.body;
        const data = await new UserService().update(id, nome, email, status as StatusFuncionario);

        res.json({ data });
    }
}
