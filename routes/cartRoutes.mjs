import express from "express";
import { addCart, getCart } from "../controller/authControllers.mjs";
const router = express.Router();
router.post("/addCart", addCart);
router.get("/getCart", getCart);

export default router;
