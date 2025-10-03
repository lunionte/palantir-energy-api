import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository";
import jwt from "jsonwebtoken";
import { UserService } from "./user.service";
import { ValidationError } from "../errors/validation.error";

export class AuthService {
    private userRepository;
    private userService;
    constructor() {
        this.userRepository = new UserRepository();
        this.userService = new UserService();
    }
    async cadastrar(nome: string, email: string, password: string) {
        const hashedPassowrd = await bcrypt.hash(password, 10);
        const userData = await this.userRepository.save(nome, email, hashedPassowrd);

        const token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET!, {
            expiresIn: "7d",
        });

        return token;
    }

    async logar(email: string, password: string) {
        const userData = await this.userRepository.getByEmail(email);
        if (!userData) {
            throw new ValidationError("Email ou senha inválidos");
        }
        const validPassowrd = await bcrypt.compare(password, userData.senhaHash);
        if (!validPassowrd) {
            throw new ValidationError("Email ou senha inválidos");
        }

        const token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
        return token;
    }

    async updatePassword(id: string, newPassword: string) {
        const user = await this.userService.getById(id);
        const IsTheSamePassword = await bcrypt.compare(newPassword, user.senhaHash);
        if (IsTheSamePassword) {
            throw new ValidationError("A senha não pode ser a mesma utilizada anteriormente");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const data = await this.userRepository.updatePassword(id, hashedPassword);
        return data;
    }
}
