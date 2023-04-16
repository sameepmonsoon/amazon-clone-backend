import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartId: {
      type: String,
      unique: true,
      required: true,
      default: uuidv4,
    },
    cartItems: { type: Array, required: true, default: [] },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
