import express from "express";
import {
  getDonationByUser,
  postDonation,
  acceptWorkDonation,
  failure,
  completed,
} from "../controllers/donation.controller.js";

const router = express.Router();

router.post("/", postDonation);

router.get("/:id", getDonationByUser);

router.get("/completed/:id", completed);

router.get("/failure/:id", failure);

router.put("/:id", acceptWorkDonation);

export default router;
