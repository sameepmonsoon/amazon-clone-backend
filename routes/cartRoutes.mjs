import express from "express";
import { addCart, getCart } from "../controller/cartController.mjs";

const router = express.Router();

// Define the routes
router.post("/:userId/addCart", addCart);
router.get("/:userId/getCart", getCart);

export default router;
