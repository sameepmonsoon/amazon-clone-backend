import Payment from "../Models/payment.mjs";

export const postPayment = async (req, res) => {
  try {
    const newPayment = await Payment({
      user: req.params.userId,
      amount: req.body.amount,
      products: req.body.products,
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
  const userId = req.params.userId;
  try {
    const payment = await Payment.findOne({
      user: userId,
    });
    if (!payment) {
      return res.status(404).json({ message: "payment not found" });
    }
    const { ...othersData } = payment._doc;
    res.json(...othersData);
  } catch (err) {
    console.log("error:", err);
    res.status(401).send({ message: err.message });
  }
};
