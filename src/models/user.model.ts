import { Joi } from "celebrate";

export enum StatusFuncionario {
    DISPONIVEL = "DISPONIVEL",
    EM_LIGACAO = "EM_LIGACAO",
    OFFLINE = "OFFLINE",
}

export const newUserSchema = Joi.object().keys({
    nome: Joi.string().max(50).trim().required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(6).max(50).trim().required(),
});

export const updateUserSchema = Joi.object().keys({
    nome: Joi.string().min(1).max(50).trim().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).max(50).optional(),
    status: Joi.string()
        .valid(...Object.values(StatusFuncionario))
        .optional(),
});

export const loginSchema = Joi.object().keys({
    email: Joi.string().email().trim().required(),
    password: Joi.string().max(50).trim().required(),
});

export const newPasswordSchema = Joi.object().keys({
    newPassword: Joi.string().min(6).max(50).required(),
});
export const queryParamsSchema = Joi.object().keys({
    status: Joi.string()
        .uppercase()
        .valid(...Object.values(StatusFuncionario))
        .optional(),
});
