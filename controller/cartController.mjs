import Cart from "../Models/Cart.mjs";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const addCart = async (req, res) => {
  const userId = req.params.userId;
  console.log("user id", userId);
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: mongoose.Types.ObjectId(userId) }, // convert to ObjectId
      { cartItems: [req.body] },
      { upsert: true, new: true }
    ).populate("cartItems.product");

    return res.status(201).json({ message: "Items added into the Cart", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating cart" });
  }
};

export { addCart };

export const getCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({
      user: mongoose.Types.ObjectId(userId),
    }).populate("cartItems.product");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart.cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
