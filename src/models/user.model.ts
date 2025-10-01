import { Joi } from "celebrate";

export const newUserSchema = Joi.object().keys({
    nome: Joi.string().max(50).trim(),
    email: Joi.string().email().trim(),
    password: Joi.string().max(50).trim(),
});

export const loginSchema = Joi.object().keys({
    email: Joi.string().email().trim(),
    password: Joi.string().max(50).trim(),
});
