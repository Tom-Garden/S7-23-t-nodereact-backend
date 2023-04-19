import Joi from "joi";

const name = Joi.string().min(5);
const id = Joi.string().length(24);
const description = Joi.string().min(5);

export const idValidation = Joi.object({
  id: id.required(),
});

export const dataCategory = Joi.object({
  name: name.required(),
  description: description
});
