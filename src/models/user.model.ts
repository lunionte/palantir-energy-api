import { Joi } from "celebrate";

export enum StatusFuncionario {
    DISPONIVEL = "DISPONIVEL",
    EM_LIGACAO = "EM_LIGACAO",
    OFFLINE = "OFFLINE",
}

export const newUserSchema = Joi.object().keys({
    nome: Joi.string().max(50).trim(),
    email: Joi.string().email().trim(),
    password: Joi.string().max(50).trim(),
    status: Joi.string().optional(),
});

export const loginSchema = Joi.object().keys({
    email: Joi.string().email().trim(),
    password: Joi.string().max(50).trim(),
});

export const queryParamsSchema = Joi.object().keys({
    status: Joi.string()
        .uppercase()
        .valid(...Object.values(StatusFuncionario))
        .optional(),
});
