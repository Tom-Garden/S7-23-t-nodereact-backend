import express from "express";
import {validatorHandler,validatorCategoryHandler } from "../middleware/validator.handler.js";
import { getAllCategories, categoryOne, newCategory, editCategory, deleteCategory } from "../controllers/category.controller.js";
import { dataCategory, idValidation } from "../schemas/category.schema.js";

const router = express.Router();

router.post("/",validatorCategoryHandler(dataCategory,'body'), newCategory); //create

router.get("/", getAllCategories); //retrieve

//read
router.get("/:id",validatorHandler(idValidation,'params'), categoryOne);

//update
router.put("/edit/:id",validatorHandler(idValidation,'params'),validatorCategoryHandler(dataCategory,'body'), editCategory);

//delete
router.delete("/:id",validatorHandler(idValidation,'params'), deleteCategory);

export default router;