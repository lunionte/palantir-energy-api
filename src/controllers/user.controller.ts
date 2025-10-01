import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
    static async getAll(req: Request, res: Response) {
        const data = await new UserService().getAll();
        res.json({ data });
    }
    static async getById(req: Request, res: Response) {
        const id = req.params.id;
        const data = await new UserService().getById(id);
        res.json({ data });
    }
}
