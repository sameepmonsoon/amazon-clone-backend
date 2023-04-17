import express from "express";
import { postPayment, getPayment } from "../controller/paymentController.mjs";
import Stripe from "stripe";

import Payment from "../Models/payment.mjs";
const stripe = new Stripe(
  "sk_test_51MxbTVC3OOoE618TLLQ4FXh9TpwbSGu9RMiGi4Jqu0EwnTrudaHtLq9ueEeddhHxljnOrH6CRaToInq2hmq5jsE100BuhvR3Xz"
);
const create = async (req, res) => {
  const total = req.body.amount;
  const payment = await stripe.paymentIntents.create({
    amount: total * 100,
    currency: "inr",
  });
  res.status(201).send({
    clientSecret: payment.client_secret,
  });
};

const router = express.Router();
router.post("/:userId/create", postPayment);
router.post("/create", create);
router.get("/:userId/get", getPayment);
export default router;
