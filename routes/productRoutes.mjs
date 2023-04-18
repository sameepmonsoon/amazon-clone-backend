import express from "express";
import Product from "../Models/Product.mjs";
const router = express.Router();
router.post("/add", async (req, res) => {
  try {
    const productsArray = req.body;
    const newProducts = await Product.insertMany(productsArray);
    res.status(201).json(newProducts);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = {};
      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      res.status(400).json({ message: "Validation error", errors });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

export default router;
