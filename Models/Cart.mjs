import mongoose, { Mongoose } from "mongoose";

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  cartItems: { type: Array, required: true, default: [] },
});

export default mongoose.model("Cart", CartSchema);
