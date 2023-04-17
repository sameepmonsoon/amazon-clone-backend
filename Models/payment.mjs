import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
    amount: {
      type: String,
      required: true,
    },
    products: {
      type: Array,
      required: true,
      default: [],
    },
    address: {
      type: Array,
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);
export default mongoose.model("Payment", PaymentSchema);
