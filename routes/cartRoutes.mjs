import express from "express";
import { addCart, getCart } from "../controller/cartController.mjs";

const router = express.Router();

// Define the routes
router.post("/:userId/cart", addCart);
router.get("/:userId/cart", getCart);

export default router;
