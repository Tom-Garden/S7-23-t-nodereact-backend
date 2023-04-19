import Joi from "joi";

const amount = Joi.number();
const projectId = Joi.string().length(24);
const date = Joi.date();
const userId = Joi.string().length(24);
const comment = Joi.string().min(5).max(200);
const completed = Joi.string();
const type = Joi.string();  //No acepta class como nombre

// export const idValidation = Joi.object({
//   id: id.required(),
// });

export const dataUsers = Joi.object({
amount:amount.required(),
projectId:projectId.required(),
date:date.required(),
userId:userId.required(),
comment:comment.required(),
completed:completed.required(),
// class:class.required()
})