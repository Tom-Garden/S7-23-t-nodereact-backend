import User from "../models/users.js";

export const findElement = async (element) => {
  return User.find(element);
};
export const findOneElement = async (element) => {
  return User.findOne(element);
};
