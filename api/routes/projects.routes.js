import express from "express";
import {
  getProjects,
  postProject,
  getProjectById,
  updateProject,
  PayCard,
  // Success,
} from "../controllers/project.controller.js";

const router = express.Router();

router.post("/", postProject);

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/pay/:id", PayCard);
// router.get("/success/:id/:amount", Success);

router.put("/", updateProject);

export default router;
