import Joi from "joi";

export const productSchema = Joi.object({
    gender: Joi.string().required(),
    session: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    images: Joi.array().required(),
    value: Joi.string().required()
});
