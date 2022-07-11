import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/.{6,21}/).required()
});

export const registerSchema = Joi.object({
    name: Joi.string().pattern(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/).min(4).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/.{6,21}/).required()
});

export const orderFinishedSchema = Joi.object({
    products: Joi.array(),
    email: Joi.string().email().required(),
    name: Joi.string().pattern(/.{6,21}/).required(),
    tel: Joi.string().pattern(/.{10,11}/).required(),
    cep: Joi.string().max(9).required(),
    address: Joi.string().required(),
    paymenteOption: Joi.string().required(),
    totalValue: Joi.string().required(),
});