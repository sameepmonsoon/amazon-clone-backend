import express from "express";
import { addCart, getCart } from "../controller/cartController.mjs";
import { authenticateToken } from "../authenticateToken.mjs";
const router = express.Router();
router.post("/addCart", authenticateToken, addCart);
router.get("/getCart", authenticateToken, getCart);

export default router;
