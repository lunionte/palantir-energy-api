import { UserRepository } from "../repositories/user.repository";

export class UserService {
    private userRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }

    async getAll() {
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
}
