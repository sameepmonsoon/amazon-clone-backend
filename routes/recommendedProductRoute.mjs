import RecommendedProduct from "../Models/RecommendedProduct.mjs";
import { spawn } from "child_process";
import express from "express";
const router = express.Router();
router.get("/get", async (req, res) => {
  try {
    const recommendedProducts = await RecommendedProduct.findOne().populate(
      "recommendedProducts"
    );
    if (!recommendedProducts) {
      res.status(404).send("Recommended products not found.");
      return;
    }

    const pythonProcess = spawn("python", [
      "D:/React/React/Amazone_clone_backend/routes/recommendedModule.py",
    ]);

    pythonProcess.stdout.on("data", (data) => {
      console.log(`Python stdout: ${data}`);
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Python stderr: ${data}`);
    });
    pythonProcess.on("close", async (code) => {
      console.log(`Python process exited with code ${code}`);
    });
    res.send(recommendedProducts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error.");
  }
});

export default router;
