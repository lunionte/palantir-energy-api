import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository";
import jwt from "jsonwebtoken";

export class AuthService {
    private userRepository;
    constructor() {
        this.userRepository = new UserRepository();
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
            throw new Error("Email ou senha inválido");
        }
        const validPassowrd = await bcrypt.compare(password, userData.senhaHash);
        if (!validPassowrd) {
            throw new Error("Email ou senha inválido");
        }

        const token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
        return token;
    }
}
