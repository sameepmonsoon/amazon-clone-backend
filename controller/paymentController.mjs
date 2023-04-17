import Payment from "../Models/payment.mjs";

export const postPayment = async (req, res) => {
  try {
    console.log(req.body.address);
    const newPayment = await Payment({
      user: req.params.userId,
      amount: req.body.amount,
      products: req.body.products,
      address: req.body.address,
    });
    newPayment.save();
    res.status(200).send({
      message: "Payment Saved.",
    });
  } catch {
    (err) => {
      res.status(200).send({
        message: err.message,
      });
    };
  }
};
export const getPayment = async (req, res) => {
  try {
    const userId = req.params.userId;
    const payment = await Payment.findOne({ user: userId }).lean();
    if (!payment) {
      return res.status(404).json({ message: "payment not found" });
    }
    res.json(payment);
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: err.message });
  }
};
