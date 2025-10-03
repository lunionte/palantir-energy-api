import { StatusFuncionario } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
    private userRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }

    async getAll(status?: StatusFuncionario) {
        if (status) {
            const data = await this.userRepository.getByStatus(status);
            return data;
        }
        const data = await this.userRepository.getAll();
        return data;
    }

    async getById(id: string) {
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        return user;
    }

    async update(id: string, email: string, nome: string, status: StatusFuncionario) {
        const data = await this.userRepository.update(id, nome, email, status);
        return data;
    }
}
