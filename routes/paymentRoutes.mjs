import express from "express";
import Stripe from "stripe";

const router = express.Router();
router.post("/create", async (req, res) => {
  const total = req.body.amount;
  console.log("Payment for ", total);
  const payment = await Stripe.pyamentIntent.create({
    amount: total,
    currency: "nrs",
  });
  res.status(201).send({
    clientSecret: payment.client_secret,
  });
});
export default router;
