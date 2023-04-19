import RecommendedProduct from "../Models/RecommendedProduct.mjs";
import express from "express";
const router = express.Router();
router.get("/get", async (req, res) => {
  try {
    const recommendedProducts = await RecommendedProduct.find()
      .populate("recommendedProducts")
      .exec();

    if (!recommendedProducts) {
      res.status(404).send("Recommended products not found.");
      return;
    }
    res.send(recommendedProducts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error.");
  }
});

export default router;
