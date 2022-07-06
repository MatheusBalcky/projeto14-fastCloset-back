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

