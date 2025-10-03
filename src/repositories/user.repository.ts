import { PrismaClient } from "@prisma/client";
import { StatusFuncionario } from "../models/user.model";
const prisma = new PrismaClient();

export class UserRepository {
    async getAll() {
        const data = await prisma.funcionario.findMany();
        return data;
    }

    async getByStatus(status: StatusFuncionario) {
        const data = await prisma.funcionario.findMany({ where: { status } });
        return data;
    }

    async getById(id: string) {
        const data = await prisma.funcionario.findUnique({
            where: {
                id,
            },
        });
        return data;
    }

    async getByEmail(email: string) {
        const data = await prisma.funcionario.findUnique({ where: { email } });
        return data;
    }

    async update(id: string, nome: string, email: string, status: StatusFuncionario) {
        const data = await prisma.funcionario.update({
            where: { id },
            data: {
                nome,
                email,

                status,
            },
        });
        return data;
    }

    async updatePassword(id: string, senhaHash: string) {
        const data = await prisma.funcionario.update({
            where: { id },
            data: {
                senhaHash,
            },
        });
        return data;
    }
    async save(nome: string, email: string, senhaHash: string) {
        const data = await prisma.funcionario.create({
            data: {
                nome,
                email,
                senhaHash,
            },
        });
        return data;
    }
}
