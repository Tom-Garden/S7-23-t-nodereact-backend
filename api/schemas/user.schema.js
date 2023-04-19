import Joi from "joi";

const name = Joi.string().min(3);
const email = Joi.string().email();
const password = Joi.string().min(8).uppercase(1);
const type =Joi.string().min(3);
const id=Joi.string().length(24);
const celphone =Joi.string();
const picture =Joi.string();
const username =Joi.string();
const status =Joi.string();


export const idValidation = Joi.object({
  id: id.required(),
});

export const dataUsers = Joi.object({
name:name.required(),
email:email.required(),
picture:picture.required(),
userName:username.required(),
})

