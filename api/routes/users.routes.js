import express from "express";
import { userProfile, newUser, editUser,deleteUser, updateFullAccount} from "../controllers/user.controller.js";
import {validatorHandler,  validatorUserHandler } from "../middleware/validator.handler.js";
import { dataUsers, idValidation } from "../schemas/user.schema.js";

const router = express.Router();

router.post("/new",validatorUserHandler(dataUsers,'body'), newUser);
router.get("/profile", userProfile);
router.put("/edit/:id",validatorHandler(idValidation,'params'), editUser);
router.put('/:id/fullaccount', updateFullAccount);
router.delete("/:id",validatorHandler(idValidation,'params'), deleteUser);


export default router;
